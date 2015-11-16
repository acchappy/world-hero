
/**
 * Created by fable on 15/08/28.
 * @Author fable
 * @desc   ...
 */

var HeroManagerLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,
    _index : 0,
    _maxHeroNumber : 0,
    _summonHeroNumber : 0,
    _haveHeroNumber : 0,
    _notHaveHeroNumber : 0,

    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var size = cc.director.getWinSize();
        var heroManager = ccs.load(res.hero_manager_scene_json);
        this._widget = heroManager.node;

        fb.widgetAdapter(this._widget);  
        this.addChild(this._widget);

        this.initUI();
        //Shader.grayScale(this._widget.getChildByName("Image_bg").getVirtualRenderer().getSprite());
        //Shader.outline(this._widget.getChildByName("Image_bg").getVirtualRenderer().getSprite());
        return true;
    },

    //
    initUI:function(){

        //初始化返回按钮
        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);

        //初始化参数
        this._maxHeroNumber = this._mc._model.heroTotal;
        this._haveHeroNumber = this._mc._model._heroNumber ;
        this._summonHeroNumber = this._mc._model._summonHeroNumber;
        this._notHaveHeroNumber = this._mc._model. _notHaveHeroNumber;
        var interval = 15;


        //得到英雄布局模板
        var hmScrollView = this._widget.getChildByName("ScrollView_hm");
        var layeroutHeros = hmScrollView.getChildByName("Layout_Hero");
        var spriteNotHaveHeros =  hmScrollView.getChildByName("Sprite_hm_nothaveheros");
        spriteNotHaveHeros.setVisible(false);

        //计算滚动区域高度
        var haveHerosHeightNumber = (this._haveHeroNumber%2)? (this._haveHeroNumber/2+0.5):(this._haveHeroNumber/2);
        var notHaveHeroHeightNumber = (this._notHaveHeroNumber%2)? (this._notHaveHeroNumber/2+0.5):(this._notHaveHeroNumber/2);
        var summonHeroNumber = (this._summonHeroNumber%2)? (this._summonHeroNumber/2+0.5):(this._summonHeroNumber/2);
        var sumNumber = haveHerosHeightNumber + notHaveHeroHeightNumber + summonHeroNumber ;
        var maxHeight = (sumNumber)*(layeroutHeros.getContentSize().height) + (sumNumber-2)*interval+spriteNotHaveHeros.getContentSize().height*2 + 15*2;

        //初始化英雄列表位置，滚动视图滚动区域，模板可见性取消
        hmScrollView.setInnerContainerSize(cc.size(hmScrollView.getContentSize().width, maxHeight));
        var layeroutHerosPostion = cc.p(layeroutHeros.getPosition().x,maxHeight - 15 - layeroutHeros.getContentSize().height/2);

        var self = this;

        //初始化能召唤列表 + 英雄列表
        var num = this._summonHeroNumber + this._haveHeroNumber;
        for(var i = 0;i< num;i++)
        {
            hero = layeroutHeros.clone();
            hero.setPosition(layeroutHerosPostion);
            hmScrollView.addChild(hero);
            if(i%2){
                layeroutHerosPostion.x -= (layeroutHeros.getContentSize().width+20);
                layeroutHerosPostion.y -= (layeroutHeros.getContentSize().height+interval);
            }else{
                layeroutHerosPostion.x += (layeroutHeros.getContentSize().width+20);
            }
            if( i>= this._summonHeroNumber){
                this.initHeroInformation(hero,i-this._summonHeroNumber);
            }else{
                this.initSummonInfo(hero,i);
            }
        }

        if(num%2){
            layeroutHerosPostion.x -= (layeroutHeros.getContentSize().width+20);
            layeroutHerosPostion.y -= (layeroutHeros.getContentSize().height+interval);
        }

        hmScrollView.setScrollBarColor(cc.color(125,255,0));
        hmScrollView.setScrollBarPositionFromCornerForVertical(cc.p(10, 10));
        hmScrollView.setScrollBarWidth(6);
        hmScrollView.setScrollBarOpacity(60);

        //设置列表间隙分割图
        layeroutHerosPostion = cc.p(layeroutHerosPostion.x,layeroutHerosPostion.y+layeroutHeros.getContentSize().height-layeroutHeros.getContentSize().height/2-spriteNotHaveHeros.getContentSize().height/2);
        spriteNotHaveHeros.setVisible(true);
        spriteNotHaveHeros.setPosition(hmScrollView.getContentSize().width/2,layeroutHerosPostion.y);
        layeroutHerosPostion = cc.p(layeroutHerosPostion.x,layeroutHerosPostion.y-spriteNotHaveHeros.getContentSize().height-layeroutHeros.getContentSize().height/2);

        //初始化未拥有英雄列表
        for(var i = 0;i<this._notHaveHeroNumber;i++)
        {
            hero = layeroutHeros.clone();
            hero.setPosition(layeroutHerosPostion);
            hmScrollView.addChild(hero);
            if(i%2){
                layeroutHerosPostion.x -= (layeroutHeros.getContentSize().width+20);
                layeroutHerosPostion.y -= (layeroutHeros.getContentSize().height+interval);
            }else{
                layeroutHerosPostion.x += (layeroutHeros.getContentSize().width+20);
            }
            this.initHeroSource(hero,i);
        }

        layeroutHeros.setVisible(false);
    },

    closeDisplay : function(hero)
    {
        hero.getChildByName("LoadingBar_collection").setVisible(false);
        hero.getChildByName("Button_hm_source").setVisible(false);
        hero.getChildByName("Button_hm_summon").setVisible(false);
        hero.getChildByName("Button_hm_equipage").setVisible(false);
        hero.getChildByName("Button_hm_intensify").setVisible(false);
        hero.getChildByName("Text_hm_heroFightValue").setVisible(false);
        hero.getChildByName("Image_hm_heroFighting").setVisible(false);
    },

   // 初始化英雄信息
    initHeroInformation:function(hero,i){
        var self = this;
        this.closeDisplay(hero);
        hero.setTag(this._index);
        this._index += 1;
        hero.getChildByName("Button_hm_equipage").setVisible(true);
        hero.getChildByName("Button_hm_intensify").setVisible(true);
        hero.getChildByName("Text_hm_heroFightValue").setVisible(true);
        hero.getChildByName("Image_hm_heroFighting").setVisible(true);
        var equipageBtn = hero.getChildByName("Button_hm_equipage");
        equipageBtn.setTag(i);
        equipageBtn.addClickEventListener(function (sender) {
            var heroStrengthen_mc = new HeroStrengthenMC(sender.getTag());
            heroStrengthen_mc.view();
        });
        var intensifyBtn = hero.getChildByName("Button_hm_intensify");
        intensifyBtn.setTag(i);
        intensifyBtn.addClickEventListener(function (sender) {
            self._mc.addObserver();
            var hero_upLevel_mc = new HeroUpLevelMC(sender.getTag());
            hero_upLevel_mc.view();
        });
        var heroIcon = HeroSmallTemplate.getInstance().getHeroSmallTemplate(this._mc._model.heroList[i]);
        heroIcon.setPosition(hero.getChildByName("Image_hm_heroIcon").getContentSize().width/2,hero.getChildByName("Image_hm_heroIcon").getContentSize().height/2);
        hero.getChildByName("Image_hm_heroIcon").removeAllChildren();
        hero.getChildByName("Image_hm_heroIcon").addChild(heroIcon);
        hero.getChildByName("Text_hm_heroName").setString(this._mc._model.heroList[i].name);
        hero.getChildByName("Text_hm_heroFightValue").setString(this._mc._model.heroList[i].battle);
    },

    //初始化英雄召唤信息
    initSummonInfo : function(hero,i){
        var self = this;
        this.closeDisplay(hero);
        hero.setTag(this._index);
        this._index += 1;
        hero.getChildByName("LoadingBar_collection").setVisible(true);
        hero.getChildByName("Button_hm_summon").setVisible(true);
        var summonBtn = hero.getChildByName("Button_hm_summon");
        summonBtn.setTag(this._mc._model.summonList[i].hid);
        summonBtn.addClickEventListener(function(sender){
            self._mc.httpSend(sender.getTag());
        });
        var heroIcon = HeroSmallTemplate.getInstance().getNotHaveHeroSmallTemplate();
        heroIcon.setPosition(hero.getChildByName("Image_hm_heroIcon").getContentSize().width/2,hero.getChildByName("Image_hm_heroIcon").getContentSize().height/2);
        hero.getChildByName("Image_hm_heroIcon").removeAllChildren();
        hero.getChildByName("Image_hm_heroIcon").addChild(heroIcon);
        hero.getChildByName("Text_hm_heroName").setString(this._mc._model.summonList[i].name);
        hero.getChildByName("LoadingBar_collection").setPercent(this._mc._model.summonList[i].curFragmentNum/this._mc._model.summonList[i].maxFragmentNum*100);
        hero.getChildByName("LoadingBar_collection").getChildByName("Label_loadingBar").setString(this._mc._model.summonList[i].curFragmentNum + "/" + this._mc._model.summonList[i].maxFragmentNum);
    },

    //初始化英雄收集信息
    initHeroSource:function(hero,i){
        this.closeDisplay(hero);
        hero.setTag(this._index);
        this._index += 1;
        hero.getChildByName("LoadingBar_collection").setVisible(true);
        hero.getChildByName("Button_hm_source").setVisible(true);
        var sourceBtn = hero.getChildByName("Button_hm_source");
        sourceBtn.addClickEventListener(function(){
            cc.log("hero_manager_scene 来源~~~");
        });
        var heroIcon = HeroSmallTemplate.getInstance().getNotHaveHeroSmallTemplate();
        heroIcon.setPosition(hero.getChildByName("Image_hm_heroIcon").getContentSize().width/2,hero.getChildByName("Image_hm_heroIcon").getContentSize().height/2);
        hero.getChildByName("Image_hm_heroIcon").removeAllChildren();
        hero.getChildByName("Image_hm_heroIcon").addChild(heroIcon);
        hero.getChildByName("Text_hm_heroName").setString(this._mc._model.notHaveList[i].name);
        hero.getChildByName("LoadingBar_collection").setPercent(this._mc._model.notHaveList[i].curFragmentNum/this._mc._model.notHaveList[i].maxFragmentNum*100);
        hero.getChildByName("LoadingBar_collection").getChildByName("Label_loadingBar").setString(this._mc._model.notHaveList[i].curFragmentNum + "/" + this._mc._model.notHaveList[i].maxFragmentNum);
    },

    updateUI :function(){
        var hmScrollView = this._widget.getChildByName("ScrollView_hm");
        this._index = 0;
        this._maxHeroNumber = this._mc._model.heroTotal;
        this._haveHeroNumber = this._mc._model._heroNumber ;
        this._summonHeroNumber = this._mc._model._summonHeroNumber;
        this._notHaveHeroNumber = this._mc._model. _notHaveHeroNumber;

        for(var i = 0;i<this._maxHeroNumber;i++)
        {
            if(i<this._summonHeroNumber){
                this.initSummonInfo(hmScrollView.getChildByTag(i),i);
            }else if(i<this._summonHeroNumber + this._haveHeroNumber){
                this.initHeroInformation(hmScrollView.getChildByTag(i),i-this._summonHeroNumber);
            }else{
                this.initHeroSource(hmScrollView.getChildByTag(i),i-this._summonHeroNumber-this._haveHeroNumber);
            }
        }
    }

});

var HeroManagerScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new HeroManagerLayer(mc);
        this.addChild(this._mapLayer);

        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }

});