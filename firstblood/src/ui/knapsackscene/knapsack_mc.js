
/**
 * Created by Tom on 15/09/09.
 * @Author Tom
 * @desc   MVC 模式， knapsack_scene的model,controller
 */


var KnapsackMC = cc.Class.extend({
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
        //HttpRequest.getInstance().send(ProtocolRequest.getInstance().getPackageListCmd(), this.cbHttpSendPackageList.bind(this)); 
        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();
        SceneManager.getInstance().push("KnapsackScene", this); 

    },

    // cbHttpSendPackageList:function(jsonObj){

    // }

});



