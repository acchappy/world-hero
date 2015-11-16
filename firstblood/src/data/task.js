/**
 * Created by xiaojian on 15/10/22.
 * @Author xiaojian
 * @desc
**/


var TaskUnit = cc.Class.extend({
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

var TaskData = cc.Class.extend({

    _taskAry : null,
	_taskStaticJsonData : null,
	_taskAryLength : 0,

	ctor:function(){
	    this._taskAry = [];
		this._taskStaticJsonData = cc.loader.getRes(res.task_data_json);
		if(this._taskStaticJsonData == null)
			cc.log("TaskData cc.loader.getRes(res.task_data_json) fail!!");

		return true;
	},

	loadData:function(jsonObj){
		if(!cc.isArray(jsonObj))
			cc.log("HeroData loadData jsonObj error!!");
	    var obj = jsonObj;
		for(var key in obj){
			var task_unit = new TaskUnit();
	        task_unit.loadDynamicData(obj[key]);
	        task_unit.loadStaticData(this._taskStaticJsonData[task_unit.task_id]);
            this._taskAry[task_unit.task_id] = task_unit;
		}
		return true;
	},

	getTaskAry : function(){
		return this._taskAry;
	},

	getTaskStaticJsonObjForId : function(task_id){
		if(this._taskStaticJsonData[task_id]){
			var jsonObj = {};
			fb.extend(jsonObj, this._taskStaticJsonData[task_id], true);//合并两个对象, 并且覆盖原有值
			return jsonObj;
		}

		return null;
	},

    addData:function(jsonObj){
		if(!cc.isArray(jsonObj))
			cc.log("HeroData loadData jsonObj error!!");

		for(var key in jsonObj){
			var task_unit = new TaskUnit();
	        task_unit.loadDynamicData(jsonObj[key]);
	        task_unit.loadStaticData(this.getTaskStaticJsonData(task_unit.chapter,task_unit.section));
            this._taskAryLength += 1;
			this._taskAry[this._taskAryLength] = task_unit;
		}
	},

	updateData:function(jsonObj){
		for(var key in jsonObj){
			var obj = jsonObj[key];
			var Mobj = this.getTaskSectionJsonData(obj.chapter,obj.section);
			if (Mobj) {
				Mobj.loadDynamicData(obj);
			}
		}
	},

});

TaskData.sharedTaskData = null;
TaskData.firstUse       = true;
TaskData.getInstance  = function (){
    if (TaskData.firstUse) {
        TaskData.firstUse = false;
        TaskData.sharedTaskData = new TaskData();
    }
    return TaskData.sharedTaskData;
};

TaskData.purge = function () {
    if (TaskData.sharedTaskData) {
        delete TaskData.sharedTaskData;
        TaskData.sharedTaskData = null;
        TaskData.firstUse = true;
    }
};




