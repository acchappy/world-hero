/**
 * Created by xiaojian on 15/11/02.
 * @Author xiaojian
 * @desc
**/


var EliteMapUnit = cc.Class.extend({
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

var EliteMapData = cc.Class.extend({

     _eliteMapAry : null,
	 _eliteMapStaticJsonData : null,
	 _eliteMapAryLength : 0,

	ctor:function(){
	    this. _eliteMapAry = [];
		this._eliteMapStaticJsonData = cc.loader.getRes(res.eliteMap_data_json);
		if(this._eliteMapStaticJsonData == null)
			cc.log("EliteMapData cc.loader.getRes(res.simpleMap_data_json) fail!!");

		return true;
	},

	loadData:function(jsonObj){
		if(!cc.isArray(jsonObj))
			cc.log("HeroData loadData jsonObj error!!");
//        cc.log("jsonObj",jsonObj,JSON.stringify(jsonObj));
		for(var key in jsonObj){
			var simpleMap_unit = new EliteMapUnit();
	        simpleMap_unit.loadDynamicData(jsonObj[key]);
	        simpleMap_unit.loadStaticData(this.getEliteMapStaticJsonData(simpleMap_unit.chapter,simpleMap_unit.section));
//	        cc.log("key in jsonObj",key,jsonObj[key],jsonObj[key].chapter,jsonObj[key].chapter,jsonObj[key].chapter);
            this. _eliteMapAryLength += 1;
            this. _eliteMapAry[this. _eliteMapAryLength] = simpleMap_unit;
		}
//		cc.log("this. _eliteMapAryLength",this. _eliteMapAryLength);
		return true;
	},

    //根据章节序号得到该章节的关卡进度
    getSenctionCurrNumberByChapter : function(chapter)
    {
        var num = 0;
        for(var i in this. _eliteMapAry)
        {
            if(this. _eliteMapAry[i].chapter == chapter)
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
        for(var i in this. _eliteMapAry)
        {
            if(this. _eliteMapAry[i].chapter == chapter)
            {
                num+= this. _eliteMapAry[i].star;
            }
        }
        return num;
    },

    //根据章节数得到该章节总共多少关卡
    getSenctionTotalNumberByChapter : function(chapter)
    {
        var num = 0;
        for(var i in this._eliteMapStaticJsonData[chapter])
        {
            num++;
        }
        return num;
    },

    //得到章节总数
    getChapterTotalNumber : function()
    {
        var num = 0;
        for(var i in this._eliteMapStaticJsonData)
        {
            num++;
        }
        return num;
    },

    //得到当前推进章节数目
    getChapterCurrNumber : function()
    {
        var num = 0;
        for(var i in this._eliteMapAry)
        {
            if(this._eliteMapAry[i].chapter > num)
                num = this. _eliteMapAry[i].chapter;
        }
        return num;
    },

    //根据章节序号得到关卡信息数组
    getSenctionInfoByChapter : function(chapter)
    {
        var senctionInfo = [];
        var num = 1;
        for(var i in this. _eliteMapAry)
        {
            if(parseInt(this. _eliteMapAry[i].chapter) == parseInt(chapter))
            {
                var senctionUnit = {};
                senctionUnit.star = this. _eliteMapAry[i].star;
                senctionUnit.Info = this._eliteMapStaticJsonData[chapter][this. _eliteMapAry[i].section];
                senctionInfo[this. _eliteMapAry[i].section] = senctionUnit;
                num ++ ;
            }
        }
        if(num<= this.getSenctionTotalNumberByChapter(chapter)){
            var senctionUnit = {};
            senctionUnit.star = 0;
            senctionUnit.Info = this._eliteMapStaticJsonData[chapter][num];
//                        cc.log(" getSenctionInfoByChapter num ",num);
            senctionInfo[num++] = senctionUnit;
        }
        return senctionInfo;
    },

	getEliteMapStaticJsonData : function(chapter,section){
	    if(this._eliteMapStaticJsonData[chapter][section]){
        	var jsonObj = {};
        	fb.extend(jsonObj,this._eliteMapStaticJsonData[chapter][section], true);//合并两个对象, 并且覆盖原有值
        	return jsonObj;
        }
	    return null;
	},

    getEliteMapChapterJsonData : function(chapter){

    },

    getEliteMapSectionJsonData : function(chapter,section){
	    var jsonObj = null;
	    for(var key in this. _eliteMapAry)
	    {
	        if(this. _eliteMapAry[key].chapter == chapter && this. _eliteMapAry[key].section == section)
	        {
	            jsonObj = this. _eliteMapAry[key];
	            cc.log("EliteMapData getEliteMapSectionJsonData, jsonObj", JSON.stringify(jsonObj));
	            break;
	        }
	    }
	    return jsonObj;
    },

	getEliteMapAry:function(){
		return this.  _eliteMapAry;
	},

    addData:function(jsonObj){
		if(!cc.isArray(jsonObj))
			cc.log("HeroData loadData jsonObj error!!");

		for(var key in jsonObj){
			var simpleMap_unit = new EliteMapUnit();
	        simpleMap_unit.loadDynamicData(jsonObj[key]);
	        simpleMap_unit.loadStaticData(this.getEliteMapStaticJsonData(simpleMap_unit.chapter,simpleMap_unit.section));
            this. _eliteMapAryLength += 1;
			this. _eliteMapAry[this. _eliteMapAryLength] = simpleMap_unit;
		}
	},

	updateData:function(jsonObj){
		for(var key in jsonObj){
			var obj = jsonObj[key];
			var Mobj = this.getEliteMapSectionJsonData(obj.chapter,obj.section);
			if (Mobj) {
				Mobj.loadDynamicData(obj);
			}
		}
	},


});

EliteMapData.sharedEliteMapData = null;
EliteMapData.firstUse       = true;
EliteMapData.getInstance  = function (){
    if (EliteMapData.firstUse) {
        EliteMapData.firstUse = false;
        EliteMapData.sharedEliteMapData = new EliteMapData();
    }
    return EliteMapData.sharedEliteMapData;
};

EliteMapData.purge = function () {
    if (EliteMapData.sharedEliteMapData) {
        delete EliteMapData.sharedEliteMapData;
        EliteMapData.sharedEliteMapData = null;
        EliteMapData.firstUse = true;
    }
};




