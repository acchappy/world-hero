/**
 * Created by xiaojian on 15/10/22.
 * @Author xiaojian
 * @desc
**/


var QualityData = cc.Class.extend({

	_qualityStaticJsonData : null,
	ctor:function(){

		return true;
	},

	loadData:function(jsonObj){
		this._qualityStaticJsonData = cc.loader.getRes(res.quality_data_json);
		if(this._qualityStaticJsonData == null)
			cc.log("QualityData cc.loader.getRes(res.quality_data_json) fail!!");
		return true;
	},

	getQualityUpJsonData:function(heroUnit){
		var jsonObj = null;
		if (this._qualityStaticJsonData.hasOwnProperty(heroUnit.hid)) {
			var objGrade = this._qualityStaticJsonData[heroUnit.hid];
				if (objGrade.hasOwnProperty(heroUnit.quality)) {
					jsonObj = objGrade[heroUnit.quality];
//					cc.log("QualityData getQualityUpJsonData, jsonObj", JSON.stringify(jsonObj));
				}
		}

		return jsonObj;
	}	

});

QualityData.sharedQualityData = null;
QualityData.firstUse       = true;
QualityData.getInstance  = function (){
    if (QualityData.firstUse) {
        QualityData.firstUse = false;
        QualityData.sharedQualityData = new QualityData();
    }
    return QualityData.sharedQualityData;
};

QualityData.purge = function () {
    if (QualityData.sharedQualityData) {
        delete QualityData.sharedQualityData;
        QualityData.sharedQualityData = null;
        QualityData.firstUse = true;
    }
};




