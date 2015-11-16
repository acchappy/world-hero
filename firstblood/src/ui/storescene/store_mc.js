
/**
 * Created by Tom on 15/09/11.
 * @Author Tom
 * @desc   MVC 模式， cast_scene的model,controller
 */


var renew = [];
renew[1] = 10;
renew[2] = 20;
renew[3] = 50;
renew[4] = 100;
renew[5] = 200;
renew[6] = 500;
renew[7] = 1000;
renew[8] = 2000;
var renewCeiling = 8 ;


var StoreMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(index){
        return true;
    },

    model:function(jsonObj){
        var stuffList = [];
        var j = 1;
        for(var i in jsonObj["Proplist"])
        {
            var unit = {};
            unit.id = jsonObj["Proplist"][i].id;
            unit.num = jsonObj["Proplist"][i].num;
            unit.type = jsonObj["Proplist"][i].type;
            unit.id = jsonObj["Proplist"][i].id;
            unit.pay = jsonObj["Proplist"][i].pay;
            unit.val = jsonObj["Proplist"][i].val;
            unit.get = jsonObj["Proplist"][i].get;
            unit.name =  PackageData.getInstance().getPackageStaticJsonObjForId(unit.id).name;
            stuffList[j++] = unit;
        }
        this._model.stuffList = stuffList;
        this._model.stuffListLength = j-1;
        this._model.renew = jsonObj["renew"];
        if(this._model.renew<8){
            this._model.renewDiamond = renew[this._model.renew+1];
        }else{
            this._model.renewDiamond = 5000;
        }
        this._model.coin = PlayerData.getInstance().coin;
        this._model.diamond = PlayerData.getInstance().diamond;
    },

    getMailRenewPropCmd : function(){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getMailRenewPropCmd(),this.renew.bind(this));
    },

    getMallPayPropCmd : function(index){
        this._model.selectIndex = index;
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getMallPayPropCmd(this._model.stuffList[this._model.selectIndex].id),this.pay.bind(this));
    },

    pay : function(){
        this._model.stuffList[this._model.selectIndex].get = 1;
        this._mainLayer.pay();
    },

    renew : function(jsonObj){
        this.model(jsonObj);
        this._mainLayer.renew();
    },

    update : function(){
        this._mainLayer.update();
    },

    initUI : function(jsonObj){

        this.model(jsonObj);
        SceneManager.getInstance().push("StoreScene", this); 
    },

    view:function(){

    HttpRequest.getInstance().send(ProtocolRequest.getInstance().getMallPropListCmd(),this.initUI.bind(this));
    //在new新场景前，先组装数据model,作为场景里面的数据模型

    }
});
