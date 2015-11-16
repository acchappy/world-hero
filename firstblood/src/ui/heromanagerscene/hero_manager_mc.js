
/**
 * Created by Tom on 15/09/09.
 * @Author Tom
 * @desc   MVC 模式， hero_manager_scene的model,controller
 */


var HeroMangerDataUnit =
{
	"mid": "1",        //动态id
	"uuid": "10001",   //分区id
	"hid": "101",      //英雄静态数据id
	"level": "1",
	"star": 3,
	"quality": 44, //白10(一阶11)   青20(21, 22)   蓝30(31,32,33)   紫40(41,42,43,44)   金50(51,52,53,54,55)
    "name" : "heroTest",
	"battle": 1120000
}

var HeroMangerMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(){
        return true;
    },

    model:function(){
    //this._model
//         for(var i = 0; i<12; i++)
//         {
//             var tempUnit = {};
//             fb.extend(tempUnit, HeroMangerDataUnit,true);
//             if(i%2)
//                 tempUnit.battle = 1200;
//
//             heroList[j+i] = tempUnit;
//
//         }
        this.init();

    },

    init : function(){
        var heroList = [];
        var fragmentList = [];
        var summonList = [];
        var notHaveList = [];

        var j = 0;
        for(var i in HeroData.getInstance()._heroAry)
        {
            var heroMangerDataUnit = {};
            //heroMangerDataUnit.mid = HeroData.getInstance()._heroAry[i].mid;
            heroMangerDataUnit.uuid = HeroData.getInstance()._heroAry[i].uuid;
            heroMangerDataUnit.hid = HeroData.getInstance()._heroAry[i].hid;
            heroMangerDataUnit.level = HeroData.getInstance()._heroAry[i].level;
            heroMangerDataUnit.star = HeroData.getInstance()._heroAry[i].star;
            heroMangerDataUnit.quality = HeroData.getInstance()._heroAry[i].quality;
            heroMangerDataUnit.name = HeroData.getInstance()._heroAry[i].name;
            heroMangerDataUnit.battle = HeroData.getInstance()._heroAry[i].battle;
            heroMangerDataUnit.alive = AliveData.getInstance().isAlive(heroMangerDataUnit.hid);
            heroList[j++] = heroMangerDataUnit;
        }
        fb.UI_sortHeroList(heroList);

        fragmentList  = HeroData.getInstance().getNotHaveHeroAry();
        var k = 0;
        var n = 0;
        for(var i in fragmentList){
            if(fragmentList[i].curFragmentNum>=30)
            {
                cc.log("fragmentList[i].curFragmentNum",fragmentList[i].curFragmentNum);
                summonList[k++] = fragmentList[i];
            }else{
                notHaveList[n++] = fragmentList[i];
            }
        }

        this._model.summonList = summonList;
        this._model.notHaveList = notHaveList;
        this._model.heroList = heroList;
        this._model._heroNumber = heroList.length;
        this._model._summonHeroNumber = summonList.length;
        this._model. _notHaveHeroNumber = notHaveList.length;
        this._model.heroTotal = heroList.length + HeroData.getInstance().getNotHaveHeroAryLength();

    },

    addObserver : function(){
        NotificationCenter.getInstance().addObserver("updateHM", this.updateUI.bind(this));
    },

    httpSend:function(hid){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getUserMergeHeroCmd(hid), this.update.bind(this));
    },

    updateUI:function(){
        this.update();
        NotificationCenter.getInstance().removeObserver("updateHM");
    },

    update : function(){
        this.init();
        this._mainLayer.updateUI();
    },

    view:function(){

        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();
        SceneManager.getInstance().push("HeroManagerScene", this);
    }
});



