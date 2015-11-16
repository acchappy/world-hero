/**
 * Created by Tom on 15/09/11.
 * @Author Tom
 * @desc   ...
 */

var HeroListLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,

    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var size = cc.director.getWinSize();
        var embattle = ccs.load(res.hero_list_scene_json);
        this._widget = embattle.node;

        fb.widgetAdapter(this._widget);  
        this.addChild(this._widget);


        this.initUI();

        return true;
    },

    //
    initUI:function(){
        this.initBtn();

    },

    initBtn:function(){
        this.initReturnBtn();
        this.initHeroInformation();
    },

    initReturnBtn:function(){
        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);
    },

    initHeroInformation : function(){
        var PanelConsize = this._widget.getChildByName("ScrollView_herolist").getChildByName("Panel_hero").getContentSize();
        //计算并设置滚动区域
        var heroPaneltemplate = this._widget.getChildByName("ScrollView_herolist").getChildByName("Panel_hero");
        var heroListScrollView = this._widget.getChildByName("ScrollView_herolist");
        scrollHeight = Math.ceil(this._mc._model.length/2) * (PanelConsize.height+10);
        heroListScrollView.setInnerContainerSize(cc.size(850,scrollHeight));

        //判断初始位置
        if(scrollHeight>heroListScrollView.getContentSize().height){
            var panelPosition = cc.p(heroPaneltemplate.getPosition().x,scrollHeight-PanelConsize.height/2);
        }else{
            var panelPosition = cc.p(heroPaneltemplate.getPosition().x,heroListScrollView.getContentSize().height-PanelConsize.height/2);
        }

        for(var i = 0;i < this._mc._model.length;i++)
        {
            var heroPanel = heroPaneltemplate.clone();
            heroPanel.setPosition(panelPosition.x,panelPosition.y-10);
            heroPaneltemplate.getParent().addChild(heroPanel);
            panelPosition.y -= PanelConsize.height + 10;

            //获取头像模板位置
            var heroImage1 = heroPanel.getChildByName("Image_herobg1").getChildByName("Image_heroicon");
            var heroImage2 = heroPanel.getChildByName("Image_herobg2").getChildByName("Image_heroicon");

            var heroIcon1 = HeroSmallTemplate.getInstance().getHeroSmallTemplate(this._mc._model.heroList[i]);
            heroIcon1.setPosition(heroImage1.getPosition());
            heroIcon1.setTag(i);
            heroPanel.getChildByName("Image_herobg1").getChildByName("Text_heroName").setString(this._mc._model.heroList[i].name);
            heroPanel.getChildByName("Image_herobg1").getChildByName("Text_fightValue").setString(this._mc._model.heroList[i].battle);
            heroImage1.getParent().addChild(heroIcon1);
            this.isAlive(heroIcon1,this._mc._model.heroList[i].alive);

            heroImage2.getParent().setVisible(false);
            if(++i >= this._mc._model.length){
                break;
            }

            var heroIcon2 = HeroSmallTemplate.getInstance().getHeroSmallTemplate(this._mc._model.heroList[i]);
            heroImage2.getParent().setVisible(true);
            heroIcon2.setPosition(heroImage2.getPosition());
            heroIcon2.setTag(i);
            heroPanel.getChildByName("Image_herobg2").getChildByName("Text_heroName").setString(this._mc._model.heroList[i].name);
            heroPanel.getChildByName("Image_herobg2").getChildByName("Text_fightValue").setString(this._mc._model.heroList[i].battle);
            heroImage2.getParent().addChild(heroIcon2);
            this.isAlive(heroIcon2,this._mc._model.heroList[i].alive);
        }
        heroPaneltemplate.setVisible(false);
    },

    //上阵显示上阵图片,未上阵显示上阵按钮
    isAlive : function(heroIcon,flag){
        var self = this;
        heroIcon.getParent().getChildByName("Button_on").setVisible(!flag);
        if(flag){
            heroIcon.getParent().getChildByName("Button_down").setVisible(true);
        }else{
            heroIcon.getParent().getChildByName("Button_down").setVisible(false);
        }
        heroIcon.getParent().getChildByName("Button_on").setTag(heroIcon.getTag());
        heroIcon.getParent().getChildByName("Button_on").addClickEventListener(function(sender){
            self._mc._model.seatList[self._mc._model.seat] = self._mc._model.heroList[sender.getTag()].hid;
            var s = self._mc._model.seatList;
            self._mc.httpsend(s[1],s[2],s[3],s[4],s[5],s[6],s[7]);
        });
        heroIcon.getParent().getChildByName("Button_down").setTag(heroIcon.getTag());
        heroIcon.getParent().getChildByName("Button_down").addClickEventListener(function(sender){
            self._mc._model.seatList[self._mc._model.heroList[sender.getTag()].seat] = 0;
            var s = self._mc._model.seatList;
            self._mc.httpsend(s[1],s[2],s[3],s[4],s[5],s[6],s[7]);
        });
    },

});

var HeroListScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new HeroListLayer(mc);
        this.addChild(this._mapLayer);
        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }
});