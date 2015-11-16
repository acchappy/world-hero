
/**
 * Created by Tom on 15/09/30.
 * @Author Tom
 * @desc   MVC 模式， sign in layer的model,controller
 */


var SignInMC = cc.Class.extend({
    _layer : null,
    _model : {},
    _parentLayer: null,

    ctor:function(parentLayer){
        this._parentLayer = parentLayer;
        return true;
    },

    model:function(){
    //this._model//
    },

    view:function(){
        //this.model();
        //this._layer = new SignInLayer(this);
        var layer = new SignInLayer(this);
        this._parentLayer.getParent().addChild(layer);
        //cc.director.getRunningScene().addChild(layer);
    }
});
