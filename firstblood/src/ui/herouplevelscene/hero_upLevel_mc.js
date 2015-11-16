
/**
 * Created by Tom on 15/09/09.
 * @Author Tom
 * @desc   MVC 模式， hero_upLevel_scene的model,controller
 */

var HeroDynamicDataUnit =
{
	"mid": 1,        //动态id
	"uuid": 10001,   //分区id
	"hid": 101,      //英雄静态数据id
	"level": 1,
	"exp": 1,
	"nextexp":100,
	"skill1": 1,    //1级
	"skill2": 1,
	"skill3": 0,
	"skill4": 0,   //0不开放
	"star": 1,
	"quality": 10, //白10(一阶11)   青20(21, 22)   蓝30(31,32,33)   紫40(41,42,43,44)   金50(51,52,53,54,55)
	"fire": 10, //白10(一阶11)   青20(21, 22)   蓝30(31,32,33)   紫40(41,42,43,44)   金50(51,52,53,54,55)
	"sky": 10,//白10(一阶11)   青20(21, 22)   蓝30(31,32,33)   紫40(41,42,43,44)   金50(51,52,53,54,55)
	"water": 10,//白10(一阶11)   青20(21, 22)   蓝30(31,32,33)   紫40(41,42,43,44)   金50(51,52,53,54,55)
	"land": 10,//白10(一阶11)   青20(21, 22)   蓝30(31,32,33)   紫40(41,42,43,44)   金50(51,52,53,54,55)
	"wind": 10,//白10(一阶11)   青20(21, 22)   蓝30(31,32,33)   紫40(41,42,43,44)   金50(51,52,53,54,55)
	"blood": 90,
	"parmor": 27,
	"marmor": 2,
	"attack_t": 1,  //1 是物理攻击  0 魔法攻击   下面对应的数据跟此类型相关
	"attack": 27,
	"cross": 1,
	"miss": 0,
	"gedang": 0,
	"jianren": 0,
	"huixue": 0,
	"chongsheng": 1,
	"baoji": 0,
	"bisha": 0,
	"jiashen": 0,
	"shengjian": 0,
	"zhongji": 0,
	"battle": 94
}
var HeroUpLevelMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{showNum:"",heroTotal:""},

    ctor:function(index){
        this._model.showNum = index;
        this.model();
        return true;
    },

    model:function(){
    //this._model
        var herolist = [];
        var j = 0;
        for(var i in HeroData.getInstance()._heroAry)
        {
            var heroDataUnit = {};
            var aoyiData = [];
            var qualityData = {};
            //heroMangerDataUnit.mid = HeroData.getInstance()._heroAry[i].mid;
            fb.extend(heroDataUnit, HeroData.getInstance()._heroAry[i],true);
            heroDataUnit.alive = AliveData.getInstance().isAlive(heroDataUnit.hid);
            for(var key = 1;key<=5;++key){
                var aoyi = {};
                aoyi = AoyiData.getInstance().getAoyiUpJsonData(heroDataUnit,AoyiData.getInstance().getAoyiTypeAry()[key]);
                aoyi.cailiao_name = PackageData.getInstance().getPackageStaticJsonObjForId(aoyi.cailiao_id).name;
                if(PackageData.getInstance().getPackageUnitForId(aoyi.cailiao_id))
                {
                    aoyi.cailiao_currNum = PackageData.getInstance().getPackageUnitForId(aoyi.cailiao_id).num;
                }else{
                    aoyi.cailiao_currNum = 0;
                }
                aoyiData[key] = aoyi;
            }
            qualityData =  QualityData.getInstance().getQualityUpJsonData(heroDataUnit);
            if(qualityData){
                for(var k=1;k<=6;k++)
                {
                    qualityData["cailiao_name"+k] = PackageData.getInstance().getPackageStaticJsonObjForId(parseInt(qualityData["cailiao_id" + k])).name;
                    if(PackageData.getInstance().getPackageUnitForId(parseInt(qualityData["cailiao_id" + k]))){
                        qualityData["cailiao_currNum"+k] = PackageData.getInstance().getPackageUnitForId(parseInt(qualityData["cailiao_id" + k])).num;
                    }else{
                        qualityData["cailiao_currNum"+k] = 0;
                    }
                }
            }else{
//                cc.log("hero_uplevel_mc qualityData is null,can't up quality");
            }
            heroDataUnit.qualityData = qualityData;
            heroDataUnit.aoyiData = aoyiData;
            heroDataUnit.fragment = {};
            heroDataUnit.fragment.name = PackageData.getInstance().getPackageStaticJsonObjForId(heroDataUnit.hid).name;
            if(PackageData.getInstance().getPackageUnitForId(heroDataUnit.hid))
            {
                heroDataUnit.fragment.currNum = PackageData.getInstance().getPackageUnitForId(heroDataUnit.hid).num;
            }else{
                heroDataUnit.fragment.currNum = 0;
            }
            herolist[j++] = heroDataUnit;
        }
        fb.UI_sortHeroList(herolist);
        this._model.heroList = herolist;
        this._model.heroTotal = herolist.length;
        this._model.smallEXP = PackageData.getInstance().getPackageUnitForId(fb.UI_SMALL_EXP_ITEM_ID).num;
        this._model.midEXP   = PackageData.getInstance().getPackageUnitForId(fb.UI_MID_EXP_ITEM_ID).num;
        this._model.bigEXP   = PackageData.getInstance().getPackageUnitForId(fb.UI_BIG_EXP_ITEM_ID).num;
        this._model.hugeEXP  = PackageData.getInstance().getPackageUnitForId(fb.UI_HUGE_EXP_ITEM_ID).num;
    },




    view:function(cbScene){

        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();

        if(cbScene)
            cbScene();
        else
            SceneManager.getInstance().push("HeroUpLevelScene", this);    
    },

    httpSkillSend : function(hid,skill){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getUpSkillCmd(hid,skill),this.update.bind(this));
    },

    httpQualitySend : function(hid){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getAdvanceCmd(hid),this.update.bind(this));
    },

    httpExpSend:function(hid,item,num){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getUseMedicineCmd(hid,item,num),this.update.bind(this));
    },

    httpAoyiSend:function(hid,type){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getUserAoyiUpCmd(hid,type),this.update.bind(this));
    },

    update:function(jsonObj){
        this.model();
        this._mainLayer.updateUI();
    }

});



