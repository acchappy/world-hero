

/**
 * Created by fable on 15/09/06.
 * @Author fable
 * @desc   上阵英雄数据的处理
**/

//动态数据单元，即服务传过来的字段，要跟本地的静态数据对象合并，组成一个新的对象
var AliveDataUnit =
{
	seat      :  1,
	hid       :  112,
//	mid       :  2,
	level     :  12,
	star      :  5,
	quality   :  20,
}

var AliveUnit = cc.Class.extend({
	ctor:function(){
		return true;
	},

	loadDynamicData:function(dynamicObj){
        //var dynamicObj = this.getHeroDynamicDataUnit();
        fb.extend(this, dynamicObj, true);//合并两个对象, 并且覆盖原有值
	}

	// //一定要先加载动态数据，根据动态的hid得到静态数据的配置
	// loadStaticData:function(staticObj){
 //        //var staticObj = this.getHeroStaticDataUnit(this.hid);      
 //        fb.extend(this, staticObj, true);//合并两个对象, 并且覆盖原有值
	// }
});


var AliveData = cc.Class.extend({

	_aliveAry : null,
	ctor:function(){

		this._aliveAry = [];
		return true;
	},

	loadData:function(jsonObj){
		if(!cc.isArray(jsonObj))
			cc.log("AliveData loadData jsonObj error!!");

		//cc.log("alive  loadData ", JSON.stringify(jsonObj));
		for(var key in jsonObj){

			var alive_unit = new AliveUnit();
	        alive_unit.loadDynamicData(jsonObj[key]);

			this._aliveAry[alive_unit.hid] = alive_unit;
		}
	},

	getAliveAry:function(){
		return this._aliveAry;
	},

	isAlive:function(hid){
		for(var i in this._aliveAry)
		{
			if(this._aliveAry[i].hid == hid){
				return true;
			}
		}
		return false;
	},

	getSeat : function(hid){
		for(var i in this._aliveAry)
		{
			if(this._aliveAry[i].hid == hid){
				return this._aliveAry[i].seat;
			}
		}
		return 0;
	},
});


AliveData.sharedAliveData = null;
AliveData.firstUse       = true;
AliveData.getInstance  = function () {
    if (AliveData.firstUse) {
        AliveData.firstUse = false;
        AliveData.sharedAliveData = new AliveData();
    }
    return AliveData.sharedAliveData;
};

AliveData.purge = function () {
    if (AliveData.sharedAliveData) {
        delete AliveData.sharedAliveData;
        AliveData.sharedAliveData = null;
        AliveData.firstUse = true;
    }
};




