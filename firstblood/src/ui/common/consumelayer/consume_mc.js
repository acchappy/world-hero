/**
 * Created by Tom on 15/09/30.
 * @Author Tom
 * @desc   MVC 模式，consume layer的model,controller
 */


var ConsumeMC = cc.Class.extend({
    _layer : null,
    _model : {},
    _parentLayer: null,

    ctor:function(parentLayer){

        this._parentLayer = parentLayer;
        return true;
    },

    model:function(){
        this._model = this._parentLayer._mc._model;
        this._model.coin = PlayerData.getInstance().coin;
        this._model.diamond = PlayerData.getInstance().diamond;
        this._model.manual = PlayerData.getInstance().manual;
    },

    view:function(){
        this.model();
        this._layer = new ConsumeLayer(this);
        this._parentLayer.addChild(this._layer);
        //cc.director.getRunningScene().addChild(layer);

        Message.getInstance().register("ConsumeMC" + this._parentLayer._mc._name, this.update.bind(this), "player,update_player");
    },

    update : function(event, jsonObj){
        cc.log("ConsumeMC, update, event, jsonObj", event, JSON.stringify(jsonObj));

        this._model = this._parentLayer._mc._model;
        this._model.coin = PlayerData.getInstance().coin;
        this._model.diamond = PlayerData.getInstance().diamond;
        this._model.manual = PlayerData.getInstance().manual;
        this._layer.updateUI();
    },

    reSetPosition : function(p){
        this._layer.reSetPosition(p);
    },

    destroy:function(){
        cc.log("ConsumeMC, destroy");
        Message.getInstance().unregister("ConsumeMC" + this._parentLayer._mc._name);        
    }

});
