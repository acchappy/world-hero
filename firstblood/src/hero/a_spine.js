/**
 * Created by fable on 15/11/13.
 * @Author fable
 * @desc   ASpine, 统一的spine动画管理类，不只是人物spine
 *
 *
 *
 *    spine.setAnimation(0, 'idle', true);
    spine.addAnimation(0, 'run', true);
    spine.setAnimation(0, 'idle', true);
    这样连着用会挂，全用setAnimation()就不会有问题

    trackindex 一定要一样，可是0, 不然如果有一个loop动作，那么会有像剑圣一样，状态混乱的问题

        spineBoy1.setAnimation(0, 'win',   true);
        spineBoy1.addAnimation(0, "skill2",   false, 3);
        spineBoy1.addAnimation(0, "attack",   true, 2);
        spineBoy1.setAnimation(1, "unattack", true);
        spineBoy1.addAnimation(1, "attack",   true);
        spineBoy1.addAnimation(1, "skill",    false, 3);

        !!!!!track 0, 1动作序列会同时同步开始播放，如果最后一个动作是loop动作，会一直播放最后一个动作，如果不是则会删除这个track
 
        spineBoy1.setAnimation(0, "skill2",   false);
        var fps = cc.director.getAnimationInterval(); 
        fps = fps*spineBoy1.getTimeScale();  
        spineBoy1.update(fps*8);   //可以开始就跳到第8帧播放   

 * 
**/

var HERO_SPINE_ANI_IDLE         = "idle";
var HERO_SPINE_ANI_ATTACK       = "attack";
var HERO_SPINE_ANI_ATTACKED     = "unattack";
var HERO_SPINE_ANI_SMALLSKILL   = "skill1";
var HERO_SPINE_ANI_BIGSKILL     = "skill2";
var HERO_SPINE_ANI_FALLEN       = "fallen";
var HERO_SPINE_ANI_GETUP        = "get_up";
var HERO_SPINE_ANI_WIN          = "win";

var HERO_SPINE_ANI_FAR_BULLET   = "T_attack_1";  //远程子弹
var HERO_SPINE_ANI_FAR_HIT      = "T_attack_2";  //远程命中

var HERO_SPINE_EVENT_ATTACK     = "fb_attack_event";
var HERO_SPINE_EVENT_ATTACKED   = "fb_unattack_event";
var HERO_SPINE_EVENT_SMALLSKILL = "fb_skill1_event";
var HERO_SPINE_EVENT_BIGSKILL   = "fb_skill2_event";

// var HERO_SPINE_EVENT_VALUE_COMP = "complete";
// var HERO_SPINE_EVENT_VALUE_ATT  = "attack";

var HERO_SPINE_TRACK_INDEX      = 0;

