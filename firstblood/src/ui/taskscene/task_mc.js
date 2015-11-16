
/**
 * Created by  on 15/11/04.
 * @Author Tom
 * @desc
 */


var TaskMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(){

        return true;
    },

    model:function(){
    //this._model
        var task = [];
        var everyDayTaskList = [];
        var principalTaskList = [];
        var everyDayIndex = 1;
        var principalIndex = 1;
        var obj = TaskData.getInstance().getTaskAry();
        for(var i in obj)
        {
            var task = {};
            task.task_id = obj[i].task_id;
            task.complete     = obj[i].complete;
            task.reward       = obj[i].reward;
            task.now_num      = obj[i].now_num;
            task.need_num     = obj[i].need_num;
            task.type         = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).type;
            task.level        = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).level;
            task.complete_num = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).complete_num;
            task.add_exp      = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).add_exp;
            task.add_money    = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).add_money;
            task.add_wupin1   = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).add_wupin1;
            task.add_name1    =  PackageData.getInstance().getPackageStaticJsonObjForId(task.add_wupin1).name;
            task.add_num1     = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).add_num1;
            task.add_wupin2   = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).add_wupin2;
            task.add_num2     = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).add_num2;
            task.add_name2    =  PackageData.getInstance().getPackageStaticJsonObjForId(task.add_wupin2).name;
            task.shuoming     = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).shuoming;
            task.title        = TaskData.getInstance().getTaskStaticJsonObjForId(task.task_id).title;
            if(task.type!= 100){
                principalTaskList[principalIndex++] = task;
            }else{
                everyDayTaskList[everyDayIndex++] = task;
            }

        }
        var principal = {};
        principal.taskList = principalTaskList;
        principal.length = principalIndex-1;
        principal.maxIndex = principalIndex-1;
        var everyDay = {};
        everyDay.taskList = everyDayTaskList;
        everyDay.length = everyDayIndex-1;
        everyDay.maxIndex = everyDayIndex-1;
        this._model.task = [];
        this._model.task[1] = principal;
        this._model.task[2] = everyDay;

    },

    getTaskRewardCmd :function(task_id){
        this._model.complete_id = task_id;
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getTaskRewardCmd(task_id),this.update.bind(this));
    },

    update : function(jsonObj){
        this._mainLayer.updateUI();
    },

    deleteTask : function(){
        if(TaskData.getInstance().getTaskStaticJsonObjForId(this._model.complete_id).type == 100)
        {
            for(var i in this._model.task[2].taskList)
            {
                if(this._model.complete_id == this._model.task[2].taskList[i].task_id){
                    if(i == this._model.task[2].maxIndex)
                    {
                        this._model.task[2].maxIndex -= 1;
                    }
                    delete this._model.task[2].taskList[i];
                    this._model.task[2].length -= 1;
                    break
                }
            }
            delete this._model.task[2].taskList[this._model.complete_id];
        }else{
            for(var i in this._model.task[1].taskList)
            {
                if(this._model.complete_id == this._model.task[1].taskList[i].task_id){
                    if(i == this._model.task[1].maxIndex)
                    {
                        this._model.task[1].maxIndex -= 1;
                    }
                    delete this._model.task[1].taskList[i];
                    this._model.task[1].length -= 1;
                    break
                }
            }
        }
    },

    init : function(){
        this.model();

        SceneManager.getInstance().push("TaskScene", this); 

    },

    view:function(){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getTaskListCmd(),this.init.bind(this));
    }
});
