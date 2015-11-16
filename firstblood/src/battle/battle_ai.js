
/**
 * Created by fable on 15/08/20.
 * @Author fable
 * @desc   ...
 */


var BattleAi = cc.Node.extend({
	_hero_ary  : [],
	_enemy_ary : [],

	_first_ary : [],
	_second_ary: [],

	_hero_first : false,
	_attackHeroIndex     : 0,
	_secondAttackIndex   : 0,

	_hero_key   : [],
	_enemy_key  : [],
	_isFirstAttack : true,
	_battle_over_cb : null,
	_attackRoundNum : 0,
	_roundNum : 0,

	_zorder   : null,


	//_attack     : [],

	ctor:function(heroAry, enemyAry, cb){
		this._super();

		this._battle_over_cb = cb;
		this._zorder = new ZOrder(heroAry, enemyAry);

		var k = 0;
		for(var i in heroAry){
			this._hero_ary[k++] = heroAry[i];
			cc.log("battle_ai ctor heroAry index", heroAry[i].getIndex());
		}
		k = 0;
		for(var i in enemyAry){
			this._enemy_ary[k++] = enemyAry[i];
			cc.log("battle_ai ctor enemyAry index", enemyAry[i].getIndex());			
		}

		// this._hero_ary  = heroAry;
		// this._enemy_ary = enemyAry;
	},

	onEnter:function(){
		this._super();
		//this.scheduleUpdate();
	},

	start:function(bHeroFirst){

		this._hero_first = bHeroFirst;
		if (bHeroFirst) {
			this._first_ary  = this._hero_ary;
			this._second_ary = this._enemy_ary;
		} else {
			this._first_ary  = this._enemy_ary;
			this._second_ary = this._hero_ary;
		}

		this._attackRoundNum = 0;
		this._roundNum = 0;
		this.resetBattleRound();
		//this.logic(this._attackHeroIndex, this._hero_first);
		this.battleRound();
	},

	resetBattleRound:function(){
		this._firstAttackIndex = 0; //从0 开始
		this._secondAttackIndex = 0;
		this._isFirstAttack    = true;

		for (var i in this._first_ary) {
			this._first_ary[i].setHaveAttacked(false);
		}

		for (var i in this._second_ary) {
			this._second_ary[i].setHaveAttacked(false);
		}

		this._roundNum++;		
	},

	battleRound:function(){
		//check win
		var win = this.checkHeroWin();
		if (win) {
			this._battle_over_cb(true);
		} else {
			win = this.checkEnemyWin();
			if (win) {
				this._battle_over_cb(false);
			} else{

				if (this._attackRoundNum != 0) {
					cc.log("battle_ai battleRound xxx1", this._isFirstAttack, this._attackRoundNum);
					this._isFirstAttack = !this._isFirstAttack;
					cc.log("battle_ai battleRound xxx11", this._isFirstAttack);
					var attacker = this.findAttacker(false);
					//如果是易边也没找到，那说明一个大的回合已完
					if (attacker.attack_index == -1) {
						cc.log("battle_ai findAttacker 3");
						this.resetBattleRound();
						attacker = this.findAttacker(false);
					}	

					cc.log("battle_ai battleRound xxx2", this._attackRoundNum, attacker.is_first, attacker.attack_index);
					this._isFirstAttack = attacker.is_first;
					if (this._isFirstAttack) {
						this._firstAttackIndex = attacker.attack_index;
					} else {
						this._secondAttackIndex = attacker.attack_index;						
					}					
				}

				if (this._isFirstAttack) {
					this.firstAttack();
				} else {
					this.secondAttack();
				}

				//cc.log("battle_ai battleRound 3333", JSON.stringify(this._first_ary));
				this._attackRoundNum++;				
			}
		}
	},


	checkEnemyWin:function(){
		var win = true;
		for (var i in this._hero_ary) {
			if (this._hero_ary[i].getState() != fb.HERO_STATE_DEAD) {
				win = false; 
			}
		}

		return win;
	},

	checkHeroWin:function(){
		var win = true;
		for (var i in this._enemy_ary) {
			if (this._enemy_ary[i].getState() != fb.HERO_STATE_DEAD) {
				win = false; 
			}
		}

		return win;
	},	

	firstAttack:function(){
		var attack = this._first_ary[this._firstAttackIndex];
		var attacked_index = this.findAttackedIndex();
		if (attacked_index < 0) {
			cc.log("battle_ai firstAttack attacked_index < 0 error");
			return false;
		}

		var attacked = this._second_ary[attacked_index];		
		this.attackStart(attack, attacked);
	},

	secondAttack:function(){
		var attack = this._second_ary[this._secondAttackIndex];
		var attacked_index = this.findAttackedIndex();
		if (attacked_index < 0) {
			cc.log("battle_ai secondAttack attacked_index < 0 error");
			return false;
		}

		var attacked = this._first_ary[attacked_index];		
		this.attackStart(attack, attacked);
	},	

	findAttackedIndex:function(){

		var attacked_ary = [];
		var attack_ary   = [];
		var attack_index = 0;
		var attacked_index = -1;

		if (this._isFirstAttack) {
			attack_ary   = this._first_ary;
			attacked_ary = this._second_ary;
			attack_index = this._firstAttackIndex;			
		} else{
			attack_ary   = this._second_ary;
			attacked_ary = this._first_ary;
			attack_index = this._secondAttackIndex;		
		}

		cc.log("battle_ai findAttackedIndex s0", attack_index, this._isFirstAttack, attack_ary.length);
		//如果对位英雄存在，先攻击对位英雄		
		for (var i in attacked_ary) {
			if (attacked_ary[i].getIndex() == attack_ary[attack_index].getIndex() && attacked_ary[i].getState() != fb.HERO_STATE_DEAD) {
				attacked_index = parseInt(i);
				break;
			}
		}

		//否则攻击最小序号英雄	
		if (attacked_index < 0) {	
			for (var key in attacked_ary) {
				if (attacked_ary[key].getState() != fb.HERO_STATE_DEAD) {
					attacked_index = parseInt(key);
					break;
				}
			}				
		} 	

		return attacked_index;
	},

	findAttacker:function(checkRound){

		var attacked_ary = [];
		var attack_ary   = [];
		var attack_index = 0;
		var attacked_index = -1;

		var attacker = {is_first:false, attack_index:-1};

		if (this._isFirstAttack) {
			attack_ary   = this._first_ary;
			attacked_ary = this._second_ary;
			attack_index = this._firstAttackIndex;			
		} else{
			attack_ary   = this._second_ary;
			attacked_ary = this._first_ary;
			attack_index = this._secondAttackIndex;		
		}

		cc.log("battle_ai findAttacker 0", this._isFirstAttack, attack_index);
		//没死，且这一回合没攻击过
		if (attack_ary[attack_index] != undefined && attack_ary[attack_index].getState() != fb.HERO_STATE_DEAD && attack_ary[attack_index].getHaveAttacked() == false) {
			attacker.is_first = this._isFirstAttack;
			attacker.attack_index = attack_index;
			cc.log("battle_ai findAttacker 1", this._isFirstAttack, attack_index);
		} else {
			var find = false;
			for (var i in attack_ary) {
				if (i > attack_index && attack_ary[i].getState() != fb.HERO_STATE_DEAD && attack_ary[i].getHaveAttacked() == false) {
					attack_index = parseInt(i);
					find = true;
					break;
				}
			}	

			//如果在这一边找到，则返回
			if (find) {
				attacker.is_first = this._isFirstAttack;
				attacker.attack_index = attack_index;

				cc.log("battle_ai findAttacker 2", this._isFirstAttack, attack_index);				
			//易边再找
			} else {
				if (checkRound == false) {
					this._isFirstAttack = !this._isFirstAttack;
					attacker = this.findAttacker(true);
				}			
			}
		}

		return attacker;
	},	


	attackStart:function(attack, attacked){

		//cc.log("attack execute zorder1",  this._attack.getLocalZOrder(), typeof(this._attack.getLocalZOrder()), typeof(fb.BATTLE_HERO_ZODER));

		var attack_ary = [], attacked_ary = [];
		if (this._isFirstAttack) {
			attack_ary = this._first_ary;
			attacked_ary = this._second_ary;
		} else {
			attack_ary = this._second_ary;
			attacked_ary = this._first_ary;
		}
		this._zorder.setZOrder(attack, attacked, attack_ary, attacked_ary);
		var attack = new Attack(attack, attacked, this.attackCallback.bind(this), this);
		//this._attack.push[attack];
		attack.execute();

//		for (var i in this._first_ary) {
//			cc.log("battle_ai first index: first:zorder", this._first_ary[i].getIndex(), this._first_ary[i].getLocalZOrder());
//		}
//		for (var i in this._second_ary) {
//			cc.log("battle_ai second index: second:zorder", this._second_ary[i].getIndex(), this._second_ary[i].getLocalZOrder());
//		}
	},

	attackComplete:function(attack, attacked){

		this._zorder.resetZOrder(attack, attacked);
		attack.setHaveAttacked(true);
		this.battleRound();
	},

	attackCallback:function(attack, attacked){

		this.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
			this.attackComplete(attack, attacked);
		}, this)));
	},

});


