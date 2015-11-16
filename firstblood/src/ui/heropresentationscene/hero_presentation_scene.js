
/**
 * Created by fable on 15/08/28.
 * @Author fable
 * @desc   ...
 */

var HeroPresentationLayer = cc.Layer.extend({

    _mc:null,
    _widget:null,
    _action: 1,
    _flag: true,

    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var size = cc.director.getWinSize();
        var heroPresentation = ccs.load(res.hero_presentation_scene);
        this._widget = heroPresentation.node;

        fb.widgetAdapter(this._widget);  
        this.addChild(this._widget);

        this.initUI();

        return true;
    },

    //
    initUI:function(){
        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);

        var self = this;
        var card = this._widget.getChildByName("Panel_main").getChildByName("Image_heroCard");
        var leftBtn = this._widget.getChildByName("Button_left");
        var rightBtn = this._widget.getChildByName("Button_right");
        var showBtn = this._widget.getChildByName("Panel_main").getChildByName("Button_show");
        var discussionBtn = this._widget.getChildByName("Panel_main").getChildByName("Button_discussion");
        var  pSV = this._widget.getChildByName("Panel_main").getChildByName("ScrollView_presentation");
//        card.setAnchorPoint(cc.p(0, 0));
        var cardY = card.getPosition().y;

        card.addClickEventListener(function () {
//            var spawn = cc.spawn(cc.scaleBy(0.2, 1.68), cc.rotateBy(0.2, -90),cc.moveBy(0.2,card.getContentSize().height*1.68/2 - card.getContentSize().width/2-20,-55));
//            var factor = (cc.director.getVisibleSize().height>640? cc.director.getVisibleSize().height:640)/card.getContentSize().width;

            var cardScale = card.getContentSize().height/card.getContentSize().width;
            var visibleScale = cc.director.getVisibleSize().width/cc.director.getVisibleSize().height;
            var factor =  cardScale < visibleScale ?  (cc.director.getVisibleSize().height-30) /card.getContentSize().width : (cc.director.getVisibleSize().width-65) /card.getContentSize().height ;
//            var skew = cc.sequence(cc.skewBy(0.075,0,-15),cc.skewBy(0.075,0,15));
//            var spawn = cc.spawn(skew,cc.scaleBy(0.15,factor),cc.rotateBy(0.15, -90),cc.moveBy(0.15,card.getContentSize().height*factor/2 - 30*factor ,-card.getContentSize().width*factor/2-33.5*factor));

            var skew = cc.sequence(cc.skewBy(0.075,0,-15),cc.skewBy(0.075,0,15));
            var spawn = cc.spawn(skew,cc.scaleBy(0.15,factor),cc.rotateBy(0.15, -90),cc.moveBy(0.15,card.getParent().getContentSize().width - 5*factor,-cardY-5*factor));


            var moveBy = cc.moveBy(0.15,cc.director.getVisibleSize().width,0);
            var fadeIn = cc.fadeIn(0.2);
            var fadeOut = cc.fadeOut(0.2);

            if(self._flag == false)
                return;

            switch(self._action){
                case 1 :
                {
                    var seq = cc.sequence(spawn, cc.callFunc(function(){
                        self._flag = true;
                    }, this));
                    pSV.runAction(moveBy);
                    card.runAction(seq);
                    leftBtn.runAction(fadeOut.clone());
                    rightBtn.runAction(fadeOut.clone());
                    showBtn.runAction(fadeOut.clone());
                    discussionBtn.runAction(fadeOut.clone());
                    self._action = 0;
                }
                break;
                case 0 :
                {
                    var seq = cc.sequence(spawn.reverse(), cc.callFunc(function(){
                        self._flag = true;
                    }, this));
                    pSV.runAction(moveBy.reverse());
                    card.runAction(seq);
                    leftBtn.runAction(fadeIn.clone());
                    rightBtn.runAction(fadeIn.clone());
                    showBtn.runAction(fadeIn.clone());
                    discussionBtn.runAction(fadeIn.clone());
                    self._action = 1;
                }
                break;
            }

            self._flag = false;
        });

    },
});

var HeroPresentationScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new HeroPresentationLayer(mc);
        this.addChild(this._mapLayer);

        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }

});