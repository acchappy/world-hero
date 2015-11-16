
/**
 * Created by fable on 15/08/20.
 * @Author fable
 * @desc   ...
 */

/////////////////////////////战斗可配置参数 start ???????//////////////////////////////////////////////////
//攻击英雄瞬移的速度， <=0, 不管距离多远，时间一定HERO_RUN_FLASH_TIME，>0, 则根据距离除以速度
var HERO_RUN_SPEED_ATT             = 0;//3000;
var HERO_RUN_SPEED_TIME            = 0.12;      //闪现时间,  暂停动画，即一下冲到冲攻击位置的公共时间。????

var HERO_FAR_RUNTO_DIS             = 200;      //远程攻击，跑到受击者前面200的距离 ????
var HERO_FAR_BULLET_FLY_TIME       = 0.1;      //远程攻击，子弹飞行时间
//var HERO_ROUND_INTER_TIME     = 0.1;       //默认上一回合完到下一个回合开始之间的时间间隔
//全体攻击与被攻击英雄之间的距离调节参数，一般不需要
//var HERO_DISTANCE_ATT_DEF     = 0;
/////////////////////////////战斗可配置参数 end////////////////////////////////////////////////////////////


var HERO_STATE_INIT                = 0;
var HERO_STATE_IDLE                = 1;
var HERO_STATE_DEAD                = 2;
var HERO_STATE_ATT_BEGIN           = 3;  //攻击过程开始
var HERO_STATE_ATT_END             = 4;  //攻击过程完成
var HERO_STATE_DEF_BEGIN           = 5;  //受击过程开始
var HERO_STATE_DEF_END             = 6;  //受击过程完成
// var HERO_STATE_SKILLATT_BEGIN      = 7;  //技能攻击过程开始
// var HERO_STATE_SKILLATT_END        = 8;  //技能攻击过程完成
// var HERO_STATE_SKILLDEF_BEGIN      = 9;  //技能受击过程开始
// var HERO_STATE_SKILLDEF_END        = 10;  //技能受击过程完成

//round end buffer
var HERO_BUFF_EFFECT_ADDATT        = 1;   //加攻击力
var HERO_BUFF_EFFECT_ADDARMOR      = 2;   //增加护甲
 
//round mid 特效
// 防守方的特效
//SPE_SKILL_ZHILIAO               //治疗                                 --前端不需要处理
var HERO_SPE_EFFECT_NONE           = 0;
var HERO_DEF_SPE_EFFECT_MISS       = 1;   //1表示闪避
var HERO_DEF_SPE_EFFECT_GEDANG     = 2;   //2表示格挡
var HERO_DEF_SPE_EFFECT_JIANREN    = 3;   //3表示坚韧                      --前端不需要处理
var HERO_DEF_SPE_EFFECT_HUIXUE     = 4;   //4表示回血
var HERO_DEF_SPE_EFFECT_CHONGSHENG = 5;   //5表示重生

// 攻击方的特效
var HERO_ATT_SPE_EFFECT_BAOJI      = 1;   //1表示暴击 3倍伤害
var HERO_ATT_SPE_EFFECT_LIANJI      = 2;   //2表示必杀 4倍伤害 //????现在改为连击
var HERO_ATT_SPE_EFFECT_JIASHEN    = 3;   //3表示加深 增加百分比伤害       --前端不需要处理
var HERO_ATT_SPE_EFFECT_SHENGJIAN  = 4;   //4便是圣剑 5倍伤害
var HERO_ATT_SPE_EFFECT_ZHONGJI    = 5;   //5表示重击 50%概率 


var HERO_ZORDER_SPINE              = 110;
var HERO_ZORDER_BLOOD              = 114;  //血条
var HERO_ZORDER_FAR_BULLET         = 118;  //远程子弹特效,
var HERO_ZORDER_HURT_NUM           = 122;  //各种伤害数字特效
var HERO_ZORDER_EFFECT_DIBAN       = 106;  //人物脚下的圈特效  //显示在人物下面
var HERO_ZORDER_EFFECT_BODY        = 116;  //人物身上特效

/**
 *
 *  站位：
 *
 *    4    1       11  14
 *
 *   5    2          12    15
 *
 * 6    3              13     16
 *
 * 
 */
