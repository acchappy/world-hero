/**
 * Created by Tom on 15/09/16.
 * @Author Tom
 * @desc   ...
 */

var LoaderLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,
    _loadingbar:null,
    _textLB:null,
    _count:0,
    _resNum:0,
    _totalNum:0,
    _func:[],

    ctor:function () {
        this._super();

        var size = cc.director.getWinSize();
        var embattle = ccs.load(res.loading_scene);
        this._widget = embattle.node;

        fb.widgetAdapter(this._widget);          
        this.addChild(this._widget);

        this._loadingbar = this._widget.getChildByName("LoadingBar_lb");
        this._textLB = this._widget.getChildByName("Text_lb");

        this.initLoadFuncList();

        this.initNum();
        this.preload(loader_resources);

        return true;
    },


    initLoadFuncList:function(){
        this._func["loadHttpRequest"]  = this.loadHttpRequest.bind(this);        
        this._func["loadSocketNet"]    = this.loadSocketNet.bind(this);        
        this._func["loadTextData"]     = this.loadTextData.bind(this);
        this._func["loadHeroData"]     = this.loadHeroData.bind(this);
        this._func["loadTipDlg"]       = this.loadTipDlg.bind(this);
        this._func["loadHeroSmall"]    = this.loadHeroSmall.bind(this);
        this._func["loadLoginData"]    = this.loadLoginData.bind(this);
        this._func["loadErrorData"]    = this.loadErrorData.bind(this);
        this._func["loadAoyiData"]     = this.loadAoyiData.bind(this);
        this._func["loadQualityData"]     = this.loadQualityData.bind(this);
        this._func["loadMonsterData"]     = this.loadMonsterData.bind(this);
        this._func["loadSimpleMapData"]     = this.loadSimpleMapData.bind(this);
//        this._func["loadEliteMapData"]     = this.loadEliteMapData.bind(this);
    },

    loadHttpRequest:function(){
        ///xxxxx
        cc.log("loaderscene loadHttpRequest");
        HttpRequest.getInstance().setLoadingProxy(LoadingDlg.getInstance());
        HttpRequest.getInstance().setLoginProxy(LoginData.getInstance());
        
        HttpResponse.getInstance().setResponseProxy(ProtocolResponse.getInstance());
        HttpResponse.getInstance().setPushMessageProxy(Message.getInstance()); //http, 金钱等公共更新消息的处理

        HttpResponse.getInstance().setErrorHandle(ErrorMessage.getInstance());
    },
    loadSocketNet:function(){
        ///xxxxx
        cc.log("loaderscene loadSocketNet");
        SocketNet.getInstance().setLoadingProxy(new LoadingDlg());
    },

    loadTextData:function(){
        ///xxxxx
        cc.log("loaderscene load text data");
        TextData.getInstance().loadData();
    },

    loadHeroData:function(){
       ///xxxxx
       cc.log("loaderscene load hero data");
       HeroData.getInstance();
    },

    loadSimpleMapData:function(){
       ///xxxxx
       cc.log("loaderscene load SimpleMap data");
       SimpleMapData.getInstance();
    },

    loadEliteMapData:function(){
       ///xxxxx
       cc.log("loaderscene load EliteMap data");
       EliteMapData.getInstance();
    },

    loadTipDlg:function(){
       ///xxxxx
       cc.log("loaderscene load tip dlg");
       TipDlg.getInstance().loadData();
    },   

    loadHeroSmall:function(){
       ///xxxxx
       cc.log("loaderscene  loadHeroSmall");
       HeroSmallTemplate.getInstance().loadData();
    }, 

    loadLoginData:function(){
       ///xxxxx
       var channel = LoginData.getInstance().getChannel();
       cc.log("loaderscene  loadLoginData, channel", channel);
       if (channel != 0) {
            LoginData.getInstance().loadLocalData(channel);
       }
    }, 
   
    loadErrorData:function(){
        ///xxxxx
        cc.log("loaderscene load  Err  Data");
        ErrorMessage.getInstance().loadData();
    },

    loadAoyiData:function(){
        ///xxxxx
        cc.log("loaderscene loadAoyiData");
        AoyiData.getInstance().loadData();
    },

    loadQualityData:function(){
        ///xxxxx
        cc.log("loaderscene loadQualityData");
        QualityData.getInstance().loadData();
    },


    loadMonsterData : function(){
        ///xxxxx
        cc.log("loaderscene loadMonsterData");
        MonsterData.getInstance().loadData();
    },

    loadFuncData:function(){
        for(var i in this._func)
        {
            this._func[i]();
            this._count++;
            this.updatePercent();
        }
    },

    preload : function(res){
        for(var i in res){
            cc.loader.load(loader_resources[i],function(){this._count++; this.updatePercent();}.bind(this));
        }
    },

    initNum : function(){
        this._resNum = loader_resources.length;
        for(var i in this._func)
        {
            this._totalNum++;
        }
        this._totalNum += this._resNum;
        this._count = 0;
    },

    updatePercent :function(){
        var percent = (this._count /this._totalNum).toFixed(2)*100;
        cc.log("loader_scene percent:", percent, this._count, this._totalNum);
        this._loadingbar.setPercent(percent);
        this._textLB.setString(percent+"%");
        if(percent >= 100){
            cc.director.replaceScene(new HelloWorldScene());
        } else if (this._resNum == this._count){
            this.loadFuncData();
        }
    }

});

var LoaderScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new LoaderLayer(mc);
        this.addChild(this._mapLayer);
        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }
});