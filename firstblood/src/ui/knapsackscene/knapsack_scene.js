/**
 * Created by Tom on 15/09/07.
 * @Author Tom
 * @desc   ...
 */




var KnapsackLayer = cc.Layer.extend({
     _widget:null,
     _mc:null,

     _allCheckBox:null,
     _equipmentCheckBox:null,
     _materialCheckBox:null,
     _chipCheckBox:null,
     _consumablesCheckBox:null,

     _allPanel : null,
     _equipmentPanel : null,
     _materialPanel : null,
     _chipPanel : null,
     _consumablesPanel : null,

     _allNumber : 0,
     _equipmentNumber : 0,
     _materialNumber : 0,
     _chipNumber : 0,
     _consumablesNumber : 0,

     ctor:function (mc) {
         this._super();
         this._mc = mc;

         var size = cc.director.getWinSize();
         var knapsack = ccs.load(res.knapsack_scene_json);
         this._widget = knapsack.node;

         fb.widgetAdapter(this._widget);  
         this.addChild(this._widget);

         this.initUI();
         return true;
     },

     //
     initUI:function(){
         this.initNumber();
         this.initWidget();
         this.initScrollViewBar();
     },

     //初始化各类物品数目
     initNumber:function(){
         this._allNumber = PackageData.getInstance().getPackageAryLength();
         this._equipmentNumber = 0;
         this._materialNumber = 4;
         this._chipNumber = 4;
         this._consumablesNumber = 2;

     },

     num : function(number){
        return Math[number< 0? 'ceil':'floor'](number);
     },

     //初始化控件功能
     initWidget:function(){
         this.initCommon();
         this.initCheckBox();
     },

     initScrollViewBar : function(){
         //关闭滑动条显示
         var allSV = this._widget.getChildByName("Panel_main").getChildByName("Panel_all").getChildByName("Panel_SV").getChildByName("ScrollView_stuff");
         var equipmentSV = this._widget.getChildByName("Panel_main").getChildByName("Panel_equipment").getChildByName("Panel_SV").getChildByName("ScrollView_stuff");
         var materialSV = this._widget.getChildByName("Panel_main").getChildByName("Panel_material").getChildByName("Panel_SV").getChildByName("ScrollView_stuff");
         var chipSV = this._widget.getChildByName("Panel_main").getChildByName("Panel_chip").getChildByName("Panel_SV").getChildByName("ScrollView_stuff");
         var consumablesSV = this._widget.getChildByName("Panel_main").getChildByName("Panel_consumables").getChildByName("Panel_SV").getChildByName("ScrollView_stuff");
         allSV.setScrollBarPositionFromCornerForVertical(cc.p(10, 10));
         allSV.setScrollBarWidth(6);
         equipmentSV.setScrollBarPositionFromCornerForVertical(cc.p(10, 10));
         equipmentSV.setScrollBarWidth(6);
         materialSV.setScrollBarPositionFromCornerForVertical(cc.p(10, 10));
         materialSV.setScrollBarWidth(6);
         chipSV.setScrollBarPositionFromCornerForVertical(cc.p(10, 10));
         chipSV.setScrollBarWidth(6);
         consumablesSV.setScrollBarPositionFromCornerForVertical(cc.p(10, 10));
         consumablesSV.setScrollBarWidth(6);
     },

     //初始化返回按钮
     initCommon:function(){

         ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);

         var consume = new ConsumeMC(this);
         consume.view();
     },

     //初始化复选框
     initCheckBox:function(){
        this._allCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_all");
        this._equipmentCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_equipment");
        this._materialCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_material");
        this._chipCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_chip");
        this._consumablesCheckBox = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_consumables");

        this._allPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_all");
        this._equipmentPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_equipment");
        this._materialPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_material");
        this._chipPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_chip");
        this._consumablesPanel = this._widget.getChildByName("Panel_main").getChildByName("Panel_consumables");

        //初始化显示
        this.setPanelDisplay(this._allPanel,this._allNumber);

        //初始化CheckBox列表
        this.setCheckBoxSelected(this._allCheckBox);

        //初始化checkBox触碰使能
        this.setCheckBoxTouchEnabled(this._allCheckBox);

        this._allCheckBox.addClickEventListener(function(){
            this.setCheckBoxSelected(this._allCheckBox);
            this.setCheckBoxTouchEnabled(this._allCheckBox);
            this.setPanelDisplay(this._allPanel,this._allNumber);
        }.bind(this));

        this._equipmentCheckBox.addClickEventListener(function(){
            this.setCheckBoxSelected(this._equipmentCheckBox);
            this.setCheckBoxTouchEnabled(this._equipmentCheckBox);
            this.setPanelDisplay(this._equipmentPanel,this._equipmentNumber);
        }.bind(this));

        this._materialCheckBox.addClickEventListener(function(){
            this.setCheckBoxSelected(this._materialCheckBox);
            this.setCheckBoxTouchEnabled(this._materialCheckBox);
            this.setPanelDisplay(this._materialPanel,this._materialNumber);
        }.bind(this));

        this._chipCheckBox.addClickEventListener(function(){
            this.setCheckBoxSelected(this._chipCheckBox);
            this.setCheckBoxTouchEnabled(this._chipCheckBox);
            this.setPanelDisplay(this._chipPanel,this._chipNumber);
        }.bind(this));

        this._consumablesCheckBox.addClickEventListener(function(){
            this.setCheckBoxSelected(this._consumablesCheckBox);
            this.setCheckBoxTouchEnabled(this._consumablesCheckBox);
            this.setPanelDisplay(this._consumablesPanel,this._consumablesNumber);
        }.bind(this));
     },

     setPanelDisplay : function(panel,number){
        this.setPanelVisible(panel);
        if(number > 0){
            panel.getChildByName("Image_noting").setVisible(false);
            panel.getChildByName("Panel_presentation").setVisible(true);
            panel.getChildByName("Panel_SV").setVisible(true);
            this.sortStuff(panel,number);
        }else{
            panel.getChildByName("Image_noting").setVisible(true);
            panel.getChildByName("Panel_presentation").setVisible(false);
            panel.getChildByName("Panel_SV").setVisible(false);
        }
     },

     setPanelVisible : function(panel){
        this._allPanel.setVisible(false);
        this._materialPanel.setVisible(false);
        this._equipmentPanel.setVisible(false);
        this._chipPanel.setVisible(false);
        this._consumablesPanel.setVisible(false);
        panel.setVisible(true);
     },

     setCheckBoxSelected : function(checkBox){
        this._allCheckBox.setSelected(false);
        this._equipmentCheckBox.setSelected(false);
        this._materialCheckBox.setSelected(false);
        this._chipCheckBox.setSelected(false);
        this._consumablesCheckBox.setSelected(false);
        checkBox.setSelected(true);
     },

     setCheckBoxTouchEnabled : function(checkBox){
        this._allCheckBox.setTouchEnabled(true);
        this._materialCheckBox.setTouchEnabled(true);
        this._equipmentCheckBox.setTouchEnabled(true);
        this._chipCheckBox.setTouchEnabled(true);
        this._consumablesCheckBox.setTouchEnabled(true);
        checkBox.setTouchEnabled(false);
     },

     setSaleBtn : function(panel){
        var saleBtn =  panel.getChildByName("Panel_presentation").getChildByName("Button_sale");
        saleBtn.addClickEventListener(function(){
            /*
                添加回调事件
            */
        });
     },

     setUseBtn : function(panel){
        var useBtn =  panel.getChildByName("Panel_presentation").getChildByName("Button_use");
        useBtn.addClickEventListener(function(){
            /*
                添加回调事件
            */
        });
     },

     setDescriptionText : function(panel,str){
        var descriptionText =  panel.getChildByName("Panel_presentation").getChildByName("Panel_description").getChildByName("Text_description");
        descriptionText.setString(str); //or setText
     },

     setSalesPriceText : function(panel,str){
        var salesPriceText =  panel.getChildByName("Panel_presentation").getChildByName("Text_sales_price");
        salesPriceText.setString(str);
     },

     sortStuff: function(panel,number){
        //得到滚动视图控件
        var stuffScrollView = panel.getChildByName("Panel_SV").getChildByName("ScrollView_stuff");
        //得到stuffPanel模板
        var stuffPanel = stuffScrollView.getChildByName("Panel_stuff");

        var stuffPanelConsize = stuffPanel.getContentSize();
        //计算并设置滚动区域
        scrollHeight = Math.ceil(number/4) * stuffPanelConsize.height;
        stuffScrollView.setInnerContainerSize(cc.size(400,scrollHeight));
        if(scrollHeight>stuffScrollView.getContentSize().height){
            var panelPosition = cc.p(stuffPanel.getPosition().x,scrollHeight-stuffPanelConsize.height/2);
        }else{
            var panelPosition = cc.p(stuffPanel.getPosition().x,stuffScrollView.getContentSize().height-stuffPanelConsize.height/2);
        }
        //初始化物品列表
        var i = 0;
        for(var key in PackageData.getInstance()._packageAry)
        {
            if(i==0)
            {
//                cc.log("key:",key,PackageData.getInstance()._packageAry[key].name,PackageData.getInstance()._packageAry[key].value);
                panel.getChildByName("Panel_presentation").getChildByName("Text_name").setString(PackageData.getInstance()._packageAry[key].name);
                panel.getChildByName("Panel_presentation").getChildByName("Text_value").setString(PackageData.getInstance()._packageAry[key].num);
            }
            switch(i%4)
            {
                case 0 :
                {
                    var stuffPanelClone = stuffPanel.clone();
                    stuffPanelClone.setVisible(true);
                    stuffPanelClone.setPosition(panelPosition);
                    stuffScrollView.addChild(stuffPanelClone);
                    panelPosition.y -= stuffPanelConsize.height;
                    var imageView_1 = stuffPanelClone.getChildByName("Image_1");
                    var imageView_2 = stuffPanelClone.getChildByName("Image_2");
                    var imageView_3 = stuffPanelClone.getChildByName("Image_3");
                    var imageView_4 = stuffPanelClone.getChildByName("Image_4");
                    imageView_1.setVisible(true);
                    imageView_2.setVisible(false);
                    imageView_3.setVisible(false);
                    imageView_4.setVisible(false);
                    imageView_1.setTag(key);
                    imageView_1.getChildByName("Text_number").setString(PackageData.getInstance()._packageAry[key].num);
                    imageView_1.addClickEventListener(function(sender){
                        panel.getChildByName("Panel_presentation").getChildByName("Text_name").setString(PackageData.getInstance()._packageAry[sender.getTag()].name);
                        panel.getChildByName("Panel_presentation").getChildByName("Text_value").setString(PackageData.getInstance()._packageAry[sender.getTag()].num);
                    });
                    break;
                }
                case 1:
                {
                    this.setImage(imageView_2);
                    imageView_2.setVisible(true);
                    imageView_2.getChildByName("Text_number").setString(PackageData.getInstance()._packageAry[key].num);
                    imageView_2.setTag(key);
                    imageView_2.addClickEventListener(function(sender){
                        panel.getChildByName("Panel_presentation").getChildByName("Text_name").setString(PackageData.getInstance()._packageAry[sender.getTag()].name);
                        panel.getChildByName("Panel_presentation").getChildByName("Text_value").setString(PackageData.getInstance()._packageAry[sender.getTag()].num);
                    });
                    break;
                }
                case 2:
                {
                    this.setImage(imageView_3);
                    imageView_3.setVisible(true);
                    imageView_3.getChildByName("Text_number").setString(PackageData.getInstance()._packageAry[key].num);
                    imageView_3.setTag(key);
                    imageView_3.addClickEventListener(function(sender){
                        panel.getChildByName("Panel_presentation").getChildByName("Text_name").setString(PackageData.getInstance()._packageAry[sender.getTag()].name);
                        panel.getChildByName("Panel_presentation").getChildByName("Text_value").setString(PackageData.getInstance()._packageAry[sender.getTag()].num);
                    });
                    break;
                }
                case 3:
                {
                    this.setImage(imageView_4);
                    imageView_4.setVisible(true);
                    imageView_4.getChildByName("Text_number").setString(PackageData.getInstance()._packageAry[key].num);
                    imageView_4.setTag(key);
                    imageView_4.addClickEventListener(function(sender){
                        panel.getChildByName("Panel_presentation").getChildByName("Text_name").setString(PackageData.getInstance()._packageAry[sender.getTag()].name);
                        panel.getChildByName("Panel_presentation").getChildByName("Text_value").setString(PackageData.getInstance()._packageAry[sender.getTag()].num);
                    });
                    break;
                }
            }
            i++;
        }
        stuffPanel.setVisible(false);
        stuffPanel.setEnabled(false);
     },

     setImage : function(image){

     },

});

var KnapsackScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new KnapsackLayer(mc);
        this.addChild(this._mapLayer);

        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }

});
