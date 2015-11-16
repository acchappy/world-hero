/**
 * Created by Tom on 15/09/11.
 * @Author Tom
 * @desc   ...
 */

var heroIconTag = 100;
var heroSpineTag = 1000;

var EmbattleLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,
    seatPos:{},
    touchNode : [],
    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var size = cc.director.getWinSize();
        var embattle = ccs.load(res.buzhen_scene_json);
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
        this.initCommon();
        this.initEmabattle();
    },

    initCommon : function(){
        var self = this;
        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);
        var btn = ReturnButtonTemplate.getInstance().getReturnButton();
        btn.addClickEventListener(function(){
//            var s = self._mc._model.seatList;
//            self._mc.httpsend(s[1],s[2],s[3],s[4],s[5],s[6],s[7]);
            cc.director.popScene();
        });
        var consume = new ConsumeMC(this);
        consume.view();
    },

    initEmabattle : function(){
        var self = this;
        var interval = 10 ;//英雄头像间隔
        for(var i =1;i<=6;i++)
        {
            var node = this._widget.getChildByName("Panel_main").getChildByName("Node_"+i);
            var widget = new ccui.Widget();
            widget.setTag(i);
            widget.setPosition(node.getPosition());
            widget.setAnchorPoint(cc.p(0,0));
            widget.setContentSize(cc.size(130,130));
            widget.setTouchEnabled(false);
            this._widget.getChildByName("Panel_main").addChild(widget);
            self.seatPos[i] = {x:(widget.getPosition().x),y:(widget.getPosition().y)};
            self.touchNode[i] = widget;
        }

        var heroIconPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_hero");
        var heroTmp = this._widget.getChildByName("Panel_main").getChildByName("Image_hero");
        var heroIconPos = cc.p(interval+20,20);
        var heroList = this._mc._model.heroList;
        var maxDownNumber = this._mc._model.heroNumber-1; //最大下阵英雄总数
        var downImage = this._widget.getChildByName("Panel_main").getChildByName("Image_down");

        for(var i=1;i<= maxDownNumber;i++)
        {
            var widget = new ccui.Widget();
            widget.setTag(i+6);
            widget.setAnchorPoint(cc.p(0,0));
            widget.setPosition(heroIconPos);
            widget.setTouchEnabled(false);
            widget.setContentSize(94,94);
                //更新下一个头像坐标
            heroIconPos.x += interval + heroTmp.getContentSize().width;
            this._widget.getChildByName("Panel_main").addChild(widget);
            self.touchNode[i+6] = widget;
            self.seatPos[i+6] = {x:(widget.getPosition().x),y:(widget.getPosition().y)};
            var unit ={}
            unit.hid = 0;
            unit.battle = 0;
            this._mc._model.seatList[i+6] = unit;
        }

        var index = 7;
        for (var key in heroList){
            var unit = heroList[key];
            cc.log("key ",key);
            if(heroList[key].alive){
                var widget = this._widget.getChildByName("Panel_main").getChildByTag(unit.seat);
                //初始化spine
                var heroUnit = HeroData.getInstance().getHeroUnitForHid(unit.hid);
                widget.setAnchorPoint(cc.p(0,0));
                cc.assert(heroUnit != null, "embattle_scene add hero fail!!");
                var heroSpine = HeroSpine.createInstance(heroUnit.spine, true);
                heroSpine.setTag(heroSpineTag);
                widget.addChild(heroSpine);
                heroSpine.setIdleAnimation(true);
                heroSpine.setPosition(heroSpine.getBoundingBox().width/2,0);
                //初始化头像
                var heroIcon = HeroSmallTemplate.getInstance().getHeroSmallTemplate(unit);
                heroIcon.setTag(heroIconTag);
                heroIcon.getChildByName("Image_heroIsON").setVisible(false);
                heroIcon.setTouchEnabled(false);
                heroIcon.setVisible(false);
                heroIcon.setAnchorPoint(cc.p(0,0));
                heroIcon.setPosition(0,0);
                widget.addChild(heroIcon);
                //初始化触碰范围
                var rect = heroSpine.getBoundingBox();
                widget.setContentSize(cc.size(rect.width>130?130:rect.width,rect.height>130?130:rect.height));
            }else{
                var widget = this._widget.getChildByName("Panel_main").getChildByTag(index);

                //初始化spine
                var heroUnit = HeroData.getInstance().getHeroUnitForHid(unit.hid);
                widget.setAnchorPoint(cc.p(0,0));
                cc.assert(heroUnit != null, "embattle_scene add hero fail!!");
                var heroSpine = HeroSpine.createInstance(heroUnit.spine, true);
                heroSpine.setTag(heroSpineTag);
                widget.addChild(heroSpine);
                heroSpine.setIdleAnimation(true);
                heroSpine.setPosition(heroSpine.getBoundingBox().width/2,0);
                heroSpine.setVisible(false);
                //初始化头像
                var heroIcon = HeroSmallTemplate.getInstance().getHeroSmallTemplate(unit);
                heroIcon.setTag(heroIconTag);
                heroIcon.getChildByName("Image_heroIsON").setVisible(false);
                heroIcon.setTouchEnabled(false);
                heroIcon.setVisible(true);
                heroIcon.setAnchorPoint(cc.p(0,0));
                heroIcon.setPosition(0,0);
                widget.addChild(heroIcon);
                //初始化触碰范围
                var rect = heroIcon.getBoundingBox();
                widget.setContentSize(cc.size(rect.width, rect.height));

                heroIcon.setPosition(0,0);
                //储存数据
                this._mc._model.seatList[index].hid = unit.hid;
                this._mc._model.seatList[index].battle = unit.battle;
                index++;

            }
        }

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            target:null,
            beginPos : null,
            dwon : 0,
            onTouchBegan: function (touch, event){
                //cc.rectContainsPoint(rect,point);
                this.beginPos = touch.getLocation();
                this.target = null;
                for(var key in self.touchNode){
                    if(key<=6 && cc.rectContainsPoint(cc.rect(self.touchNode[key].getPosition().x+self.touchNode[key].getContentSize().width/2,self.touchNode[key].getPosition().y,self.touchNode[key].getContentSize().width,self.touchNode[key].getContentSize().height),touch.getLocation()) && self._mc._model.seatList[self.touchNode[key].getTag()]){
                        this.target = self.touchNode[key];
                        break;
                    }else if(key>6 && cc.rectContainsPoint(cc.rect(self.touchNode[key].getPosition().x+self.touchNode[key].getContentSize().width/2,self.touchNode[key].getPosition().y,self.touchNode[key].getContentSize().width,self.touchNode[key].getContentSize().height),touch.getLocation()) && self._mc._model.seatList[self.touchNode[key].getTag()] ){
                        this.target = self.touchNode[key];
                        break;
                    }
                }
                if(this.target){
                    if(this.target.getTag()<=6){
                        this.target.setOpacity(150);
                        this.target.setScale(1.2);
                        this.target.setLocalZOrder(999);
                    }else if(self._mc._model.seatList[this.target.getTag()].hid){
                        this.target.getChildByTag(heroIconTag).setVisible(false);
                        var heroSpine =  this.target.getChildByTag(heroSpineTag);
                        heroSpine.setVisible(true);
                        var rect = heroSpine.getBoundingBox();
                        this.target.setContentSize(cc.size(rect.width>130?130:rect.width,rect.height>130?130:rect.height));

                        self.forward(this.target);
                    }
                    return true;
                }else{
                    cc.log("return false");
                    return false;
                }
            },

            onTouchMoved: function (touch, event){
                this.target.setPosition(cc.p(this.target.getPosition().x-(this.beginPos.x-touch.getLocation().x),this.target.getPosition().y-(this.beginPos.y-touch.getLocation().y)));
                this.beginPos = touch.getLocation();
                var tmpTag = this.target.getTag();
                if(this.target.getTag() <=6 && cc.rectContainsPoint(cc.rect(downImage.getPosition().x,downImage.getPosition().y,downImage.getContentSize().width,downImage.getContentSize().height),touch.getLocation()))
                {
                    this.down = 1;
                    cc.log("down = 1");
                }else{
                    for(var key in self.touchNode){
                        if(this.target != self.touchNode[key] && cc.rectContainsPoint(cc.rect(self.touchNode[key].getPosition().x+self.touchNode[key].getContentSize().width/2,self.touchNode[key].getPosition().y,self.touchNode[key].getContentSize().width,self.touchNode[key].getContentSize().height),touch.getLocation()))
                        {
                            if(this.target.getTag()>6 && key <= 6 && self._mc._model.seatList[self.touchNode[key].getTag()].hid && self._mc._model.seatList[this.target.getTag()].hid){
                                //未上阵与上阵英雄交换 spine显示关闭 头像显示开启
                                var heroIcon  = self.touchNode[key].getChildByTag(heroIconTag);
                                heroIcon.setVisible(true);
                                var heroSpine = self.touchNode[key].getChildByTag(heroSpineTag);
                                heroSpine.setVisible(false);
                                var rect = heroSpine.getBoundingBox();
                                this.target.setContentSize(cc.size(rect.width>130?130:rect.width,rect.height>130?130:rect.height));

                                if(self._mc._model.seatList[key].hid > 0){
                                    cc.log("zhenzhenzhen");
                                    var tmpTag = this.target.getTag();
                                    self.swap(this.target,key);
                                    self.insert(self.touchNode[tmpTag]);
                                }else{
                                    cc.log("jiajiajijia");
                                    self.swap(this.target,key);
                                }

                                break;
                            }else if(this.target.getTag()<=6 && key > 6){
                                //上阵英雄和未上阵英雄交换 spine显示开启 头像显示关闭
                                if(self._mc._model.seatList[self.touchNode[key].getTag()].hid){
                                    var heroIcon  = self.touchNode[key].getChildByTag(heroIconTag);
                                    heroIcon.setVisible(false);
                                    var heroSpine = self.touchNode[key].getChildByTag(heroSpineTag);
                                    heroSpine.setVisible(true);
                                    var rect = heroIcon.getBoundingBox();
                                    this.target.setContentSize(cc.size(rect.width>130?130:rect.width,rect.height>130?130:rect.height));

                                    self.swap(this.target,key);
                                    self.forward(self.touchNode[key]);

                                    break;
                                }else{
//                                    for(var i =  6+maxDownNumber;i>=7;i--)
//                                    {
//                                        if(self._mc._model.seatList[i].hid ==0){
//                                            continue;
//                                        }else if(i+1 <= 6+maxDownNumber){
//                                            self.swap(this.target,i+1);
//                                            break;
//                                        }
//                                    }
                                    break;
                                }

                            }else if(this.target.getTag()>6 && key > 6){
                                break;
                            }
                            self.swap(this.target,key);
                            break;
                        }
                    }
                }

            },

            onTouchEnded: function (touch, event){
                if(this.down){
                    this.down = 0;
                    for(var i = 7;i<=6+maxDownNumber;i++)
                    {
                        if(self._mc._model.seatList[i].hid ==0){
                            cc.log("i: ",i);
                            self.swap(this.target,i);
                            self.insert(this.target);
                            break;
                        }
                    }
                }
                if(this.target.getTag()<=6){
                    this.target.setOpacity(255);
                    this.target.setPosition(cc.p(self.seatPos[this.target.getTag()].x, self.seatPos[this.target.getTag()].y));
                    this.target.setScale(1);
                    this.target.setLocalZOrder(1);
                }else if(self._mc._model.seatList[this.target.getTag()].hid){

                    self.insert(this.target);

                    var heroIcon =  this.target.getChildByTag(heroIconTag);
                    heroIcon.setVisible(true);
                    var heroSpine =  this.target.getChildByTag(heroSpineTag);
                    heroSpine.setVisible(false);
                    var rect = heroIcon.getBoundingBox();
                    this.target.setContentSize(cc.size(rect.width>130?130:rect.width,rect.height>130?130:rect.height));
                    this.target.setOpacity(255);

                    this.target.runAction(cc.spawn(cc.rotateTo(0.2,360*2),cc.moveTo(0.2,self.seatPos[this.target.getTag()].x, self.seatPos[this.target.getTag()].y)));
                    this.target.setScale(1);
                    this.target.setLocalZOrder(1);

                }
            }
        });
        cc.eventManager.addListener(listener,this._widget.getChildByName("Panel_main"));
    },

    //提起 后边icon 前移

    forward : function(target){
        cc.log("前移");
        var self = this;
        var tmppTag = 0;
        var interval = 10;
        var maxDownNumber = this._mc._model.heroNumber-1;
        for(var i= target.getTag()+1;i<= 6+maxDownNumber;i++){
            tmppTag = target.getTag();
            if(self._mc._model.seatList[i].hid == 0){
                break;
            }else{
                self.touchNode[i].runAction(cc.moveTo(0.2,self.seatPos[tmppTag].x,self.seatPos[tmppTag].y));
                target.setTag(self.touchNode[i].getTag());
                self.touchNode[i].setTag(tmppTag);
                [self._mc._model.seatList[target.getTag()],self._mc._model.seatList[self.touchNode[i].getTag()]] = [self._mc._model.seatList[self.touchNode[i].getTag()],self._mc._model.seatList[target.getTag()]];
                self.touchNode[self.touchNode[i].getTag()] =  self.touchNode[i];
                self.touchNode[target.getTag()] =  target;
            }
        }

    },

    //插入 找到对的位置 其余的后移
    insert : function(target){

        var self = this;
        var tmpTag = 0;
        var maxDownNumber = this._mc._model.heroNumber-1;
        cc.log("插入");
        for(var i = 6+maxDownNumber;i>=7;i-- )
        {
            tmppTag = target.getTag();
            if(self._mc._model.seatList[i].hid == 0 || i ==target.getTag() ){
                continue;
            }
            if(self._mc._model.seatList[i].battle>=self._mc._model.seatList[target.getTag()].battle){
                break;
            }else{
                self.swap(target,i);
            }
        }
    },

    //交换所有属性
    swap : function(target,key){
        cc.log("交换");
        var self = this;
        var tmpTag = target.getTag();
        target.setTag(self.touchNode[key].getTag());
        self.touchNode[key].setTag(tmpTag);
        self.touchNode[key].setPosition(self.seatPos[tmpTag].x,self.seatPos[tmpTag].y);
//        self.touchNode[key].runAction(cc.moveTo(0.2,self.seatPos[tmpTag].x,self.seatPos[tmpTag].y));
        //交换站位英雄hid
        [self._mc._model.seatList[target.getTag()],self._mc._model.seatList[self.touchNode[key].getTag()]] = [self._mc._model.seatList[self.touchNode[key].getTag()],self._mc._model.seatList[target.getTag()]];
        self.touchNode[self.touchNode[key].getTag()] =  self.touchNode[key];
        self.touchNode[target.getTag()] =  target;
    },

});

var EmbattleScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new EmbattleLayer(mc);
        this.addChild(this._mapLayer);
        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }
});