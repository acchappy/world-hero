/**
 * Created by xiaojian on 15/09/23.
 * @Author xiaojian
 * @desc   ...
 */

var GOLD_SUMMON = 1;
var DIAMOND_SUMMON = 2;
var ONCE = 1;
var TEN_TIMES = 10;

var TavernLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,
    _c : 0,
    _number : 0,
    _consumeMC : null,

    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var size = cc.director.getWinSize();
        var heroStrengthen = ccs.load(res.tavern_scene_json);
        this._widget = heroStrengthen.node;

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
        this.initCommon();
        this.initSummon();
    },

    initCommon : function(){
        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);
        this._consumeMC = new ConsumeMC(this);
        this._consumeMC.view();
    },

    initSummon : function(){
        var GSFImage = this._widget.getChildByName("Panel_main").getChildByName("Image_goldSummonFront");
        var DSFImage = this._widget.getChildByName("Panel_main").getChildByName("Image_diamondSummonFront");
        var GSBImage = this._widget.getChildByName("Panel_main").getChildByName("Image_goldSummonBehind");
        var DSBImage = this._widget.getChildByName("Panel_main").getChildByName("Image_diamondSummonBehind");
        var summonTenPanel = this._widget.getChildByName("Panel_summon_ten");
        var summonOncePanel = this._widget.getChildByName("Panel_summon_once");
        summonOncePanel.setVisible(false);
        summonTenPanel.setVisible(false);
        var self = this;
        GSFImage.addClickEventListener(function(){
            GSFImage.setVisible(false);
            GSBImage.setVisible(true);
            GSBImage.setScale(0.01,1);
            GSBImage.runAction(cc.ScaleTo(0.3,1,1));
        });
        DSFImage.addClickEventListener(function(){
            DSFImage.setVisible(false);
            DSBImage.setVisible(true);
            DSBImage.setScale(0.01,1);
            DSBImage.runAction(cc.ScaleTo(0.3,1,1));
        });
        GSBImage.getChildByName("Button_return").addClickEventListener(function(){
            GSBImage.setVisible(false);
            GSFImage.setVisible(true);
            GSFImage.setScale(0.01,1);
            GSFImage.runAction(cc.ScaleTo(0.3,1,1));
        });
        DSBImage.getChildByName("Button_return").addClickEventListener(function(){
            DSBImage.setVisible(false);
            DSFImage.setVisible(true);
            DSFImage.setScale(0.01,1);
            DSFImage.runAction(cc.ScaleTo(0.3,1,1));
        });
        GSBImage.getChildByName("Button_buyTen").addClickEventListener(function(){
            self._c = GOLD_SUMMON;
            self._number = TEN_TIMES;
            self._mc.httpSend(self._number,self._c);
        });
        DSBImage.getChildByName("Button_buyTen").addClickEventListener(function(){
            self._c = DIAMOND_SUMMON;
            self._number = TEN_TIMES;
            self._mc.httpSend(self._number,self._c);
        });
        GSBImage.getChildByName("Button_buyOne").addClickEventListener(function(){
            self._c = GOLD_SUMMON;
            self._number = ONCE;
            self._mc.httpSend(self._number,self._c);
        });
        DSBImage.getChildByName("Button_buyOne").addClickEventListener(function(){
            self._c = DIAMOND_SUMMON;
            self._number = ONCE;
            self._mc.httpSend(self._number,self._c);
        });

        summonTenPanel.getChildByName("Button_confirm").addClickEventListener(function(){
            summonTenPanel.setVisible(false);
        });
        summonTenPanel.getChildByName("Button_again").addClickEventListener(function(){
            self._mc.httpSend(self._number,self._c);
        });
        summonOncePanel.getChildByName("Button_confirm").addClickEventListener(function(){
            summonOncePanel.setVisible(false);
        });
        summonOncePanel.getChildByName("Button_again").addClickEventListener(function(){
            self._mc.httpSend(self._number,self._c);
        });
    },

    summon : function(){
        cc.log("tavern number c",this._number,this._c);
        switch(this._number)
        {
            case ONCE:
                this._consumeMC.update();
                this.summonOnce();
                break;
            case TEN_TIMES:
                this._consumeMC.update();
                this.summonTenTimes();
                break;
            default:
                break;
        }

    },

    summonOnce : function(){
        var summonOncePanel = this._widget.getChildByName("Panel_summon_once");
        summonOncePanel.setVisible(true);
        var image =  summonOncePanel.getChildByName("Image_1");
        image.getChildByName("Text_name").setString(this._mc._model.pub[1].name);
        image.getChildByName("Text_num").setString(this._mc._model.pub[1].num);
        image.setVisible(false);
        image.setScale(0.1);
        var seq = cc.sequence(cc.delayTime(0.1),cc.show(),cc.scaleTo(0.3,1,1));
        image.runAction(seq);

    },

    summonTenTimes : function(){
        var summonTenPanel = this._widget.getChildByName("Panel_summon_ten");
        summonTenPanel.setVisible(true);
        for(var i = 1;i <= 10 ; ++i)
        {
            var image =  summonTenPanel.getChildByName("Image_"+i);
            image.getChildByName("Text_name").setString(this._mc._model.pub[i].name);
            image.getChildByName("Text_num").setString(this._mc._model.pub[i].num);
            image.setVisible(false);
            image.setScale(0.1);
            var seq = cc.Sequence(cc.DelayTime(i*0.1),cc.Show(),cc.ScaleTo(0.3,1,1));
            image.runAction(seq);
        }
    }
});

var TavernScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new TavernLayer(mc);
        this.addChild(this._mapLayer);
        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }
});