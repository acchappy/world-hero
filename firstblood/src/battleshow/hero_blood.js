/**
 * Created by fable on 15/11/13.
 * @Author fable
 * @desc   英雄的血条管理
 *
**/



var HeroBlood = cc.Node.extend({

    _blood    : null,
    _blood_s  : null,

	ctor:function(){
		this._super();

        this._blood   = null;
        this._blood_s = null;

        this.initUI();
	},

    initUI:function(){
        //add blood;
        var blood_bg = new cc.Sprite(res.battle_bloodgray_png);
        this.addChild(blood_bg);
        blood_bg.setAnchorPoint(cc.p(0.5, 0));

        this._blood   = this.createBlood(blood_bg, res.battle_bloodyellow_png, 2);
        this._blood_s = this.createBlood(blood_bg, res.battle_bloodred_png,    1); //?????, 血量挺拖影
        this._blood_s.setOpacity(200);
    },

    createBlood:function(bg, image, zorder){
        var sprite = new cc.Sprite(image)        
        var blood  = new cc.ProgressTimer(sprite);
        blood.setType(cc.ProgressTimer.TYPE_BAR);
        blood.setMidpoint(cc.p(0, 0));
        blood.setBarChangeRate(cc.p(1, 0));
        blood.setPosition(cc.p(0, 0));
        blood.setAnchorPoint(cc.p(0, 0));
        blood.setPercentage(100);                        
        //blood.setColor(cc.color(0,255,0,255));                  
        bg.addChild(blood, zorder); 

        return blood;            
    },

    updateBlood:function(per){

        //this._blood.setPercentage((1 - per) * 100);
        //this._blood_s.setPercentage((1 - per) * 100);

        //this._blood.setPercentage(per);
        var action   = cc.progressTo(0.1, per);
        this._blood.runAction(action.easing(cc.easeExponentialInOut()));//慢 快 慢

        var action_s = cc.progressTo(0.8, per);
        this._blood_s.runAction(action_s.easing(cc.easeExponentialInOut()));//慢 快 慢
    }

});



