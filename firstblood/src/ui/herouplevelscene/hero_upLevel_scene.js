/**
 * Created by Tom on 15/09/06.
 * @Author Tom
 * @desc   ...
 */

var HeroUpLevelLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,
    _stuff : 1,
    _hero : null,
    _item : fb.UI_SMALL_EXP_ITEM_ID,
    _aoyi : 1,
    _skill : 1,
    _consume : null,

    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var size = cc.director.getWinSize();
        var heroStrengthen = ccs.load(res.hero_upLevel_scene_json);
        this._widget = heroStrengthen.node;

        fb.widgetAdapter(this._widget);  
        this.addChild(this._widget);

        this.initUI();
        
        return true;
    },

    //
    initUI:function(){
        this.initBtn();
        this.initPanel();
    },

    initBtn:function(){
        this.initCommon();
        this.initCheckBox();
    },

    //初始化公共返回按钮
    initCommon:function(){
        var self = this;
        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);
        var btn = ReturnButtonTemplate.getInstance().getReturnButton();
        btn.addClickEventListener(function(){
            NotificationCenter.getInstance().postNotification("updateHM",self._mc._model);
            cc.director.popScene();
        });
        this._consume = new ConsumeMC(this);
        this._consume.view();
    },

    //初始化复选框按键
    initCheckBox:function(){
        var upQualityCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_upQuality");
        var upLevelCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_upLevel");
        var upAoyiCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_upAoyi");
        var upSkillCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_upSkill");
        var upQualityPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_upQuality");
        var upLevelPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_upLevel");
        var upAoyiPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi");
        var upSkillPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill");

        //初始化显示
        upQualityPanel.setVisible(true);
        upLevelPanel.setVisible(false);
        upAoyiPanel.setVisible(false);
        upSkillPanel.setVisible(false);

        //初始化CheckBox列表
        upQualityCheckBox.setSelected(true);
        upLevelCheckBox.setSelected(false);
        upAoyiCheckBox.setSelected(false);
        upSkillCheckBox.setSelected(false);
        upQualityCheckBox.setTouchEnabled(false);
        upLevelCheckBox.setTouchEnabled(true);
        upAoyiCheckBox.setTouchEnabled(true);
        upSkillCheckBox.setTouchEnabled(true);

        upQualityCheckBox.addClickEventListener(function(){
            upQualityCheckBox.setSelected(true);
            upLevelCheckBox.setSelected(false);
            upAoyiCheckBox.setSelected(false);
            upSkillCheckBox.setSelected(false);
            upQualityCheckBox.setTouchEnabled(false);
            upLevelCheckBox.setTouchEnabled(true);
            upAoyiCheckBox.setTouchEnabled(true);
            upSkillCheckBox.setTouchEnabled(true);
            upQualityPanel.setVisible(true);
            upLevelPanel.setVisible(false);
            upAoyiPanel.setVisible(false);
          upSkillPanel.setVisible(false);
        });

        upLevelCheckBox.addClickEventListener(function(){
            upQualityCheckBox.setSelected(false);
            upLevelCheckBox.setSelected(true);
            upAoyiCheckBox.setSelected(false);
            upSkillCheckBox.setSelected(false);
            upQualityCheckBox.setTouchEnabled(true);
            upLevelCheckBox.setTouchEnabled(false);
            upAoyiCheckBox.setTouchEnabled(true);
            upSkillCheckBox.setTouchEnabled(true);
            upQualityPanel.setVisible(false);
            upLevelPanel.setVisible(true);
            upAoyiPanel.setVisible(false);
          upSkillPanel.setVisible(false);
        });

        upAoyiCheckBox.addClickEventListener(function(){
            upQualityCheckBox.setSelected(false);
            upLevelCheckBox.setSelected(false);
            upAoyiCheckBox.setSelected(true);
            upSkillCheckBox.setSelected(false);
            upQualityCheckBox.setTouchEnabled(true);
            upLevelCheckBox.setTouchEnabled(true);
            upAoyiCheckBox.setTouchEnabled(false);
            upSkillCheckBox.setTouchEnabled(true);
            upQualityPanel.setVisible(false);
            upLevelPanel.setVisible(false);
            upAoyiPanel.setVisible(true);
            upSkillPanel.setVisible(false);
        });

        upSkillCheckBox.addClickEventListener(function(){
            upQualityCheckBox.setSelected(false);
            upLevelCheckBox.setSelected(false);
            upAoyiCheckBox.setSelected(false);
            upSkillCheckBox.setSelected(true);
            upQualityCheckBox.setTouchEnabled(true);
            upLevelCheckBox.setTouchEnabled(true);
            upAoyiCheckBox.setTouchEnabled(true);
            upSkillCheckBox.setTouchEnabled(false);
            upQualityPanel.setVisible(false);
            upLevelPanel.setVisible(false);
            upAoyiPanel.setVisible(false);
            upSkillPanel.setVisible(true);
        });

        this._hero = this._mc._model.heroList[this._mc._model.showNum];
        this.initScrollView();
        this.updateUI();

    },

    //初始化英雄滚动视图
    initScrollView : function(){
        //add hero list
        var interval   = 6; //间隔
        var heroMaxNum = this._mc._model.heroTotal;

        var herosScrollView = this._widget.getChildByName("Panel_main").getChildByName("ScrollView_heros");

        var heroTemplate = herosScrollView.getChildByName("Image_heroIcon");
        var init_pos = heroTemplate.getPosition();
        init_pos.x += interval;

        for(var i = 0; i<heroMaxNum; i++)
        {
            var hero = HeroSmallTemplate.getInstance().getHeroSmallTemplate(this._mc._model.heroList[i]);
            var self = this;
            herosScrollView.removeChildByTag(i);
            hero.setTag(i);
            hero.addClickEventListener(function (sender) {
                HeroSmallTemplate.getInstance().setHeroFrameVisible(hero.getParent().getChildByTag(self._mc._model.showNum), false);
                HeroSmallTemplate.getInstance().setHeroFrameVisible(hero.getParent().getChildByTag(sender.getTag()), true);
                self._mc._model.showNum = sender.getTag();
                self._hero = this._mc._model.heroList[sender.getTag()];
                self.updateUI();
            }.bind(this));
            if(hero.getTag() == this._mc._model.showNum){
                HeroSmallTemplate.getInstance().setHeroFrameVisible(hero,true);
            }else{
                HeroSmallTemplate.getInstance().setHeroFrameVisible(hero,false);
            }
            hero.setPosition(init_pos);
            herosScrollView.addChild(hero);
            init_pos.x  += (hero.getContentSize().width+interval);
        }

        var scrollWidth = 0;
        scrollWidth = (hero.getContentSize().width+interval)*heroMaxNum+interval;
        herosScrollView.setInnerContainerSize(cc.size(scrollWidth,herosScrollView.getContentSize().height));
        var w = Math.abs(herosScrollView.getContentSize().width - herosScrollView.getInnerContainer().getContentSize().width);

        herosScrollView.setScrollBarEnabled(false);
        heroTemplate.setVisible(false);
        heroTemplate.setEnabled(false);

        var hW = heroTemplate.getContentSize().width;
        var sW = herosScrollView.getContentSize().width;
        var p = ((this._mc._model.showNum+2)*(hW+interval) - herosScrollView.getContentSize().width )/w*100;
        var pj = ((this._mc._model.showNum+1)*(hW+interval) - herosScrollView.getContentSize().width);

        if (pj <= 0)
        {
            return;
        }

        cc.log("hero_upLevel_scene, w,hw,sw,p", w, hW, sW, p, this._mc._model.showNum);
        herosScrollView.scrollToPercentHorizontal(p,0.1,false);
        herosScrollView.setScrollBarEnabled(false);
    },

    //初始化容器
    initPanel : function(){
        this.initLevelPanel();
        this.initQualityPanel();
        this.initAoyiPanel();
        this.initSkillPanel();
    },

    //初始化等级升级容器
    initLevelPanel : function(){
        var self = this;
        var upLevelPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_upLevel");
        var stuffsPanel = upLevelPanel.getChildByName("Panel_stuffs");
        var stuff1 = stuffsPanel.getChildByName("Button_stuff1");
        stuff1.addClickEventListener(function(){
            self._stuff = 1;
            upLevelPanel.getChildByName("Panel_chooseBtn").getChildByName("Text_experience").setString("Exp +60");
            self._item = fb.UI_SMALL_EXP_ITEM_ID;
        });
        var stuff2 = stuffsPanel.getChildByName("Button_stuff2");
        stuff2.addClickEventListener(function(){
            self._stuff = 2;
            upLevelPanel.getChildByName("Panel_chooseBtn").getChildByName("Text_experience").setString("Exp +300");
            self._item = fb.UI_MID_EXP_ITEM_ID;
        });
        var stuff3 = stuffsPanel.getChildByName("Button_stuff3");
        stuff3.addClickEventListener(function(){
            self._stuff = 3;
            upLevelPanel.getChildByName("Panel_chooseBtn").getChildByName("Text_experience").setString("Exp +1500");
            self._item = fb.UI_BIG_EXP_ITEM_ID;
        });
        var stuff4 = stuffsPanel.getChildByName("Button_stuff4");
        stuff4.addClickEventListener(function(){
            self._stuff = 4;
            upLevelPanel.getChildByName("Panel_chooseBtn").getChildByName("Text_experience").setString("Exp +7500");
            self._item = fb.UI_HUGE_EXP_ITEM_ID;
        });
        stuff1.getChildByName("Text_value").setString(this._mc._model.smallEXP);
        stuff2.getChildByName("Text_value").setString(this._mc._model.midEXP  );
        stuff3.getChildByName("Text_value").setString(this._mc._model.bigEXP  );
        stuff4.getChildByName("Text_value").setString(this._mc._model.hugeEXP );

        var addOneBtn = upLevelPanel.getChildByName("Panel_chooseBtn").getChildByName("Button_1");
        var addTenBtn = upLevelPanel.getChildByName("Panel_chooseBtn").getChildByName("Button_2");
        var addAllBtn = upLevelPanel.getChildByName("Panel_chooseBtn").getChildByName("Button_3");
        addOneBtn.addClickEventListener(function(){
            self._mc.httpExpSend(self._hero.hid,self._item,1);
        });
        addTenBtn.addClickEventListener(function(){
            self._mc.httpExpSend(self._hero.hid,self._item,10);
        });
        addAllBtn.addClickEventListener(function(){
            self._mc.httpExpSend(self._hero.hid,self._item,-1);
        });
    },

    //初始化品质升级容器
    initQualityPanel : function(){
        var self = this;
        this._hero = this._mc._model.heroList[this._mc._model.showNum];
        this.displayQualityStuff();
//        var upQualityPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_upQuality");
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upQuality").getChildByName("Button_1").addClickEventListener(function(){
            self._mc.httpQualitySend(self._hero.hid);
            cc.log("进阶");
        });
    },

    //初始化技能升级容器
    initSkillPanel : function(){
        var self = this;
        this.initSkillImageClick(this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_1"),1);
        this.initSkillImageClick(this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_2"),2);
        this.initSkillImageClick(this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_3"),3);
        this.initSkillImageClick(this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_4"),4);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Button_up").addClickEventListener(function(){
            self._mc.httpSkillSend(self._hero.hid,"skill"+self._skill);
        });
    },

    initSkillImageClick : function(skillImage,index){
        var self = this;
        skillImage.addClickEventListener(function(){
            self._skill = index;
            self.displaySkillStuff();
        });
    },

    displaySkillFrame : function(){
         this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_1").getChildByName("Image_frame").setVisible(false);
         this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_2").getChildByName("Image_frame").setVisible(false);
         this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_3").getChildByName("Image_frame").setVisible(false);
         this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_4").getChildByName("Image_frame").setVisible(false);
         this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_"+this._skill).getChildByName("Image_frame").setVisible(true);
    },

    displaySkillStuff : function(){
        var self = this;
        self.displaySkillFrame();
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_1").getChildByName("Image_skill").getChildByName("Text_level").setString(self._hero.skill1);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_2").getChildByName("Image_skill").getChildByName("Text_level").setString(self._hero.skill2);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_3").getChildByName("Image_skill").getChildByName("Text_level").setString(self._hero.skill3);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_skill_4").getChildByName("Image_skill").getChildByName("Text_level").setString(self._hero.skill4);
        if(self._skill == 1 ||self._skill == 2){
            var num = self._hero.fragment.currNum;
            var needNum = fb["UI_SKILL_"+self._skill][self._hero["skill"+self._skill]];
            var stuff1Num = num + "/" + needNum;
            if(needNum == "MAX"){
                stuff1Num = "MAX";
            }
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_explain").getChildByName("Text_explain").setString("技能说明：xxxxxxxxxxxx\n升级成功后：生命上限+10%");
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff1").getChildByName("Text_num").setString(stuff1Num);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff1").getChildByName("Text_name").setString(self._hero.fragment.name);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff2").getChildByName("Text_num").setString(0);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_cantUp").setVisible(false);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_gold").setVisible(true);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Text_gold").setVisible(true);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff1").setVisible(true);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff2").setVisible(true);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Button_up").setVisible(true);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff1").setTouchEnabled(true);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff2").setTouchEnabled(true);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Button_up").setTouchEnabled(true);
        }else{
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_explain").getChildByName("Text_explain").setString("技能说明：xxxxxxxxxxxx\n升级成功后：生命上限+10%");
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_cantUp").getChildByName("Text_cantUp").setString("该技能随品质升级");
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_cantUp").setVisible(true);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_gold").setVisible(false);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Text_gold").setVisible(false);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff1").setVisible(false);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff2").setVisible(false);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Button_up").setVisible(false);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff1").setTouchEnabled(false);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Image_stuff2").setTouchEnabled(false);
            this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill").getChildByName("Button_up").setTouchEnabled(false);
        }
    },

    //初始化奥义升级容器
    initAoyiPanel : function(){
        var self = this;
        this._hero = this._mc._model.heroList[this._mc._model.showNum];
        //初始化奥义品质显示和升级材料显示
        this.displayAoyiStuff();
        //初始化关闭选中框显示
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_blood").getChildByName("Image_frame").setVisible(false);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_attack").getChildByName("Image_frame").setVisible(false);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_parmor").getChildByName("Image_frame").setVisible(false);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_marmor").getChildByName("Image_frame").setVisible(false);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_speed").getChildByName("Image_frame").setVisible(false);
        //设置默认显示选中框
        this.setAoyiFrame(this._aoyi);
        //初始化AoyiImage点击功能
        this.initAoyiImage(this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_blood"));
        this.initAoyiImage(this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_attack"));
        this.initAoyiImage(this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_parmor"));
        this.initAoyiImage(this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_marmor"));
        this.initAoyiImage(this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_speed"));
        //初始化升级奥义按钮
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Button_1").addClickEventListener(function(){
            self._mc.httpAoyiSend(self._hero.hid,self._aoyi);
        });
    },

    initAoyiImage : function(AoyiImage){
        var self = this;
        AoyiImage.addClickEventListener(function(sender){
            self.setAoyiFrame(sender.getTag());
            self.displayAoyiStuff();
        });
    },

    setAoyiFrame : function (index){
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByTag(this._aoyi).getChildByName("Image_frame").setVisible(false);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByTag(index).getChildByName("Image_frame").setVisible(true);
        this._aoyi = index;
    },

    displayQualityStuff : function(){
        var qualityData = this._hero.qualityData;
        if(qualityData){
            for(var i =1;i<=6;i++){
                var stuff = this._widget.getChildByName("Panel_main").getChildByName("Panel_upQuality").getChildByName("Panel_stuffs").getChildByName("Image_"+i);
                var id = parseInt(qualityData["cailiao_id"+i]);
                if(id){
                    stuff.getChildByName("Text_name").setString(qualityData["cailiao_name"+i]);
                    stuff.getChildByName("Text_num").setString(qualityData["cailiao_currNum"+i]+"/"+qualityData["cailiao_num"+i]);
                }else{
                    //不需要该材料
                    stuff.getChildByName("Text_name").setString("Not Need");
                    stuff.getChildByName("Text_num").setString("");
                }
            }
        }else{
            for(var i =1;i<=6;i++){
                 var stuff = this._widget.getChildByName("Panel_main").getChildByName("Panel_upQuality").getChildByName("Panel_stuffs").getChildByName("Image_"+i);
                 stuff.getChildByName("Text_name").setString("已到达顶级");
                 stuff.getChildByName("Text_num").setVisible(false);
            }
        }
    },

    displayAoyiStuff : function(){
        var self = this;
        var aoyiData = self._hero.aoyiData[self._aoyi];
        var stuff1 = this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_stuff1");
        var stuff2 = this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_stuff2");
        stuff1.getChildByName("Text_name").setString(aoyiData.cailiao_name);
        stuff1.getChildByName("Text_num").setString(aoyiData.cailiao_currNum + "/" + aoyiData.cailiao_num);
        stuff2.getChildByName("Text_name").setString(self._hero.fragment.name);
        stuff2.getChildByName("Text_num").setString(self._hero.fragment.currNum + "/" + aoyiData.suipian_num);
        var loadingBar = this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_LoadingBar").getChildByName("LoadingBar_aoyi");
        var cur = aoyiData.cailiao_currNum>aoyiData.cailiao_num?aoyiData.cailiao_num:aoyiData.cailiao_currNum1 + self._hero.fragment.currNum>aoyiData.suipian_num?aoyiData.suipian_num:self._hero.fragment.currNum;
        var diff = parseInt(aoyiData.cailiao_num) + parseInt(aoyiData.suipian_num);
        loadingBar.setPercent(cur/diff*100);
        loadingBar.getChildByName("Text_aoyi").setString(cur + "/" + diff);
        this.setAoyiQuality(this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_blood"),self._hero.blood_aoyi);
        this.setAoyiQuality(this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_attack"),self._hero.attack_aoyi);
        this.setAoyiQuality(this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_parmor"),self._hero.parmor_aoyi);
        this.setAoyiQuality(this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_marmor"),self._hero.marmor_aoyi);
        this.setAoyiQuality(this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi").getChildByName("Image_speed"),self._hero.cross_aoyi);
    },

    setAoyiQuality : function(AoyiImage,quality){
        //品质颜色
        switch(parseInt(quality/10)){
            case fb.UI_QUALITY_WHITE :
                AoyiImage.getChildByName("Image_quality").loadTexture(res.common_quality_white);
                break;
            case fb.UI_QUALITY_GREEN :
                AoyiImage.getChildByName("Image_quality").loadTexture(res.common_quality_green);
                break;
            case fb.UI_QUALITY_BLUE :
                AoyiImage.getChildByName("Image_quality").loadTexture(res.common_quality_blue);
                break;
            case fb.UI_QUALITY_PURPLE :
                AoyiImage.getChildByName("Image_quality").loadTexture(res.common_quality_purple);
                break;
            case fb.UI_QUALITY_GOLDEN :
                AoyiImage.getChildByName("Image_quality").loadTexture(res.common_quality_golden);
                break;
            default:
                cc.log("get quality error",quality);
                break;
        }
        //品质星级
        var number = quality%10;
        var starTemplate = AoyiImage.getChildByName("Image_star");
        starTemplate.setVisible(false);
        AoyiImage.getChildByName("Image_quality").removeAllChildren();
        switch(number%2){
            case 0:
            {
                var pos = starTemplate.getPosition();
                var cos = starTemplate.getContentSize();
                pos.x -= (cos.width*parseInt(number/2) - cos.width/2);
                for(var i = 0; i<number; i++)
                {
                    var star = starTemplate.clone();
                    star.setVisible(true);
                    star.setPosition(pos);
                    pos.x += cos.width;
                    AoyiImage.getChildByName("Image_quality").addChild(star);
                }
                break;
            }
            case 1:
            {
                var pos = starTemplate.getPosition();
                var cos = starTemplate.getContentSize();
                pos.x -= cos.width*parseInt(number/2);
                for(var i = 0; i<number; i++)
                {
                    var star = starTemplate.clone();
                    star.setVisible(true);
                    star.setPosition(pos);
                    pos.x += cos.width;
                    AoyiImage.getChildByName("Image_quality").addChild(star);
                }
                break;
            }
        }

    },

    updateUI : function(){
        this._hero = this._mc._model.heroList[this._mc._model.showNum];
        var upQualityPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_upQuality");
        var upLevelPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_upLevel");
        var upAoyiPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_upAoyi");
        var upSkillPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_upSkill");
        upAoyiPanel.getChildByName("Text_fightingValue").setString(this._hero.battle);
        upLevelPanel.getChildByName("Text_fightingValue").setString(this._hero.battle);
        upQualityPanel.getChildByName("Text_fightingValue").setString(this._hero.battle);
        upSkillPanel.getChildByName("Text_battle").setString(this._hero.battle);
        upQualityPanel.getChildByName("Text_heroName").setString(this._hero.name);
        upLevelPanel.getChildByName("Text_heroName").setString(this._hero.name);
        upAoyiPanel.getChildByName("Text_heroName").setString(this._hero.name);
        upSkillPanel.getChildByName("Text_heroName").setString(this._hero.name);
//        upAoyiPanel.getChildByName("Text_level").setString("等级:  " + this._hero.level);
        upLevelPanel.getChildByName("Text_level").setString("等级:  " + this._hero.level);
        upQualityPanel.getChildByName("Text_level").setString("等级:  " + this._hero.level);
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upLevel").getChildByName("Panel_stuffs").getChildByName("Button_stuff1").getChildByName("Text_value").setString(this._mc._model.smallEXP );
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upLevel").getChildByName("Panel_stuffs").getChildByName("Button_stuff2").getChildByName("Text_value").setString(this._mc._model.midEXP   );
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upLevel").getChildByName("Panel_stuffs").getChildByName("Button_stuff3").getChildByName("Text_value").setString(this._mc._model.bigEXP   );
        this._widget.getChildByName("Panel_main").getChildByName("Panel_upLevel").getChildByName("Panel_stuffs").getChildByName("Button_stuff4").getChildByName("Text_value").setString(this._mc._model.hugeEXP  );
        this.setExpLoadingBar();
        this.displayAoyiStuff();
        this.displayQualityStuff();
        this.initScrollView();
        this.displaySkillStuff();
        this._consume.update();
    },

    setExpLoadingBar : function(){
        var loadingBar = this._widget.getChildByName("Panel_main").getChildByName("Panel_upLevel").getChildByName("Image_LoadingBar").getChildByName("LoadingBar_experience");
        loadingBar.setPercent(this._hero.cur/this._hero.diff*100);
        loadingBar.getChildByName("Text_experience").setString(this._hero.cur + "/" + this._hero.diff);
    },
});

var HeroUpLevelScene = cc.Scene.extend({

    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new HeroUpLevelLayer(mc);
        this.addChild(this._mapLayer);

        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }
});