/**
 * Created by fable on 15/11/05.
 * @Author fable
 * @desc   hero config 
 *
 *女野蛮人，小招，受击效果与普攻差不多，没有倒地
 * 		    大招，为单体攻击，连续分段受击伤害，会有倒地
**/
/////////////////////////////英雄可配置参数 start ???????//////////////////////////////////////////////////
//根据美术提供的每个动画资源进行配置 ?????
var SpineConfig_yemanren =
{
//	hid                 : 1001,
	sp_name             : "yemanren",
	sp_type             : "near",             //near 近战, far远程
	sp_scale            : cc.p(0.85,       0.85), //缩放系数
	attack_box          : cc.size(6*32,    5*32), //攻击范围， 使用时要乘缩放系数 spine 32pi 一个格子
	attacked_box        : cc.size(4*32,    5*32), //受击范围，使用时要乘缩放系数 spine 32pi 一个格子

	small_skill_spec    : true,      //?????  //true 小技能攻击，由下面的Hero_xxx提供，一定要实现下面的smallSkillAttack, false,则用AttackProcess的公共处理
	big_skill_spec      : true,      //?????  //true 大技能攻击，由下面的Hero_xxx提供，一定要实现下面的bigSkillAttack, false,则用AttackProcess的公共处理

}
/////////////////////////////英雄可配置参数 end//////////////////////////////////////////////////


