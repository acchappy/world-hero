/**
 * Created by fable on 15/11/05.
 * @Author fable
 * @desc   hero config 
 *
 *维京人，小招，受击效果与普攻差不多，没有倒地
 * 		  大招，为单体攻击，连续分段受击伤害，会有倒地
**/
/////////////////////////////英雄可配置参数 start ???????//////////////////////////////////////////////////
//根据美术提供的每个动画资源进行配置 ?????
var SpineConfig_weijingren =
{
//	hid                 : 1001,
	sp_name             : "weijingren",
	sp_type             : "near",             //near 近战, far远程
	sp_scale            : cc.p(0.75,   0.75),    //缩放系数
	attack_box          : cc.size(7*32,    5*32),    //攻击范围，使用时要乘缩放系数 spine 32pi 一个格子
	attacked_box        : cc.size(4*32,  5*32),     //受击范围，使用时要乘缩放系数 spine 32pi 一个格子

	small_skill_spec    : true,      //?????  //true 小技能攻击，由下面的Hero_xxx提供，一定要实现下面的smallSkillAttack, false,则用AttackProcess的公共处理
	big_skill_spec      : true,      //?????  //true 大技能攻击，由下面的Hero_xxx提供，一定要实现下面的bigSkillAttack, false,则用AttackProcess的公共处理

}
/////////////////////////////英雄可配置参数 end//////////////////////////////////////////////////


var Hero_weijingren = HeroSpine.extend({

	_param  : {},

	ctor:function(spineName, isLeft){
		this._super(spineName, SpineConfig_weijingren, isLeft);			
		this._param = {};

		return true;
	},

	smallSkillSpecAttack:function(attHero, defHero, att, def, runToPos, roundEndCallback){
		cc.assert(att.range != 100, "Hero_weijingren smallSkill is single attack!!!");  

		this._param                    = {};
		this._param.attHero            = attHero;
		this._param.defHero            = defHero;
		this._param.att                = att;
		this._param.def                = def;
		this._param.runToPos           = runToPos;
		//this._param.roundEndCallback   = roundEndCallback;

		this.skillAttacked("init", this._param.attHero, this._param.defHero, this._param.att, this._param.def, null, 3);

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
		if(event.stringValue == "attacked"){			
       		this.skillAttacked("attacked", this._param.attHero, this._param.defHero, this._param.att, this._param.def, 8);
		}
		else if(event.stringValue == "commAttacked"){
       		this.skillAttacked("commAttacked", this._param.attHero, this._param.defHero, this._param.att, this._param.def, 8); 
       	}    		
	},

	bigSkillSpecAttack:function(attHero, defHeroAry, att, defAry, runToPos, roundEndCallback){

		cc.assert(att.range != 100, "Hero_weijingren bigSkill is single attack!!!");  //剑士的大招是单体攻击

		this._param                  = {};
		this._param.attHero          = attHero;
		this._param.defHeroAry       = defHeroAry;
		this._param.defHero          = defHeroAry[att.range];		
		this._param.att              = att;
		this._param.def              = defAry[0];
		this._param.runToPos         = runToPos;
		//this._param.roundEndCallback = roundEndCallback;

		//var rate = [4,5,7,5,4,5,6,7,5,4,3,6,9,4,6,4,6,10]; //(5+5+8)个元素相加等于100
		this.skillAttacked("init", this._param.attHero, this._param.defHero, this._param.att, this._param.def, null, 7);

		var pos = runToPos;
		//pos.x += this.getScalePos(cc.p(-100, 0), true).x;
		attHero.runTo(pos, function(){
			attHero.bigSkill(defHeroAry, this._param.att, defAry, null, function(){
	 			if(this._skillAttacked[this._param.def.seat].cur_index != 7)
	 				cc.log("Hero weijingren bigskill error rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", this._skillAttacked[this._param.def.seat].cur_index);
					
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
		if(event.stringValue == "attacked"){
       		this.skillAttacked("attacked", this._param.attHero, this._param.defHero, this._param.att, this._param.def, 8);      		   
       	}
		else if(event.stringValue == "commAttacked"){
       		this.skillAttacked("commAttacked", this._param.attHero, this._param.defHero, this._param.att, this._param.def, 8); 
       	}
		// else if(event.stringValue == "jump"){
		// 	var pos = cc.p(0, 0);
		// 	pos.x += this.getScalePos(cc.p(100, 0), true).x; 

  //   		var fps      = this.getFps();
  //       	var moveBy   = cc.moveBy(fps*1, pos);
  //       	this._param.attHero.runAction(moveBy);
  //      	}
		else if(event.stringValue == "blend_s"){
			this._param.defHero.getHeroSpine().setSpineBlendFunc({src:cc.SRC_ALPHA, dst:cc.ONE});
       	}
		else if(event.stringValue == "blend_e"){
			this._param.defHero.getHeroSpine().setSpineBlendFuncDefault();
       	}        	         	             	       	
       	//地面开始震动 ??????
       	// else if(event.stringValue == "shake"){

       	// }	
	}
});
