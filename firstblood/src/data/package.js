

/**
 * Created by fable on 15/10/20.
 * @Author fable
 * @desc   背包数据
**/

var PACKAGE_TYPE_FRAGMENT = 100;

//动态数据单元，即服务传过来的字段，要跟本地的静态数据对象合并，组成一个新的对象
var PackageDynamicDataUnit =
{
	id : 10001,
	num : 2
}

var PackageUnit = cc.Class.extend({
	ctor:function(){
		return true;
	},

	loadDynamicData:function(dynamicObj){
        //var dynamicObj = this.getHeroDynamicDataUnit();
        fb.extend(this, dynamicObj, true);//合并两个对象, 并且覆盖原有值
	},	

	//一定要先加载动态数据，根据动态的mid得到静态数据的配置
	loadStaticData:function(staticObj){
        //var staticObj = this.getHeroStaticDataUnit(this.mid);      
        fb.extend(this, staticObj, true);//合并两个对象, 并且覆盖原有值
	}

	// getHeroDynamicDataUnit:function(){  
 //        var obj = HeroDynamicDataUnit;

 //        return obj;		
	// },

	// getHeroStaticDataUnit:function(mid){  
	// 	var jsonObj = cc.loader.getRes(res.hero_data_json);
	// 	var obj = jsonObj[mid];

 //        return obj;		
	// }

});


var PackageData = cc.Class.extend({

	_packageAry : null,

	_packageStaticJsonData: null,

	_notHaveHeroAry:null,

	ctor:function(){

		this._packageAry = [];

		this._packageStaticJsonData = cc.loader.getRes(res.item_data_json);
		if(this._packageStaticJsonData == null)
			cc.log("PackageData cc.loader.getRes(res.package_data_json) fail!!");  


		return true;
	},

	loadData:function(jsonObj){

		if(!cc.isArray(jsonObj))
			cc.log("PackageData loadData jsonObj error!!");

		for(var key in jsonObj){

			var pack_unit = new PackageUnit();
	        // fb.extend(pack_unit, jsonObj[key], true);//合并两个对象, 并且覆盖原有值	
	        // fb.extend(pack_unit, this._packageStaticJsonData[pack_unit.id], true);//合并两个对象, 并且覆盖原有值
	        if(jsonObj[key].id != 1005 && jsonObj[key].id != 1006){
	       		pack_unit.loadDynamicData(jsonObj[key]);
	       		pack_unit.loadStaticData(this._packageStaticJsonData[pack_unit.id]);
	        }

			this._packageAry[pack_unit.id] = pack_unit;
		}
	},

	addData:function(jsonObj){
		for(var key in jsonObj){

			var pack_unit = new PackageUnit();
	        // fb.extend(pack_unit, jsonObj[key], true);//合并两个对象, 并且覆盖原有值	
	        // fb.extend(pack_unit, this._packageStaticJsonData[pack_unit.id], true);//合并两个对象, 并且覆盖原有值	
	        if(jsonObj[key].id != 1005 && jsonObj[key].id != 1006){
	       		pack_unit.loadDynamicData(jsonObj[key]);
	       		pack_unit.loadStaticData(this._packageStaticJsonData[pack_unit.id]);
	        }

			this._packageAry[pack_unit.id] = pack_unit;
			this.modifyNotHaveHeroFragmentData("add", pack_unit.id);
		}		
	},

	delData:function(jsonObj){
		for(var key in jsonObj){
			var obj = jsonObj[key];
			if (this._packageAry.hasOwnProperty(obj.id)) {
				delete this._packageAry[obj.id];  //一定要delete,设置为null没有用，循环依然会有位置存在
				this.modifyNotHaveHeroFragmentData("del", obj.id);			
			}
		}
	},

	updateData:function(jsonObj){
		for(var key in jsonObj){
			var obj = jsonObj[key];
			if (this._packageAry.hasOwnProperty(obj.id)&& obj.id != 1005 && obj.id != 1006) {
				this._packageAry[obj.id].loadDynamicData(obj);
				this.modifyNotHaveHeroFragmentData("update", obj.id);					
			}
		}
	},

	modifyNotHaveHeroFragmentData:function(status, id){
		for (var key in this._notHaveHeroAry) {
			if (this._notHaveHeroAry.hasOwnProperty(id)) {
				if (status == "add") { 
					this._notHaveHeroAry[id].curFragmentNum = this._packageAry[id].num;
				} else if(status == "del"){ 
					this._notHaveHeroAry[id].curFragmentNum = 0;
				} else if(status == "update"){	
					this._notHaveHeroAry[id].curFragmentNum = this._packageAry[id].num;
				}

				break;
			}
		}
	},

	getPackageUnitForId : function(id){
		if (this._packageAry[id])
			return this._packageAry[id];

		return null;
	},

	getPackageStaticJsonObjForId : function(id){
		if(this._packageStaticJsonData[id]){
			var jsonObj = {};
			fb.extend(jsonObj, this._packageStaticJsonData[id], true);//合并两个对象, 并且覆盖原有值
			return jsonObj;
		}

		return null;
	},

	getPackageAryLength:function(){
		var num = 0;
		for(var i in this._packageAry){
			num++;
		}
		return num;
	},

	getNotHaveHeroFragmentAry:function(heroAry){

		var fragmentAry = [];
		for(var i in this._packageStaticJsonData){
			var item = this._packageStaticJsonData[i];
			if (item.type == PACKAGE_TYPE_FRAGMENT) {
				var find = false;
				for (var j in heroAry) {
					var hero = heroAry[j];
					//cc.log("packageData getNotHaveHeroFragmentAry, hero.hid", hero.hid, item.id);
					if (hero.hid == item.id) {  //碎片id与英雄id相同
						find = true;
						break;
					}
				}

				if(!find)
				{
					var fragment = {};
					fragment.id = item.id;
					fragment.maxFragmentNum = item.value;
					var unit = this._packageAry[item.id];
					if (unit) {
						fragment.curFragmentNum = unit.num;
					} else {
						fragment.curFragmentNum = 0;
					}

					fragmentAry.push(fragment);
				}
			}
		}

		return fragmentAry;
	},

	setNotHaveHeroAry:function(notHaveHeroAry){
		this._notHaveHeroAry = notHaveHeroAry;
	}

});


PackageData.sharedPackageData = null;
PackageData.firstUse       = true;
PackageData.getInstance  = function () {
    if (PackageData.firstUse) {
        PackageData.firstUse = false;
        PackageData.sharedPackageData = new PackageData();
    }
    return PackageData.sharedPackageData;
};




