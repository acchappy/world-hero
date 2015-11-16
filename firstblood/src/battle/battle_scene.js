
/**
 * Created by fable on 15/08/20.
 * @Author fable
 * @desc   客户端战斗场景，与BattleShow不同的是，自己计算伤害
 */

//  var attr = {name:"xx", pos:xx, isEnemy:false, scale:cc.p(0,0), index:0}
var fb = fb || {};

/*
    *2*118
             *0*122
    *3*126
             *1*130
    *4*134

 */

fb.INFORMATION = {

    hero : [
            {name:"spineboy", isEnemy:false, initLife:(Math.random()*(1000-200)+200), scale:cc.p(0.2, 0.2), index:2, pos:cc.p(-280, 50),  zorder:fb.ZORDER[2]},
            {name:"spineboy", isEnemy:false, initLife:(Math.random()*(1000-200)+200), scale:cc.p(0.2, 0.2), index:3, pos:cc.p(-340, -60), zorder:fb.ZORDER[3]},
            {name:"spineboy", isEnemy:false, initLife:(Math.random()*(1000-200)+200), scale:cc.p(0.2, 0.2), index:4, pos:cc.p(-400, -180),zorder:fb.ZORDER[4]},

            {name:"spineboy", isEnemy:false, initLife:(Math.random()*(1000-200)+200), scale:cc.p(0.2, 0.2), index:0, pos:cc.p(-180, -20), zorder:fb.ZORDER[0]},
            {name:"spineboy", isEnemy:false, initLife:(Math.random()*(1000-200)+200), scale:cc.p(0.2, 0.2), index:1, pos:cc.p(-230, -150),zorder:fb.ZORDER[1]},

           ],
    enemy : [
             {name:"spineboy", isEnemy:true, initLife:(Math.random()*(1000-200)+200), scale:cc.p(0.2, 0.2), index:2, pos:cc.p(280, 50),  zorder:fb.ZORDER[2]},
             {name:"spineboy", isEnemy:true, initLife:(Math.random()*(1000-200)+200), scale:cc.p(0.2, 0.2), index:3, pos:cc.p(340, -60), zorder:fb.ZORDER[3]},
             {name:"spineboy", isEnemy:true, initLife:(Math.random()*(1000-200)+200), scale:cc.p(0.2, 0.2), index:4, pos:cc.p(400, -180),zorder:fb.ZORDER[4]},

             {name:"spineboy", isEnemy:true, initLife:(Math.random()*(1000-200)+200), scale:cc.p(0.2, 0.2), index:0, pos:cc.p(180, -20), zorder:fb.ZORDER[0]},
             {name:"spineboy", isEnemy:true, initLife:(Math.random()*(1000-200)+200), scale:cc.p(0.2, 0.2), index:1, pos:cc.p(230, -150),zorder:fb.ZORDER[1]},
            ]

};


//order

var BATTLE_SCENE_ORDER_BG         = -1;
var BATTLE_SCENE_ORDER_HERO_LAYER = 0;


var BATTLE_SCENE_ORDER_WIN_LAYER  = 300;
var BATTLE_SCENE_ORDER_LOSE_LAYER = 301;

