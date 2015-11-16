
/**
 * Created by Tom on 15/09/09.
 * @Author Tom
 * @desc   MVC 模式， hero_Strengthen_scene的model,controller
 */
var HeroStrengDataUnit =
{
    "mid": "1",        //动态id
    "uuid": "10001",   //分区id
    "hid": "101",      //英雄静态数据id
    "level": "1",
    "star": 3,
    "quality": 44, //白10(一阶11)   青20(21, 22)   蓝30(31,32,33)   紫40(41,42,43,44)   金50(51,52,53,54,55)
    "name" : "heroTest",
    "battle": 1120000,
    "alive":false
};

var HeroStrengthenMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{
                herolist:[], 
                index:0
           },

    ctor:function(index){
        this._model.index = index;

        return true;
    },

    model:function(){
        var herolist = [];
        var j = 0;
        for(var i in HeroData.getInstance()._heroAry)
        {
            var unit = {};
            fb.extend(unit, HeroStrengDataUnit, true);

            //unit.mid          = HeroData.getInstance()._heroAry[i].mid;
            unit.uuid         = HeroData.getInstance()._heroAry[i].uuid;
            unit.hid          = HeroData.getInstance()._heroAry[i].hid;
            unit.level        = HeroData.getInstance()._heroAry[i].level;
            unit.star         = HeroData.getInstance()._heroAry[i].star;
            unit.quality      = HeroData.getInstance()._heroAry[i].quality;
            unit.name         = HeroData.getInstance()._heroAry[i].name;
            unit.battle       = HeroData.getInstance()._heroAry[i].battle;
            unit.alive        = AliveData.getInstance().isAlive(unit.mid);

            herolist[j++]     = unit;
        }

        fb.UI_sortHeroList(herolist);

        this._model.heroList  = herolist;
        //this._model.heroTotal = herolist.length;
    },

    view:function(){

        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();
        SceneManager.getInstance().push("HeroStrengthenScene", this);
    }
});



