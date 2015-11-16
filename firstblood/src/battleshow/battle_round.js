
/**
 * Created by fable on 15/09/15.
 * @Author fable
 * @desc   战斗回合处理
 */

// // 防守方的特效
// //SPE_SKILL_ZHILIAO               //治疗                                 --前端不需要处理
// var HERO_SPE_EFFECT_NONE           = 0;
// var HERO_DEF_SPE_EFFECT_MISS       = 1;   //1表示闪避
// var HERO_DEF_SPE_EFFECT_GEDANG     = 2;   //2表示格挡
// var HERO_DEF_SPE_EFFECT_JIANREN    = 3;   //3表示坚韧                      --前端不需要处理
// var HERO_DEF_SPE_EFFECT_HUIXUE     = 4;   //4表示回血
// var HERO_DEF_SPE_EFFECT_CHONGSHENG = 5;   //5表示重生

// // 攻击方的特效
// var HERO_ATT_SPE_EFFECT_BAOJI      = 1;   //1表示暴击 3倍伤害
// var HERO_ATT_SPE_EFFECT_BISHA      = 2;   //2表示必杀 4倍伤害 //????现在改为连击
// var HERO_ATT_SPE_EFFECT_JIASHEN    = 3;   //3表示加深 增加百分比伤害       --前端不需要处理
// var HERO_ATT_SPE_EFFECT_SHENGJIAN  = 4;   //4便是圣剑 5倍伤害
// var HERO_ATT_SPE_EFFECT_ZHONGJI    = 5;   //5表示重击 50%概率 

// { 
// 	"battle":
// 	{
// 		//对战双方的英雄阵形
// 		"stand":
// 		{
// 			//攻击方英雄阵形
// 		    "attack":
// 			[
// 			    {
// 					"seat":    英雄站位编号
// 					"hid" :    英雄id
// 					"level":   英雄等级
// 					"blood":   英雄血量
// 					"quality": 英雄品质
// 					"battle":  英雄战斗力
// 			    }
// 			],
// 			防守方英雄阵形
// 			"def":
// 			[
// 			    {
// 					"seat":    英雄站位编号
// 					"hid" :    英雄id
// 					"level":   英雄等级
// 					"blood":   英雄血量
// 					"quality": 英雄品质
// 					"battle":  英雄战斗力
// 			    }
// 			]
// 		},
// 		"huihe":
// 		[
// 		    {
// 		    	"rounds": xx, 当前第几回合，从1开始，最多20回合
// 			    //战斗中期
// 			    "mid":
// 			    {
// 			    // 攻击方一个英雄的状态
// 			        "att": 
// 					{
// 						"seat":   英雄站位编号，左边是1、2、3、4、5、6，顺序是由上到下，由右到左，右边是11、12、13、14、15、16，顺序是由上到下，由左到右
// 						"hid":    英雄id
// 						"type":   特效效果类型，1表示伤害类，2表示加血类
// 						"skill":  技能类型，1表示普通攻击，2表示小招，3表示大招
// 						"range":  如果是伤害类英雄，这个值就是防守方英雄的站位编号；如果是加血类英雄，这个值就是攻击方英雄的站位编号；100表示攻击方或者防守方所有英雄
// 						"effect": 0表示没有特效，1表示暴击，2表示必杀，3表示加深，4便是圣剑，5表示重击
// 					},
// 					// 防守方每个英雄的状态；如果是加血类英雄，则表示攻击方每个英雄的状态
// 					"def":
// 					[
// 						{
// 							"seat":   英雄站位编号
// 							"hid":    英雄id
// 							"effect": 0表示没有特效，1表示闪避，2表示格挡，3表示坚韧，4表示回血，5表示重生
// 							"drop":   负数表示伤害掉了多少点血，正数表示治愈加了多少点血
// 							"blood":  剩余多少点生命, 血为0，不一定死亡，effect == 5，可以复活
// 							"dead":   0表示没有死亡，1表示死亡
// 						}
// 					]
// 				},
// 				//战斗后期 // //战斗后期, 一些持续回合加血buffer及复活的处理,只对自身的，不是外界触发的，
// 				"end":
// 				{
// 					//攻击方一个英雄的状态
// 					"att":
// 					{
// 						"seat":   英雄站位编号
// 						"hid":    英雄id
// 						"effect": 0表示没有特效，1增加攻击力，2表示增加护甲
// 						"value":  特效增加的数值
// 					},
// 					//防守方每个英雄的状态
// 					"def":
// 					[
// 						{
// 							"seat":   英雄站位编号
// 							"hid":    英雄id
// 							"effect": 0表示没有特效，4表示回血，5表示重生
// 							"value":  特效增加的数值
// 						}
// 					]
// 				}
// 			}
// 		]
// 	}
// }

