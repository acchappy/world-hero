/**
 * Created by Tom on 15/09/06.
 * @Author Tom
 * @desc   ...
 */

var storeType = [];
storeType[1] = "groceries";
storeType[2] = "honor";
storeType[3] = "trial";
storeType[4] = "union";


var StoreLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,
    _storeType : 0,
    _consume : null,
    _time : 0,
    _renew : true,

    ctor:function (mc) {
        this._super();
        this._mc = mc;
        this._storeType = storeType[1];

        var size = cc.director.getWinSize();
        this._widget = ccs.load(res.store_scene_json).node;

        fb.widgetAdapter(this._widget);
        this.addChild(this._widget);

        this.initUI();
        this.scheduleUpdate();

        return true;
    },

    //
    initUI:function(){
        this.initBtn();
    },

    initBtn:function(){
        this.initCommon();
        this.initCheckBox();
        this.initRenew();
    },

    initRenew : function(){
        var self = this;
        var renewPanel = this._widget.getChildByName("Panel_renew_mask");
        var renewImage = renewPanel.getChildByName("Image_renew_bg");
        var renewBtn = this._widget.getChildByName("Panel_main").getChildByName("Button_renew");
        renewImage.getChildByName("Text_renew").setString("第"+(this._mc._model.renew+1) +"次刷新，需要");
        renewImage.getChildByName("Text_diamond").setString(this._mc._model.renewDiamond);
        renewBtn.addClickEventListener(function(){
            renewPanel.setVisible(true);
            renewImage.setScale(0.1);
            renewImage.runAction(cc.sequence(cc.scaleTo(0.15,1.1,1.1),cc.scaleTo(0.25,1,1)));
        });
        renewImage.getChildByName("Button_close").addClickEventListener(function(){
            renewPanel.setVisible(false);
        });
        renewImage.getChildByName("Button_confirm").addClickEventListener(function(){
            renewPanel.setVisible(false);
            self._mc.getMailRenewPropCmd();
        });
    },

    //初始化公共返回按钮
    initCommon:function(){

        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);
        this._consume = new ConsumeMC(this);
        this._consume.view();
    },

    //初始化复选框按键
    initCheckBox:function(){
        var groceriesCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_groceries");
        var honorCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_honor");
        var trialCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_trial");
        var unionCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_union");
        this.initStuffScrollView();

        //初始化CheckBox列表
        groceriesCheckBox.setTag(1);
        honorCheckBox.setTag(2);
        trialCheckBox.setTag(3);
        unionCheckBox.setTag(4);
        groceriesCheckBox.setSelected(true);
        honorCheckBox.setSelected(false);
        trialCheckBox.setSelected(false);
        unionCheckBox.setSelected(false);
        groceriesCheckBox.setTouchEnabled(false);
        honorCheckBox.setTouchEnabled(true);
        trialCheckBox.setTouchEnabled(true);
        unionCheckBox.setTouchEnabled(true);

        //所有CheckBox添加点击事件
        this.setAddClickEvent(groceriesCheckBox);
        this.setAddClickEvent(honorCheckBox);
        this.setAddClickEvent(trialCheckBox);
        this.setAddClickEvent(unionCheckBox);

    },

    //给CheckBox添加点击事件
    setAddClickEvent : function(checkBox){
        var self = this;
        checkBox.addClickEventListener(function(sender){
            self._widget.getChildByName("Panel_main").getChildByName("CheckBox_groceries").setSelected(false);
            self._widget.getChildByName("Panel_main").getChildByName("CheckBox_honor").setSelected(false);
            self._widget.getChildByName("Panel_main").getChildByName("CheckBox_trial").setSelected(false);
            self._widget.getChildByName("Panel_main").getChildByName("CheckBox_union").setSelected(false);
            self._widget.getChildByName("Panel_main").getChildByName("CheckBox_groceries").setTouchEnabled(true);
            self._widget.getChildByName("Panel_main").getChildByName("CheckBox_honor").setTouchEnabled(true);
            self._widget.getChildByName("Panel_main").getChildByName("CheckBox_trial").setTouchEnabled(true);
            self._widget.getChildByName("Panel_main").getChildByName("CheckBox_union").setTouchEnabled(true);
            sender.setSelected(true);
            sender.setTouchEnabled(false);
            self.initStuffScrollView();
            self._storeType = storeType[sender.getTag()];
        });
    },

    initStuffScrollView : function(){

        var stuffInterval = 20;
        var delay = 0;
        var stuffSV = this._widget.getChildByName("Panel_main").getChildByName("ScrollView_stuff");
        var leftBtn = this._widget.getChildByName("Panel_main").getChildByName("Button_left");
        var rightBtn = this._widget.getChildByName("Panel_main").getChildByName("Button_right");
        stuffSV.scrollToPercentHorizontal(0,0.1,false);
        leftBtn.addClickEventListener(function(){
            stuffSV.scrollToPercentHorizontal(0,1,true);
        });
        rightBtn.addClickEventListener(function(){
            stuffSV.scrollToPercentHorizontal(100,1,true);
        });
        stuffSV.setScrollBarEnabled(false);
        stuffSV.setTouchEnabled(false);
        var stuffTemplate = this._widget.getChildByName("Panel_main").getChildByName("Image_stuff_bg");
        stuffTemplate.setVisible(false);
        var pos = cc.p(stuffTemplate.getContentSize().width/2+stuffInterval,stuffSV.getContentSize().height-stuffInterval-stuffTemplate.getContentSize().height/2);
        stuffSV.removeAllChildren();
        for(var i = 1;i<=12;i++){
            var stuff = stuffTemplate.clone();
            stuff.setPosition(pos);
            if(i<=6)
            {
                stuff.runAction(cc.sequence(cc.delayTime(delay),cc.Show()));
                delay += 0.125;
            }else{
                stuff.runAction(cc.sequence(cc.delayTime(delay),cc.Show(),cc.callFunc(function(){
                    stuffSV.setTouchEnabled(true);
                })));
            }
            this.setStuffInfo(stuff,i);
            switch(i)
            {
                case 3:
                    pos.x = stuffTemplate.getContentSize().width/2+stuffInterval;
                    pos.y -= stuffTemplate.getContentSize().height+stuffInterval;
                    break;
                case 6:
                    pos.x = stuffTemplate.getContentSize().width/2+stuffInterval + stuffSV.getContentSize().width;
                    pos.y += stuffTemplate.getContentSize().height+stuffInterval;
                    break;
                case 9:
                    pos.x = stuffTemplate.getContentSize().width/2+stuffInterval + stuffSV.getContentSize().width;
                    pos.y -= stuffTemplate.getContentSize().height+stuffInterval;
                    break;
                default:
                    pos.x += stuffTemplate.getContentSize().width+stuffInterval;
                    break;
            }
            stuffSV.addChild(stuff);
        }
    },

    setStuffInfo : function(stuff,index)
    {
        var self = this;
        stuff.getChildByName("Text_stuff_name").setString(this._mc._model.stuffList[index].name);//物品名字
        stuff.setTag(index);
        stuff.getChildByName("Image_price_bg").getChildByName("Text_stuff_price").setString(this._mc._model.stuffList[index].val);//物品售价
        stuff.getChildByName("Image_stuff").getChildByName("Text_stuff_num").setString(this._mc._model.stuffList[index].num);
        stuff.addClickEventListener(function(sender){
            self._mc.getMallPayPropCmd(sender.getTag());
        });
        if(!this._mc._model.stuffList[index].get){
            stuff.getChildByName("Image_stuff").getChildByName("Image_sell_out").setVisible(false);
        }else{
            stuff.getChildByName("Image_stuff").getChildByName("Image_sell_out").setVisible(true);
            stuff.setTouchEnabled(false);
        }
        switch(this._mc._model.stuffList[index].pay){
            case "c" :
                stuff.getChildByName("Image_price_bg").getChildByName("Image_gold").loadTexture(res.common_gold);
                if(this._mc._model.gold < this._mc._model.stuffList[index].val)
                {
                    stuff.getChildByName("Image_price_bg").getChildByName("Text_stuff_price").setColor(cc.color.RED);
                }else{
                    stuff.getChildByName("Image_price_bg").getChildByName("Text_stuff_price").setColor(cc.color.WHITE);
                }
                break;
            case "d" :
                stuff.getChildByName("Image_price_bg").getChildByName("Image_gold").loadTexture(res.common_jewel);
                if(this._mc._model.diamond < this._mc._model.stuffList[index].val)
                {
                    stuff.getChildByName("Image_price_bg").getChildByName("Text_stuff_price").setColor(cc.color.RED);
                }else{
                    stuff.getChildByName("Image_price_bg").getChildByName("Text_stuff_price").setColor(cc.color.WHITE);
                }
                break;
            default:
                break;
        }
    },

    pay : function(){
        var stuff = this._widget.getChildByName("Panel_main").getChildByName("ScrollView_stuff").getChildByTag(this._mc._model.selectIndex);
        var sellOutImage = stuff.getChildByName("Image_stuff").getChildByName("Image_sell_out");
        sellOutImage.setVisible(true);
        sellOutImage.setScale(2,2);
        sellOutImage.runAction(cc.sequence(cc.show(),cc.scaleTo(0.1,1,1),cc.callFunc(function(){
            var sellOut = sellOutImage.clone();
            sellOutImage.addChild(sellOut);
            sellOut.setPosition(sellOutImage.getContentSize().width/2,sellOutImage.getContentSize().height/2);
            sellOut.runAction(cc.spawn(cc.fadeTo(0.15,0),cc.scaleTo(0.15,1.5,1.5)));
            stuff.setTouchEnabled(false);//关闭触碰
        })));
        this.updateConsume();
    },

    renew : function(){
        this.initStuffScrollView();
        this.initRenew();
        this.updateConsume();
    },

    updateConsume : function(){
        this._consume.update();
    },

    update : function(dt){
        var timeText = this._widget.getChildByName("Panel_main").getChildByName("Text_time");
        var date = new Date();
        var timeSeconds = 0;
        if(date.getHours()>= 9 && date.getHours()<12){
            timeSeconds = 12*3600 - date.getHours()*3600 - date.getMinutes()*60 - date.getSeconds();
        }else if(date.getHours()>= 12 && date.getHours()<18){
            timeSeconds = 18*3600 - date.getHours()*3600 - date.getMinutes()*60 - date.getSeconds();
        }else if(date.getHours()>= 18 && date.getHours()<21){
            timeSeconds = 21*3600 - date.getHours()*3600 - date.getMinutes()*60 - date.getSeconds();
        }else if(date.getHours()>=21 && date.getHours()<24){
            timeSeconds = 33*3600 - date.getHours()*3600 - date.getMinutes()*60 - date.getSeconds();
        }else{
            timeSeconds = 9*3600 - date.getHours()*3600 - date.getMinutes()*60 - date.getSeconds();
        }
        var hours = parseInt(timeSeconds/3600);
        var minutes = parseInt((timeSeconds-hours*3600)/60);
        var seconds = parseInt(timeSeconds-hours*3600-minutes*60);
//        if(this._renew && ((hours==9 && minutes==0 && seconds==0) || (hours==12 && minutes==0 && seconds==0) || (hours==18 && minutes==0 && seconds==0) || (hours==21 && minutes==0 && seconds==0))){
//            this._renew = false;
//            this._mc.getMailRenewPropCmd();
//        }else{
//            this._renew = true;
//        }
        this._time += dt;
        var s = parseInt(this._time)
        if (s%2)  {
           timeText.setString(fb.fixZero(hours, 2) + " " + fb.fixZero(minutes, 2) + " " + fb.fixZero(seconds, 2));
        } else {
           timeText.setString(fb.fixZero(hours, 2) + ":" + fb.fixZero(minutes, 2) + ":" + fb.fixZero(seconds, 2));
        }
    },
});

var StoreScene = cc.Scene.extend({

    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new StoreLayer(mc);
        this.addChild(this._mapLayer);

        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }
});