var ASpine = cc.Node.extend({//????? spine 加入到此节点，是因为当spine动画pause,此节点作为他的父节点的动作moveBy等不会pause

	_isPause            : false,
	_isLeft             : false,
	_spine              : null,
	_boundingBox        : null,

    _blendFunc          : null,
	_owner              : {},

	ctor:function(spineName, scale, isLeft){
		this._super();

		this._isPause            = false;
		this._owner              = {},
		this._isLeft             = isLeft;
        this._blendFuncDefault   = {src:cc.ONE, dst:cc.ONE_MINUS_SRC_ALPHA};//default
        this._blendFunc          = this._blendFuncDefault;
        this._boundingBox        = null;

        cc.log("HeroSpine, sp.SkeletonAnimation 11111", spineName, new Date().getTime()); 
        this._spine  = new sp.SkeletonAnimation(res.hero_spine_path+spineName+"/"+spineName+".json", res.hero_spine_path+spineName+"/"+spineName+".atlas");
        cc.log("HeroSpine, sp.SkeletonAnimation 22222", spineName, new Date().getTime()); 
        //cc.log("HeroSpine, sp.SkeletonAnimation 33333", this._spine.getSkeleton().data); 
        cc.assert(this._spine != null, "HeroSpine ctor fail");

        // cc.ONE = 1;
        // cc.ZERO = 0;
        // cc.SRC_ALPHA = 0x0302;
        // cc.SRC_ALPHA_SATURATE = 0x308;
        // cc.SRC_COLOR = 0x300;
        // cc.DST_ALPHA = 0x304;
        // cc.DST_COLOR = 0x306;
        // cc.ONE_MINUS_SRC_ALPHA = 0x0303;
        // cc.ONE_MINUS_SRC_COLOR = 0x301;
        // cc.ONE_MINUS_DST_ALPHA = 0x305;
        // cc.ONE_MINUS_DST_COLOR = 0x0307;
        // cc.ONE_MINUS_CONSTANT_ALPHA = 0x8004;
        // cc.ONE_MINUS_CONSTANT_COLOR = 0x8002;

        //test
        //this._spine.setBlendFunc({src:cc.ONE_MINUS_CONSTANT_COLOR, dst:cc.ONE});
        //this._spine.setBlendFunc({src:cc.SRC_ALPHA, dst:cc.ONE_MINUS_SRC_ALPHA});
        //this._spine.setBlendFunc({src:cc.SRC_ALPHA, dst:cc.ONE});
        //this._spine.setBlendFunc(this._blendFuncDefault); //default
        //this.setSpineBlendFuncDefault();

        //this._spine.setColor(cc.color.GREEN);

        //????? spine shader 会生效
        //Shader.grayScale(this._spine);
        //Shader.outline(this._spine);
        //Shader.blur(this._spine, {x:1, y:1}, {x:0.1, y:0.8, z:0.1, w:0});
        //Shader.blur_ex(this._spine, 0.4, 7, {x:100, y:100});

        this.addChild(this._spine);
        if (this._isLeft) {
        	this._spine.setScaleX(-scale.x);        	
        } else {
        	this._spine.setScaleX(scale.x);             	
        }
        this._spine.setScaleY(scale.y);

        //要调用一次update,不然getBoundingBox()得不到值
        // this._spine.update(0);
        // this._boundingBox = this._spine.getBoundingBox();
        // 

		this._spine.setEventListener(this.spineEventCallback.bind(this));
		this._spine.setCompleteListener(this.spineCompleteCallback.bind(this));   
	},
    setEventListener:function(cb){
        this._spine.setEventListener(cb);
    },

    setCompleteListener:function(cb){
        this._spine.setCompleteListener(cb);
    },

    setSpineBlendFunc:function(blend){
        this._blendFunc = blend;
        this._spine.setBlendFunc(blend);
    },

    getSpineBlendFunc:function(){
        return this._blendFunc;
    },

    setSpineBlendFuncDefault:function(){
        this.setSpineBlendFunc(this._blendFuncDefault);
    },

	pauseAnimation:function(){
		this._isPause = true;
		this._spine.pause();
	},

	resumeAnimation:function(){
		this._isPause = false;
		this._spine.resume();
	},

	isPauseAnimation:function(){
		return this._isPause;
	},

	setSpineTimeScale:function(scale){
		this._spine.setTimeScale(scale);
	},

	getSpineTimeScale:function(){
		return this._spine.getTimeScale();
	},

	getSpine:function(){
		return this._spine;
	},

	getBoundingBox:function(){
        //要调用一次update,不然getBoundingBox()得不到值		
        if(this._boundingBox == null){
            this._spine.update(0);      
            this._boundingBox = this._spine.getBoundingBox();               
        }
		return this._boundingBox;
	},

	getFps:function(){
        var fps = cc.director.getAnimationInterval(); 
        fps     = fps*this._spine.getTimeScale(); 

		return fps;
	},

    //设置其他颜色，一会还原
    setColorSoon:function(clr, delayTime){
        var srcclr = this._spine.getColor();
        this._spine.setColor(clr);
        this._spine.runAction(cc.sequence(cc.delayTime(delayTime), cc.callFunc(function(sender){
            sender.setColor(srcclr);
        }.bind(this), this)));
    },

	//从第f帧开始播放，要在setAnimation，addAnimation后调用才会有作用 ??????
	startPlayFromFrame:function(f){
        var fps = cc.director.getAnimationInterval(); 
        fps = fps*this._spine.getTimeScale();  
        this._spine.update(fps*f);   //可以开始就跳到第f帧播放 
	},

    setAnimation:function(name, loop, cbComplete){
        if(cbComplete)
            this._owner[name] = cbComplete;

        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, name, loop);        
    },

	setIdleAnimation:function(loop){
        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_IDLE, loop);		
	},

	setDeadAnimation:function(loop){
        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_FALLEN, loop); 		
	},

    setWinAnimation:function(loop){
        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_WIN, loop);  
        this._spine.addAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_IDLE, true);                
    },

    setFarBulletAnimation:function(name, loop){
        if(name == null)
            name = HERO_SPINE_ANI_FAR_BULLET;            

        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, name, loop);    
    },

    setFarHitAnimation:function(name, loop, cbFarHitComplete){
        if(name == null)
            name = HERO_SPINE_ANI_FAR_HIT;            

        if(cbFarHitComplete)
            this._owner[name] = cbFarHitComplete;

        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, name, loop); 
    },

	setAttackAnimation:function(loop){
        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_ATTACK, loop);
        this._spine.addAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_IDLE, true);  		
	},

	setAttackedAnimation:function(loop){
        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_ATTACKED, loop);
        this._spine.addAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_IDLE, true); 		
	},

	setSmallSkillAnimation:function(loop){
        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_SMALLSKILL, loop);
        this._spine.addAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_IDLE, true);     		
	},

	setBigSkillAnimation:function(loop){
        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_BIGSKILL, loop);
        this._spine.addAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_IDLE, true);     		
	},

	setFallenGetUpIdleAnimation:function(loop){
        this._spine.setAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_FALLEN, false); 		
        this._spine.addAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_GETUP, false);  
        this._spine.addAnimation(HERO_SPINE_TRACK_INDEX, HERO_SPINE_ANI_IDLE, true);    		
	},

    spineCompleteCallback:function(traceIndex, loopCount){
        //var state = this.spine.getState();
        //cc.log("hero show spineCompleteCallback state", state);        
        var entry = this._spine.getCurrent();
        if(entry){
            var animationName = entry.animation ? entry.animation.name : "";
            //cc.log("hero show spineCompleteCallback %d start: %s", traceIndex, animationName);
            if(animationName == HERO_SPINE_ANI_ATTACK)
            {
                if(this._owner.cbAttackComplete){
                    var doNotSetNullOutSide = this._owner.cbAttackComplete(this); //????, 两次调用才完成的，需要返回这个参数
                    if(doNotSetNullOutSide == false || doNotSetNullOutSide == null)                    
                        this._owner.cbAttackComplete = null;                     
                }
            } else if(animationName == HERO_SPINE_ANI_ATTACKED){
                if(this._owner.cbAttackedComplete){
                    this._owner.cbAttackedComplete(this);
                    this._owner.cbAttackedComplete = null;
                }                
            } else if(animationName == HERO_SPINE_ANI_SMALLSKILL){
                if(this._owner.cbSmallSkillComplete){
                    this._owner.cbSmallSkillComplete(this);
                    this._owner.cbSmallSkillComplete = null;
                }
            } else if(animationName == HERO_SPINE_ANI_BIGSKILL){
                if(this._owner.cbBigSkillComplete){
                    this._owner.cbBigSkillComplete(this);  
                    this._owner.cbBigSkillComplete = null;  
                }
            } else if(animationName == HERO_SPINE_ANI_GETUP){
                    cc.log("hero spine, this._owner.cbGepUpComplete0000000");                
                if(this._owner.cbGepUpComplete){
                    cc.log("hero spine, this._owner.cbGepUpComplete");
                    this._owner.cbGepUpComplete(this);  
                    this._owner.cbGepUpComplete = null;  
                }
            } 
            else if(animationName == HERO_SPINE_ANI_FALLEN){
                if(this._owner.cbFallenComplete){
                    this._owner.cbFallenComplete(this);  
                    this._owner.cbFallenComplete = null;  
                }
            } 
            else if(animationName == HERO_SPINE_ANI_WIN){
                if(this._owner.cbWinComplete){
                    this._owner.cbWinComplete(this);  
                    this._owner.cbWinComplete = null;  
                }
            }             
           // else if(animationName == HERO_SPINE_ANI_FAR_HIT){ //远程攻击受击特效完成
           //      cc.log("hero spine, HERO_SPINE_ANI_FAR_HIT0000000"); 
           //      if(this._owner.cbFarHitComplete){
           //          this._owner.cbFarHitComplete();
           //          this._owner.cbFarHitComplete = null;
           //      }        
           //  }
            else {
                if(this._owner[animationName]){
                    cc.log("herospine  completeeeeeeeeeeeeeee,    ", animationName);
                    var doNotSetNullOutSide = this._owner[animationName](this);
                    if(doNotSetNullOutSide == false || doNotSetNullOutSide == null){
                        cc.log("herospine  completeeeeeeeeeeeeeee,   set null ");
                        this._owner[animationName] = null;   
                    }                                       
                }
            }                         
        }        
    },

    spineEventCallback:function(traceIndex, event){
        //cc.log( traceIndex + " event: %s, %d, %f, %s",event.data.name, event.intValue, event.floatValue, event.stringValue);
        if (event.data.name == HERO_SPINE_EVENT_ATTACK) { //"fb_attack_event"
            if(this._owner.cbAttacking){

                this._owner.cbAttacking();                
                this._owner.cbAttacking = null;                
            }
        } else if(event.data.name == HERO_SPINE_EVENT_ATTACKED) { //"fb_unattack_event"
            if(this._owner.cbAttacked)
            {
                var param = this._owner.attacked;
                this._owner.cbAttacked(param.attHero, param.att, param.def);                
                this._owner.cbAttacked = null;
            }
        } else if(event.data.name == HERO_SPINE_EVENT_SMALLSKILL){//"fb_skill1_event"
            if(this.getConfig().small_skill_spec)                
                this.smallSkillEventCallback(traceIndex, event);
        } else if(event.data.name == HERO_SPINE_EVENT_BIGSKILL){ ////"fb_skill2_event"
            if(this.getConfig().big_skill_spec)
                this.bigSkillEventCallback(traceIndex, event);
        }
    },

    //子类提供这两个方法实现
    // smallSkillEventCallback:function(){},
    // bigSkillEventCallback:function(){},   
});