/////////////////////////////战斗可配置参数 start ???????//////////////////////////////////////////////////
//两个回合之间的延时
var BATTLE_TIME_ROUND_INTER            = 0.1;   //两个小回合之间的公共延时时间，?????
var BATTLE_TIME_ROUND_END_BUFFER_INTER = 0.3;   //如果round end有buffer特效，增加两个小回合之间的公共延时时间
/////////////////////////////战斗可配置参数 end/////////////////////////////////////////////////////////////


var BATTLE_ATT_TYPE_HURT    = 1;
var BATTLE_ATT_TYPE_ADDHP   = 2;
 
var BATTLE_ATT_SKILL_COMM   = 1;
var BATTLE_ATT_SKILL_SMALL  = 2;
var BATTLE_ATT_SKILL_BIG    = 3;


var BattleRound = cc.Node.extend({

	_parent   : null,
	_overcb   : null,
	_roundAry : null,
	_heroAry  : null,
	_round    : null,

	_index    : 0,

	ctor:function(roundAry, heroAry, overcb, parent){
		this._super();

		this._parent   = parent;
		this._overcb   = overcb;

		this._roundAry = roundAry;
		this._heroAry  = heroAry;

		return true;
	},

	start:function(){

		this._index = 0;
		//this._max   = this._roundAry.length;
		
		this.roundOne();
	},

	roundOne:function(){
		//this.clearHeroState();

		if (this._index < this._roundAry.length) {
			this._round = this._roundAry[this._index];
			this.roundMid();
			//this.roudnEnd();

			this._index++;
		} else {
			if (this._overcb)
				this._overcb();
		}

		if(this._round.rounds)
			this._parent.updateRoundsUI(this._round.rounds);
	},

	roundMid:function(){

		var att = this._round.mid.att;
		if (att.type == BATTLE_ATT_TYPE_HURT) {        //伤害一定是对于对方

			if (att.skill == BATTLE_ATT_SKILL_SMALL) {         //小技能是针对一个人
				this.smallSkillAttack();
			} else if (att.skill == BATTLE_ATT_SKILL_BIG) {    //大技能一定是全体AOE
				this.bigSkillAttack();
			} else if (att.skill == BATTLE_ATT_SKILL_COMM) {   //小技能是针对一个人
				var attHero = this._heroAry[att.seat];
				var defHero = this._heroAry[att.range];
				var def     = this.getDefForSeat(this._round.mid.def, att.range);

				this.commAttack(attHero, defHero, att, def);
			}

		} else if (att.type == BATTLE_ATT_TYPE_ADDHP) { //加血一定是对于已方，且是技能加才会有

			if (att.skill == BATTLE_ATT_SKILL_SMALL) {         //小技能是针对一个人
				this.smallSkillAttack();
			} else if (att.skill == BATTLE_ATT_SKILL_BIG) {    //大技能一定是全体AOE
				this.bigSkillAttack();
			}
			//this.addBlood();
		}

		//????现在已经去掉怒气值
		//this._parent.updateAngerUI(this._round.mid.anger.att, this._round.mid.anger.def);
	},	

	//一个小回合攻击完成后，进行buffer,debuffer状态的处理，然后再进行下一个小回合
	roundEnd:function(){

		var midAtt   = this._round.mid.att;  
		if(midAtt.isHaveExeRoundEnd)        //?????为了大招的全体攻击所在，为了避免重复调用，参考hero show fallenGetUp:function(attHero, att, def, cbFallenComplete, cbGepUpComplete)说明
			return;							//全体攻击，多个倒地，可以多次调用fallenGetUp
		else
			midAtt.isHaveExeRoundEnd = true; 

		var att      = this._round.end.att;
		var defAry   = this._round.end.def;
		var attHero  = this._heroAry[att.seat];

		var param    = {};
		param.chongsheng = false;
		param.cbDebufferComplete = null;

		var isHaveBuffer  = attHero.buffer(att);
		var cb_index      = 0;
		var bFindDebuffer = false;

		for(var i=0; i<defAry.length; i++){
			var def     = defAry[i];
			if(def.effect == HERO_DEF_SPE_EFFECT_CHONGSHENG) {
				bFindDebuffer = true;
				cb_index = i;
				break;
			}

			if(def.effect != 0)
				bFindDebuffer = true;
			else
				cb_index      = i;
		}

		if(bFindDebuffer){
			for(var i=0; i<defAry.length; i++){
				var def     = defAry[i];
				var defHero = this._heroAry[def.seat];

				if(cb_index == i)
					param.cbDebufferComplete = function(){
						cc.log("battle round roundEnd chongsheng ok ");
						this.nextRound(true);
					}.bind(this); 

				if(def.effect != 0)
					defHero.debuffer(def, param);
			}		
		}
		else
			this.nextRound(isHaveBuffer);
	},

	// clearHeroState:function(){
	// 	for(var i in this._heroAry){
	// 		var hero = this._heroAry[i];
	// 		if(hero.getState() != HERO_STATE_INIT || hero.getState() != HERO_STATE_DEAD)
	// 			hero.setState(HERO_STATE_IDLE);
	// 	}
	// },
	//所有受击英雄可以最后在这里执行一次归位 ?????方便前的击飞等特效处理
	runBack:function(cbRoundOne){
		var def = this._round.mid.def;  
		var att = this._round.mid.att;  
		var runBackHeroNums = 0;		
		for(var i=0; i<def.length; i++){

			if(def[i].dead)
				continue;

			var defHero = this._heroAry[def[i].seat];
			cc.log("battle round runBack", defHero.getPosition().x, defHero.getHeroPos().x);			
			if((defHero.getPosition().x != defHero.getHeroPos().x) || (defHero.getPosition().y != defHero.getHeroPos().y)){

				runBackHeroNums++;
				att.isRunBackHeroCompleteOk = 0;
				defHero.runBack(function(){
					att.isRunBackHeroCompleteOk += 1;
					if(att.isRunBackHeroCompleteOk == runBackHeroNums){
						cbRoundOne();
					}
				}.bind(this), 0);

				cc.log("battle round must runBack ", runBackHeroNums);				
			}
		}	

		if(runBackHeroNums == 0)
			cbRoundOne();	
	},

	nextRound:function(isHaveBuffer){
		cc.log("battle round next round.........out", this._index, isHaveBuffer);

		this.runBack(function(){
			cc.log("battle round next round.........in", this._index, isHaveBuffer);			
			var bufferDelay = 0.0;
			if(isHaveBuffer)
				bufferDelay = BATTLE_TIME_ROUND_END_BUFFER_INTER;

			//延时一会，才进入下一个回合
			this.runAction(cc.sequence(cc.delayTime(BATTLE_TIME_ROUND_INTER + bufferDelay), cc.callFunc(function(){
				this.roundOne();
			}, this)));

		}.bind(this));
	},

	getDefForSeat:function(ary, seat){
		for(var i=0; i<ary.length; i++){
			if (ary[i].seat == seat) {
				return ary[i];
			}
		}
	},


	//一对一的普通攻击
	commAttack:function(attHero, defHero, att, def){

		att.roundEnd = this.roundEnd.bind(this);
		var attack = new AttackProcess(att.type, this._parent.getBigSkillPos());
		attack.commAttack(attHero, defHero, att, def, this.roundEnd.bind(this));	
	},

	smallSkillAttack:function(){
		var att     = this._round.mid.att;
		var def     = this.getDefForSeat(this._round.mid.def, att.range);
		var attHero = this._heroAry[att.seat];
		var defHero = this._heroAry[att.range];

		att.roundEnd = this.roundEnd.bind(this);
		var attack = new AttackProcess(att.type, this._parent.getBigSkillPos());
		attack.smallSkillAttack(attHero, defHero, att, def, this.roundEnd.bind(this));	
	},

	//大招攻击，一定是对对方的全体伤害或对已方的加血，
	bigSkillAttack:function(){
	
		//跑到屏幕中间，放大招，然后全体受击
		var defAry     = this._round.mid.def;			
		var att        = this._round.mid.att;
		var attHero    = this._heroAry[att.seat];
		var defHeroAry = [];

		for(var i=0; i<defAry.length; i++){

			var def     = defAry[i];
			var defHero = this._heroAry[def.seat];
			defHeroAry[def.seat] = defHero;
			//cc.log("battle round ,,,,", i, def.seat);
			//def.roundEnd = this.roundEnd.bind(this);
		}	

		att.roundEnd = this.roundEnd.bind(this);		
		var attack = new AttackProcess(att.type, this._parent.getBigSkillPos());
		attack.bigSkillAttack(attHero, defHeroAry, att, defAry, this.roundEnd.bind(this));	
	}
});
