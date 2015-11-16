

/**
 * Created by fable on 15/09/06.
 * @Author fable
 * @desc   英雄数据的处理
**/

//动态数据单元，即服务传过来的字段，要跟本地的静态数据对象合并，组成一个新的对象
var HeroDynamicDataUnit =
{
	//"mid": 1,        //动态id  ,  英雄不会重复，故不用mid
	//"uuid": 10001,   //分区id
 
	"uid":10001,
	"hid":1001,//英雄静态数据id    
	"level":1,
	"exp":1,
	"skill1":1,//0不开放
	"skill2":1,
	"skill3":1,
	"skill4":1,
	"quality":40,//白10(一阶11)   青20(21, 22)   蓝30(31,32,33)   紫40(41,42,43,44)   金50(51,52,53,54,55)
	"blood_aoyi":22,//白10(一阶11)   青20(21, 22)   蓝30(31,32,33)   紫40(41,42,43,44)   金50(51,52,53,54,55)
	"attack_aoyi":10,
	"parmor_aoyi":10,
	"marmor_aoyi":10,
	"cross_aoyi":10,
	"blood":511,
	"parmor":88,
	"marmor":57,
	"attack_t":1, //1 是物理攻击  0 魔法攻击   下面对应的数据跟此类型相关
	"attack":90,
	"cross":90,
	"miss":0,
	"gedang":0,
	"jianren":0,
	"huixue":0,
	"chongsheng":0,
	"baoji":0,
	"bisha":0,
	"jiashen":0,
	"shengjian":0,
	"zhongji":0,
	"battle":511,
	"nextexp":30,
	"diff":30,
	"cur":1
}

var NotHaveDynamicHeroUnit =
{
	hid  : 1001,
	curFragmentNum : 5,
	maxFragmentNum : 30,
}

var HeroUnit = cc.Class.extend({
	ctor:function(){
		return true;
	},

	loadDynamicData:function(dynamicObj){
        //var dynamicObj = this.getHeroDynamicDataUnit();
        fb.extend(this, dynamicObj, true);//合并两个对象, 并且覆盖原有值
	},	

	//一定要先加载动态数据，根据动态的mid得到静态数据的配置
	loadStaticData:function(staticObj){
        //var staticObj = this.getHeroStaticDataUnit(this.hid);      
        fb.extend(this, staticObj, true);//合并两个对象, 并且覆盖原有值
	}

	// getHeroDynamicDataUnit:function(){  
 //        var obj = HeroDynamicDataUnit;

 //        return obj;		
	// },

	// getHeroStaticDataUnit:function(hid){  
	// 	var jsonObj = cc.loader.getRes(res.hero_data_json);
	// 	var obj = jsonObj[hid];

 //        return obj;		
	// }

});


var HeroData = cc.Class.extend({

	_heroAry : null,
	_heroNotHaveAry : null,

	_heroStaticJsonData: null,

	ctor:function(){

		this._heroAry = [];
		this._heroNotHaveAry = [];

		this._heroStaticJsonData = cc.loader.getRes(res.hero_data_json);
		if(this._heroStaticJsonData == null)
			cc.log("HeroData cc.loader.getRes(res.hero_data_json) fail!!");  

		return true;
	},

	loadData:function(jsonObj){

		if(!cc.isArray(jsonObj))
			cc.log("HeroData loadData jsonObj error!!");

		for(var key in jsonObj){

			var hero_unit = new HeroUnit();
	        // fb.extend(hero_unit, jsonObj[key], true);//合并两个对象, 并且覆盖原有值	
	        // fb.extend(hero_unit, this._heroStaticJsonData[hero_unit.hid], true);//合并两个对象, 并且覆盖原有值	
	        hero_unit.loadDynamicData(jsonObj[key]);
	        hero_unit.loadStaticData(this._heroStaticJsonData[hero_unit.hid]);

			this._heroAry[hero_unit.hid] = hero_unit;
		}
	},

	loadNotHaveHeroData:function(fragmentAry){

		for(var i in fragmentAry){
			var tempUnit = {};		
			fb.extend(tempUnit, NotHaveDynamicHeroUnit, true);	

			tempUnit.hid            = fragmentAry[i].id;			
			tempUnit.curFragmentNum = fragmentAry[i].curFragmentNum;
			tempUnit.maxFragmentNum = fragmentAry[i].maxFragmentNum;
			fb.extend(tempUnit, this._heroStaticJsonData[tempUnit.hid ], true); //碎片id与英雄hid相同		

			this._heroNotHaveAry[tempUnit.hid] = tempUnit;
		}
	},

	getNotHaveHeroAry:function(){
		return this._heroNotHaveAry;
	},

	getNotHaveHeroAryLength : function(){
		var num = 0;
		for(var i in this._heroNotHaveAry){
			num++;
		}
		return num;
	},

	getHeroAry:function(){
		return this._heroAry;
	},

	getHeroUnitForHid:function(hid){
		if (this._heroAry[hid])
			return this._heroAry[hid];

		return null;
	},

	getHeroAryLength:function(){
		var num = 0;
		for(var i in this._heroAry){
			num++;
		}
		return num;
	},

	addData:function(jsonObj){
		for(var key in jsonObj){

			var hero_unit = new HeroUnit();
	        // fb.extend(hero_unit, jsonObj[key], true);//合并两个对象, 并且覆盖原有值	
	        // fb.extend(hero_unit, this._heroStaticJsonData[hero_unit.hid], true);//合并两个对象, 并且覆盖原有值	
	        hero_unit.loadDynamicData(jsonObj[key]);
	        hero_unit.loadStaticData(this._heroStaticJsonData[hero_unit.hid]);

			this._heroAry[hero_unit.hid] = hero_unit;

			this.modifyNotHaveHeroData("add", hero_unit.hid);
		}		
	},

	delData:function(jsonObj){
		for(var key in jsonObj){
			var obj = jsonObj[key];
			if (this._heroAry.hasOwnProperty(obj.hid)) {
				delete this._heroAry[obj.hid];  //一定要delete,设置为null没有用，循环依然会有位置存在
				this.modifyNotHaveHeroData("del", obj.hid);			
			}
		}
	},

	updateData:function(jsonObj){
		for(var key in jsonObj){
			var obj = jsonObj[key];
			if (this._heroAry.hasOwnProperty(obj.hid)) {
				this._heroAry[obj.hid].loadDynamicData(obj);
				this.modifyNotHaveHeroData("update", obj.hid);
			}
		}
	},

	modifyNotHaveHeroData:function(status, id){
		for (var key in this._heroNotHaveAry) {
			if (this._heroNotHaveAry.hasOwnProperty(id)) {
				if (status == "add") { //增加一个，这里要删除一个
					delete this._heroNotHaveAry[id];
				} else if(status == "del"){ //现在不用处理，英雄不会消失
				} else if(status == "update"){	//更新不用处理
				}

				break;
			}
		}
	}	


});


HeroData.sharedHeroData = null;
HeroData.firstUse       = true;
HeroData.getInstance  = function () {
    if (HeroData.firstUse) {
        HeroData.firstUse = false;
        HeroData.sharedHeroData = new HeroData();
    }
    return HeroData.sharedHeroData;
};




