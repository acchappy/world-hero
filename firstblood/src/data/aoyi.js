

/**
 * Created by fable on 15/10/22.
 * @Author fable
 * @desc   上阵英雄数据的处理
**/
var AOYI_TYPE_ARRAY = [];
AOYI_TYPE_ARRAY[1] = "attack_aoyi";
AOYI_TYPE_ARRAY[2] = "blood_aoyi";
AOYI_TYPE_ARRAY[3] = "marmor_aoyi";
AOYI_TYPE_ARRAY[4] = "parmor_aoyi";
AOYI_TYPE_ARRAY[5] = "cross_aoyi";


var AoyiData = cc.Class.extend({

	_aoyiStaticJsonData : null,
	ctor:function(){

		return true;
	},

	loadData:function(jsonObj){
		this._aoyiStaticJsonData = cc.loader.getRes(res.aoyi_data_json);
		if(this._aoyiStaticJsonData == null)
			cc.log("AoyiData cc.loader.getRes(res.aoyi_data_json) fail!!");  

		return true;		
	},

	getAoyiTypeAry:function(){
		return AOYI_TYPE_ARRAY;		
	},

	getAoyiUpJsonData:function(heroUnit, type){

		var jsonObj = null;
		if (this._aoyiStaticJsonData.hasOwnProperty(heroUnit.grade)) {
			var objGrade = this._aoyiStaticJsonData[heroUnit.grade];
			if (objGrade.hasOwnProperty(type)) {
				var objType = objGrade[type];
				var quality = heroUnit[type].toString();
//				cc.log("AoyiData getAoyiUpJsonData, quality", quality);
				if (objType.hasOwnProperty(quality)) {
					jsonObj = objType[quality];
//					cc.log("AoyiData getAoyiUpJsonData, jsonObj", JSON.stringify(jsonObj));
				}
			}
		}

		return jsonObj;
	}	


});


AoyiData.sharedAoyiData = null;
AoyiData.firstUse       = true;
AoyiData.getInstance  = function (){
    if (AoyiData.firstUse) {
        AoyiData.firstUse = false;
        AoyiData.sharedAoyiData = new AoyiData();
    }
    return AoyiData.sharedAoyiData;
};

AoyiData.purge = function () {
    if (AoyiData.sharedAoyiData) {
        delete AoyiData.sharedAoyiData;
        AoyiData.sharedAoyiData = null;
        AoyiData.firstUse = true;
    }
};




