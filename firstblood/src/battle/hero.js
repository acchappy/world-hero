
/**
 * Created by fable on 15/08/20.
 * @Author fable
 * @desc   ...
 */
var fb = fb || {};
fb.HERO_STATE_INIT = 0;
fb.HERO_STATE_DEAD = 1;

/*
    spine.setAnimation(0, 'idle', true);
    spine.addAnimation(0, 'run', true);
    spine.setAnimation(0, 'idle', true);
    这样连着用会挂，全用setAnimation()就不会有问题


 */

var HERO_ORDER_SPINE    = 100;
var HERO_ORDER_BLOOD    = 101;
var HERO_ORDER_HURT_NUM = 102;


var Hero = cc.Node.extend({
	//Hurt : [],
	//Buff : [],
    _maxLife : 1000,
    _curLife : 0,
	_isEnemy : false,
	_scale : cc.p(0, 0),
	_spine : null,
	_index : 0,

	_state : fb.HERO_STATE_INIT,

	_pos   : cc.p(0, 0),


    _haveAttacked : false,

    _attackCompleteCallback : null,

    _blood : null,
//  var attr = {name:"xx", pos:xx, isEnemy:false, scale:cc.p(0,0), index:0}
	ctor:function(attr){
		this._super();

        this._curLife = this._maxLife = attr.initLife;//Math.random()*(1000-200)+200;
		this._isEnemy = attr.isEnemy;
		this._scale = cc.p(attr.scale.x, attr.scale.y);
		this._index = attr.index;
		this._pos   = attr.pos;

        // if (this._isEnemy) {
        //     this._curLife = this._maxLife = Math.random()*(1000-200)+12000;
        // }

		if (this._isEnemy) {this._scale.x = -this._scale.x;};
		cc.log("xxxxxx", res.battle_spine_path+attr.name+".json", this._pos.x, this._pos.y, this._curLife, typeof(this._curLife));
        var spine = new sp.SkeletonAnimation(res.battle_spine_path+attr.name+".json", res.battle_spine_path+attr.name+".atlas");
        this.setPosition(this._pos);
        spine.setScaleX(this._scale.x);
        spine.setScaleY(this._scale.y);
        this.addChild(spine, HERO_ORDER_SPINE);
        spine.setAnimation(0, 'idle', true);

        this._spine = spine;
        this._spine.setCompleteListener(this.attackComplete.bind(this));

        //add blood;
        //要调用一次update,不然getBoundingBox()得不到值
        this._spine.update(0);
        var blood_bg = new cc.Sprite(res.battle_bloodred_png);
        this.addChild(blood_bg, HERO_ORDER_BLOOD);
        blood_bg.setPosition(cc.p(0, this._spine.getBoundingBox().height));

        cc.log("hero ctor sx, sy, sw, sh", this._spine.getBoundingBox().x, this._spine.getBoundingBox().y, this._spine.getBoundingBox().width, this._spine.getBoundingBox().height);
        //cc.log("hero ctor spcontenesize", this._spine.getContentSize().width, this._spine.getContentSize().height);
        //
        //var to = cc.progressFromTo(6, 0, 100);
        var blood = new cc.ProgressTimer(new cc.Sprite(res.battle_bloodgray_png));
        blood.setType(cc.ProgressTimer.TYPE_BAR);
        //    Setup for a bar starting from the bottom since the midpoint is 0 for the y
        blood.setMidpoint(cc.p(1, 0));
        //    Setup for a vertical bar since the bar change rate is 0 for x meaning no horizontal change
        blood.setBarChangeRate(cc.p(1, 0));

        blood.setPosition(cc.p(0, 0));
        blood.setAnchorPoint(cc.p(0, 0));
        blood_bg.addChild(blood);
        // blood.x = 0;
        // blood.y = this._spine.getBoundingBox().height;
        blood.setPercentage(0);
        //blood.runAction(to.clone().repeatForever());        
        this._blood = blood;


        if(fb.BATTLE_DEBUG)
        {
            //testtttttttttttttt
            var draw_node = new cc.DrawNode();
            //this.addChild(draw_node, 22, 100000);   
            this.addChild(draw_node, 22, 100000);   
            draw_node.clear();
            var start = cc.p(this._spine.getBoundingBox().x, this._spine.getBoundingBox().y);
            var end = cc.p(this._spine.getBoundingBox().x+this._spine.getBoundingBox().width, this._spine.getBoundingBox().y+this._spine.getBoundingBox().height);
            draw_node.drawRect(start, end, cc.color(0, 255, 0, 255));      
        }

        return true;
	},

	onEnter:function(){
	    this._super();

       //cc.log("hero ctor sx, sy, sw, sh", this._spine.getBoundingBox().x, this._spine.getBoundingBox().y, this._spine.getBoundingBox().width, this._spine.getBoundingBox().height);
       this.scheduleUpdate();
	},

    update:function(dt){

        if(fb.BATTLE_DEBUG)
        {
            if (this.getChildByTag(100000)) {

                var draw_node = this.getChildByTag(100000);
                draw_node.clear();
                var start = cc.p(this._spine.getBoundingBox().x, this._spine.getBoundingBox().y);
                var end = cc.p(this._spine.getBoundingBox().x+this._spine.getBoundingBox().width, this._spine.getBoundingBox().y+this._spine.getBoundingBox().height);
                draw_node.drawRect(start, end, cc.color(0, 255, 0, 255));
               
            }           
        }

        //为了让血条跟随英雄的跳跃，始终显示在英雄头顶上
        this._blood.getParent().setPosition(cc.p(0, this._spine.getBoundingBox().y+this._spine.getBoundingBox().height));

    },

	getState:function(){
		return this._state;
	},

	getIndex:function(){
		return this._index;
	},

    getHaveAttacked:function(){
        return this._haveAttacked;
    },   

    setHaveAttacked:function(haveAttacked){
        return this._haveAttacked = haveAttacked;
    },   

	runToEnemy:function(enemy, cb){

        var distance = 500;
        var heroSpeed = 1000;
        var dur = distance / heroSpeed;

        //var size = cc.director.getWinSize();
        var epos = enemy.getPosition();
        if (enemy._isEnemy) {
            epos.x -= 80;
        } else {
            epos.x += 80;
        }

		cc.log("hero.js runToEnemy enemy x, y", epos.x, epos.y);
        //var move1 = cc.moveTo(0.001, cc.p(epos.x/2, epos.y/2));
        var move2 = cc.moveTo(dur, cc.p(epos.x, epos.y));

        this._spine.setMix('idle', 'run', 0.1);
        this._spine.setAnimation(0, 'run', true);
        //var move_ease_out1 = move1.clone().easing(cc.easeExponentialInOut());  
        var move_ease_out2 = move2.clone().easing(cc.easeExponentialInOut());  
        this.runAction(cc.sequence(move_ease_out2, cc.callFunc(function(){
	        this._spine.setMix('run', 'idle', 0.1);
            cc.log("hero runToEnemy 1111111111");           
	        this._spine.setAnimation(0, 'idle', true);        	
        }, this), cc.delayTime(0.1),cc.callFunc(function(){
        	if (cb) {cb();}
        }, this)
        ));		
	},

    attack:function(attacked, cbAttacking, cbAttackComplete){
        cc.log("hero attack 1111111111");
        this._spine.setAnimation(1, 'jump', false);
        //这里应该用帧事件传递，而不是延时，会不准
        this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(function(){
            if(cbAttacking) cbAttacking();
        }, this)));

        this._attackCompleteCallback = cbAttackComplete;
    },

    attacked:function(attack, hurt){
        //受击特效
        
        var r = -45;
        if (this._isEnemy)  
            r = -r;

        this._spine.runAction(cc.sequence(cc.rotateTo(0.5, r), cc.rotateTo(0.6, 0), cc.callFunc(function(){
            this.hurt(hurt);
        }, this)));

    }, 

    hurt:function(hurt){
        var cur_life = this._curLife;
        this._curLife -= hurt.calcHurt();
        if (this._curLife <= 0) {
            this._state = fb.HERO_STATE_DEAD;
            this.deadEffect();
        }

        var bhurt = parseInt(cur_life - this._curLife);
        var label = new cc.LabelBMFont(bhurt.toString(), res.battle_fnt1_fnt);
        var pos   = this._blood.getParent().getPosition();
        label.setScale(0.1, 0.1);
        label.setPosition(cc.p(pos.x, pos.y+10));
        cc.log("hero hurt1 index zorder", this._index, this.getLocalZOrder());
        this.addChild(label, HERO_ORDER_HURT_NUM);

        var self = this;
        //label.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.3), cc.scaleTo(0.1, 0.1), cc.callFunc(this.hurtCallback, this)));
        label.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
            cc.log("hero hurt4 index zorder",  this.getLocalZOrder());
            sender.removeFromParent();
        }.bind(this), this)));

        this.updateBlood();
    },

    // hurtCallback:function(sender){
    //     cc.log("hero hurt2 index zorder",  sender.getParent().getLocalZOrder());
    //     sender.removeFromParent();
    //     //cc.log("hero hurt3 index zorder",  self.getLocalZOrder());
    // },

    deadEffect:function(){
        this._blood.getParent().setVisible(false);
        this._spine.runAction(cc.sequence(cc.rotateTo(0.5, 90), cc.delayTime(0.8), cc.blink(0.6, 3), cc.callFunc(function(){
            this.setVisible(false);
        }, this)));
    },

    updateBlood:function(){
        this._blood.setPercentage((1-this._curLife/this._maxLife)*100);
    },   

    attackComplete:function(traceIndex, loopCount){
        if(traceIndex == 1){
            this._attackCompleteCallback();
        }
    },

	runBack:function(cb){
        var distance = 500;
        var heroSpeed = 800;
        var dur = distance / heroSpeed;

        //var size = cc.director.getWinSize();
        this._spine.setScaleX(-this._scale.x);
        this._spine.setScaleY(this._scale.y);

        var move = cc.moveTo(dur, this._pos);
        this._spine.setAnimation(0, 'run', true);
        this.runAction(cc.sequence(move, cc.callFunc(function (){
            this._spine.setAnimation(0, 'idle', true);
            this._spine.setScaleX(this._scale.x);
            this._spine.setScaleY(this._scale.y);
        }, this), cc.delayTime(0.1), cc.callFunc(function(){ if(cb) cb();}, this)
        ));
	}
});


