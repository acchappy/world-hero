
/**
 * Created by Tom on 15/09/10.
 * @Author Tom
 * @desc   MVC 模式， cast_scene的model,controller
 */


var CastMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(num){
        this._model.showNum = num;
        var heroList = [];
        var j = 1;
        for(var i in HeroData.getInstance()._heroAry)
        {
            var heroAliveDataUnit = {};
            //heroAliveDataUnit.mid = HeroData.getInstance()._heroAry[i].mid;
            heroAliveDataUnit.uuid = HeroData.getInstance()._heroAry[i].uuid;
            heroAliveDataUnit.hid = HeroData.getInstance()._heroAry[i].hid;
            heroAliveDataUnit.level = HeroData.getInstance()._heroAry[i].level;
            heroAliveDataUnit.attack =  HeroData.getInstance()._heroAry[i].attack;
            heroAliveDataUnit.star = HeroData.getInstance()._heroAry[i].star;
            heroAliveDataUnit.quality = HeroData.getInstance()._heroAry[i].quality;
            heroAliveDataUnit.name = HeroData.getInstance()._heroAry[i].name;
            heroAliveDataUnit.battle = HeroData.getInstance()._heroAry[i].battle;
            heroAliveDataUnit.parmor = HeroData.getInstance()._heroAry[i].parmor;
            heroAliveDataUnit.blood = HeroData.getInstance()._heroAry[i].blood;
            heroAliveDataUnit.miss = HeroData.getInstance()._heroAry[i].miss;
            heroAliveDataUnit.seat =AliveData.getInstance().getSeat(heroAliveDataUnit.hid);
            heroAliveDataUnit.alive = AliveData.getInstance().isAlive(heroAliveDataUnit.hid);
            heroList[j++] = heroAliveDataUnit;
        }
        this._model.heroList = heroList;
        this._model.length = j-1;
        return true;
    },

    model:function(){
    //this._model

    },

    addObserver : function(){
        NotificationCenter.getInstance().addObserver("updateCS", this.updateCast.bind(this));
    },

    updateCast:function(name, obj){
        var heroList = [];
        var j = 1;
        for(var i in obj.heroList){
            var heroAliveDataUnit = {};
            fb.extend(heroAliveDataUnit,obj.heroList[i],true);
            heroList[j++] = heroAliveDataUnit;
        }
        this._model.showNum = obj.seat;
        this._model.heroList = heroList;
        this._model.length = j-1;
        this._mainLayer.updateUI();
        NotificationCenter.getInstance().removeObserver("updateCS");
    },

    view:function(){

        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();
        SceneManager.getInstance().push("CastScene", this);
    }
});