var HERO_SEAT_ZORDER = {"1":1+4, "2":2+5, "3":3+6, "4":4, "5":5, "6":6, "11":1+4, "12":2+5, "13":3+6, "14":4, "15":5, "16":6};

var HeroShow = cc.Node.extend({

    _state            : HERO_STATE_INIT, 

    _pos              : cc.p(0, 0),   //在场景里的坐标
    _seat             : 0,            //站位   //seat 1,2,3,4,5,6 一定待在左边，11,12,13,14,15,16一定在右边
    _isLeft           : false,        //是否站在左边，即是否是自己，右边一定是敌人
    _curLife          : 0,            //当前血量
    _maxLife          : 1000,         //最大血量

    _heroBlood        : null,         //血条ui 相关的管理
    _heroEffect       : null,         //buff 特效动画管理
    _heroSpine        : null,         //spine 动画相关的管理

    //attr:{
        // "seat":    英雄站位编号
        // "hid" :    英雄id
        // "mid" :    重复的英雄id
        // "level":   英雄等级
        // "blood":   英雄血量
        // "star":    英雄星级
        // "quality": 英雄品质
        // "battle":  英雄战斗力
    //}
	ctor:function(attr, pos, spineName){
		this._super();

        this._pos          = pos;
        this._seat         = attr.seat;
        this._isLeft       = (attr.seat > 10 ? false : true);
        this._curLife      = attr.blood; 
        this._maxLife      = attr.blood; 
        this._heroEffect   = null; 

        cc.log("hero show ctor spineName,", spineName);
        this._heroSpine = HeroSpine.createInstance(spineName, this._isLeft, true);
        this._heroSpine.setIdleAnimation(true);
        this.addChild(this._heroSpine, HERO_ZORDER_SPINE);
        this.setPosition(this._pos);
        this.setLocalZOrder(HERO_SEAT_ZORDER[this._seat]);

        this.initBloodUI();

        return true;
	},

    getHeroPos:function()          {  return this._pos;             },
    getSeat:function()             {  return this._seat;            },
    getIsLeft:function()           {  return this._isLeft;          },
    getCurLife:function()          {  return this._curLife;         },
    getHeroSpine:function()        {  return this._heroSpine;       },
    getState:function()            {  return this._state;           },
    setState:function(state)       {  this._state      = state;     },
    setHeroEffect:function(effect) {  this._heroEffect = effect;    },

    initBloodUI:function(){
        this._heroBlood = new HeroBlood();
        cc.log("hero show ctor sx, sy, sw, sh",  this._heroSpine.getConfig().sp_name, this._heroSpine.getBoundingBox().x
                    , this._heroSpine.getBoundingBox().y, this._heroSpine.getBoundingBox().width
                    , this._heroSpine.getBoundingBox().height);
        
        this._heroBlood.setPosition(cc.p(0, this._heroSpine.getBoundingBox().y + this._heroSpine.getBoundingBox().height));
        this.addChild(this._heroBlood, HERO_ZORDER_BLOOD);        
    },

    //跑到受击者前面HERO_RUNTO_FAR_DIS
    getFarAttackPos:function(attHero){
        var pos    = cc.p(0, 0);
        var defPos = this._pos;

        if (this._isLeft) {

            pos.x = defPos.x + HERO_FAR_RUNTO_DIS;
            pos.y = defPos.y;
        } 
        else {
            pos.x = defPos.x - HERO_FAR_RUNTO_DIS;
            pos.y = defPos.y;
        }

        return pos;
    },

    getNearAttackPos:function(attHero){
        var pos    = cc.p(0, 0);        
        var defPos = this._pos;
        var def_s  = this._heroSpine.getScaleSize(this._heroSpine.getConfig().attacked_box);
        var att_s  = attHero.getHeroSpine().getScaleSize(attHero.getHeroSpine().getConfig().attack_box);   

        if (this._isLeft) {

            pos.x = defPos.x + (def_s.width/2 + att_s.width/2);// + HERO_DISTANCE_ATT_DEF;
            pos.y = defPos.y;
        } 
        else {

            pos.x = defPos.x - (def_s.width/2 + att_s.width/2);// - HERO_DISTANCE_ATT_DEF;
            pos.y = defPos.y;
        }
        return pos;
    },

	onEnter:function(){
	    this._super();

        if(fb.BATTLE_DEBUG){
            this.scheduleUpdate();

            var draw_node = new cc.DrawNode();  
            this.addChild(draw_node, 22, 100000);   
            draw_node.clear();

            var start = cc.p(this._heroSpine.getBoundingBox().x, this._heroSpine.getBoundingBox().y);
            var end   = cc.p(this._heroSpine.getBoundingBox().x  + this._heroSpine.getBoundingBox().width
                            , this._heroSpine.getBoundingBox().y + this._heroSpine.getBoundingBox().height);

            draw_node.drawRect(start, end, cc.color(0, 255, 0, 255));
        }
	},

    update:function(dt){

        if(fb.BATTLE_DEBUG) {
            if (this.getChildByTag(100000)) {
                var draw_node = this.getChildByTag(100000);
                draw_node.clear();

                var start = cc.p(this._heroSpine.getSpine().getBoundingBox().x, this._heroSpine.getSpine().getBoundingBox().y);
                var end   = cc.p(this._heroSpine.getSpine().getBoundingBox().x  + this._heroSpine.getSpine().getBoundingBox().width
                                , this._heroSpine.getSpine().getBoundingBox().y + this._heroSpine.getSpine().getBoundingBox().height);

                draw_node.drawRect(start, end, cc.color(0, 255, 0, 255));   
            }           
        }
        
        //为了让血条跟随英雄的跳跃，始终显示在英雄头顶上
        //this._heroBlood.setPosition(cc.p(0, this._spine.getBoundingBox().y+this._spine.getBoundingBox().height));
    },

    //移动过程中动画不停播
    runToNotPauseAni:function(pos, cb, time, zorder){

        var dur  = time;
        var move = cc.moveTo(dur, cc.p(pos.x, pos.y));
        var seq  = cc.sequence(move, cc.callFunc(function(){if(cb) cb();}, this));
        if (zorder) {
            //走一半时，改zorder
            var spwan = cc.spawn(seq, cc.sequence(cc.delayTime(dur/2),
                                      cc.callFunc(function(){this.setLocalZOrder(zorder);}, this))//????有性能问题
                                );

            this.runAction(spwan);              
        }
        else
            this.runAction(seq);
    },

    //移动过程中，动画停播，相当于瞬间平移
	runTo:function(pos, cb, speed, zorder){

        var dur = HERO_RUN_SPEED_TIME;
        if (speed > 0) {
            var distance  = cc.pDistance(this._pos, pos);
            dur = distance / speed;
        };

        var move = cc.moveTo(dur, cc.p(pos.x, pos.y));
        //var move_ease_in = move.clone().easing(cc.easeExponentialIn());  
        cc.log("hero show runto ", pos.x, pos.y, this._pos.x, this._pos.y);

        this._heroSpine.pauseAnimation(); //暂停动画播放，实现瞬移，再恢复
        var seq = cc.sequence(move, cc.callFunc(function(){
            this._heroSpine.resumeAnimation();           
        }, this), /*cc.delayTime(0.1), */cc.callFunc(function(){
            if(cb) cb();
        }, this));

        if (zorder){
            //走一半时，改zorder
            var spwan = cc.spawn(seq, cc.sequence(cc.delayTime(dur/2),
                                      cc.callFunc(function(){this.setLocalZOrder(zorder);}, this))//????有性能问题
                                );

            this.runAction(spwan);              
        }
        else
            this.runAction(seq);
	},

    runBack:function(cb, speed, delayTime){

        var delay = 0.01;//几乎不延时，在BATTLE_TIME_ROUND_INTER配置其公共延时
        var dur   = HERO_RUN_SPEED_TIME;
        if(delayTime)
            delay = delayTime;

        if (speed > 0) {
            var distance  = cc.pDistance(this._pos, this.getPosition());
            dur = distance / speed;
        };

        var move = cc.moveTo(dur, this._pos);
        var seq_sub = cc.sequence(move, cc.callFunc(function (){
            this._heroSpine.resumeAnimation();   
        }, this), cc.delayTime(delay), cc.callFunc(function(){            
            if(cb) cb();
        }, this));

        var seq = cc.sequence(/*cc.delayTime(0.2),*/ cc.callFunc(function(){
            this._heroSpine.pauseAnimation(); //暂停动画播放，实现瞬移，再恢复          
        }, this));

//        if (zorder)
//        {
            //走一半时，改zorder
            var spwan = cc.spawn(seq_sub, cc.sequence(cc.delayTime(dur/2), cc.callFunc(function(){
                this.setLocalZOrder(HERO_SEAT_ZORDER[this._seat]);//????有性能问题
            }, this)));

            this.runAction(cc.sequence(seq, spwan));           
//        }
//        else
//            this.runAction(cc.sequence(seq, seq_sub));
    },

    //近战攻击
    nearAttack:function(defHero, att, def, cbAttacking, cbAttackComplete){
        this._heroSpine.setAttackAnimation(false);      
        if(cbAttackComplete)           
            this._heroSpine._owner.cbAttackComplete = cbAttackComplete;                    

        if(cbAttacking)
            this._heroSpine._owner.cbAttacking      = cbAttacking;
    },
    //远程攻击
    farAttack:function(defHero, att, def, cbAttacking, cbAttackComplete){
        //cc.log("hero show farAttack ");
        this._heroSpine.setAttackAnimation(false);      
        if(cbAttackComplete){
            att.isFarAttackHitAndAttackCompleteOk = 0;
            this._heroSpine._owner.cbAttackComplete = function(){
                var doNotSetNullOutSide = true;     //外面不需要设置成null, 已经在里面设置了  ?????
                cc.log("hero show farAttack, xxxxx", att.isFarAttackHitAndAttackCompleteOk);
                att.isFarAttackHitAndAttackCompleteOk += 1;
                if(att.isFarAttackHitAndAttackCompleteOk == 2){ //只有当受击特效与攻击动画都完成了，才会进行round end
                    cbAttackComplete();  
                    this._heroSpine._owner.cbAttackComplete = null;
                    att.isFarAttackHitAndAttackCompleteOk   = 0;                
                } 

                return doNotSetNullOutSide;                
            }.bind(this);            
        }          
                
        if(cbAttacking)
            this._heroSpine._owner.cbAttacking = function(){                  
                this.farAttackBulletFlyAndHit(defHero, att, def, null, null, cbAttacking, function(){
                    if(this._heroSpine._owner.cbAttackComplete)
                        this._heroSpine._owner.cbAttackComplete();
                }.bind(this));           
            }.bind(this);
    },


    farAttackBulletFlyAndHit:function(defHero, att, def, bulletName, hitName, cbHitStart, cbHitComplete){
        cc.log("hero show farAttackBulletFlyAndHit ");
        //弹道开始  
        var heroSpine = this.getHeroSpine().getEffectHeroSpine(0);
        this.addChild(heroSpine, HERO_ZORDER_FAR_BULLET); 
        heroSpine.setPosition(this._heroSpine.getFarBulletBeginPos());
        heroSpine.setFarBulletAnimation(bulletName, true);

        heroSpine.setScale(0.1);
        heroSpine.setOpacity(100);
        heroSpine.setCascadeOpacityEnabled(true);
        var moveTo = cc.moveTo(HERO_FAR_BULLET_FLY_TIME, defHero.getHeroSpine().getFarBulletEndPos(HERO_FAR_RUNTO_DIS));               
        heroSpine.runAction(cc.sequence(cc.spawn(cc.fadeTo(HERO_FAR_BULLET_FLY_TIME/4, 255), cc.scaleTo(HERO_FAR_BULLET_FLY_TIME/4, 1), moveTo), cc.callFunc(function(){
            heroSpine.removeFromParent();
            var heroSpine1 = this.getHeroSpine().getEffectHeroSpine(1);//HeroSpine.createInstance(this._heroSpine.getConfig().sp_name, this._isLeft);
            heroSpine1.setPosition(defHero.getHeroSpine().getFarBulletHitPos());
            defHero.addChild(heroSpine1, HERO_ZORDER_FAR_BULLET); 
            //cc.log("HeroShow farAttackBulletFlyAndHit hit start");            
            heroSpine1.setFarHitAnimation(hitName, false, function(){
                //cc.log("HeroShow farAttackBulletFlyAndHit hit CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
                cbHitComplete();
                //this.removeFromParent();  //受击特效完成，在spine帧事件回调里直接删除会死，一定要延时删除，?????        
                heroSpine1.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
                    heroSpine1.removeFromParent();
                }.bind(this), this)));    
            }.bind(this));

            cbHitStart();
        }.bind(this), this)));   
    },

    attacked:function(attHero, att, def, cbAttacked, cbAttackedComplete){
        //小技能与普功的受击特效都在这里处理，因为小技能跟普功一样 ?????
        var self = this;
        this.attackEffect(self, att, def);
        this.attackedEffect(attHero, att, def);   

        //this._state = HERO_STATE_DEF_BEGIN;
        this._heroSpine.setAttackedAnimation(false);
        this._heroSpine._owner.attacked = {};
        this._heroSpine._owner.attacked.attHero = attHero;
        this._heroSpine._owner.attacked.def     = def;
        this._heroSpine._owner.attacked.att     = att;

        if(cbAttackedComplete)
            this._heroSpine._owner.cbAttackedComplete = cbAttackedComplete;    
        else
            this._heroSpine._owner.cbAttackedComplete = function(){
                //this._state = HERO_STATE_DEF_END;
            }.bind(this);            
            

        if(cbAttacked)
            //this._heroSpine._owner.cbAttacked = cbAttacked;
            this._heroSpine._owner.cbAttacked = function(){
                this.hurt(attHero, att, def); 
                cbAttacked();                
            }.bind(this);
        else 
            this._heroSpine._owner.cbAttacked = this.hurt.bind(this); 
    }, 
    //普通单次受击接口，一个攻击回合有且只能调用一次，有倒地的受击回合技能不用调用此接口，不然复活会有问题 ?????   
    //小技能目前是一次受击，故可以调用此接口，但如果有一个回合多次受击，或者是有倒地，则不能用此接口，应该用skillAttacked 
    commAttacked:function(attHero, att, def, roundEndCallback){

        var self = this;
          cc.log("hero show commAttacked ");
        //倒地完成
        var fallenCompleteCallback = function(){     
            cc.log("hero show commAttacked444444 ", def.isChongShengFallenAndAttackCompleteOk);                               
            if(def.cbChongShengFallenAndAttackComplete)
                def.cbChongShengFallenAndAttackComplete();
        }

        //受击
        var attackedCallback = function(){ 
            //self.setState(HERO_STATE_DEF_END);
            if(def.effect == HERO_DEF_SPE_EFFECT_CHONGSHENG)
                self.fallenGetUp(attHero, att, def, fallenCompleteCallback, null);                                           
        }

        //受击完成
        var attackedCompleteCallback = function(){
            cc.log("hero show commAttacked222 ", def.isChongShengFallenAndAttackCompleteOk);            
            //self.setState(HERO_STATE_DEF_END);
        }       

        this.attacked(attHero, att, def, attackedCallback, attackedCompleteCallback);
    }, 

    //  //技能造成的分段连续受击及伤害
    //用于技能的一次攻击，连续多次伤害分段显示调用,这种是不处理死亡，由外面的处理,因为进来这里之前，就是倒地状态
    continueAttacked:function(attHero, att, def, playAttackedAni, cbAttacked, cbAttackedComplete){
        //?????大招也会有攻击特效
        var self = this;
        this.attackEffect(self, att, def);
        this.attackedEffect(attHero, att, def);   
     
        //在这种暂停spine动画的情况下受击，且是技能的连续多次伤害，不应再播放受击动画 ?????
        if(!this._heroSpine.isPauseAnimation() && playAttackedAni)
            this._heroSpine.setAttackedAnimation(false);

        //不需要在帧事件里计算伤害,  
        var def_  = {};
        fb.extend(def_, def, true); //一定要这样，不能直接引用?????
        def_.dead = false; //这种是不处理死亡，由外面的处理,故永远false  ??????     
        this.hurt(attHero, att, def_);
        if(cbAttackedComplete)
            this._heroSpine._owner.cbAttackedComplete = cbAttackedComplete;         
    }, 

    smallSkill:function(defHero, att, def, cbAttacking, cbSmallSkillComplete){
        //小技能的攻击与普攻一样，必会有受击，所以都放到普通受击处理攻击特效 ?????
        //byfable 10/20 减速
        // var pScheduler = cc.director.getScheduler();
        // pScheduler.setTimeScale(0.2);
        this._heroSpine.setSmallSkillAnimation(false);   
        if(cbSmallSkillComplete)
            this._heroSpine._owner.cbSmallSkillComplete = cbSmallSkillComplete;

        if(cbAttacking)
            this._heroSpine._owner.cbAttacking          = cbAttacking;
    },

    bigSkill:function(defHeroAry, att, defAry, cbAttacking, cbBigSkillComplete){
        this._heroSpine.setBigSkillAnimation(false);        
        if(cbBigSkillComplete)
            this._heroSpine._owner.cbBigSkillComplete = cbBigSkillComplete;

        if(cbAttacking)
            this._heroSpine._owner.cbAttacking        = cbAttacking;   
    },

    //倒地起身情况下，有三种，一是倒地，暂停动画，死亡，不会有起身，二是倒地，暂停动画，等待复活，起身， 三是倒地，暂停动画，等待正常起身逻辑
    fallenGetUp:function(attHero, att, def, cbFallenComplete, cbGepUpComplete){
        //在倒地状态下的死亡，由具体的大招bigSkillEventCallback 处理，这里不需要 ??????

        this._heroSpine.setFallenGetUpIdleAnimation(false);
        //第一种情况， 彻底死亡，不会有复活.
        if(def.dead){        //假如是大招直接K.O.对手，则受击立马ok, 动画定格，由这里处理死亡动作及回调，????? 需要测试           
            att.isDeadFallenAndSkillCompleteOk = true;   //????为了全体攻击情况所加的处理         
            def.isDeadFallenAndSkillCompleteOk = 0;            
            def.cbDeadFallenAndSkillComplete = function(){
                def.isDeadFallenAndSkillCompleteOk += 1;                
                if(def.isDeadFallenAndSkillCompleteOk == 2){
                    //this._state = HERO_STATE_DEF_END;
                    this.deadFinish();//技能造成倒地，要自己处理死亡, ?????因为是处于倒地状态，所以不需要再放倒地动画,也不需要resumeAnimation                    
                    
                    if(!att.isChongShengFallenAndAttackCompleteOk)//????为了全体攻击情况所加的处理,第三种情况，优先回调，然后第二种，然后第一种
                        att.roundEnd();   

                    def.cbDeadFallenAndSkillComplete   = null; 
                    def.isDeadFallenAndSkillCompleteOk = 0;                       
                }
            }.bind(this);  
        } 
        //第二种情况
        else if(def.effect == HERO_DEF_SPE_EFFECT_CHONGSHENG){  //如果是重生，则现在不能起身，在round end里面处理起身重生动画起身
            //this._state = HERO_STATE_DEF_END;
            att.isChongShengFallenAndAttackCompleteOk = true; //????为了全体攻击情况所加的处理 
            def.isChongShengFallenAndAttackCompleteOk = 0;             
            def.cbChongShengFallenAndAttackComplete = function(){
                def.isChongShengFallenAndAttackCompleteOk += 1;
                if(def.isChongShengFallenAndAttackCompleteOk == 2){

                    if(!att.isFallenAndSkillCompleteOk)//????为了全体攻击情况所加的处理,第三种情况，优先回调，然后第二种，然后第一种
                        att.roundEnd(); 

                    def.cbChongShengFallenAndAttackComplete   = null;
                    def.isChongShengFallenAndAttackCompleteOk = 0;
                }
            }.bind(this);
        }
        //第三种情况
        else {

            att.isFallenAndSkillCompleteOk = true;//????为了全体攻击情况所加的处理 
            def.isFallenAndSkillCompleteOk = 0;
            def.cbFallenAndSkillComplete = function(){
                def.isFallenAndSkillCompleteOk += 1;
                if(def.isFallenAndSkillCompleteOk == 2){ //只有当技能攻击完成且倒地动画播放完成
                    this._heroSpine.resumeAnimation();
                    def.cbFallenAndSkillComplete   = null;
                    def.isFallenAndSkillCompleteOk = 0;
                }
            }.bind(this);
        }

        if(cbFallenComplete)
            //this._heroSpine._owner.cbFallenComplete = cbFallenComplete;  
            this._heroSpine._owner.cbFallenComplete = function(){
                this._heroSpine.pauseAnimation();
                if(def.dead){
                    if(def.cbDeadFallenAndSkillComplete)
                        def.cbDeadFallenAndSkillComplete();
                }
                else if(def.effect == HERO_DEF_SPE_EFFECT_CHONGSHENG){
                    if(def.cbChongShengFallenAndAttackComplete)
                        def.cbChongShengFallenAndAttackComplete();       
                }
                else{
                    if(def.cbFallenAndSkillComplete)
                        def.cbFallenAndSkillComplete();
                }

                cbFallenComplete();
            }.bind(this); 
        else
            this._heroSpine._owner.cbFallenComplete = function(){
                this._heroSpine.pauseAnimation();
                if(def.dead){
                    if(def.cbDeadFallenAndSkillComplete)
                        def.cbDeadFallenAndSkillComplete();
                }
                else if(def.effect == HERO_DEF_SPE_EFFECT_CHONGSHENG){
                    if(def.cbChongShengFallenAndAttackComplete)
                        def.cbChongShengFallenAndAttackComplete();       
                }
                else{
                    if(def.cbFallenAndSkillComplete)
                        def.cbFallenAndSkillComplete();
                }

            }.bind(this); 

        if(cbGepUpComplete)
            //this._heroSpine._owner.cbGepUpComplete  = cbGepUpComplete;
            this._heroSpine._owner.cbGepUpComplete = function(){
                //this._state = HERO_STATE_DEF_END;
                cbGepUpComplete();
            }.bind(this);
        else 
            this._heroSpine._owner.cbGepUpComplete = function(){
                //this._state = HERO_STATE_DEF_END;                
            }.bind(this);
    },

    attackEffect:function(defHero, att, def){
        //攻击特效处理
        if (att.effect == HERO_ATT_SPE_EFFECT_BAOJI) {
            defHero.buffEffect("baoji");
        } 
        else if (att.effect == HERO_ATT_SPE_EFFECT_LIANJI) {
            defHero.buffEffect("lianji");           
        } 
        // else if (att.effect == HERO_ATT_SPE_EFFECT_JIASHEN) {
        // } 
        else if (att.effect == HERO_ATT_SPE_EFFECT_SHENGJIAN) {
            defHero.buffEffect("shengjian");                    
        }         
        else if (att.effect == HERO_ATT_SPE_EFFECT_ZHONGJI) {
            defHero.buffEffect("zhongji");               
        }    
    },

    attackedEffect:function(attHero, att, def){
        //攻击特效处理
        if (att.effect == HERO_DEF_SPE_EFFECT_MISS) {
            this.buffEffect("miss");
        } 
        else if (att.effect == HERO_DEF_SPE_EFFECT_GEDANG) {
            this.buffEffect("gedang");           
        } 
        // else if (att.effect == HERO_DEF_SPE_EFFECT_JIANREN) {
        // } 
        // else if (att.effect == HERO_DEF_SPE_EFFECT_HUIXUE) {  round end 处理                   
        // }         
        // else if (att.effect == HERO_DEF_SPE_EFFECT_CHONGSHENG) {  round end 处理                         
        // }    
    },

    //def.blood < 0 正伤害， def.blood > 0 加血
    hurt:function(attHero, att, def){

        if (def.dead) {          
            this.dead(this.deadFinish.bind(this));
        }

        if(att.type == BATTLE_ATT_TYPE_ADDHP || def.drop > 0) //加血
            this.buffEffect("addblood", def.drop);
        else
            this.buffEffect("subblood", def.drop);            

        this.updateBlood(def);
    },

    updateBlood:function(def){

        this._curLife = def.blood;
        if(this._curLife >= this._maxLife)
            this._curLife = this._maxLife;
        else if(this._curLife <= 0)
            this._curLife = 0;

        //cc.log("hero show  curlife _maxLife", this._curLife, this._maxLife);
        this._heroBlood.updateBlood(this._curLife / this._maxLife * 100);
    },

    //攻击方的一些round end buffer特效
    buffer:function(att){
        var isBuffer = false;
        if (att.effect == HERO_BUFF_EFFECT_ADDATT) {
            this.buffEffect("addattack", att.value);
            isBuffer = true;
        } 
        else if (att.effect == HERO_BUFF_EFFECT_ADDARMOR) {
            this.buffEffect("addarmor", att.value);
            isBuffer = true;            
        }

        return isBuffer;
    },

    //防守方round end 回血，重生
    debuffer:function(def, param){

        param.chongsheng = false;
        //回血
        if (def.effect == HERO_DEF_SPE_EFFECT_HUIXUE) {

            var def_ = {};
            fb.extend(def_, def, true);
            def_.blood = def.value + this._curLife;//????需要自己更新

            this.buffEffect("addblood", def.value);
            this.updateBlood(def_); 

            if(param.cbDebufferComplete){
                param.cbDebufferComplete();
                param.cbDebufferComplete = null;
            }              
        }
        //重生
        else if (def.effect == HERO_DEF_SPE_EFFECT_CHONGSHENG) {

            param.chongsheng = true;
            if(this._heroSpine.isPauseAnimation())
                this._heroSpine.resumeAnimation();

            cc.log("hero show debuffer, chongsheng0000");
            this._heroSpine._owner.cbGepUpComplete = function(){
                //this._state = HERO_STATE_DEF_END;
                //重置血量
                var def_ = {};
                fb.extend(def_, def, true);
                def_.blood = def.value;
                //?????,以重生后的总血量为准
                //this._maxLife = def_.blood;

                cc.log("hero show debuffer, chongsheng", def_.blood);
                this.buffEffect("addblood",   def_.blood);
                this.buffEffect("chongsheng", def_.blood);
                this.updateBlood(def_);   

                if(param.cbDebufferComplete){
                    param.cbDebufferComplete();
                    param.cbDebufferComplete = null;
                }
            }.bind(this);
        }
        else {
            if(param.cbDebufferComplete){
                param.cbDebufferComplete();
                param.cbDebufferComplete = null;
            }                  
        }  
    },

    win:function(cbWinComplete){
        this._heroSpine.setWinAnimation(false);

        if(cbWinComplete)
            this._heroSpine._owner.cbWinComplete = cbWinComplete;   
    },

    dead:function(cbFallenComplete){
        //this._heroBlood.setVisible(false);
        this._heroSpine.setDeadAnimation(false);

        if(cbFallenComplete)
            this._heroSpine._owner.cbFallenComplete = cbFallenComplete;   
    },

    deadFinish:function(){
        this._heroBlood.setVisible(false);    
        this._state = HERO_STATE_DEAD;          
        // this.runAction(cc.sequence(cc.blink(0.6, 3), cc.callFunc(function(){
        //     this.setVisible(false);
        // }, this)));


        ////////////////////test////////////////////////
        this._heroSpine.getSpine().setCascadeOpacityEnabled(true);
        var x = -500;   
        if(this._isLeft)
            x = 300;

        this._heroSpine.getSpine().runAction(cc.sequence(cc.blink(0.6, 3)
        ,cc.callFunc(function(){
            this._heroSpine.setSpineBlendFunc({src:cc.SRC_ALPHA, dst:cc.ONE});
        }, this)
        ,cc.spawn(
              cc.fadeTo(1, 50)
            , cc.scaleTo(1, 4).easing(cc.easeExponentialOut())
            , cc.moveBy(1, cc.p(x, 300)).easing(cc.easeExponentialIn())
            )
        ,cc.callFunc(function(){
            this.setVisible(false);
        }, this)
        )); 

    },

    buffEffect:function(status, num){
        if(this._heroEffect)
            this._heroEffect.buffEffect(this, status, num);
    }
});


