
/**
 * Created by xiaojian on 15/11/03.
 * @Author xiaojian
 * @desc   MVC 模式， emaill layer的model,controller
 */


var EmaillMC = cc.Class.extend({
    _layer : null,
    _model : {},
    _parentLayer: null,

    ctor:function(parentLayer){
        this._parentLayer = parentLayer;

        return true;
    },

    getMailReadCmd : function(id,index){
        this._model.readIndex = index;
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getMailReadCmd(id),this.update.bind(this));
    },

    update :function(){
      //  this._layer
      this._model.emaillListLength--;
      this._layer.initPrize(this._model.readIndex);
      this._parentLayer._mc.updateConsumelayer();
    },

    deleteEmaill : function(){
        delete this._model.emaillList[this._model.readIndex];
    },

    model:function(jsonObj){
    //this._model//
        var emaillList = [];
        var j = 1;
        for(var i in jsonObj["mail"])
        {
            var unit = {};
            unit.id = jsonObj["mail"][i].id;
            unit.title = jsonObj["mail"][i].title;
            unit.from = jsonObj["mail"][i].from;
            unit.time = jsonObj["mail"][i].time;
            unit.content = jsonObj["mail"][i].content;
            unit.status = jsonObj["mail"][i].status;
            unit.prize = [];
            var prizeNum = 1;
            var obj = jsonObj["mail"][i].prize;
            for(var k in obj)
            {
                var prize = {};
                prize.id = obj[k].id;
                prize.name = PackageData.getInstance().getPackageStaticJsonObjForId(prize.id).name;
                prize.num = obj[k].num;
                prize.type = obj[k].type;
                unit.prize[prizeNum++] =  prize;
            }
            unit.prizeLength = prizeNum-1;
            var show = {}
            show = jsonObj["mail"][i].show;
            show.name = PackageData.getInstance().getPackageStaticJsonObjForId(show.id).name;
            unit.show = show;
            emaillList[j++] = unit;
        }
        this._model.emaillList = emaillList;
        this._model.emaillListLength = j-1;
        this._model.emaillListMaxIndex = j-1;

    },

    init :function(jsonObj){
        this.model(jsonObj);
        this._layer = new EmaillLayer(this);
        this._parentLayer.getParent().addChild(this._layer);
    },


    view:function(){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getMailListCmd(PlayerData.getInstance().name),this.init.bind(this));
    }
});
