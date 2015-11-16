/**
 * Created by xiaojian on 15/10/22.
 * @Author xiaojian
 * @desc
**/


var SimpleMapUnit = cc.Class.extend({
	ctor:function(){
		return true;
	},

	loadDynamicData:function(dynamicObj){
        fb.extend(this, dynamicObj, true);//合并两个对象, 并且覆盖原有值
	},

	//一定要先加载动态数据，根据动态的mid得到静态数据的配置
	loadStaticData:function(staticObj){
        fb.extend(this, staticObj, true);//合并两个对象, 并且覆盖原有值
	}

});

var SimpleMapData = cc.Class.extend({

    _simpleMapAry : null,
	_simpleMapStaticJsonData : null,
	_simpleMapAryLength : 0,

	ctor:function(){
	    this._simpleMapAry = [];
		this._simpleMapStaticJsonData = cc.loader.getRes(res.simpleMap_data_json);
		if(this._simpleMapStaticJsonData == null)
			cc.log("SimpleMapData cc.loader.getRes(res.simpleMap_data_json) fail!!");

		return true;
	},

	loadData:function(jsonObj){
		if(!cc.isArray(jsonObj))
			cc.log("HeroData loadData jsonObj error!!");
//        cc.log("jsonObj",jsonObj,JSON.stringify(jsonObj));
		for(var key in jsonObj){
			var simpleMap_unit = new SimpleMapUnit();
	        simpleMap_unit.loadDynamicData(jsonObj[key]);
	        simpleMap_unit.loadStaticData(this.getSimpleMapStaticJsonData(simpleMap_unit.chapter,simpleMap_unit.section));
//	        cc.log("key in jsonObj",key,jsonObj[key],jsonObj[key].chapter,jsonObj[key].chapter,jsonObj[key].chapter);
            this._simpleMapAryLength += 1;
            this._simpleMapAry[this._simpleMapAryLength] = simpleMap_unit;
		}
//		cc.log("this._simpleMapAryLength",this._simpleMapAryLength);
		return true;
	},

    //根据章节序号得到该章节的关卡进度
    getSenctionCurrNumberByChapter : function(chapter)
    {
        var num = 0;
        for(var i in this._simpleMapAry)
        {
            if(this._simpleMapAry[i].chapter == chapter)
            {
                num++;
            }
        }
        return num;
    },

    //根据章节序号得到该章节获得星星数目
    getSenctionCurrStarByChapter : function(chapter)
    {
        var num = 0;
        for(var i in this._simpleMapAry)
        {
            if(this._simpleMapAry[i].chapter == chapter)
            {
                num+= this._simpleMapAry[i].star;
            }
        }
        return num;
    },

    //根据章节数得到该章节总共多少关卡
    getSenctionTotalNumberByChapter : function(chapter)
    {
        var num = 0;
        for(var i in this._simpleMapStaticJsonData[chapter])
        {
            num++;
        }
        return num;
    },

    //得到章节总数
    getChapterTotalNumber : function()
    {
        var num = 0;
        for(var i in this._simpleMapStaticJsonData)
        {
            num++;
        }
        return num;
    },

    //得到当前推进章节数目
    getChapterCurrNumber : function()
    {
        var num = 0;
        for(var i in this._simpleMapStaticJsonData)
        {
            if(this._simpleMapAry[i].chapter > num)
                num = this._simpleMapAry[i].chapter;
        }
        return num;
    },

    //根据章节序号得到关卡信息数组
    getSenctionInfoByChapter : function(chapter)
    {
        var senctionInfo = [];
        var num = 1;
        for(var i in this._simpleMapAry)
        {
            if(parseInt(this._simpleMapAry[i].chapter) == parseInt(chapter))
            {
                var senctionUnit = {};
                senctionUnit.star = this._simpleMapAry[i].star;
                senctionUnit.Info = this._simpleMapStaticJsonData[chapter][this._simpleMapAry[i].section];
                senctionInfo[this._simpleMapAry[i].section] = senctionUnit;
                num ++ ;
            }
        }
        if(num<= this.getSenctionTotalNumberByChapter(chapter)){
            var senctionUnit = {};
            senctionUnit.star = 0;
            senctionUnit.Info = this._simpleMapStaticJsonData[chapter][num];
//                        cc.log(" getSenctionInfoByChapter num ",num);
            senctionInfo[num++] = senctionUnit;
        }
        return senctionInfo;
    },

	getSimpleMapStaticJsonData : function(chapter,section){
	    if(this._simpleMapStaticJsonData[chapter][section]){
        	var jsonObj = {};
        	fb.extend(jsonObj,this._simpleMapStaticJsonData[chapter][section], true);//合并两个对象, 并且覆盖原有值
        	return jsonObj;
        }
	    return null;
	},

    getSimpleMapChapterJsonData : function(chapter){

    },

    getSimpleMapSectionJsonData : function(chapter,section){
	    var jsonObj = null;
	    for(var key in this._simpleMapAry)
	    {
	        if(this._simpleMapAry[key].chapter == chapter && this._simpleMapAry[key].section == section)
	        {
	            jsonObj = this._simpleMapAry[key];
	            cc.log("SimpleMapData getSimpleMapSectionJsonData, jsonObj", JSON.stringify(jsonObj));
	            break;
	        }
	    }
	    return jsonObj;
    },

	getSimpleMapAry:function(){
		return this. _simpleMapAry;
	},

    addData:function(jsonObj){
		if(!cc.isArray(jsonObj))
			cc.log("HeroData loadData jsonObj error!!");

		for(var key in jsonObj){
			var simpleMap_unit = new SimpleMapUnit();
	        simpleMap_unit.loadDynamicData(jsonObj[key]);
	        simpleMap_unit.loadStaticData(this.getSimpleMapStaticJsonData(simpleMap_unit.chapter,simpleMap_unit.section));
            this._simpleMapAryLength += 1;
			this._simpleMapAry[this._simpleMapAryLength] = simpleMap_unit;
		}
	},

	updateData:function(jsonObj){
		for(var key in jsonObj){
			var obj = jsonObj[key];
			var Mobj = this.getSimpleMapSectionJsonData(obj.chapter,obj.section);
			if (Mobj) {
				Mobj.loadDynamicData(obj);
			}
		}
	},


});

SimpleMapData.sharedSimpleMapData = null;
SimpleMapData.firstUse       = true;
SimpleMapData.getInstance  = function (){
    if (SimpleMapData.firstUse) {
        SimpleMapData.firstUse = false;
        SimpleMapData.sharedSimpleMapData = new SimpleMapData();
    }
    return SimpleMapData.sharedSimpleMapData;
};

SimpleMapData.purge = function () {
    if (SimpleMapData.sharedSimpleMapData) {
        delete SimpleMapData.sharedSimpleMapData;
        SimpleMapData.sharedSimpleMapData = null;
        SimpleMapData.firstUse = true;
    }
};




