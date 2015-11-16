/**
 * Created by xiaojian on 15/10/22.
 * @Author xiaojian
 * @desc
**/


var MonsterData = cc.Class.extend({

	_monsterStaticJsonData : null,
	ctor:function(){

		return true;
	},

	loadData:function(jsonObj){
		this._monsterStaticJsonData = cc.loader.getRes(res.monster_data_json);
		if(this._monsterStaticJsonData == null)
			cc.log("MonsterData cc.loader.getRes(res.monster_data_json) fail!!");
		return true;
	},

	getMonsterDataById : function(id){
		var jsonObj = null;
		if (this._monsterStaticJsonData.hasOwnProperty(id)) {
			var jsonObj = this._monsterStaticJsonData[id];
//		    cc.log("MonsterData getMonsterUpJsonData: jsonObj,id", id,JSON.stringify(jsonObj));
		}
		return jsonObj;
	}

});

MonsterData.sharedMonsterData = null;
MonsterData.firstUse       = true;
MonsterData.getInstance  = function (){
    if (MonsterData.firstUse) {
        MonsterData.firstUse = false;
        MonsterData.sharedMonsterData = new MonsterData();
    }
    return MonsterData.sharedMonsterData;
};

MonsterData.purge = function () {
    if (MonsterData.sharedMonsterData) {
        delete MonsterData.sharedMonsterData;
        MonsterData.sharedMonsterData = null;
        MonsterData.firstUse = true;
    }
};




