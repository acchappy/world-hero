
/**
 * Created by fable on 15/09/14.
 * @Author fable
 * @desc   客户端战斗显示场景，自己完全不用任何计算，所有处理都是服务下发的数据，在战斗开始前，服务器即计算完了所有回合的数据及战斗结果
 *         客户端根据此数据做演示
 *
 *         数据格式如下：
 *         
 { 
    "battle":
    {
        //对战双方的英雄阵形
        "stand":
        {
            //攻击方英雄阵形
            "attack":
            [
                {
                    "seat":    英雄站位编号
                    "hid" :    英雄id
                    "mid" :    重复的英雄id
                    "level":   英雄等级
                    "blood":   英雄血量
                    "star":    英雄星级
                    "quality": 英雄品质
                    "battle":  英雄战斗力
                }
            ],
            防守方英雄阵形
            "def":
            [
                {
                    "seat":    英雄站位编号
                    "hid" :    英雄id
                    "mid" :    重复的英雄id
                    "level":   英雄等级
                    "blood":   英雄血量
                    "star":    英雄星级
                    "quality": 英雄品质
                    "battle":  英雄战斗力
                }
            ]
        },
        "huihe":
        [
            {
//              "rounds": xx, 当前第几回合，从1开始，最多20回合                
                //战斗中期
                "mid":
                {
                // 攻击方一个英雄的状态
                    "att": 
                    {
                        "seat":   英雄站位编号，左边是1、2、3、4、5、6，顺序是由上到下，由右到左，右边是11、12、13、14、15、16，顺序是由上到下，由左到右
                        "hid":    英雄id
                        "type":   特效效果类型，1表示伤害类，2表示加血类
                        "skill":  技能类型，1表示普通攻击，2表示小招，3表示大招
                        "range":  如果是伤害类英雄，这个值就是防守方英雄的站位编号；如果是加血类英雄，这个值就是攻击方英雄的站位编号；100表示攻击方或者防守方所有英雄
                        "effect": 0表示没有特效，1表示暴击，2表示必杀
                    },
                    // 防守方每个英雄的状态；如果是加血类英雄，则表示攻击方每个英雄的状态
                    "def":
                    [
                        {
                            "seat":   英雄站位编号
                            "hid":    英雄id
                            "effect": 0表示没有特效，1表示格挡，2表示闪避
                            "drop":   负数表示伤害掉了多少点血，正数表示治愈加了多少点血
                            "blood":  剩余多少点生命
                            "dead":   0表示没有死亡，1表示死亡
                        }
                    ],
                    // 怒气值
                    "anger":
                    {
                        "att":   攻击方怒气值总数
                        "def":   防守方怒气值总数
                    }
                },
                //战斗后期
                "end":
                {
                    //攻击方一个英雄的状态
                    "att":
                    {
                        "seat":   英雄站位编号
                        "hid":    英雄id
                        "effect": 0表示没有特效，1增加攻击力，2表示增加护甲
                        "value":  特效增加的数值
                    },
                    //防守方每个英雄的状态
                    "def":
                    [
                        {
                            "seat":   英雄站位编号
                            "hid":    英雄id
                            "effect": 0表示没有特效，1表示回血，2表示复活
                            "value":  特效增加的数值
                        }
                    ]
                }
            }
        ]
    }
}
 *
 * 
 */

var BATTLE_SHOW_ROUND_TAG = 10000000;

