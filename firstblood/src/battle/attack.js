
/**
 * Created by fable on 15/08/20.
 * @Author fable
 * @desc   ...
 */



var Attack = cc.Class.extend({

	_ai : null,
	_cb : null,
	_attack  : null,
	_attacked: null,

	ctor:function(attack, attacked, cb, ai){
		//this._super();

		this._ai = ai;
		this._cb = cb;

		this._attack   = attack;
		this._attacked = attacked;

		return true;
	},


	execute:function(type){

		// type == 普通攻击, 攻击流程，先跑到敌人面前，发动攻击动作，伴随特效，敌人受击动作及特效，加入伤害，返回。
		var self = this;
		var runBackCallback = function(){


			self._cb(self._attack, self._attacked);
		}

		var attackCompleteCallback = function(){
			self._attack.runBack(runBackCallback);
		}		

		var attackingCallback = function(){
			var hurt = new Hurt(self._attack, self._attacked);
			self._attacked.attacked(self._attack, hurt);
		}

		var runToEnemyCallback = function(){
			self._attack.attack(self.attacked, attackingCallback, attackCompleteCallback);
		}		



		cc.log("attack execute zorder2",  this._attack.getLocalZOrder(), this._attacked.getLocalZOrder());		
		this._attack.runToEnemy(this._attacked, runToEnemyCallback);




		// type == .....

	}



});
