/**
 * Created by xiaojian on 15/09/28.
 * @Author xiaojian
 * @desc   ...
 */


 customssDate :
 {


 }

var CustomsLayer = cc.Layer.extend({
    _frist : true,
    _mc:null,
    _widget:null,
    _consume : null,
    _customsNum:0,
    _passNum:0,
    _showNum : 0,
    _type : 0,
    _enemyCast : {},
    _drop : {},
    _light : null,

    ctor:function (mc) {
        this._super();
        this._mc = mc;
        this._type = this._mc._model.type;

        var size = cc.director.getWinSize();
        var heroStrengthen = ccs.load(res.customs_scene_json);
        this._widget = heroStrengthen.node;

        fb.widgetAdapter(this._widget);  
        this.addChild(this._widget);
        this.initUI();

        return true;
    },

    //
    initUI:function(){
        this._widget.getChildByName("Panel_mask").setVisible(false);
        this._widget.getChildByName("Panel_mask").setTouchEnabled(false);
        this.initCustoms();
        this.initCheckBox();

        this._consume = new ConsumeMC(this);
        this._consume.view();
    },


    initCheckBox : function(){
        var self = this;
        var ordinaryCheckBox = this._widget.getChildByName("Panel_main").getChildByName("Image_customs").getChildByName("CheckBox_ordinary");
        var eliteCheckBox = this._widget.getChildByName("Panel_main").getChildByName("Image_customs").getChildByName("CheckBox_elite");
        //初始化
        if(self._type == 1){
            ordinaryCheckBox.setSelected(true);
            ordinaryCheckBox.setTouchEnabled(false);
            eliteCheckBox.setSelected(false);
            eliteCheckBox.setTouchEnabled(true);
        }else{
            ordinaryCheckBox.setSelected(false);
            ordinaryCheckBox.setTouchEnabled(true);
            eliteCheckBox.setSelected(true);
            eliteCheckBox.setTouchEnabled(false);
        }


        ordinaryCheckBox.addClickEventListener(function(){
            ordinaryCheckBox.setSelected(true);
            ordinaryCheckBox.setTouchEnabled(false);
            eliteCheckBox.setSelected(false);
            eliteCheckBox.setTouchEnabled(true);
            self._type = 1;
            self.initCustoms();
        });
        eliteCheckBox.addClickEventListener(function(){
            ordinaryCheckBox.setSelected(false);
            ordinaryCheckBox.setTouchEnabled(true);
            eliteCheckBox.setSelected(true);
            eliteCheckBox.setTouchEnabled(false);
            self._type = 2;
            self.initCustoms();
        });
    },

    initPrize : function(){
        var delay = 0;
        var differenceTime = 0.105;
        var self = this;
        var times = self._mc._model.timesCnt;
        var prizeSV = this._widget.getChildByName("Panel_mask").getChildByName("ScrollView_prize");
        this._widget.getChildByName("Panel_mask").setLocalZOrder(9999);
        var prizePanel  = prizeSV.getChildByName("Panel_prize");
        var endImage =  prizeSV.getChildByName("Image_end");
        endImage.setVisible(false);
        endImage.setScale(0.1);
        self._frist = false;
        prizePanel.retain();
        endImage.retain();
        prizeSV.removeAllChildren();
        prizeSV.addChild(prizePanel);
        prizeSV.addChild(endImage);
        self._widget.getChildByName("Panel_mask").setVisible(true);
        self._widget.getChildByName("Panel_mask").setTouchEnabled(true);
        this._widget.getChildByName("Panel_mask").getChildByName("Button_close").addClickEventListener(function(){
            self._widget.getChildByName("Panel_mask").setVisible(false);
            self._widget.getChildByName("Panel_mask").setTouchEnabled(false);
        });

        //计算滚动区域高度
        var height = times*(prizePanel.getContentSize().height + 20) + endImage.getContentSize().height + 20*2;
        var maxHeight = height > prizeSV.getContentSize().height? height: prizeSV.getContentSize().height;
        prizeSV.setInnerContainerSize(cc.size(prizeSV.getContentSize().width, maxHeight));
        var pos = cc.p(prizeSV.getContentSize().width/2,maxHeight - 20 - prizePanel.getContentSize().height/2);
        if(!self._frist){
            prizeSV.scrollToTop(0.2,false);
        }
        var SVMoveCnt = 1;
        for(var i = 1; i<=times;i++)
        {
            var prize = prizePanel.clone();
            prize.setTag(i);
            var consumePanel = prize.getChildByName("Panel_consume");
       //     var timesImage = prize.getChildByName("Panel_consume").getChildByName("Image_times");
            prize.getChildByName("Panel_consume").getChildByName("Image_times").getChildByName("Text_times").setString("第" + i + "战");
            prize.getChildByName("Panel_consume").getChildByName("Text_gold").setString(self._mc._model.coin);
            var num = 6;
            if(self._type ==2){
                num = 12;
            }
            prize.getChildByName("Panel_consume").getChildByName("Text_exp").setString(num);

            var consumePanelPos = consumePanel.getPosition();
            consumePanel.setPosition(cc.p(consumePanelPos.x+600,consumePanelPos.y));
            consumePanel.runAction(cc.sequence(cc.delayTime(delay),cc.moveTo(0.2,consumePanelPos)));
            delay += differenceTime;
            prize.setPosition(pos);
            prize.setVisible(true);
            pos.y -= (prizePanel.getContentSize().height + 20);
            prizePanel.getParent().addChild(prize);
            var stuffTmp = prize.getChildByName("Image_prize").getChildByName("Image_stuff");
            stuffTmp.setVisible(false);
            prize.getChildByName("Image_prize").setVisible(false);
            prize.getChildByName("Image_prize").runAction(cc.sequence(cc.delayTime(delay),cc.show()));
            delay += differenceTime;
            var stuffPos = stuffTmp.getPosition();
            for(var j = 1;j<=self._mc._model.times[i].length;j++){
                var stuff = stuffTmp.clone();
                stuff.setPosition(stuffPos);
                stuff.setScale(0.1);
                stuff.runAction(cc.sequence(cc.delayTime(delay),cc.spawn(cc.scaleTo(0.2,1),cc.show())));
                delay += differenceTime;
                stuffPos.x += stuffTmp.getContentSize().width + 20;
                stuff.getChildByName("Text_name").setString(self._mc._model.times[i].prize[j].name);
                stuff.getChildByName("Text_num").setString(self._mc._model.times[i].prize[j].num);
                stuffTmp.getParent().addChild(stuff);
            }
            if(i!=times){
                prizeSV.runAction(cc.sequence(cc.delayTime(delay),cc.callFunc(function(){prizeSV.scrollToPercentVertical((SVMoveCnt++)/(times-1)*100,0.1,false);})));
            }else{
                endImage.runAction(cc.sequence(cc.delayTime(delay),cc.spawn(cc.show(),cc.scaleTo(0.2,1))));
            }
            prizeSV.setScrollBarEnabled(false);
        }
        pos.y += prizePanel.getContentSize().height -2*endImage.getContentSize().height;
        prizePanel.setVisible(false);
        endImage.setPosition(pos);
    },

    initCustoms :function(){
        //初始化
        var self = this;
        this._customsNum = this._mc._model.customs[self._type].TotalNum ;
        this._passNum = this._mc._model.customs[self._type].SectionNum ;
        this._showNum = this._passNum< this._customsNum?this._passNum+1:this._passNum;
        this.initMopUp();

        var self = this;
        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);
        var customsScrollview = this._widget.getChildByName("Panel_main").getChildByName("Image_customs").getChildByName("ScrollView_customs");
        customsScrollview.setScrollBarEnabled(false);
        var customsTemplate = customsScrollview.getChildByName("customs_template");
        var chestTemplate = customsScrollview.getChildByName("chest_template");
        chestTemplate.getChildByName("Text_star").setString(this._mc._model.customs[self._type].CurrStarNum + "/" + 3*this._mc._model.customs[self._type].TotalNum);
        var pos = customsTemplate.getPosition();
        for(var i = 1 ;i <= this._customsNum;++i)
        {
            customsTemplate.getParent().removeChildByTag(i);
        }
        for(var i = 1 ;i <= this._customsNum;++i)
        {
            var customs =  customsTemplate.clone();
            customs.setTag(i);
            customs.setPosition(pos);
            customs.getChildByName("Image_light").setVisible(false);
            self.shutLight();
            customs.addClickEventListener(function (sender) {
                sender.getChildByName("Image_light").setVisible(true);
                sender.getParent().getChildByTag(self._showNum).getChildByName("Image_light").setVisible(false);
                sender.getParent().getChildByTag(self._showNum).setTouchEnabled(true);
                sender.setTouchEnabled(false);
                self._light = sender;
                self.setEnemyCast(sender.getTag());
                self.setAndDrop(sender.getTag());
                self._showNum = sender.getTag();
                self.initMopUp();
                var w = Math.abs(customsScrollview.getContentSize().width - customsScrollview.getInnerContainer().getContentSize().width);
                var p =  ((sender.getTag()+3)*(customsTemplate.getContentSize().width + 10) - customsScrollview.getContentSize().width )/w*100;
                customsScrollview.scrollToPercentHorizontal(p,0.1,false);
            });
            pos.x += customsTemplate.getContentSize().width + 10;
            chestTemplate.getParent().addChild(customs);
            if(i<=this._passNum){
                this.initCustomsInfo(customs);
                customs.setTouchEnabled(true);
            }else if(i == this._passNum+1 && !(this._passNum +1 > this.customs)){
                customs.getChildByName("Image_star_1" ).getChildByName("Image_star").setVisible(false);
                customs.getChildByName("Image_star_2" ).getChildByName("Image_star").setVisible(false);
                customs.getChildByName("Image_star_3" ).getChildByName("Image_star").setVisible(false);
                customs.getChildByName("Image_locked").setVisible(false);
                customs.setTouchEnabled(true);
            }
            if(i==self._showNum){
                customs.getChildByName("Image_light").setVisible(true);
                self._light = customs;
                self._light.setTouchEnabled(false);
            }
        }

        chestTemplate.setPosition(pos);
        var maxWidth = (this._customsNum +2) * (customsTemplate.getContentSize().width +10) + chestTemplate.getContentSize().width + 40;
        customsScrollview.setInnerContainerSize(cc.size(maxWidth,customsScrollview.getContentSize().height));

        //初始化显示关卡
        var w = Math.abs(customsScrollview.getContentSize().width - customsScrollview.getInnerContainer().getContentSize().width);
        var p =  ((self._showNum+3)*(customsTemplate.getContentSize().width + 10) - customsScrollview.getContentSize().width )/w*100;
        customsScrollview.scrollToPercentHorizontal(p,0.1,false);
        chestTemplate.getParent().getChildByTag(self._showNum).getChildByName("Image_light").setVisible(true);
        self.setEnemyCast(self._showNum);
        self.setAndDrop(self._showNum);
        self._light = chestTemplate.getParent().getChildByTag(self._showNum);

        var leftBtn = this._widget.getChildByName("Panel_main").getChildByName("Image_customs").getChildByName("Button_left");
        var rightBtn = this._widget.getChildByName("Panel_main").getChildByName("Image_customs").getChildByName("Button_right");
        leftBtn.addClickEventListener(function(){
            if(self._showNum - 1 >= 1){
                self._showNum--;
                var w = Math.abs(customsScrollview.getContentSize().width - customsScrollview.getInnerContainer().getContentSize().width);
                var p =  ((self._showNum+3)*(customsTemplate.getContentSize().width + 10) - customsScrollview.getContentSize().width )/w*100;
                customsScrollview.scrollToPercentHorizontal(p,0.1,false);
                self._light.getChildByName("Image_light").setVisible(false);
                chestTemplate.getParent().getChildByTag(self._showNum).getChildByName("Image_light").setVisible(true);
                self._light.setTouchEnabled(true);
                chestTemplate.getParent().getChildByTag(self._showNum).setTouchEnabled(false);
                self.setEnemyCast(self._showNum);
                self.setAndDrop(self._showNum);
                self._light = chestTemplate.getParent().getChildByTag(self._showNum);
                self.initMopUp();
            }
        });

        rightBtn.addClickEventListener(function(){
            if(self._showNum + 1 <= self._passNum + 1 && self._showNum + 1<= self._customsNum){
                self._showNum++;
                var w = Math.abs(customsScrollview.getContentSize().width - customsScrollview.getInnerContainer().getContentSize().width);
                var p =  ((self._showNum+3)*(customsTemplate.getContentSize().width + 10) - customsScrollview.getContentSize().width )/w*100;
                customsScrollview.scrollToPercentHorizontal(p,0.1,false);
                self._light.getChildByName("Image_light").setVisible(false);
                chestTemplate.getParent().getChildByTag(self._showNum).getChildByName("Image_light").setVisible(true);
                self._light.setTouchEnabled(true);
                chestTemplate.getParent().getChildByTag(self._showNum).setTouchEnabled(false);
                self.setEnemyCast(self._showNum);
                self.setAndDrop(self._showNum);
                self._light = chestTemplate.getParent().getChildByTag(self._showNum);
                self.initMopUp();
            }
        });
    },

    initMopUp : function()
    {
        var self = this;
        var n = 2;

        if(this._mc._model.customs[self._type].InfoList[self._showNum].star>0){
            n = 1;
        }
        if(this._mc._model.customs[self._type].InfoList[self._showNum].star == 3){
            this._widget.getChildByName("Panel_main").getChildByName("Image_mop_up").getChildByName("Button_1").addClickEventListener(function(){
                self._mc.httpChallengeSend(2,self._mc._model.chapter,self._showNum,n,self._type);
            });
            this._widget.getChildByName("Panel_main").getChildByName("Image_mop_up").getChildByName("Button_10").addClickEventListener(function(){
                self._mc.httpChallengeSend(3,self._mc._model.chapter,self._showNum,n,self._type);
            });
        }else{
            this._widget.getChildByName("Panel_main").getChildByName("Image_mop_up").getChildByName("Button_1").addClickEventListener(function(){
                //无法扫荡
            });
            this._widget.getChildByName("Panel_main").getChildByName("Image_mop_up").getChildByName("Button_10").addClickEventListener(function(){
                //无法扫荡
            });
        }
        this._widget.getChildByName("Panel_main").getChildByName("Button_fighting").addClickEventListener(function(){
            self._mc.httpChallengeSend(1,self._mc._model.chapter,self._showNum,n,self._type);
        });
    },

    initCustomsInfo : function(customs)
    {
        //
        var self = this;
        var j = customs.getTag();
        var star = this._mc._model.customs[self._type].InfoList[j].star;
        //显示已解锁及过关星级
        for(var i = 1;i <= 3 ;i++)
        {
            customs.getChildByName("Image_star_" + i).getChildByName("Image_star").setVisible(false);
            customs.getChildByName("Image_star_" + i).getChildByName("Image_star").setVisible(star>0);
            star--;
        }
        customs.getChildByName("Image_locked").setVisible(false);
    },

    shutLight:function(i){
        for(var i = 1 ;i <= this._customsNum;++i)
        {
             this._widget.getChildByName("Panel_main").getChildByName("Image_customs").getChildByName("ScrollView_customs").getChildByName("customs_template").getChildByName("Image_light").setVisible(false);
        }
    },

    setEnemyCast : function(tag){
        var self = this;
        var monster = this._mc._model.customs[self._type].InfoList[tag].monsterList;
        var length = 0;
        for(var k in monster){
            length++;
        };
        var customsInfo = this._widget.getChildByName("Panel_main").getChildByName("Image_customs_info");
        var enemysTemplate = customsInfo.getChildByName("Panel_enemy").getChildByName("Image_enemy_Template");
        enemysTemplate.setVisible(false);
        enemysTemplate.retain();
        var epos = enemysTemplate.getPosition(); //enemys初始位置
        customsInfo.getChildByName("Panel_enemy").removeAllChildren();
        customsInfo.getChildByName("Panel_enemy").addChild(enemysTemplate);
        customsInfo.getChildByName("Image_advise").getChildByName("Text_level").setString(this._mc._model.customs[self._type].InfoList[tag].level);

        for(var i =1; i<=  length;i++)
        {
            var enemys = enemysTemplate.clone();
            enemys.setVisible(true);
            enemys.setTag(i);
            enemys.setPosition(epos);
            epos.x += enemysTemplate.getContentSize().width + 10;
            customsInfo.getChildByName("Panel_enemy").addChild(enemys);
            //初始化显示怪物信息
            enemys.getChildByName("Text_name").setString(monster[i].name_zh);
            enemys.getChildByName("Text_grade").setString(monster[i].grade);
            enemys.getChildByName("Text_level").setString(monster[i].level);
            //品质颜色
            switch(parseInt(monster[i].quality/10)){
                case fb.UI_QUALITY_WHITE :
                    enemys.getChildByName("Image_quality").loadTexture(res.common_quality_white);
                    break;
                case fb.UI_QUALITY_GREEN :
                    enemys.getChildByName("Image_quality").loadTexture(res.common_quality_green);
                    break;
                case fb.UI_QUALITY_BLUE :
                    enemys.getChildByName("Image_quality").loadTexture(res.common_quality_blue);
                    break;
                case fb.UI_QUALITY_PURPLE :
                    enemys.getChildByName("Image_quality").loadTexture(res.common_quality_purple);
                    break;
                case fb.UI_QUALITY_GOLDEN :
                    enemys.getChildByName("Image_quality").loadTexture(res.common_quality_golden);
                    break;
                default:
                    cc.log("get quality error",monster[i].quality);
                    break;
            }
            //品质星级
            var number = monster[i].quality%10;
            var starTemplate = enemys.getChildByName("Image_star");
            starTemplate.setVisible(false);
            enemys.getChildByName("Image_quality").removeAllChildren();
            switch(number%2){
                case 0:
                {
                    var pos = starTemplate.getPosition();
                    var cos = starTemplate.getContentSize();
                    pos.x -= (cos.width*parseInt(number/2) - cos.width/2);
                    for(var k = 0; k<number; k++)
                    {
                        var star = starTemplate.clone();
                        star.setVisible(true);
                        star.setPosition(pos);
                        pos.x += cos.width;
                        enemys.getChildByName("Image_quality").addChild(star);
                    }
                    break;
                }
                case 1:
                {
                    var pos = starTemplate.getPosition();
                    var cos = starTemplate.getContentSize();
                    pos.x -= cos.width*parseInt(number/2);
                    for(var k = 0; k<number; k++)
                    {
                        var star = starTemplate.clone();
                        star.setVisible(true);
                        star.setPosition(pos);
                        pos.x += cos.width;
                        enemys.getChildByName("Image_quality").addChild(star);
                    }
                    break;
                }
                default:
                    break;
            }
        }
    },

    setAndDrop :function(tag)
    {
        var self = this;
        var reward = this._mc._model.customs[self._type].InfoList[tag].rewardList;
        var length = 0;
        for(var i in reward){
            length++;
        };
        var customsInfo = this._widget.getChildByName("Panel_main").getChildByName("Image_customs_info");
        var fallTemplate = customsInfo.getChildByName("Panel_fall").getChildByName("Image_fall_Template");
        fallTemplate.setVisible(false);
        fallTemplate.retain();
        var fpos = fallTemplate.getPosition(); //fall初始位置
        customsInfo.getChildByName("Panel_fall").removeAllChildren();
        customsInfo.getChildByName("Panel_fall").addChild(fallTemplate);
        for(var j =1; j<= length;j++)
        {
            var fall = fallTemplate.clone();
            fall.setTag(j);
            fall.setVisible(true);
            fall.setPosition(fpos);
            fpos.x += fallTemplate.getContentSize().width + 10;
            customsInfo.getChildByName("Panel_fall").addChild(fall);
            fall.getChildByName("Text_name").setString(reward[j].name);
        }
        fallTemplate.setVisible(false);
    },

    setAdviseLV : function(text) {
       this._widget.getChildByName("Panel_main").getChildByName("Image_customs_info").getChildByName("Image_advise").setString(text);
    },

    updateUI : function(){
        this._consume.update();
    },

});

var CustomsScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
        cc.log("CustomsScene ctor");        
    },

    init:function(mc){
        this._super();
        this._mapLayer = new CustomsLayer(mc);
        this.addChild(this._mapLayer);
        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    },

    cleanup:function(){
        this._super();
        cc.log("CustomsScene cleanup");
    }       
});