

/**
 * Created by xiaojian on 15/09/24.
 * @Author xiaojian
 * @desc   ...
 */



var ChapterLayer = cc.Layer.extend({
    _mc : null,
    _widget : null,
    _customsNum : 0,
    _consume : null,
    _type : 1,

    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var size = cc.director.getWinSize();
        var heroStrengthen = ccs.load(res.chapter_scene_json);
        this._widget = heroStrengthen.node;

        fb.widgetAdapter(this._widget);  
        this.addChild(this._widget);
        this.initUI();

        return true;
    },

    //
    initUI:function(){
        this._consume = new ConsumeMC(this);
        this._consume.view();

        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);

        this.initCustoms();
        this.initCheckBox();
    },

    initCheckBox : function(){
        var self = this;
        var ordinaryCheckBox = this._widget.getChildByName("CheckBox_ordinary");
        var eliteCheckBox = this._widget.getChildByName("CheckBox_elite");
        //初始化
        ordinaryCheckBox.setSelected(true);
        ordinaryCheckBox.setTouchEnabled(false);
        eliteCheckBox.setSelected(false);
        eliteCheckBox.setTouchEnabled(true);

        ordinaryCheckBox.addClickEventListener(function(){
            ordinaryCheckBox.setSelected(true);
            ordinaryCheckBox.setTouchEnabled(false);
            eliteCheckBox.setSelected(false);
            eliteCheckBox.setTouchEnabled(true);
            self._widget.getChildByName("Panel_main").getChildByName("Panel_customsTemp").getChildByName("Image_customs_left").loadTexture(res.chapter_customs_ordinary);
            self._widget.getChildByName("Panel_main").getChildByName("Panel_customsTemp").getChildByName("Image_customs_right").loadTexture(res.chapter_customs_ordinary);
            self._widget.getChildByName("Panel_bg").getChildByName("Image_rudder_left").loadTexture(res.chapter_rudder_ordinary);
            self._widget.getChildByName("Panel_bg").getChildByName("Image_rudder_right").loadTexture(res.chapter_rudder_ordinary);
            self._type = 1;
            self.updateUI();
        });
        eliteCheckBox.addClickEventListener(function(){
            ordinaryCheckBox.setSelected(false);
            ordinaryCheckBox.setTouchEnabled(true);
            eliteCheckBox.setSelected(true);
            eliteCheckBox.setTouchEnabled(false);
            self._widget.getChildByName("Panel_main").getChildByName("Panel_customsTemp").getChildByName("Image_customs_left").loadTexture(res.chapter_customs_elite);
            self._widget.getChildByName("Panel_main").getChildByName("Panel_customsTemp").getChildByName("Image_customs_right").loadTexture(res.chapter_customs_elite);
            self._widget.getChildByName("Panel_bg").getChildByName("Image_rudder_left").loadTexture(res.chapter_rudder_elite);
            self._widget.getChildByName("Panel_bg").getChildByName("Image_rudder_right").loadTexture(res.chapter_rudder_elite);
            self._type = 2;
            self.updateUI();
        });
    },

    initCustoms :function(){
        var self = this;
        this.updateUI();

        var panel = this._widget.getChildByName("Panel_main");
        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            target:null,
            midPos: null,
            beganPos:null,
            movePos: null,
            front: 1,
            panelPos:{},
            onTouchBegan: function (touch, event){
                this.midPos = cc.p(panel.getContentSize().width/2,panel.getContentSize().height/2);
                this.beganPos = touch.getLocation();
//                this.movePos   = touch.getLocation();
                this.leftPos = panel.getChildByTag(1).getPosition().x;
                this.rightPos =  panel.getChildByTag(self._customsNum).getPosition().x;
                for(var i = 1; i <= self._customsNum;++i)
                {
                    this.panelPos[i] = panel.getChildByTag(i).getPosition();
                }
                return true;
            },

            onTouchMoved: function (touch, event){
                if(panel.getChildByTag(1).getPosition().x <= panel.getContentSize().width/3*2 && panel.getChildByTag(self._customsNum).getPosition().x >= panel.getContentSize().width/3)
                {
                    self._widget.getChildByName("Panel_bg").getChildByName("Image_rudder_left").setRotation((touch.getLocation().x-this.beganPos.x)*(360/960));
                    self._widget.getChildByName("Panel_bg").getChildByName("Image_rudder_right").setRotation((touch.getLocation().x-this.beganPos.x)*(360/960));
                    for(var i = 1; i <= self._customsNum;++i)
                    {
                        panel.getChildByTag(i).setPosition(this.panelPos[i].x+(touch.getLocation().x-this.beganPos.x),panel.getChildByTag(i).getPosition().y);
                        panel.getChildByTag(i).setScale(Math.abs(1-Math.abs(panel.getChildByTag(i).getPosition().x-this.midPos.x)/1000));
                        panel.getChildByTag(i).setLocalZOrder(1000-Math.abs(panel.getChildByTag(i).getPosition().x-this.midPos.x));
                    }
                }
            },

            onTouchEnded: function (touch, event){
                if(this.beganPos.x == touch.getLocation().x && cc.rectContainsPoint(cc.rect(panel.getPosition().x,panel.getPosition().y,panel.getContentSize().width,panel.getContentSize().height),touch.getLocation()))
                {

                    var a  = new CustomsMC(this.front,self._type);
                    a.view();
                }
                for(var i = 1; i <= self._customsNum;++i)
                {
                    if(panel.getChildByTag(i).getLocalZOrder() > panel.getChildByTag(this.front).getLocalZOrder())
                    {
                        this.front = i;
                    }
                }
                var distance =   this.midPos.x -panel.getChildByTag(this.front).getPosition().x;
                self._widget.getChildByName("Panel_bg").getChildByName("Image_rudder_left").runAction(cc.RotateBy(0.2,distance*(360/960)));
                self._widget.getChildByName("Panel_bg").getChildByName("Image_rudder_right").runAction(cc.RotateBy(0.2,distance*(360/960)));
                for(var i = 1; i <= self._customsNum;++i)
                {
                    var endPos = cc.p(panel.getChildByTag(i).getPosition().x+distance,panel.getChildByTag(i).getPosition().y);
                    var scaleFactor = Math.abs(1-Math.abs(panel.getChildByTag(i).getPosition().x+distance-this.midPos.x)/1000);
                    var spawn = new cc.Spawn(cc.ScaleTo(0.2,scaleFactor),cc.MoveTo(0.2,endPos));
                    panel.getChildByTag(i).runAction(spawn);
                }
            }
        });
        cc.eventManager.addListener(listener,this);
    },

    setCustomsIntroduce : function(text){
        //设置章节故事介绍
        this._widget.getChildByName("Image_customs_introduce_bg").getChildByName("Text_customs_introduce").setString(text);
    },

    setCustomsName : function(cumtoms,text){
        //设置章节名
        cumtoms.getChildByName("Image_customs_name").getChildByName("Text_customs_name").setString(text);
    },

    setCustomsStar : function(){
        //设置章节完成星级数
        cumtoms.getChildByName("Image_customs_stars").getChildByName("Text_customs_stars").setString(text);
    },

    updateUI : function(){
        //初始化章节数目
        this._customsNum = this._mc._model.starList[this._type].chapterNum;
        var panel = this._widget.getChildByName("Panel_main");
        var cumtomsTemplate = panel.getChildByName("Panel_customsTemp");

        var vs = cc.view.getVisibleSize();
        panel.setPosition(cc.p(vs.width/2-panel.getContentSize().width/2, vs.height/2-panel.getContentSize().height/2));

        cumtomsTemplate.retain();
        cumtomsTemplate.getParent().removeAllChildren();
        var pos = cc.p(panel.getContentSize().width/2,panel.getContentSize().height/2);
        for(var i = 1; i <= this._customsNum;++i)
        {
            var cumtoms = cumtomsTemplate.clone();
            cumtoms.setPosition(pos);
            cumtoms.setTag(i);
            pos.x += panel.getContentSize().width/2+50;
            cumtoms.addClickEventListener(function (sender) {
                cc.log("customs tag",sender.getTag());
            });
            panel.addChild(cumtoms);
            cumtoms.setScale(Math.abs(1-Math.abs(cumtoms.getPosition().x-panel.getContentSize().width/2)/1000));
            cumtoms.setLocalZOrder(1000-Math.abs(cumtoms.x-panel.getContentSize().width/2));
            cumtoms.getChildByName("Image_customs_stars").getChildByName("Text_customs_stars").setString(this._mc._model.starList[this._type].starList[i].currStar + "/" + this._mc._model.starList[this._type].starList[i].allStar);
        }
        cumtomsTemplate.setVisible(false);
        cumtomsTemplate.setEnabled(false);

        this._consume.update();

    },

    cleanup:function(){
        this._super();
        cc.log("ChapterScene layer cleanupbbbbbbbbbbbbbbb");        
    }

});

var ChapterScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);

        cc.log("ChapterScene ctor");        
    },

    init:function(mc){
        this._super();
        this._mapLayer = new ChapterLayer(mc);
        this.addChild(this._mapLayer);
        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    },

    cleanup:function(){
        this._super();
        cc.log("ChapterScene cleanup");
    }    
});