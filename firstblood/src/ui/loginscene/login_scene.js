
/**
 * Created by fable on 15/09/08.
 * @Author fable
 * @desc   ...
 */


var LoginMapLayer = cc.Layer.extend({

    _widget:null,
    _mc    :null,

    ctor:function (mc) {
        this._super();

        this._mc = mc;

        var size = cc.director.getWinSize();
        var scene = ccs.load(res.login_scene_json);
        this._widget = scene.node;
        fb.widgetAdapter(this._widget);       
        this.addChild(this._widget);
        
        this.initUI();

        return true;
    },

    //
    initUI:function(){
        var btn = this._widget.getChildByName("Panel_login").getChildByName("Button_youke");
        btn.addClickEventListener(function () {
            this._mc.youkeLogin();
        }.bind(this));

        var btn = this._widget.getChildByName("Panel_login").getChildByName("Button_facebook");
        btn.addClickEventListener(function () {
            this._mc.facebookLogin();
        }.bind(this));

    },

    updateUI:function(){
        cc.log("login scene updateUIxxx");
    }

});

var LoginScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){

        this._super();
        this._mapLayer = new LoginMapLayer(mc);
        this.addChild(this._mapLayer);

        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }

});