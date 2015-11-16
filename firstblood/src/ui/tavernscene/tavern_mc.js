
/**
 * Created by Tom on 15/09/23.
 * @Author Tom
 * @desc   MVC 模式， tavern_scene的model,controller
 */


var TavernMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(){

        return true;
    },

    model:function(){
    //this._model

    },

    httpSend :function(number,c){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getPubSummonCmd(number,c),this.update.bind(this));
    },

    update : function(jsonObj){
        var pub = [];
        var j = 1;
        for(var i in jsonObj)
        {
            if(i == "pub")
            {
                var obj =  jsonObj[i];
                for(var i in obj)
                {
                    var pubDataUnit = {};
                    pubDataUnit.id = obj[i].id;
                    pubDataUnit.num = obj[i].num;
                    pubDataUnit.t = obj[i].t;
                    pubDataUnit.name = PackageData.getInstance().getPackageStaticJsonObjForId(pubDataUnit.id).name;
                    pub[j++] = pubDataUnit;
                }
            }
        }
        cc.log("player ",PlayerData.getInstance().coin,PlayerData.getInstance().diamond);
        this._model.pub = pub;
        this._mainLayer.summon();
    },

    view:function(){

        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();
        SceneManager.getInstance().push("TavernScene", this); 

    }
});
