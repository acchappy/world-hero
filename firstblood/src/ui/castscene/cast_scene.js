/**
 * Created by Tom on 15/09/10.
 * @Author Tom
 * @desc   ...
 */

var CastLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,
    _heroAttribute:null,
    _group:null,
    _Index : null,
    _showIndex:null,

    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var size = cc.director.getWinSize();
        var heroStrengthen = ccs.load(res.case_scene_json);
        this._widget = heroStrengthen.node;
        fb.widgetAdapter(this._widget);  
        this.addChild(this._widget);
        
        this._heroAttribute = this._widget.getChildByName("Panel_main").getChildByName("Panel_attribute").getChildByName("Panel_heroAttribute");
        this._group = this._widget.getChildByName("Panel_main").getChildByName("Panel_attribute").getChildByName("Panel_group");

        this.initUI();

        return true;
    },

    //
    initUI:function(){
        this.initBtn();
        this.initText();
        this.initHeroInformation();
    },

    initBtn:function(){
        this.initCommon();
        this.initEmbattleBtn();
        this.initStrengthenBtn();
        this.initReplaceBtn();
        this.initPanelAttribute();
    },

    initCommon : function(){
        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);
        var consume = new ConsumeMC(this);
        consume.view();
    },

    initEmbattleBtn : function(){
        var self = this;
        var embattleBtn = this._widget.getChildByName("Panel_main").getChildByName("Panel_heroList").getChildByName("Button_embattle");
        embattleBtn.addClickEventListener(function () {
            self._mc.addObserver();
            var embattle_mc = new EmbattleMC(self._showIndex);
            embattle_mc.view();
        });
    },

    initStrengthenBtn : function(){
        var strengthenBtn = this._widget.getChildByName("Panel_main").getChildByName("Panel_heroStand").getChildByName("Button_strengthen");
//        strengthenBtn.addClickEventListener(function () {
//            var hero_upLevel_mc = new HeroUpLevelMC();
//            hero_upLevel_mc.view();
//        });
    },

    initReplaceBtn : function(){
        var self = this;
        var replaceBtn = this._widget.getChildByName("Panel_main").getChildByName("Panel_heroStand").getChildByName("Button_replace");
        replaceBtn.addClickEventListener(function () {
            self._mc.addObserver();
            var hero_upLevel_mc = new HeroListMC(self._mc._model.heroList[self._showIndex].seat);
            hero_upLevel_mc.view();
        });
    },

    initHeroInformation : function(){
        var self = this;
        for(var i=1;i<=6;i++)
        {
            var heroImage = this._widget.getChildByName("Panel_main").getChildByName("Panel_heroList").getChildByName("Image_hero_" + i);
            heroImage.removeAllChildren();
            heroImage.setTag(i);
            heroImage.addClickEventListener(function(sender){
                self._mc.addObserver();
                var hero_upLevel_mc = new HeroListMC(sender.getTag());
                cc.log("sender.getTag()",sender.getTag());
                hero_upLevel_mc.view();
            });
        }
        for(var i = 1;i <= this._mc._model.length;i++)
        {
            if(!this._mc._model.heroList[i].alive)
                continue;
            var heroImage = this._widget.getChildByName("Panel_main").getChildByName("Panel_heroList").getChildByName("Image_hero_" + this._mc._model.heroList[i].seat);
            var heroIcon = HeroSmallTemplate.getInstance().getHeroSmallTemplate(this._mc._model.heroList[i]);
            heroIcon.setTag(i);
//            heroIcon.setTag(this._mc._model.heroList[i].seat);
            if(this._mc._model.heroList[i].seat == this._mc._model.showNum)
            {
                HeroSmallTemplate.getInstance().setHeroFrameVisible(heroIcon,true);
                this.setHeroInformation(this._mc._model.heroList[i]);
                self._showIndex = i;
            }
            heroIcon.setPosition(heroImage.getContentSize().width/2,heroImage.getContentSize().height/2);
            heroImage.addChild(heroIcon);
            heroIcon.addClickEventListener(function(sender){
                this.setHeroInformation(this._mc._model.heroList[sender.getTag()]);
                HeroSmallTemplate.getInstance().setHeroFrameVisible(sender.getParent().getParent().getChildByTag(self._mc._model.heroList[self._showIndex].seat).getChildByTag(self._showIndex),false);
                HeroSmallTemplate.getInstance().setHeroFrameVisible(sender.getParent().getParent().getChildByTag(self._mc._model.heroList[sender.getTag()].seat).getChildByTag(sender.getTag()),true);
                self._showIndex = sender.getTag();
            }.bind(this));
        }
    },

    setHeroInformation : function(heroData){
        this._heroAttribute.getChildByName("Text_fightValue").setString(heroData.battle);
//        this._heroAttribute.getChildByName("Text_aptitudeValue").setString(Math.random()*15);
        this._heroAttribute.getChildByName("Text_levelValue").setString(heroData.level);
        this._heroAttribute.getChildByName("Text_attackValue").setString(heroData.attack);
        this._heroAttribute.getChildByName("Text_guardValue").setString(heroData.parmor);
        this._heroAttribute.getChildByName("Text_bloodValue").setString(heroData.blood);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_heroStand").getChildByName("Text_heroName").setString(heroData.name);
    },

    initText : function(){
        this._heroAttribute.getChildByName("Text_fightName").setString(TextData.getInstance().c_fight.text);
        this._heroAttribute.getChildByName("Text_aptitudeName").setString(TextData.getInstance().c_aptitude.text);
        this._heroAttribute.getChildByName("Text_levelName").setString(TextData.getInstance().c_level.text);
        this._heroAttribute.getChildByName("Text_attackName").setString(TextData.getInstance().c_attack.text);
        this._heroAttribute.getChildByName("Text_guardName").setString(TextData.getInstance().c_guard.text);
        this._heroAttribute.getChildByName("Text_bloodName").setString(TextData.getInstance().c_blood.text);
    },

    initPanelAttribute : function(){
        var attributePanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_attribute");
        attributePanel.addClickEventListener(function(){
            var hero_presentation_mc = new HeroPresentationMC();
            hero_presentation_mc.view();
        });
    },

    updateUI : function(){
        this.initHeroInformation();
    },
});

var CastScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new CastLayer(mc);
        this.addChild(this._mapLayer);
        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }
});