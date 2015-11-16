/**
 * Created by fable on 15/10/25.
 * @Author fable
 * @desc   hero config 
 *
 * 黑暗法师，小招，受击效果与普攻差不多，没有倒地
 * 		     大招，为单体攻击，连续分段受击伤害，会有倒地
**/
/////////////////////////////英雄可配置参数 start ???????//////////////////////////////////////////////////
//根据美术提供的每个动画资源进行配置 ?????
var SpineConfig_heianfashi =
{
//	hid                 : 1001,
	sp_name             : "heianfashi",
	sp_type             : "far",   //near 近战, far远程
	sp_scale            : cc.p(0.9,       0.9), //缩放系数
	attack_box          : cc.size(4*32,  5*32),         //攻击范围，使用时要乘缩放系数, spine格子，一个32
	attacked_box        : cc.size(4*32,  5*32),          //受击范围，使用时要乘缩放系数
	effctCacheNum       : 2,      //????,因为大招的特效是做在一个spine里面，故如果没个人身上加一个特效，就会要创建5个对象，0不用创建
								  //js没有注册createWithData(),创建对象IO很耗时，故在一开始加载的时候，创建一个大招需要特效对象列表,根据大招是否有全体攻击，及受击特效来配置,优化战斗卡帧现象
								  //单体攻击子弹与受击，同一时间就2个

	small_skill_spec    : true,      //?????           //true 小技能攻击，由下面的Hero_xxx提供，一定要实现下面的smallSkillAttack, false,则用AttackProcess的公共处理
	big_skill_spec      : true,      //?????           //true 大技能攻击，由下面的Hero_xxx提供，一定要实现下面的bigSkillAttack, false,则用AttackProcess的公共处理

}
/////////////////////////////英雄可配置参数 end//////////////////////////////////////////////////