var BattleMapLayer = cc.Layer.extend({

    _hero_ary  : [],
    _enemy_ary : [],
    _battle_ai : null,

    ctor:function () {

        this._super(cc.color(0,0,0,255), cc.color(98,99,117,255));
        var size = cc.director.getWinSize();

        var bg = new cc.Sprite(res.battle_bg_jpg);
        bg.setScale(size.height/bg.getContentSize().height);
        bg.setAnchorPoint(cc.p(0.5, 0.5));
        bg.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(bg, BATTLE_SCENE_ORDER_BG);

        this.loadHeroAndEnemy();
        this.loadAi();

        return true;
    },


    loadHeroAndEnemy:function(){
        cc.log("xxxxxx000000", cc.winSize.width, cc.winSize.height);

        var test = fb.INFORMATION;
        for(var key1 in test){
            cc.log("xxxxxx1111111", key1);
            for(var key2 in test[key1]){

                cc.log("xxxxxx22222222", key2, typeof(key2), test[key1][key2].name);
                var pos = test[key1][key2].pos;
                pos = cc.p(cc.winSize.width/2+pos.x, cc.winSize.height/2+pos.y);
                var hero_param = {name:test[key1][key2].name, initLife:test[key1][key2].initLife, isEnemy:test[key1][key2].isEnemy, scale:test[key1][key2].scale, index:test[key1][key2].index, pos:pos};

                cc.log("xxxxxxxxx5555555",BATTLE_SCENE_ORDER_HERO_LAYER+test[key1][key2].index);
                //var hero = new Hero(test[key1][key2]);
                var hero = new Hero(hero_param);
                this.addChild(hero, BATTLE_SCENE_ORDER_HERO_LAYER+test[key1][key2].zorder);
                cc.log("xxxxxxxxx55555556", hero.getLocalZOrder());


                if (key1 == "hero") {
                    cc.log("xxxxxxxxxxx333333", pos.x)
                    this._hero_ary[test[key1][key2].index]  = hero;
                } else {
                    cc.log("xxxxxxxxxxx444444", pos.x)
                    this._enemy_ary[test[key1][key2].index] = hero;
                }                
            }
        }

        // cc.log("xxxxxxx555555555", this._hero_ary[3], this._hero_ary[5], this._hero_ary.size);
        // for (var i in this._hero_ary) {
        //     cc.log("xxxxxxxxx66666", i);
        // }
    },

    loadAi:function(){

        this._battle_ai  = new BattleAi(this._hero_ary, this._enemy_ary, this.battleOverCallback.bind(this));
        this.addChild(this._battle_ai);     
    },

    battleOverCallback:function(isHeroWin){

        cc.log("battle_scene.js battleOverCallback isHeroWin", isHeroWin);

        var size = cc.director.getWinSize();
        //show win ui
        if (isHeroWin) {
            var sp = new cc.Sprite(res.battle_win_png);
            sp.setAnchorPoint(cc.p(0.5, 0.5));
            sp.setPosition(cc.p(size.width/2, size.height/2));
            this.addChild(sp, BATTLE_SCENE_ORDER_WIN_LAYER);

        } else {
            var sp = new cc.Sprite(res.battle_lose_png);
            sp.setAnchorPoint(cc.p(0.5, 0.5));
            sp.setPosition(cc.p(size.width/2, size.height/2));
            this.addChild(sp, BATTLE_SCENE_ORDER_LOSE_LAYER);
        }

        var replay = new cc.MenuItemImage(res.battle_replay_png, res.battle_replay_png, this.onMenuReplayCallback, this);
        var back   = new cc.MenuItemImage(res.battle_replay_png, res.battle_replay_png, this.onMenuBackToMainCallback, this);

        var menu = new cc.Menu(replay, back);
        back.setPosition(cc.p(200, 0));
        this.addChild(menu, BATTLE_SCENE_ORDER_LOSE_LAYER);
        menu.setPosition(cc.p(size.width/2, size.height/2-200));
    },

    onMenuReplayCallback:function(sender){
        var scene = new BattleScene();

        var tt = new cc.TransitionFade(0.5, scene);
        cc.director.replaceScene(tt);
    },

    onMenuBackToMainCallback:function(sender){
        // var scene = new MainScene();

        // var tt = new cc.TransitionFade(0.5, scene);
        // cc.director.replaceScene(tt);
        var main_mc = new MainMC();
        main_mc.view();
    },

    onEnter:function(){
        this._super();

        var bHeroFirst = false;
        this._battle_ai.start(bHeroFirst);
    }

});



var BattleScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function(){
        this._mapLayer = new BattleMapLayer();
        this.addChild(this._mapLayer);

        return true;
    }

});