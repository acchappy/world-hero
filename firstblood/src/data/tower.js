var TowerUnit = cc.Class.extend({
	ctor:function(){
		return true;
	},

	loadDynamicData:function(dynamicObj){
        //var dynamicObj = this.getHeroDynamicDataUnit();
        fb.extend(this, dynamicObj, true);//合并两个对象, 并且覆盖原有值
	}
});

var TowerData = cc.Class.extend({

	_towerAry : null,
	ctor:function(){

		this._towerAry = [];
		return true;
	},

	loadData:function(jsonObj){
		if(!cc.isArray(jsonObj))
			cc.log("TowerData loadData jsonObj error!!");
		//cc.log("tower  loadData ", JSON.stringify(jsonObj));
		for(var key in jsonObj){
			var tower_unit = new TowerUnit();
	        tower_unit.loadDynamicData(jsonObj[key]);
			this._towerAry[tower_unit.level] = tower_unit;
		}
	},

	addData:function(jsonObj){
		var tower_unit = new TowerUnit();
		tower_unit.loadDynamicData(jsonObj);
		this._towerAry[jsonObj.level] = tower_unit;
	},

	updateData:function(jsonObj){
		if (this._towerAry.hasOwnProperty(jsonObj.level)) {
			this._towerAry[jsonObj.level].loadDynamicData(jsonObj);
		}
	},

	getTowerAry:function(){
		return this._towerAry;
	},

});


TowerData.sharedTowerData = null;
TowerData.firstUse       = true;
TowerData.getInstance  = function () {
    if (TowerData.firstUse) {
        TowerData.firstUse = false;
        TowerData.sharedTowerData = new TowerData();
    }
    return TowerData.sharedTowerData;
};

TowerData.purge = function () {
    if (TowerData.sharedTowerData) {
        delete TowerData.sharedTowerData;
        TowerData.sharedTowerData = null;
        TowerData.firstUse = true;
    }
};