var BattleShowMapLayer = cc.Layer.extend({

    _heroAry:null,
    _mc : null,

    ctor:function (mc) {

        //this._super(cc.color(0,0,0,255), cc.color(98,99,117,255));
        this._super();
        this._mc = mc;

        this._heroAry = [];

        cc.log("Battle show scene mc", mc);
        var size     = cc.director.getWinSize();
        var scene    = ccs.load(res.battle_show_scene_json);
        this._widget = scene.node;

        //通过调整panel的setContentSize大小，设置panel上的控件固定与拉伸，能动态调整控件的相对位置来达到适配效果
        this._widget.setAnchorPoint(cc.p(0.5, 0.5));
        //this._widget.setPosition(cc.p((size.width)/2, (size.height)/2));
        var or = cc.view.getVisibleOrigin();
        var vs = cc.view.getVisibleSize();

        this._widget.setPosition(cc.p(or.x+vs.width/2, or.y+vs.height/2));
        this._widget.setContentSize(cc.size(vs.width, vs.height));
        ccui.helper.doLayout(this._widget);

        //拉大背景图，使其能适配
        var bg_node = this._widget.getChildByName("Image_bg");
        bg_node.setScale(fb.BG_SCALE_FACTOR);
        this.addChild(this._widget);

        //bg_node.setVisible(false);
        this.initUI();
        this.initHeroStand();

        return true;
    },

    initUI:function(){
        this.updateRoundsUI(1);
    },

    updateRoundsUI:function(r){
        var label = this._widget.getChildByName("Panel_ui").getChildByName("Text_rounds");  
        label.setString("round " + r);
    },

    initHeroStand:function(){
        var attack = this._mc._model.stand.attack;
        this.initHeroStandSub(attack, true);   

        var def = this._mc._model.stand.def;
        this.initHeroStandSub(def, false);  
    },

    initHeroStandSub:function(info, left){

        BattleEffect.getInstance().setBattleScene(this);
        for (var key in info) {
            var hero = info[key];    
            var node = this._widget.getChildByName("Panel_hero").getChildByName("Node_"+hero.seat);
            var panel= this._widget.getChildByName("Panel_hero");
            if (node) {
                //var isLeft = false;
                var pos = node.getPosition();
                //if (hero.seat > 10) {isLeft = true}
                //var hero_param = {name:"spineboy", initLife:hero.blood, isEnemy:isLeft, scale:cc.p(0.2, 0.2), index:hero.seat, pos:pos};
                
                var spineName = this._mc.getHeroSpineNameForHid(hero.hid, left);
                var hero_node = new HeroShow(hero, pos, spineName);

                hero_node.setHeroEffect(BattleEffect.getInstance());
                //node.addChild(hero_node);
                panel.addChild(hero_node);
                //hero_node.setPosition(pos);

                this._heroAry[hero.seat] = hero_node;

                //cc.log("battle show scene initHeroStand seat, pos", hero.seat, pos.x, pos.y);
            }
        }
    },
    
    //????现在已经去年怒气值
    // updateAngerUI:function(att, def){
    // },

    onEnter:function(){
        this._super();

        // CCScheduler* pScheduler = CCDirector::sharedDirector()->getScheduler();
        // pScheduler->setTimeScale(2.0f); //实现加速效果
        // pScheduler->setTimeScale(0.5f);//实现减速效果

        // var pScheduler = cc.director.getScheduler();
        // pScheduler.setTimeScale(2);

        this.showStartAni();
    },

    showStartAni:function(){

        //?????开场动画
        //
        this.battleStart();
    },

    battleStart:function(){

        var roundAry = this._mc._model.huihe;
        if (!this.getChildByTag(BATTLE_SHOW_ROUND_TAG)) {
            var round = new BattleRound(roundAry, this._heroAry, this.completeCallback.bind(this), this);
            this.addChild(round, BATTLE_SHOW_ROUND_TAG, BATTLE_SHOW_ROUND_TAG);
            round.start();
        }
    },

    completeCallback:function(){

        var isHeroWin = this._mc._model.win.status;
        cc.log("battle_scene.js battleOverCallback isHeroWin", isHeroWin);

        var size = cc.director.getWinSize();
        //show win ui
        if (isHeroWin) {
            //播放胜利动画
            for(var key in this._heroAry){
                var attHero = this._heroAry[key];
                if(attHero.getState() != HERO_STATE_DEAD && attHero.getIsLeft()){ //左边不死
                    attHero.win();
                }
            }

            var widget = ccs.load(res.battle_win_layer_json).node;
            fb.widgetDlgAdapter(widget);

            this.addChild(widget, BATTLE_SCENE_ORDER_WIN_LAYER);
            widget.getChildByName("Panel_main").getChildByName("Button_replay").addClickEventListener(function(){
                this.onMenuReplayCallback();
            }.bind(this));

            widget.getChildByName("Panel_main").getChildByName("Button_back").addClickEventListener(function(){
                this.onMenuBackToMainCallback();
            }.bind(this));

            widget.getChildByName("Panel_main").getChildByName("Text_exp").setString(this._mc._prize.exp);
            widget.getChildByName("Panel_main").getChildByName("Text_coin").setString(this._mc._prize.coin);

            var delay = 0.2;
            var stuffTmp = widget.getChildByName("Panel_main").getChildByName("Image_prize");
            stuffTmp.setVisible(false);
            var stuffPos = stuffTmp.getPosition();
            for(var j=0; j<this._mc._prize.ary.length; j++){
                var it    = this._mc._prize.ary[j];
                var stuff = stuffTmp.clone();
                stuff.setPosition(stuffPos);
                stuff.setScale(0.1);
                stuff.runAction(cc.sequence(cc.delayTime(delay), cc.spawn(cc.scaleTo(0.2, 1), cc.show())));
                delay      += 0.1;
                stuffPos.x += stuffTmp.getContentSize().width + 20;
                cc.log("battle show scene, completeCallback, name ,num", it.name, it.num);
                stuff.getChildByName("Text_name").setString(it.name);
                stuff.getChildByName("Text_num").setString(it.num);
                stuffTmp.getParent().addChild(stuff);
            }
        } 
        else {
            var widget = ccs.load(res.battle_lose_layer_json).node;
            fb.widgetDlgAdapter(widget);

            this.addChild(widget, BATTLE_SCENE_ORDER_LOSE_LAYER);
            widget.getChildByName("Panel_main").getChildByName("Button_replay").addClickEventListener(function(){
                this.onMenuReplayCallback();
            }.bind(this));

            widget.getChildByName("Panel_main").getChildByName("Button_back").addClickEventListener(function(){
                this.onMenuBackToMainCallback();
            }.bind(this));

            widget.getChildByName("Panel_main").getChildByName("Button_strong").addClickEventListener(function(){
                this.onMenuStrongSceneCallback();
            }.bind(this));            
        }
    },

    onMenuReplayCallback:function(sender){
        this._mc.view();        
    },

    //到强化界面
    onMenuStrongSceneCallback:function(sender){
        this._mc.exitBattle(true);
    },

    onMenuBackToMainCallback:function(sender){
        this._mc.exitBattle(false);
    },

    getBigSkillPos:function(){
        var node = this._widget.getChildByName("Panel_hero").getChildByName("Node_bigSkillPos");
        return node.getPosition();
    },

    cleanup:function(){
        this._super();
        BattleEffect.purge();
    }

});



var BattleShowScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);

        cc.log("BattleShowScene ctor");        
    },

    init:function(mc){
        this._mapLayer = new BattleShowMapLayer(mc);
        this.addChild(this._mapLayer);

        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    },

    cleanup:function(){
        this._super();
        cc.log("BattleShowScene cleanup");
    }

});