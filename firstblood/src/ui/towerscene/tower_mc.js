
/**
 * Created by  on 15/11/04.
 * @Author Tom
 * @desc
 */

var TowerMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(){

        return true;
    },

    model:function(){
    //this._model
        var list = [];
        var k = 1;
        var obj = TowerData.getInstance().getTowerAry();
        for(var key in obj){
            var unit = {};
            unit.ary = [];
            for(var j=1;j<=6;j++)
            {
                unit.ary[j] = obj[key]["s"+j];
            }
            unit.level = obj[key].level;
            unit.w = obj[key].w;
            if(obj[key].reward){
                var oobj = obj[key].reward;
                var stuff = {};
                stuff.list = [];
                var index = 1;
                for(var j in oobj)
                {
                    var stuffUnit = {};
//                    cc.log("oobj[j]",j,oobj[j],JSON.stringify(oobj[j]));
//                    var ary = oobj[j].split("_");
                    stuffUnit.id   = oobj[j].id;
                    stuffUnit.type = oobj[j].type;
                    stuffUnit.num  = oobj[j].num;
                    stuffUnit.name = PackageData.getInstance().getPackageStaticJsonObjForId(stuffUnit.id).name;
                    stuff.list[index++] = stuffUnit;
                }
                stuff.length = index-1;
            }
            unit.stuff = stuff;
            list[k++] = unit;
        }
        this._model.maxStorey = k-1;
        this._model.towerList = list;
    },

    httpTowerRewardSend :function(tid){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getTowerRewardCmd(tid),this.update.bind(this));
    },

    httpTowerBattleSend : function(tid){
        var battle = new BattleShowMC(BATTLE_SHOW_MODE.tower,{tid:tid});
        battle.view();
    },

    update : function(){
        this.model();
        this._mainLayer.initReward();
    },

    updateUI : function(){
        this.model();
        this._mainLayer.updateTower();
    },

    init : function(jsonObj){
        this.model(jsonObj);
        if(this._cbScene)
            this._cbScene();
        else
            SceneManager.getInstance().push("TowerScene", this); 
    },

    view:function(cbScene){
        this._cbScene = cbScene;
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getTowerUpCmd(),this.init.bind(this));
    }
});
