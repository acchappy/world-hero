
/**
 * Created by fable on 15/08/28.
 * @Author fable
 * @desc   ...
 */


var MainMapLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,
    _consume : null,
    _text_time : null,
    _time : 0,

    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var mainScene = ccs.load(res.main_scene_json);
        this._widget = mainScene.node;
        fb.widgetAdapter(this._widget);
        this.addChild(this._widget);

        this.initUI();

        this.initConsume();
        this.updateUI();

        this.scheduleUpdate();

        return true;
    },

    initConsume:function(){
        this._consume = new ConsumeMC(this);
        this._consume.view();
        var p = this._widget.getChildByName("Panel_topadd").getPosition();
        this._consume.reSetPosition(p);
    },
    //
    initUI:function(){
        var self = this;
        this._text_time = this._widget.getChildByName("Panel_topadd").getChildByName("Text_time");

        var heroManagerBtn = this._widget.getChildByName("Panel_menu").getChildByName("Button_hero");
        heroManagerBtn.addClickEventListener(function () {
            //heroManagerBtn.runAction(cc.scaleTo(1.0, 1.2));
            cc.log("main_scene initUI button clicked");

            var hero_manager_mc = new HeroMangerMC();
            hero_manager_mc.view();
        });

        var pveBtn = this._widget.getChildByName("Panel_menu").getChildByName("Button_pve");
        pveBtn.addClickEventListener(function () {
            //var scene = new BattleScene();
            // var tt = new cc.TransitionFade(0.5, scene);
            // cc.director.replaceScene(tt);

            var battle = new BattleShowMC(BATTLE_SHOW_MODE.fight, {fuid:10001});
            battle.view();
        });

        var rankBtn = this._widget.getChildByName("Panel_yunying").getChildByName("Button_rank");
        rankBtn.addClickEventListener(function () {

            var battle = new BattleShowMC(BATTLE_SHOW_MODE.test, {fuid:10001});
            battle.view();
        });

        var pvpBtn = this._widget.getChildByName("Panel_menu").getChildByName("Button_pvp");
        pvpBtn.addClickEventListener(function () {

            var battle = new ChapterMC();
            battle.view();
        });

        //登出
        var exit = this._widget.getChildByName("Panel_menu").getChildByName("Button_team");
        exit.addClickEventListener(function () {
            LoginData.getInstance().clearData();
            var login_mc = new LoginMC(true);
            login_mc.view();            
        });

        var bagBtn = this._widget.getChildByName("Panel_menu").getChildByName("Button_bag");
        bagBtn.addClickEventListener(function () {

            var knapsack_mc = new KnapsackMC();
            knapsack_mc.view();
        });

        var barBtn = this._widget.getChildByName("Panel_menu").getChildByName("Button_bar");
        barBtn.addClickEventListener(function () {

            var tavern_mc = new TavernMC();
            tavern_mc.view();
        });

        var storeBtn = this._widget.getChildByName("Panel_menu").getChildByName("Button_shop");
        storeBtn.addClickEventListener(function () {

            var store_mc = new StoreMC();
            store_mc.view();
        }.bind(this));

        var missionBtn = this._widget.getChildByName("Panel_menu").getChildByName("Button_mission");
        missionBtn.addClickEventListener(function () {

            var task_mc = new TaskMC();
            task_mc.view();
        }.bind(this));

        var challengeBtn = this._widget.getChildByName("Panel_menu").getChildByName("Button_challenge");
        challengeBtn.addClickEventListener(function () {

            var tower_mc = new TowerMC();
            tower_mc.view();
        }.bind(this));

        var signBtn  = this._widget.getChildByName("Panel_yunying").getChildByName("Button_sign");
        signBtn.addClickEventListener(function () {

            var signIn = new SignInMC(this);
            signIn.view();
        }.bind(this));

        var emaillBtn = this._widget.getChildByName("Panel_chat").getChildByName("Button_mail");
        emaillBtn.addClickEventListener(function(){

            var emaill = new EmaillMC(this);
            emaill.view();
        }.bind(this));

        this.addHero();

        cc.log("mainscene add hero ",  JSON.stringify(this._mc._model.alive));

    },


    addHero : function(){
        //add hero
        var self = this;
        for(var i=1;i<=6;i++)
        {
            this._widget.getChildByName("Panel_hero").getChildByName("Node_" + i).removeAllChildren();
            this._widget.getChildByName("Panel_hero").getChildByName("Text_" + i).setVisible(false);
        }
        for (var key in this._mc._model.alive) {
            var unit = this._mc._model.alive[key];
            var node = this._widget.getChildByName("Panel_hero").getChildByName("Node_"+unit.seat);
            var widget = new ccui.Widget();
            node.addChild(widget);
            //var spine = new sp.SkeletonAnimation(res.battle_spine_path+"jianshi.json", res.battle_spine_path+"jianshi.atlas");
            //spine.setScale(0.2);
            //cc.log("main scene add hero xxxxhid", unit.hid);
            var heroUnit = HeroData.getInstance().getHeroUnitForHid(unit.hid);
            cc.assert(heroUnit != null, "main scene add hero fail!!");
         
            var heroSpine = HeroSpine.createInstance(heroUnit.spine, true);            
            widget.addChild(heroSpine);
            widget.setTag(unit.seat);
            widget.addClickEventListener(function (sender) {
    
                var cast_mc = new CastMC(sender.getTag());
                cast_mc.view();
            });

            heroSpine.setIdleAnimation(true);
            var rect = heroSpine.getBoundingBox();
            heroSpine.setPositionX(rect.width/2); //widget的碰撞是锚点是(0,0),而spine是(0.5,0),所以要移过一半距离
            widget.setAnchorPoint(cc.p(0.5, 0));
            widget.setContentSize(cc.size(rect.width, rect.height));
            widget.setTouchEnabled(true);

            var text = this._widget.getChildByName("Panel_hero").getChildByName("Text_"+unit.seat);
            text.setString(unit.name);
            text.setPosition(node.getPosition());
            text.setVisible(true);
        }
    },

    update:function(dt){
        if (this._text_time) {
            var date = new Date();
            
            this._time += dt;
            var s = parseInt(this._time)
            if (s%2)  {
                this._text_time.setString(date.getHours() + " " + fb.fixZero(date.getMinutes(), 2));
            } else {
                this._text_time.setString(date.getHours() + ":" + fb.fixZero(date.getMinutes(), 2));
            }
        }
    },

    updateUI:function(){
        var playerLevelText = this._widget.getChildByName("Panel_player").getChildByName("Text_playerLevel");
        playerLevelText.setString("Lv."+this._mc._model.level+"    "+"V0");
        var playerNameText = this._widget.getChildByName("Panel_player").getChildByName("Text_playerName");
        playerNameText.setString(this._mc._model.name);
        var playerFightText = this._widget.getChildByName("Panel_player").getChildByName("Text_playerEffective");
        playerFightText.setString(this._mc._model.fight);
        this._consume.update();
    },

});

var MainScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new MainMapLayer(mc);
        this.addChild(this._mapLayer);

        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }    

});