var Hero_heianfashi = HeroSpine.extend({

	_param : {},

	ctor:function(spineName, isLeft, effectCache){
		this._super(spineName, SpineConfig_heianfashi, isLeft, effectCache);		
		this._param = {};

		return true;
	},

	smallSkillSpecAttack:function(attHero, defHero, att, def, runToPos, roundEndCallback){

		cc.assert(att.range != 100, "Hero_heianfashi smallSkill is single attack!!!");  

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
				cc.log("heianfashi smallSkill complete");					
                if(att.cbFarAttackHitAndAttackComplete)
                    att.cbFarAttackHitAndAttackComplete(); 
			}.bind(this));				
		}.bind(this), HERO_RUN_SPEED_ATT, defHero.getLocalZOrder() + 1);
	},

	smallSkillEventCallback:function(traceIndex, event){
        //cc.log( traceIndex + " event: %s, %d, %f, %s",event.data.name, event.intValue, event.floatValue, event.stringValue);
       	if(event.stringValue == "start"){

       		var attHero = this._param.attHero;
       		var defHero = this._param.defHero;
       		var def     = this._param.def;
       		var att     = this._param.att;
			//归位		
			var runBackCallback = function(){
	            if(def.cbChongShengFallenAndAttackComplete)
	                def.cbChongShengFallenAndAttackComplete();
	            else
	            	att.roundEnd();
			}
			//攻击完成
			var attackCompleteCallback = function(){					
				attHero.runBack(runBackCallback, HERO_RUN_SPEED_ATT);
			}

			// //敌人受击处理
			var attackingCallback = function(){
				defHero.commAttacked(attHero, att, def);
			}
 			
            att.isFarAttackHitAndAttackCompleteOk = 0;
            att.cbFarAttackHitAndAttackComplete = function(){
                cc.log("heianfashi farAttack, xxxxx", att.isFarAttackHitAndAttackCompleteOk);
                att.isFarAttackHitAndAttackCompleteOk += 1;
                if(att.isFarAttackHitAndAttackCompleteOk == 2){ //只有当受击特效与攻击动画都完成了，才runBack
                    attackCompleteCallback();  
                    att.cbFarAttackHitAndAttackComplete     = null;
                    att.isFarAttackHitAndAttackCompleteOk   = 0;                
                }          
            }.bind(this); 

			attHero.farAttackBulletFlyAndHit(defHero, att, def, "T_skill1_1", "T_skill1_2", attackingCallback, function(){
				cc.log("heianfashi farAttackBulletFlyAndHit, hit complete");
                if(att.cbFarAttackHitAndAttackComplete)
                    att.cbFarAttackHitAndAttackComplete();                    				
			}.bind(this));		
       	}
	},


	bigSkillSpecAttack:function(attHero, defHeroAry, att, defAry, runToPos, roundEndCallback){

		cc.assert(att.range != 100, "Hero_heianfashi bigSkill is single attack!!!");  //黑暗法师的大招是单体攻击

		this._param                  = {};
		this._param.attHero          = attHero;
		this._param.defHeroAry       = defHeroAry;
		this._param.defHero          = defHeroAry[att.range];		
		this._param.att              = att;
		this._param.def              = defAry[0];
		this._param.runToPos         = runToPos;
		//this._param.roundEndCallback = roundEndCallback;
		//

		this.skillAttacked("init", this._param.attHero, this._param.defHero, this._param.att, this._param.def, null, 5);

        var pos    = cc.p(0, 0);
        var defPos = this._param.defHero.getHeroPos();
        var dis    = attHero.getHeroSpine().getConfig().sp_scale.x*320;
        if (this._param.defHero.getIsLeft()) {
            pos.x = defPos.x + dis;
            pos.y = defPos.y;
        } 
        else {
            pos.x = defPos.x - dis;
            pos.y = defPos.y;
        }
		attHero.runTo(pos, function(){
			attHero.bigSkill(defHeroAry, att, defAry, null, function(){
	 			if(this._skillAttacked[this._param.def.seat].cur_index != 5)
	 				cc.log("Hero heianfashi bigskill error rrrrrrrrrr", this._skillAttacked[this._param.def.seat].cur_index);

				attHero.runBack(null, 0);
				var def = this._param.def; //单体大招
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
       	//开始
       	if(event.stringValue == "start"){
       		var attSpine     = this._param.attHero.getHeroSpine();
            var heroSpine    = this.getEffectHeroSpine(0);
            //var heroSpine    = HeroSpine.createInstance(attSpine.getConfig().sp_name, this._param.attHero.getIsLeft());      		          
            this._param.attHero.addChild(heroSpine,  HERO_ZORDER_EFFECT_DIBAN);

            //heroSpine.setPosition(heroSpine.getScalePos(cc.p(2.5*32, 0), true));
            heroSpine.setAnimation("T_skill2_1", false, function(){
            	cc.log("heianfashi start tttttttt");
                heroSpine.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
                    heroSpine.removeFromParent();
                }.bind(this), this))); 
            	//heroSpine.removeFromParent(); 在spine帧事件回调里直接删除会死，一定要延时删除，?????  
            });  			  		
       	}
       	// 5 attacked 受击
       	else if(event.stringValue == "attacked"){
       		this.skillAttacked("attacked", this._param.attHero, this._param.defHero, this._param.att, this._param.def, 8);      		   
       	}
 		//倒地, 爬起来----如果是死亡，则会定格动画在fallen	 		
 		else if(event.stringValue == "fallen"){

			var defSpine = this._param.defHero.getHeroSpine();
			//?????全体攻击，多个倒地，可以连续多次多次调用fallenGetUp
       		this._param.defHero.fallenGetUp(this._param.attHero, this._param.att, this._param.def, null, function(){        //getup ani complete cb
       			this._param.att.roundEnd();
       		}.bind(this));
       		defSpine.startPlayFromFrame(8);//从第12帧开始，让其快速进入受击状态，应该是根据不同的英雄来的，但这做不到，只能给一个恰当的值	?????	
 				
       		var attSpine = this._param.attHero.getHeroSpine();
    		var fps      = attSpine.getFps();       		
			var pos      = defSpine.getScalePos(cc.p(-50,  20), true);
			var pos1     = defSpine.getScalePos(cc.p(-80,  0),  true);
   
        	var moveBy   = cc.moveBy(fps*2, pos);
        	var moveBy1  = cc.moveBy(fps*4, pos1);
        	var seq = cc.sequence(moveBy, moveBy1);
        	this._param.defHero.runAction(seq);	//在battle round runBack里面归位 ??????
 		}
 		// else if(event.stringValue == "runback"){
 		// 	cc.log("heianfashi bigSkillEventCallback runback");
			// this._param.defHero.runBack(null, 0); 						
 		// } 			
	}
});
