/**
 * Created by fable on 15/10/25.
 * @Author fable
 * @desc   hero config 
 *
 * 剑士，小招，受击效果与普攻差不多，没有倒地
 * 		 大招，为单体攻击，连续分段受击伤害，会有倒地
**/
/////////////////////////////英雄可配置参数 start ???????//////////////////////////////////////////////////
//根据美术提供的每个动画资源进行配置 ?????
var SpineConfig_jianshi =
{
//	hid                 : 1001,
	sp_name             : "jianshi",
	sp_type             : "near",   //near 近战, far远程
	sp_scale            : cc.p(0.85, 0.85), //缩放系数
	attack_box          : cc.size(140,  160),         //攻击范围，使用时要乘缩放系数
	attacked_box        : cc.size(120,  160),          //受击范围，使用时要乘缩放系数

	small_skill_spec    : true,      //?????           //true 小技能攻击，由下面的Hero_xxx提供，一定要实现下面的smallSkillAttack, false,则用AttackProcess的公共处理
	big_skill_spec      : true,      //?????           //true 大技能攻击，由下面的Hero_xxx提供，一定要实现下面的bigSkillAttack, false,则用AttackProcess的公共处理

}
/////////////////////////////英雄可配置参数 end//////////////////////////////////////////////////


var Hero_jianshi = HeroSpine.extend({

	_param : {},

	ctor:function(spineName, isLeft){
		this._super(spineName, SpineConfig_jianshi, isLeft);

		this._param = {};
		return true;
	},

	smallSkillSpecAttack:function(attHero, defHero, att, def, runToPos, roundEndCallback){
		cc.assert(att.range != 100, "Hero_jianshi smallSkill is single attack!!!");  

		this._param                    = {};
		this._param.attHero            = attHero;
		this._param.defHero            = defHero;
		this._param.att                = att;
		this._param.def                = def;
		this._param.runToPos           = runToPos;
		//this._param.roundEndCallback   = roundEndCallback;

		attHero.smallSkill(defHero, att, def, null, function(){			
			attHero.runBack(null, 0);

			if(def.cbChongShengFallenAndAttackComplete)      //重生
				def.cbChongShengFallenAndAttackComplete();   
			else if(def.cbFallenAndSkillComplete)            //倒地正常起身
				def.cbFallenAndSkillComplete();
			else if(def.cbDeadFallenAndSkillComplete)        //倒地死亡
	            def.cbDeadFallenAndSkillComplete();	
	        else				
				att.roundEnd();             //没有倒地

		}.bind(this));	
	},

	smallSkillEventCallback:function(traceIndex, event){
        //cc.log( traceIndex + " event: %s, %d, %f, %s",event.data.name, event.intValue, event.floatValue, event.stringValue);
       	if(event.stringValue == "jump"){

       		var fps = this._param.attHero.getHeroSpine().getFps();
   //     		cc.log("Hero_jianshi smallSkillEventCallback t", fps);
			// var move = cc.moveTo(5*fps, this._param.runToPos);
			this._param.attHero.runToNotPauseAni(this._param.runToPos, null, 5*fps, this._param.defHero.getLocalZOrder() + 1);
			//attHero.runTo(this._param.runToPos, runToEnemyCallback, 0, this._param.defHero.getLocalZOrder() + 1);        		
       	}
		else if(event.stringValue == "attack"){
		 	//this._param.defHero.setState(HERO_STATE_DEF_BEGIN);				
			this._param.defHero.commAttacked(this._param.attHero, this._param.att, this._param.def/*, this.roundEnd.bind(this)*/);
		}
		// 小招不用倒地 ?????
		// else if(event.stringValue == "fallen"){
		// 	this._complete.attacked_ok     = false;
		// 	this._param.defHero.fallenGetUp(this._param.def.dead, null, function(){
       	//		this._param.att.roundEnd();
		// 	}.bind(this));
		// }

	},

	bigSkillSpecAttack:function(attHero, defHeroAry, att, defAry, runToPos, roundEndCallback){

		cc.assert(att.range != 100, "Hero_jianshi bigSkill is single attack!!!");  //剑士的大招是单体攻击

		this._param                  = {};
		this._param.attHero          = attHero;
		this._param.defHeroAry       = defHeroAry;
		this._param.defHero          = defHeroAry[att.range];		
		this._param.att              = att;
		this._param.def              = defAry[0];
		this._param.runToPos         = runToPos;
		//this._param.roundEndCallback = roundEndCallback;

		//att.roundEndCallback         = roundEndCallback;
		var rate = [4,5,7,5,4,5,6,7,5,4,3,6,9,4,6,4,6,10]; //(5+5+8)个元素相加等于100
		this.skillAttacked("init", this._param.attHero, this._param.defHero, this._param.att, this._param.def, null, (5+5+8), rate);
		//this._param.attHero.setState(HERO_STATE_ATT_BEGIN);		
		attHero.bigSkill(defHeroAry, this._param.att, defAry, null, function(){
 			if(this._skillAttacked[this._param.def.seat].cur_index != (5+5+8))
 				cc.log("Hero jianshi bigskill error rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", this._skillAttacked[this._param.def.seat].cur_index);
 			// if(this._skillAttacked[this._param.def.seat].cur_blood != this._param.def.blood)
 			// 	cc.log("Hero jianshi bigskill error bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", this._skillAttacked[this._param.def.seat].cur_blood, def.blood);
				
			attHero.runBack(null, 0);
			for (var i in defAry) {
				var def = defAry[i];
				if(def.cbChongShengFallenAndAttackComplete)      //重生
					def.cbChongShengFallenAndAttackComplete();   
				else if(def.cbFallenAndSkillComplete)            //倒地正常起身
					def.cbFallenAndSkillComplete();
				else if(def.cbDeadFallenAndSkillComplete)        //倒地死亡
		            def.cbDeadFallenAndSkillComplete();	
		        else				
					att.roundEnd();             //没有倒地
			}

		}.bind(this));	
	},

	bigSkillEventCallback:function(traceIndex, event){
        //cc.log( traceIndex + " event: %s, %d, %f, %s",event.data.name, event.intValue, event.floatValue, event.stringValue);
       	//跑向位置
       	if(event.stringValue == "run"){
			this._param.attHero.runTo(this._param.runToPos, null, 0, this._param.defHero.getLocalZOrder() + 1);       		
       	}
       	// 5 attacked 受击
       	else if(event.stringValue == "attacked"){
       		//this._param.defHero.getHeroSpine().setSpineTimeScale(5);
       		//this._param.defHero.getHeroSpine().setAttackedAnimation(false); 
       		this.skillAttacked("attacked", this._param.attHero, this._param.defHero, this._param.att, this._param.def, 8);      		   
       	}
       	//挑飞
		else if(event.stringValue == "up"){
			var defSpine = this._param.defHero.getHeroSpine();
			var attSpine = this._param.attHero.getHeroSpine();

			var top_pos1 = attSpine.getScalePos(cc.p(0, 90));
			var top_pos2 = attSpine.getScalePos(cc.p(0, -40));
       		var fps      = attSpine.getFps();
       		
        	var moveBy1 = cc.moveBy(fps*3, top_pos1);
        	var moveBy2 = cc.moveBy(fps*5, top_pos2);

        	defSpine.runAction(cc.sequence(moveBy1, moveBy2));	
 		}
 		//5 attacked 连续刺击
 		else if(event.stringValue == "attack_ci1" || event.stringValue == "attack_ci2" || event.stringValue == "attack_ci3" || event.stringValue == "attack_ci4" || event.stringValue == "attack_ci5"){
			
       		this.skillAttacked("attacked", this._param.attHero, this._param.defHero, this._param.att, this._param.def, 8);   

			var defSpine = this._param.defHero.getHeroSpine();
			var attSpine = this._param.attHero.getHeroSpine();

			var top_pos1 = attSpine.getScalePos(cc.p(0, 25/5));
       		var fps      = attSpine.getFps();

        	var moveBy   = cc.moveBy(fps*2, top_pos1);
        	defSpine.runAction(moveBy);	
 		}
 		//开始跳向空中
 		else if(event.stringValue == "jump"){
			var defSpine = this._param.defHero.getHeroSpine();
			var attSpine = this._param.attHero.getHeroSpine();

			var top_pos1 = attSpine.getScalePos(cc.p(0, -20));
       		var fps      = attSpine.getFps();

        	var moveBy   = cc.moveBy(fps*6, top_pos1);
        	defSpine.runAction(moveBy);	
 		}
 		//8 attacked //连续转圈
 		else if(event.stringValue == "attack_co1" || event.stringValue == "attack_co2" || event.stringValue == "attack_co3" || event.stringValue == "attack_co4"
 			 || event.stringValue == "attack_co5" || event.stringValue == "attack_co6" || event.stringValue == "attack_co7" || event.stringValue == "attack_co8"){
			
       		this.skillAttacked("attacked", this._param.attHero, this._param.defHero, this._param.att, this._param.def, 8);   

			var defSpine = this._param.defHero.getHeroSpine();
			var attSpine = this._param.attHero.getHeroSpine();

			var top_pos  = attSpine.getScalePos(cc.p(0, 110/8));
       		var fps      = attSpine.getFps();

        	var moveBy   = cc.moveBy(fps*3, top_pos);
        	defSpine.runAction(moveBy);

 		} 	
 		//开始从空中掉落，倒地, 爬起来----如果是死亡，则会定格动画在fallen	 		
 		else if(event.stringValue == "fallen"){

			//this.skillFallen("start", 12);
			var defSpine = this._param.defHero.getHeroSpine();
			//?????全体攻击，多个倒地，可以连续多次多次调用fallenGetUp
       		this._param.defHero.fallenGetUp(this._param.attHero, this._param.att, this._param.def, null, function(){        //getup ani complete cb
       			this._param.att.roundEnd();
       		}.bind(this));

       		defSpine.startPlayFromFrame(12);//从第12帧开始，让其快速进入受击状态，应该是根据不同的英雄来的，但这做不到，只能给一个恰当的值	?????	

			//var defSpine = this._param.defHero.getHeroSpine();			
       		var attSpine = this._param.attHero.getHeroSpine();
			var top_pos  = attSpine.getScalePos(cc.p(0, -165));
       		var fps      = attSpine.getFps();
        	var moveBy   = cc.moveBy(fps*12, top_pos);
        	//var seq = cc.sequence(cc.delayTime(fps*15), moveBy);
        	defSpine.runAction(moveBy);	
 		} 			
	}
});
