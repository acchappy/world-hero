/**
 * Created by fable on 15/10/25.
 * @Author fable
 * @desc   attack process 
**/

var AttackProcess = cc.Class.extend({
	
	_attack_type   : null,
	_big_skill_pos : null,

	ctor:function(type, pos){

		this._attack_type   = type;
		this._big_skill_pos = pos;

		return true;
	},

	getRunToPos:function(attHero, defHero){

		var pos    = cc.p(0, 0);
		//加血或大招，都跑到中间
		if (this._attack_type == BATTLE_ATT_TYPE_ADDHP || defHero == null) {
			cc.log("AttackProcess getRunToPos 11", this._big_skill_pos.x, this._big_skill_pos.y);
			return this._big_skill_pos;
		} 
		else if(attHero.getHeroSpine().getConfig().sp_type == "near"){
			pos = defHero.getNearAttackPos(attHero);			
		}
		//跑到受击者前面HERO_RUNTO_FAR_DIS
		else if(attHero.getHeroSpine().getConfig().sp_type == "far"){
			pos = defHero.getFarAttackPos(attHero);			
		}

		cc.log("AttackProcess getRunToPos 22", pos.x, pos.y);

		return pos;
	},

	//一对一的普通攻击
	commAttack:function(attHero, defHero, att, def, roundEndCallback){

		//归位		
		var runBackCallback = function(){
			cc.log("attack process commAttack xxxxxxxxxxx3333333333333");				
            if(def.cbChongShengFallenAndAttackComplete)
                def.cbChongShengFallenAndAttackComplete();
            else
            	att.roundEnd();
		}
		//攻击完成
		var attackCompleteCallback = function(){
			cc.log("attack process commAttack xxxxxxxxxxx2222222222");					
			attHero.runBack(runBackCallback, HERO_RUN_SPEED_ATT);
		}

		// //敌人受击处理
		var attackingCallback = function(){
			cc.log("attack process commAttack xxxxxxxxxxx111111");
		 	//defHero.setState(HERO_STATE_DEF_BEGIN);			
			//defHero.commAttacked(attHero, att, def, roundEnd);
			defHero.commAttacked(attHero, att, def);
		}		

		//开始攻击
		var runToEnemyCallback = function(){
			cc.log("attack process commAttack xxxxxxxxxxx0000000");
			//attHero.attack(defHero, att.effect, attackingCallback, attackCompleteCallback);
			if(attHero.getHeroSpine().getConfig().sp_type == "far")
				attHero.farAttack(defHero, att, def, attackingCallback, attackCompleteCallback);
			else
				attHero.nearAttack(defHero, att, def, attackingCallback, attackCompleteCallback);				
		}	

		//attHero.setState(HERO_STATE_ATT_BEGIN);
		//跑向指定地点	
		attHero.runTo(this.getRunToPos(attHero, defHero), runToEnemyCallback, HERO_RUN_SPEED_ATT, defHero.getLocalZOrder() + 1);		
	},

	smallSkillAttack:function(attHero, defHero, att, def, roundEndCallback){
        var runToPos  = this.getRunToPos(attHero, defHero);
		attHero.getHeroSpine().smallSkillAttack(this, attHero, defHero, att, def, runToPos, roundEndCallback);
	},

	//小技能一定是单体
	//小技能攻击公共处理，本质上没普通攻击没多在区别，只是伤害与特效会不一样,/加血，一定是对已方，有可能是大招造成的，有可能作用为多个
	smallSkillCommAttack:function(attHero, defHero, att, def, runToPos, roundEndCallback){

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
		 	//defHero.setState(HERO_STATE_DEF_BEGIN);			
			//defHero.commAttacked(attHero, att, def, roundEnd);
			defHero.commAttacked(attHero, att, def);
		}

		//开始攻击
		var runToEnemyCallback = function(){
			attHero.smallSkill(defHero, att, def, attackingCallback, attackCompleteCallback);
		}		
		//attHero.setState(HERO_STATE_ATT_BEGIN);
		//跑向指定地点
		attHero.runTo(runToPos, runToEnemyCallback, HERO_RUN_SPEED_ATT, defHero.getLocalZOrder() + 1);	
	},

	bigSkillAttack:function(attHero, defHeroAry, att, defAry, roundEndCallback){
        var runToPos  = null;
        if (att.range == 100) { //全体攻击，大招
            runToPos  = this.getRunToPos(attHero, null);
        } 
        else {
            var defHero = defHeroAry[att.range];                
            runToPos    = this.getRunToPos(attHero, defHero);             
        }   

        attHero.getHeroSpine().bigSkillAttack(this, attHero, defHeroAry, att, defAry, runToPos, roundEndCallback);
	},

	//大招攻击公共处理，一定是对对方的全体伤害或对已方的加血， 	//加血，一定是对已方，有可能是大招造成的，有可能作用为多个
	bigSkillCommAttack:function(attHero, defHeroAry, att, defAry, runToPos, roundEndCallback){

		//var endCallback = roundEndCallback;

		if (att.range == 100) { //全体攻击，大招	//???????

			var runBackCallback = function(){
				for (var i in defAry) {
					var def = defAry[i];
					if(def.cbChongShengFallenAndAttackComplete)      //重生
						def.cbChongShengFallenAndAttackComplete();   
					// else if(def.cbFallenAndSkillComplete)            //倒地正常起身
					// 	def.cbFallenAndSkillComplete();
					// else if(def.cbDeadFallenAndSkillComplete)        //倒地死亡
			  //           def.cbDeadFallenAndSkillComplete();	
			        else				
						att.roundEnd();             //没有倒地
				}
			}

			var attackCompleteCallback = function(){
				attHero.runBack(runBackCallback, HERO_RUN_SPEED_ATT);
			}	

			var attackingCallback = function(){

				for(var i=0; i<defAry.length; i++){
					var def     = defAry[i];
					var defHero = defHeroAry[def.seat];
					defHero.commAttacked(attHero, att, def);
				}
			}

			var runToEnemyCallback = function(){
				attHero.bigSkill(defHero, att, def, attackingCallback, attackCompleteCallback);
			}	
			//attHero.setState(HERO_STATE_ATT_BEGIN);		
			attHero.runTo(runToPos, runToEnemyCallback, HERO_RUN_SPEED_ATT, null);
		} 
		else { //单体攻击，大招
			
			var defHero = defHeroAry[att.range];
			var def     = defAry[0];		

			// var roundEnd = function(){
			// 	//attHero.setState(HERO_STATE_ATT_END);		
			// 	endCallback();					
			// }
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
			 	//defHero.setState(HERO_STATE_DEF_BEGIN);			
				//defHero.commAttacked(attHero, att, def, roundEnd);
				defHero.commAttacked(attHero, att, def);
			}

			//开始攻击
			var runToEnemyCallback = function(){

				attHero.bigSkill(defHeroAry, att, defAry, attackingCallback, attackCompleteCallback);
			}		
			//attHero.setState(HERO_STATE_ATT_BEGIN);			
			//跑向指定地点
			attHero.runTo(runToPos, runToEnemyCallback, HERO_RUN_SPEED_ATT, defHero.getLocalZOrder() + 1);	
		}
	}
});
