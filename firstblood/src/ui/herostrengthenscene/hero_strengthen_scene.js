
/**
 * Created by fable on 15/09/02.
 * @Author fable
 * @desc   ...
 */


var HeroStrengthenLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,

    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var size = cc.director.getWinSize();
        var heroStrengthen = ccs.load(res.hero_strengthen_scene_json);
        this._widget = heroStrengthen.node;

        fb.widgetAdapter(this._widget);  
        this.addChild(this._widget);

        this.initUI();

        return true;
    },

    //
    initUI:function(){

        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);
        var consume = new ConsumeMC(this);
        consume.view();

        //add hero list
        var intervalW   = 5; //间隔
        var heroMaxNum  = this._mc._model.heroList.length; //英雄个数

        var hero_scroll  = this._widget.getChildByName("Panel_main").getChildByName("Panel_hero").getChildByName("ScrollView_hero");
        var heroTemplate = hero_scroll.getChildByName("Image_hero");
        var init_pos = heroTemplate.getPosition();
        init_pos.x += intervalW;

        hero_scroll.setScrollBarEnabled(false);
        for(var i = 0; i<heroMaxNum; i++)
        {
            var hero = HeroSmallTemplate.getInstance().getHeroSmallTemplate(this._mc._model.heroList[i]);

            hero.setTag(i);
            hero.addClickEventListener(function (sender) {
                HeroSmallTemplate.getInstance().setHeroFrameVisible(hero.getParent().getChildByTag(this._mc._model.index), false);
                HeroSmallTemplate.getInstance().setHeroFrameVisible(hero.getParent().getChildByTag(sender.getTag()), true);
                this._mc._model.index = sender.getTag();
            }.bind(this));

            if(hero.getTag() == this._mc._model.index) {
                HeroSmallTemplate.getInstance().setHeroFrameVisible(hero, true);
            } else {
                HeroSmallTemplate.getInstance().setHeroFrameVisible(hero, false);
            }

            hero.setPosition(init_pos);
            hero_scroll.addChild(hero);
            init_pos.x  += (hero.getContentSize().width+intervalW);
        }

        var scrollWidth = 0;
        scrollWidth = (hero.getContentSize().width+intervalW)*heroMaxNum+intervalW;
        hero_scroll.setInnerContainerSize(cc.size(scrollWidth, hero_scroll.getContentSize().height));
        heroTemplate.setVisible(false);
        heroTemplate.setEnabled(false);


        var scrollLeft  = this._widget.getChildByName("Panel_main").getChildByName("Panel_hero").getChildByName("Image_scrollLeft");
        var scrollRight = this._widget.getChildByName("Panel_main").getChildByName("Panel_hero").getChildByName("Image_scrollRight");
        scrollLeft.setTouchEnabled(true);
        scrollLeft.addClickEventListener(function(){
            var w = Math.abs(hero_scroll.getContentSize().width - hero_scroll.getInnerContainer().getContentSize().width);
            var x = Math.abs(hero_scroll.getInnerContainer().getPositionX());
            var p = x*100/w;
            p += (100/heroMaxNum);
             cc.log("hero_strengthen_scene initUI ..xxx11,p,w,x", p, w, x, hero_scroll.getContentSize().width);           
            if(x < w)
                hero_scroll.scrollToPercentHorizontal(p, 1, false);

        });

        scrollRight.setTouchEnabled(true);
        scrollRight.addClickEventListener(function(){
            var w = Math.abs(hero_scroll.getContentSize().width - hero_scroll.getInnerContainer().getContentSize().width);
            var x = Math.abs(hero_scroll.getInnerContainer().getPositionX());
            var p = x*100/w;
            p -= ((100/heroMaxNum));
            cc.log("hero_strengthen_scene initUI ..xxx11,p,w,x", p, w, x);
            if(x > 0)
                hero_scroll.scrollToPercentHorizontal(p, 1, false);
        });        

    },

    updateUI:function(){


    }

});

var HeroStrengthenScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new HeroStrengthenLayer(mc);
        this.addChild(this._mapLayer);

        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }

});