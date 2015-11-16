
/**
 * Created by xiaojian on 15/09/15.
 * @Author Tom
 * @desc   MVC 模式， hero_presentation_scene的model,controller
 */


var HeroPresentationMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(){
        return true;
    },

    model:function(){
    //this._model

    },

    view:function(){

        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();
        SceneManager.getInstance().push("HeroPresentationScene", this);
    }
});



