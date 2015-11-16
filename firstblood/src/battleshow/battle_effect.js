

/**
 * Created by fable on 15/11/13.
 * @Author fable
 * @desc   战场相关的特效处理
 *
 * 
**/

var BATTLE_EFFECT_BUFF_ZORDER  = 100;
var BATTLE_EFFECT_BUFF_HEIGHT  = -10;

var BattleEffect = cc.Class.extend({

    _battle_scene  : null,
	ctor:function(){
        this._battle_scene = null;

		return true;
	},

    setBattleScene:function(battleScene){
        this._battle_scene = battleScene;
    },

    //??????
    // shakeScene:function(){

    // },

    buffEffect:function(heroShow, status, num){

        var battleScene = this._battle_scene;
        //var scene_pos   = battleScene.convertToNodeSpace(heroShow.getHeroSpine().convertToWorldSpace(cc.p(0, 0)));
        var scene_pos   = heroShow.getHeroSpine().convertToWorldSpace(cc.p(0, 0));
        scene_pos.y    += (heroShow.getHeroSpine().getBoundingBox().y + heroShow.getHeroSpine().getBoundingBox().height);
        scene_pos.y    += BATTLE_EFFECT_BUFF_HEIGHT;

        if(status == "subblood"){ //掉血
            var bhurt = parseInt(Math.abs(num));            
            var label = new cc.LabelBMFont(bhurt.toString(), res.battle_fnt1_fnt);
            var pos   = scene_pos;
            label.setScale(0.1, 0.1);
            label.setPosition(cc.p(pos.x, pos.y+10));
            battleScene.addChild(label, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            //label.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.3), cc.scaleTo(0.1, 0.1), cc.callFunc(battleScene.hurtCallback, this)));
            label.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                //cc.log("hero hurt4 index zorder",  battleScene.getLocalZOrder());
                sender.removeFromParent();
            }.bind(this), this)));
        }
        else if(status == "addblood"){ //加血//加血 ????与加血buffer一样的特效，到时要加,现在简单处理
            var bhurt = parseInt(Math.abs(num));     
            var label = new cc.LabelBMFont(bhurt.toString(), res.battle_fnt1_fnt);
            label.setColor(cc.color.GREEN);

            var pos   = scene_pos;
            label.setScale(0.1, 0.1);
            label.setPosition(cc.p(pos.x, pos.y+10));
            //cc.log("hero hurt1 index zorder", battleScene._seat, battleScene.getLocalZOrder());
            battleScene.addChild(label, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            //label.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.3), cc.scaleTo(0.1, 0.1), cc.callFunc(battleScene.hurtCallback, this)));
            label.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                //cc.log("hero hurt4 index zorder",  battleScene.getLocalZOrder());
                sender.removeFromParent();
            }.bind(this), this)));
        }
        else if(status == "addattack"){ //加攻击力 ????与加血buffer一样的特效，到时要加,现在简单处理
            var bhurt = parseInt(Math.abs(num));     
            var label = new cc.LabelBMFont(bhurt.toString(), res.battle_fnt1_fnt);
            label.setColor(cc.color.WHITE);

            var pos   = scene_pos;
            label.setScale(0.1, 0.1);
            label.setPosition(cc.p(pos.x, pos.y+10));
            //cc.log("hero hurt1 index zorder", battleScene._seat, battleScene.getLocalZOrder());
            battleScene.addChild(label, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            //label.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.3), cc.scaleTo(0.1, 0.1), cc.callFunc(battleScene.hurtCallback, this)));
            label.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                //cc.log("hero hurt4 index zorder",  battleScene.getLocalZOrder());
                sender.removeFromParent();
            }.bind(this), this)));
        }
        else if(status == "addarmor"){ //增加护甲 ????与加血buffer一样的特效，到时要加,现在简单处理
            var bhurt = parseInt(Math.abs(num));     
            var label = new cc.LabelBMFont(bhurt.toString(), res.battle_fnt1_fnt);
            label.setColor(cc.color.RED);

            var pos   = scene_pos;
            label.setScale(0.1, 0.1);
            label.setPosition(cc.p(pos.x, pos.y+10));
            //cc.log("hero hurt1 index zorder", battleScene._seat, battleScene.getLocalZOrder());
            battleScene.addChild(label, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            //label.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.3), cc.scaleTo(0.1, 0.1), cc.callFunc(battleScene.hurtCallback, this)));
            label.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 1), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                //cc.log("hero hurt4 index zorder",  battleScene.getLocalZOrder());
                sender.removeFromParent();
            }.bind(this), this)));
        }
        else if(status == "chongsheng"){ //重生????特效，到时要加,现在简单处理
            var sprite = new cc.Sprite(res.battle_chongsheng_png);
            var pos    = scene_pos;
            sprite.setScale(2);
            sprite.setPosition(cc.p(pos.x, pos.y+60));
            battleScene.addChild(sprite, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            sprite.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 2), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                sender.removeFromParent();
            }.bind(this), this)));        
        }        
        else if(status == "baoji"){ //暴击????特效，到时要加,现在简单处理
            var sprite = new cc.Sprite(res.battle_baoji_png);
            var pos    = scene_pos;
            sprite.setScale(2);
            sprite.setPosition(cc.p(pos.x, pos.y+60));
            battleScene.addChild(sprite, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            sprite.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 2), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                sender.removeFromParent();
            }.bind(this), this)));         

        }
        else if(status == "lianji"){ //连击????特效，到时要加,现在简单处理
            var sprite = new cc.Sprite(res.battle_bisha_png);
            var pos    = scene_pos;
            sprite.setScale(2);
            sprite.setPosition(cc.p(pos.x, pos.y+60));
            battleScene.addChild(sprite, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            sprite.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 2), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                sender.removeFromParent();
            }.bind(this), this)));           

        }
        else if(status == "shengjian"){ //圣剑????特效，到时要加,现在简单处理
            var sprite = new cc.Sprite(res.battle_shengjian_png);
            var pos    = scene_pos;
            sprite.setScale(2);
            sprite.setPosition(cc.p(pos.x, pos.y+60));
            battleScene.addChild(sprite, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            sprite.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 2), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                sender.removeFromParent();
            }.bind(this), this)));          

        }
        else if(status == "zhongji"){ //重击????特效，到时要加,现在简单处理
            var sprite = new cc.Sprite(res.battle_zhongji_png);
            var pos    = scene_pos;
            sprite.setScale(2);
            sprite.setPosition(cc.p(pos.x, pos.y+60));
            battleScene.addChild(sprite, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            sprite.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 2), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                sender.removeFromParent();
            }.bind(this), this)));          

        }
        else if(status == "miss"){ //闪避????特效，到时要加,现在简单处理
            var sprite = new cc.Sprite(res.battle_shanbi_png);
            var pos    = scene_pos;
            sprite.setScale(2);
            sprite.setPosition(cc.p(pos.x, pos.y+60));
            battleScene.addChild(sprite, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            sprite.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 2), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                sender.removeFromParent();
            }.bind(this), this)));            

        }
        else if(status == "gedang"){ //格挡????特效，到时要加,现在简单处理
            var sprite = new cc.Sprite(res.battle_gedang_png);
            var pos    = scene_pos;
            sprite.setScale(2);
            sprite.setPosition(cc.p(pos.x, pos.y+60));
            battleScene.addChild(sprite, BATTLE_EFFECT_BUFF_ZORDER);

            var self = this;
            sprite.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.1, 2), cc.moveBy(0.2, cc.p(0, 30))), cc.delayTime(0.1), cc.scaleTo(0.1, 0.1), cc.callFunc(function(sender){
                sender.removeFromParent();
            }.bind(this), this)));             

        }
    }


});


BattleEffect.sharedBattleEffect = null;
BattleEffect.firstUse       = true;
BattleEffect.getInstance  = function () {
    if (BattleEffect.firstUse) {
        BattleEffect.firstUse = false;
        BattleEffect.sharedBattleEffect = new BattleEffect();
    }
    return BattleEffect.sharedBattleEffect;
};

BattleEffect.purge = function () {
    if (BattleEffect.sharedBattleEffect) {
        delete BattleEffect.sharedBattleEffect;
        BattleEffect.sharedBattleEffect = null;
        BattleEffect.firstUse = true;
    }
};



