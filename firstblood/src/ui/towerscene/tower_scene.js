/**
 * Created by xiaojian on 15/11/04.
 * @Author xiaojian
 * @desc   ...
 */

var TowerLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,
    _consumeMC:null,
    _interval:10,
    _listener  : null,
    _front :1,
    ctor:function (mc) {
        this._super();
        this._mc = mc;
        this._front = this._mc._model.maxStorey;
        var size = cc.director.getWinSize();
        this._widget = ccs.load(res.tower_scene_json).node;

        fb.widgetAdapter(this._widget);

        this.addChild(this._widget);

        this.initUI();

        return true;
    },

    //
    initUI:function(){
        this.initBtn();
        this.initTower();
    },

    initBtn:function(){
        this.initCommon();
        this.initBattleBtn();
        this.initPrizeBtn();
    },

    initPrizeBtn :function(){
        var self = this;
        var rewardImage = this._widget.getChildByName("Panel_storey_info").getChildByName("Image_reward");
        rewardImage.addClickEventListener(function(){

            self._mc.httpTowerRewardSend(self._front);
//            self.initReward();
        });
        this._widget.getChildByName("Panel_storey_info").getChildByName("Image_prize").addClickEventListener(function(){
            self.showPrize();
        });
    },

    initBattleBtn:function(){
        var self = this;
        var battleBtn = this._widget.getChildByName("Panel_storey_info").getChildByName("Button_battle");
        battleBtn.addClickEventListener(function(){
            //self._mc.addObserver();
            self._mc.httpTowerBattleSend(self._front);
        });
    },

    initReward : function(){
        var self = this;
        var rewardNum = this._mc._model.towerList[self._front].stuff.length;
        var rewardPanel = this._widget.getChildByName("Panel_reward");
        rewardPanel.setVisible(true);
        for(var i=1;i<=rewardNum;++i)
        {
            var box = rewardPanel.getChildByName("Image_"+i);
            box.setTouchEnabled(true);
            box.setVisible(true);
            box.removeAllChildren();
            box.setTag(i);
            box.addClickEventListener(function(sender){
                self.initPrize(sender);
            });
        }
        rewardPanel.getChildByName("Button_get").setTouchEnabled(true);
        rewardPanel.getChildByName("Button_get").addClickEventListener(function(sender){
            self.initAKeyToGet();
            sender.setTouchEnabled(false);
        });
        rewardPanel.getChildByName("Button_close").addClickEventListener(function(){
            self._widget.getChildByName("Panel_storey_info").getChildByName("Image_prize").setVisible(true);
            self._widget.getChildByName("Panel_storey_info").getChildByName("Image_prize").setTouchEnabled(true);
            self._widget.getChildByName("Panel_storey_info").getChildByName("Image_reward").setVisible(false);
            self._widget.getChildByName("Panel_storey_info").getChildByName("Button_battle").setVisible(false);
            self._widget.getChildByName("Panel_storey_info").getChildByName("Button_battle").setTouchEnabled(false);
            self._widget.getChildByName("Panel_storey_info").getChildByName("Image_reward").setTouchEnabled(false);
            rewardPanel.setVisible(false);
        });
    },

    showPrize:function(){
        var self = this;
        var rewardNum = this._mc._model.towerList[self._front].stuff.length;
        var rewardPanel = this._widget.getChildByName("Panel_reward");
        var stuffTmp = this._widget.getChildByName("Panel_reward").getChildByName("Image_stuff");
        rewardPanel.setVisible(true);
        for(var i=1;i<=rewardNum;i++)
        {
            var box = rewardPanel.getChildByName("Image_"+i);
            box.setTouchEnabled(false);
            box.setVisible(true);
            box.removeAllChildren();
            box.setTag(i);
            var stuff = stuffTmp.clone();
            stuff.setPosition(box.getContentSize().width/2,box.getContentSize().height/2+stuff.getContentSize().height);
            stuff.setVisible(true);
            box.addChild(stuff);
            stuff.getChildByName("Text_name").setString(this._mc._model.towerList[self._front].stuff.list[box.getTag()].name);
            stuff.getChildByName("Text_num").setString(this._mc._model.towerList[self._front].stuff.list[box.getTag()].num);
            stuff.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.8,0,10),cc.moveBy(0.8,0,-10))));
        }
        rewardPanel.getChildByName("Button_close").addClickEventListener(function(){
            rewardPanel.setVisible(false);
        });
    },

    initAKeyToGet : function(){
        var self = this;
        var delay = 0;
        var stuffTmp = this._widget.getChildByName("Panel_reward").getChildByName("Image_stuff");

        for(var i=1;i<=this._mc._model.towerList[self._front].stuff.length;i++){
            if(this._mc._model.towerList[self._front].stuff.list[i].w==1)
                continue;
            var box = this._widget.getChildByName("Panel_reward").getChildByName("Image_"+i);
            var stuff = stuffTmp.clone();
            stuff.setVisible(true);
            stuff.getChildByName("Text_name").setString(this._mc._model.towerList[self._front].stuff.list[box.getTag()].name);
            stuff.getChildByName("Text_num").setString(this._mc._model.towerList[self._front].stuff.list[box.getTag()].num);
            stuff.setScale(0.1);
            stuff.setPosition(box.getContentSize().width/2,box.getContentSize().height/2);
            stuff.runAction(cc.sequence(cc.delayTime(delay),cc.spawn(cc.show(),cc.scaleTo(0.2,1,1),cc.moveBy(0.2,0,stuff.getContentSize().height)),cc.callFunc(function(){
               var stuffOut =  stuff.clone();
               stuffOut.removeAllChildren();
               stuff.addChild(stuffOut);
               stuffOut.setPosition(stuff.getContentSize().width/2, stuff.getContentSize().height/2);
               stuffOut.runAction(cc.spawn(cc.fadeTo(0.15,0),cc.scaleTo(0.15,1.5,1.5)));
               box.setTouchEnabled(false);//关闭触碰
            })));
            delay += 0.2;
            box.addChild(stuff);
        }

    },

    initPrize : function(box){
        var self = this;
        var stuffTmp = this._widget.getChildByName("Panel_reward").getChildByName("Image_stuff");
        var stuff = stuffTmp.clone();
        stuff.setVisible(true);
        stuff.getChildByName("Text_name").setString(this._mc._model.towerList[self._front].stuff.list[box.getTag()].name);
        stuff.getChildByName("Text_num").setString(this._mc._model.towerList[self._front].stuff.list[box.getTag()].num);
        stuff.setScale(0.1);
        this._mc._model.towerList[self._front].stuff.list[box.getTag()].w = 1;
        stuff.setPosition(box.getContentSize().width/2,box.getContentSize().height/2);
        stuff.runAction(cc.sequence(cc.spawn(cc.show(),cc.scaleTo(0.2,1,1),cc.moveBy(0.2,0,stuff.getContentSize().height)),cc.callFunc(function(){
           var stuffOut =  stuff.clone();
           stuffOut.removeAllChildren();
           stuff.addChild(stuffOut);
           stuffOut.setPosition(stuff.getContentSize().width/2, stuff.getContentSize().height/2);
           stuffOut.runAction(cc.spawn(cc.fadeTo(0.15,0),cc.scaleTo(0.15,1.5,1.5)));
           box.setTouchEnabled(false);//关闭触碰
        })));
        box.addChild(stuff);
    },

    initCommon : function(){
        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);
        this._consumeMC = new ConsumeMC(this);
        this._consumeMC.view();
    },

    updateTower : function(){
        var self = this;
        var towerTatalNum = 30;
        var storeyTemplate = this._widget.getChildByName("Image_storey");
        storeyTemplate.setVisible(false);
        var bgImage = this._widget.getChildByName("Image_bg");
        var storeyNode = this._widget.getChildByName("Node_storey");
        var storeyPanel = this._widget.getChildByName("Panel_storey");
        var pos = cc.p(0,0);
        storeyNode.removeAllChildren();
        for(var i =1;i<=towerTatalNum;i++)
        {
            var storey = storeyTemplate.clone();
            storey.setTag(i);
            storey.setVisible(true);
            storey.setPosition(pos);
            pos.y += storeyTemplate.getContentSize().height;
            if(i<= this._mc._model.maxStorey){
                storey.getChildByName("Text_storey_num").setString( i +"层");
                storey.getChildByName("Image_lock").setVisible(false);
            }else{
                storey.getChildByName("Text_storey_num").setString( i +"层");
                storey.getChildByName("Text_storey_num").setVisible(false);
                storey.getChildByName("Image_lock").setVisible(true);
            }
            storeyNode.addChild(storey);
        }
         self.initStoreyInfo();
    },

    moveStorey : function(){
        var self = this;
        var storeyNode = this._widget.getChildByName("Node_storey");
        var distance =   0-storeyNode.getChildByTag(self._front).getPosition().y;
        var towerTatalNum = 30;
        for(var i = 1; i <= towerTatalNum;++i)
        {
            var endPos = cc.p(storeyNode.getChildByTag(i).getPosition().x,storeyNode.getChildByTag(i).getPosition().y+distance);
            storeyNode.getChildByTag(i).setPosition(endPos);
        }
    },

    initTower : function(){
        var self = this;
        var towerTatalNum = 30;
        var storeyTemplate = this._widget.getChildByName("Image_storey");
        storeyTemplate.setVisible(false);
        var bgImage = this._widget.getChildByName("Image_bg");
        var storeyNode = this._widget.getChildByName("Node_storey");
        var storeyPanel = this._widget.getChildByName("Panel_storey");
        var pos = cc.p(0,0);
        var ImagePos = bgImage.getPosition();
//            Shader.grayScale(bgImage.getVirtualRenderer().getSprite());

        this.updateTower();
        this.moveStorey();
        self.initStoreyInfo();

        this._listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            target:null,
            beganPos:null,
            movePos: null,
            firstPos: null,
            lastPos: null,
            storeyPos:{},
            onTouchBegan: function (touch, event){
                this.beganPos = touch.getLocation();
                this.firstPos = storeyNode.getChildByTag(1).getPosition();
                this.lastPos =  storeyNode.getChildByTag(towerTatalNum).getPosition();
                for(var i = 1; i <= towerTatalNum;++i)
                {
                    this.storeyPos[i] = storeyNode.getChildByTag(i).getPosition();
                }
                if(cc.rectContainsPoint(cc.rect(storeyPanel.getPosition().x,storeyPanel.getPosition().y,storeyPanel.getContentSize().width,storeyPanel.getContentSize().height),touch.getLocation())){
                    return true;
                }else{
                    return false;
                }
                return true;
            },

            onTouchMoved: function (touch, event)
            {
                if(storeyNode.getChildByTag(1).getPosition().y >= -storeyTemplate.getContentSize().height*(towerTatalNum-1) && storeyNode.getChildByTag(towerTatalNum).getPosition().y <= storeyTemplate.getContentSize().height*(towerTatalNum-1) )
                {
                    for(var i = 1; i <= towerTatalNum;++i)
                    {
                        storeyNode.getChildByTag(i).setPosition(storeyNode.getChildByTag(i).getPosition().x,this.storeyPos[i].y+(touch.getLocation().y-this.beganPos.y));
                        storeyNode.getChildByTag(i).setLocalZOrder(99999-Math.abs(storeyNode.getChildByTag(i).getPosition().y));
                        if(storeyNode.getChildByTag(i).getLocalZOrder() > storeyNode.getChildByTag(self._front).getLocalZOrder())
                        {
                            self._front = i;
                        }
                    }
                }
            },

            onTouchEnded: function (touch, event){
                cc.eventManager.pauseTarget(storeyPanel, true);
                if(this.beganPos.y == touch.getLocation().y)
                {
                    var a = parseInt((touch.getLocation().y+storeyTemplate.getContentSize().height/2)/storeyTemplate.getContentSize().height);
                    var index = 0;
                    if(touch.getLocation().y-storeyNode.getPosition().y>=0){
                        index = parseInt(((touch.getLocation().y-storeyNode.getPosition().y+storeyTemplate.getContentSize().height/2)/storeyTemplate.getContentSize().height));
                        if((self._front+index)>0 && (self._front+index)<=towerTatalNum){
                            self._front += index;
                        }else{
                            index = 0;
                        }
                    }else{
                        index = parseInt(((touch.getLocation().y-storeyNode.getPosition().y-storeyTemplate.getContentSize().height/2)/storeyTemplate.getContentSize().height));
                        if((self._front+index)>0 && (self._front+index)<=towerTatalNum){
                            self._front += index;
                        }else{
                            index = 0;
                        }
                    }
                    storeyNode.getChildByTag(self._front).setLocalZOrder(99999);
                    cc.log("self._front",self._front);
                    var distance = storeyTemplate.getContentSize().height*index;
                    if((storeyNode.getChildByTag(1).getPosition().y-distance) >= -storeyTemplate.getContentSize().height*(towerTatalNum-1) && (storeyNode.getChildByTag(towerTatalNum).getPosition().y-distance) <= storeyTemplate.getContentSize().height*(towerTatalNum-1))
                    {
                        for(var i = 1; i < towerTatalNum;++i)
                        {
                            var endPos = cc.p(storeyNode.getChildByTag(i).getPosition().x,storeyNode.getChildByTag(i).getPosition().y-distance);
                            var spawn = cc.spawn(cc.MoveTo(0.2,endPos));
                            storeyNode.getChildByTag(i).runAction(spawn);
                        }
                        var endPos = cc.p(storeyNode.getChildByTag(towerTatalNum).getPosition().x,storeyNode.getChildByTag(towerTatalNum).getPosition().y-distance);
                        var spawn = cc.spawn(cc.MoveTo(0.2,endPos));
                        storeyNode.getChildByTag(towerTatalNum).runAction(cc.sequence(spawn,cc.callFunc(function(){
                            self.initStoreyInfo();
                        })));
                    }
                }else{
                    var distance =   0-storeyNode.getChildByTag(self._front).getPosition().y;
                    for(var i = 1; i <towerTatalNum;++i)
                    {
                        var endPos = cc.p(storeyNode.getChildByTag(i).getPosition().x,storeyNode.getChildByTag(i).getPosition().y+distance);
                        var spawn = cc.spawn(cc.MoveTo(0.2,endPos));
                        storeyNode.getChildByTag(i).runAction(spawn);
                    }
                    var endPos = cc.p(storeyNode.getChildByTag(towerTatalNum).getPosition().x,storeyNode.getChildByTag(towerTatalNum).getPosition().y+distance);
                    var spawn = cc.spawn(cc.MoveTo(0.2,endPos));
                    storeyNode.getChildByTag(towerTatalNum).runAction(cc.sequence(spawn,cc.callFunc(function(){
                        self.initStoreyInfo();
                    })));
                }
            }
        });
        cc.eventManager.addListener(this._listener,storeyPanel);

        self.schedule(function(){
            var factor = (storeyNode.getChildByTag(1).getPosition().y-storeyTemplate.getPosition().y)/storeyTemplate.getContentSize().height ;
            var distanceBg = 768/towerTatalNum/2*factor;
            bgImage.setPosition(ImagePos.x,ImagePos.y + distanceBg);
        }, 0.001);
    },

    initStoreyInfo : function(){
        var index = this._front;
        cc.log("index",index);
        var self = this;
        var totalNum = 5;
        var delay = 0;
        var storeyInfoPanel = this._widget.getChildByName("Panel_storey_info");
        var storeyPanel = this._widget.getChildByName("Panel_storey");
        storeyInfoPanel.getChildByName("Text_storey_num").setString("千层塔"+ index +"层");
        if(this._mc._model.towerList[index] && this._mc._model.towerList[index].w == 0){
            storeyInfoPanel.getChildByName("Image_reward").setVisible(false);
            storeyInfoPanel.getChildByName("Button_battle").setVisible(true);
            storeyInfoPanel.getChildByName("Image_reward").setTouchEnabled(false);
            storeyInfoPanel.getChildByName("Button_battle").setTouchEnabled(true);
            storeyInfoPanel.getChildByName("Image_prize").setVisible(false);
            storeyInfoPanel.getChildByName("Image_prize").setTouchEnabled(false);
        }else if(this._mc._model.towerList[index] && this._mc._model.towerList[index].w == 1){
            storeyInfoPanel.getChildByName("Image_reward").setVisible(true);
            storeyInfoPanel.getChildByName("Button_battle").setVisible(false);
            storeyInfoPanel.getChildByName("Image_reward").setTouchEnabled(true);
            storeyInfoPanel.getChildByName("Button_battle").setTouchEnabled(false);
            storeyInfoPanel.getChildByName("Image_prize").setVisible(false);
            storeyInfoPanel.getChildByName("Image_prize").setTouchEnabled(false);
        }else{
            storeyInfoPanel.getChildByName("Image_prize").setVisible(true);
            storeyInfoPanel.getChildByName("Image_prize").setTouchEnabled(true);
            storeyInfoPanel.getChildByName("Image_reward").setVisible(false);
            storeyInfoPanel.getChildByName("Button_battle").setVisible(false);
            storeyInfoPanel.getChildByName("Image_reward").setTouchEnabled(false);
            storeyInfoPanel.getChildByName("Button_battle").setTouchEnabled(false);
        }

        for(var i = 1;i<=6;i++)
        {
            storeyInfoPanel.getChildByName("Node_"+i).removeAllChildren();
            storeyInfoPanel.getChildByName("Node_"+i).setVisible(false);
        }
        if(index <= this._mc._model.maxStorey){
            cc.eventManager.pauseTarget(storeyPanel, true);
            for(var i =1;i<totalNum ;i++)
            {
                var node = storeyInfoPanel.getChildByName("Node_"+i);
                node.runAction(cc.sequence(cc.delayTime(delay),cc.show()));
                delay += 0.3;
                var heroUnit = HeroData.getInstance().getHeroUnitForHid(this._mc._model.towerList[index].ary[i]);
                cc.assert(heroUnit != null, "main scene add hero fail!!");
                var heroSpine = HeroSpine.createInstance(heroUnit.spine, true);
                node.addChild(heroSpine);
                heroSpine.setIdleAnimation(true);
            }
            var node = storeyInfoPanel.getChildByName("Node_"+totalNum);
            node.runAction(cc.sequence(cc.delayTime(delay),cc.show(),cc.callFunc(function(){
                cc.eventManager.resumeTarget(storeyPanel,true);
            })));
            delay += 0.3;
            var heroUnit = HeroData.getInstance().getHeroUnitForHid(this._mc._model.towerList[index].ary[totalNum]);
            cc.assert(heroUnit != null, "main scene add hero fail!!");
            var heroSpine = HeroSpine.createInstance(heroUnit.spine, true);
            node.addChild(heroSpine);
            heroSpine.setIdleAnimation(true);
        }else{
//            storeyInfoPanel.runAction(cc.sequence(cc.delayTime(0.3),cc.callFunc(function(){
//                cc.eventManager.resumeTarget(storeyPanel,true);
//            })));
            cc.eventManager.resumeTarget(storeyPanel,true);
        }
    },


});

var TowerScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new TowerLayer(mc);
        this.addChild(this._mapLayer);
        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }
});