var Hero_yemanren = HeroSpine.extend({

	_param  : {},

	ctor:function(spineName, isLeft){
		this._super(spineName, SpineConfig_yemanren, isLeft);			
		this._param = {};

		return true;
	},

	smallSkillSpecAttack:function(attHero, defHero, att, def, runToPos, roundEndCallback){
		cc.assert(att.range != 100, "Hero_yemanren smallSkill is single attack!!!");  

		this._param                    = {};
		this._param.attHero            = attHero;
		this._param.defHero            = defHero;
		this._param.att                = att;
		this._param.def                = def;
		this._param.runToPos           = runToPos;
		//this._param.roundEndCallback   = roundEndCallback;

		//跑向指定地点	
		attHero.runTo(runToPos, function(){
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
		}.bind(this), HERO_RUN_SPEED_ATT, defHero.getLocalZOrder() + 1);			
	},

	smallSkillEventCallback:function(traceIndex, event){
        //cc.log( traceIndex + " event: %s, %d, %f, %s",event.data.name, event.intValue, event.floatValue, event.stringValue);
		if(event.stringValue == "commAttacked"){
			this._param.defHero.commAttacked(this._param.attHero, this._param.att, this._param.def);

			//变红
			this._param.defHero.getHeroSpine().setColorSoon(cc.color.RED, 10*this.getFps());  			
       	}    		
	},

	bigSkillSpecAttack:function(attHero, defHeroAry, att, defAry, runToPos, roundEndCallback){

		cc.assert(att.range != 100, "Hero_yemanren bigSkill is single attack!!!");  //剑士的大招是单体攻击

		this._param                  = {};
		this._param.attHero          = attHero;
		this._param.defHeroAry       = defHeroAry;
		this._param.defHero          = defHeroAry[att.range];		
		this._param.att              = att;
		this._param.def              = defAry[0];
		this._param.runToPos         = runToPos;
		//this._param.roundEndCallback = roundEndCallback;

		//var rate = [4,5,7,5,4,5,6,7,5,4,3,6,9,4,6,4,6,10]; //(5+5+8)个元素相加等于100
		this.skillAttacked("init", this._param.attHero, this._param.defHero, this._param.att, this._param.def, null, 10);

		//var pos = runToPos;
		//pos.x += this.getScalePos(cc.p(-100, 0), true).x;
		attHero.runTo(runToPos, function(){
			attHero.bigSkill(defHeroAry, this._param.att, defAry, null, function(){
	 			if(this._skillAttacked[this._param.def.seat].cur_index != 10)
	 				cc.log("Hero yemanren bigskill error rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", this._skillAttacked[this._param.def.seat].cur_index);
					
				attHero.runBack(null, 0);
				// for (var i in defAry) {
				// 	var def = defAry[i];
				// 	if(def.cbChongShengFallenAndAttackComplete)      //重生
				// 		def.cbChongShengFallenAndAttackComplete();   
				// 	else if(def.cbFallenAndSkillComplete)            //倒地正常起身
				// 		def.cbFallenAndSkillComplete();
				// 	else if(def.cbDeadFallenAndSkillComplete)        //倒地死亡
			 //            def.cbDeadFallenAndSkillComplete();	
			 //        else				
				// 		att.roundEnd();             //没有倒地
				// }

				var def = this._param.def;
				if(def.cbChongShengFallenAndAttackComplete)      //重生
					def.cbChongShengFallenAndAttackComplete();   
				else if(def.cbFallenAndSkillComplete)            //倒地正常起身
					def.cbFallenAndSkillComplete();
				else if(def.cbDeadFallenAndSkillComplete)        //倒地死亡
		            def.cbDeadFallenAndSkillComplete();	
		        else				
					att.roundEnd();             //没有倒地

			}.bind(this));	

		}.bind(this), HERO_RUN_SPEED_ATT, this._param.defHero.getLocalZOrder() + 1);

	},

	bigSkillEventCallback:function(traceIndex, event){
        //cc.log( traceIndex + " event: %s, %d, %f, %s",event.data.name, event.intValue, event.floatValue, event.stringValue);
        //7 attacked
		if(event.stringValue == "run"){
			// 不用转过去
			//var pos      = this._param.runToPos;
			var pos      = cc.p(0, 0);
			var defSpine = this._param.defHero.getHeroSpine();
			var attSpine = this._param.attHero.getHeroSpine();
			var def_s    = defSpine.getScaleSize(defSpine.getConfig().attacked_box);
			var att_s    = attSpine.getScaleSize(attSpine.getConfig().attack_box);
			pos.x  += this.getScalePos(cc.p(def_s.width/2 + att_s.width/2, 0), true).x;
			//?????// 不用转过去
			//this._param.attHero.runToNotPauseAni(pos, null, 8*this.getFps(), this._param.defHero.getLocalZOrder() + 1);	
			var pos1     = this.getScalePos(cc.p(def_s.width/2+50,  0), true);
			var pos2     = this.getScalePos(cc.p(-def_s.width/2-50, 0), true);
        	var moveBy1  = cc.moveBy(this.getFps()*10,   pos);
        	var moveBy2  = cc.moveBy(this.getFps()*20,  pos1);
        	var moveBy3  = cc.moveBy(this.getFps()*20,  pos2);

        	var seq = cc.sequence(moveBy1, moveBy2, moveBy3);        	
        	this._param.attHero.runAction(seq);				  
       	}
       	//飞起来
		else if(event.stringValue == "attacked"){
       		this.skillAttacked("attacked", this._param.attHero, this._param.defHero, this._param.att, this._param.def, 8); 
 		}
		else if(event.stringValue == "move_up"){
			var defSpine = this._param.defHero.getHeroSpine();
			var attSpine = this._param.attHero.getHeroSpine();

       		var fps      = attSpine.getFps();
			var top_pos1 = defSpine.getScalePos(cc.p(-10,  0.5*32), true);
			var top_pos2 = defSpine.getScalePos(cc.p(-12,  0.5*32), true);
			var top_pos3 = defSpine.getScalePos(cc.p(-10,  0.8*32), true);
			var top_pos4 = defSpine.getScalePos(cc.p(-14,  0.8*32), true);
       		
        	var moveBy1  = cc.moveBy(fps*6,  top_pos1);
        	var moveBy2  = cc.moveBy(fps*5,  top_pos2);
        	var moveBy3  = cc.moveBy(fps*5,  top_pos3);
        	var moveBy4  = cc.moveBy(fps*3,  top_pos4);

        	var seq = cc.sequence(moveBy1.easing(cc.easeSineIn()), moveBy2.easing(cc.easeSineIn()), moveBy3.easing(cc.easeSineIn()), moveBy4.easing(cc.easeSineIn()));
        	this._param.defHero.runAction(seq);

        	//????，shader开始变模糊
        	Shader.blur_ex(defSpine.getSpine(), 0.4, 7, {x:100, y:100});
 		}  		       	
 		//开始从空中掉落，倒地, 爬起来----如果是死亡，则会定格动画在fallen	 		
 		else if(event.stringValue == "fly_fallen"){

			//this.skillFallen("start", 12);
			var defSpine = this._param.defHero.getHeroSpine();
			//?????全体攻击，多个倒地，可以连续多次多次调用fallenGetUp
       		this._param.defHero.fallenGetUp(this._param.attHero, this._param.att, this._param.def, null, function(){        //getup ani complete cb
       			this._param.att.roundEnd();
       		}.bind(this));

       		defSpine.startPlayFromFrame(15);//从第12帧开始，让其快速进入受击状态，应该是根据不同的英雄来的，但这做不到，只能给一个恰当的值	?????	

			//var defSpine = this._param.defHero.getHeroSpine();			
       		var attSpine = this._param.attHero.getHeroSpine();
			var top_pos1 = defSpine.getScalePos(cc.p(-100,   3*32),      true);
			var top_pos2 = defSpine.getScalePos(cc.p(-80,   -3*32-2.6*32), true);
       		var fps      = attSpine.getFps();

        	var moveBy1  = cc.moveBy(fps*4,  top_pos1);
        	var moveBy2  = cc.moveBy(fps*8,  top_pos2);
        	var seq = cc.sequence(moveBy1.easing(cc.easeExponentialOut()), cc.delayTime(2*fps), moveBy2.easing(cc.easeExponentialIn()));
        	//var seq = cc.sequence(moveBy1.easing(cc.easeExponentialOut()), cc.delayTime(2*fps), moveBy2.easing(cc.easeSineIn()));
        	this._param.defHero.runAction(seq);	

        	//????重置shader效果
        	Shader.reset(defSpine.getSpine());
 		} 	       	       	         	             	       	
	}
});
