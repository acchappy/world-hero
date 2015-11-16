/**
 * Created by xiaojian on 15/11/04.
 * @Author xiaojian
 * @desc   ...
 */

var TaskLayer = cc.Layer.extend({
    _mc:null,
    _widget:null,
    _type : 1,
    _consumeMC:null,
    _interval:10,

    ctor:function (mc) {
        this._super();
        this._mc = mc;

        var size = cc.director.getWinSize();
        this._widget = ccs.load(res.task_scene_json).node;

        fb.widgetAdapter(this._widget);  
        
        this.addChild(this._widget);

        this.initUI();

        return true;
    },

    //
    initUI:function(){
        this.initBtn();
    },

    initBtn:function(){
        this.initCommon();
        this.initCheckBox();
    },

    initCommon : function(){
        ReturnButtonTemplate.getInstance().addReturnButtonTemplate(this._widget);
        this._consumeMC = new ConsumeMC(this);
        this._consumeMC.view();
    },

    initCheckBox : function(){
        var self = this;
        var principalTaskCB = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_principal_task");
        var everydayTaskCB = this._widget.getChildByName("Panel_main").getChildByName("CheckBox_everyday_task");
        //
        principalTaskCB.setSelected(true);
        everydayTaskCB.setSelected(false);
        principalTaskCB.setTouchEnabled(false);
        everydayTaskCB.setTouchEnabled(true);

        this.initScrollView();

        principalTaskCB.addClickEventListener(function(){
            principalTaskCB.setSelected(true);
            everydayTaskCB.setSelected(false);
            principalTaskCB.setTouchEnabled(false);
            everydayTaskCB.setTouchEnabled(true);
            self._type = 1;
            self.initScrollView();
        });
        everydayTaskCB.addClickEventListener(function(){
            principalTaskCB.setSelected(false);
            everydayTaskCB.setSelected(true);
            principalTaskCB.setTouchEnabled(true);
            everydayTaskCB.setTouchEnabled(false);
            self._type = 2;
            self.initScrollView();
        });
    },

    initScrollView : function(){
        var self = this;
        var taskNum = this._mc._model.task[self._type].length;
        var taskSV = this._widget.getChildByName("Panel_main").getChildByName("ScrollView_task");
        var taskTemplate = this._widget.getChildByName("Panel_main").getChildByName("Panel_task");

		var maxHeight = (taskNum)*(taskTemplate.getContentSize().height) + (taskNum+1)*self._interval;
		if(maxHeight<taskSV.getContentSize().height){
		    maxHeight = taskSV.getContentSize().height;
		}
		var taskPos = cc.p(taskSV.getContentSize().width/2,maxHeight-taskTemplate.getContentSize().height/2-self._interval) ;
		taskSV.setInnerContainerSize(cc.size(taskSV.getContentSize().width,maxHeight));
//        taskSV.setScrollBarEnabled(false);
        taskSV.removeAllChildren();
        for(var i =1;i <= this._mc._model.task[self._type].maxIndex;i++)
        {
            if(this._mc._model.task[self._type].taskList[i]){
                var task = taskTemplate.clone();
                task.setVisible(true);
                task.setTag(i);
                task.setPosition(taskPos);
                this.setTaskInfo(task,i);
                taskPos.y -= taskTemplate.getContentSize().height+self._interval;
                taskSV.addChild(task);
            }
        }

        this._widget.getChildByName("Panel_prize_mask").setVisible(false);
    },

    setTaskInfo : function(task,index){
        var self = this;
        task.getChildByName("Text_task_name").setString(this._mc._model.task[self._type].taskList[index].title);
        task.getChildByName("Text_task_content").setString(this._mc._model.task[self._type].taskList[index].shuoming);
        if(this._mc._model.task[self._type].taskList[index].add_name1){
            task.getChildByName("Text_task_prize_1").setVisible(true);
            task.getChildByName("Text_task_prize_1").setString(this._mc._model.task[self._type].taskList[index].add_name1);
        }else{
            task.getChildByName("Text_task_prize_1").setVisible(false);
        }
        if(this._mc._model.task[self._type].taskList[index].add_name){
            task.getChildByName("Text_task_prize_2").setVisible(true);
            task.getChildByName("Text_task_prize_2").setString(this._mc._model.task[self._type].taskList[index].add_name2);
        }else{
            task.getChildByName("Text_task_prize_2").setVisible(false);
        }

        if(this._mc._model.task[self._type].taskList[index].add_wupin1 == 10006){
            task.getChildByName("Image_task_prize_type_1").setVisible(true);
            task.getChildByName("Image_task_prize_type_1").loadTexture(res.common_gold);
        }else if(this._mc._model.task[self._type].taskList[index].add_wupin1 == 10005){
            task.getChildByName("Image_task_prize_type_1").setVisible(true);
            task.getChildByName("Image_task_prize_type_1").loadTexture(res.common_jewel);
        }else{
            task.getChildByName("Image_task_prize_type_1").setVisible(false);
        }

        if(this._mc._model.task[self._type].taskList[index].add_wupin2 == 10006){
            task.getChildByName("Image_task_prize_type_2").setVisible(true);
            task.getChildByName("Image_task_prize_type_2").loadTexture(res.common_gold);
        }else if(this._mc._model.task[self._type].taskList[index].add_wupin2 == 10005){
            task.getChildByName("Image_task_prize_type_2").setVisible(true);
            task.getChildByName("Image_task_prize_type_2").loadTexture(res.common_jewel);
        }else{
            task.getChildByName("Image_task_prize_type_2").setVisible(false);
        }

        if(this._mc._model.task[self._type].taskList[index].complete){
            task.getChildByName("Image_get").setVisible(true);
            task.getChildByName("Button_go_to").setVisible(false);
            task.addClickEventListener(function(sender){
                self._mc.getTaskRewardCmd(self._mc._model.task[self._type].taskList[sender.getTag()].task_id);
            });
        }else{
            task.getChildByName("Image_get").setVisible(false);
            task.getChildByName("Button_go_to").setVisible(true);
            task.getChildByName("Text_task_rate").setString(this._mc._model.task[self._type].taskList[index].now_num +"/" + this._mc._model.task[self._type].taskList[index].need_num);
        }
    },

    updateUI : function(){
        this.updatePrize();
    },

    updatePrize : function(){
		var self = this;
		var delay = 0;
		var index = 0;
        var taskNum = this._mc._model.task[self._type].length;
        self._widget.getChildByName("Panel_prize_mask").setVisible(true);
        for(var j =1;j <= this._mc._model.task[self._type].maxIndex;j++)
        {
            if(self._mc._model.task[self._type].taskList[j].task_id == self._mc._model.complete_id){
                index = j
            }
        }
		self._widget.getChildByName("Panel_prize_mask").getChildByName("Text_text").setString("xxxxxxxx");
		var stuffTemplate = self._widget.getChildByName("Panel_prize_mask").getChildByName("Image_stuff");
		self._widget.getChildByName("Panel_prize_mask").getChildByName("Image_prize").removeAllChildren();
		stuffTemplate.setVisible(false);
		stuffTemplate.setScale(0.01);
	    var stuffNum = 0;
		if(self._mc._model.task[self._type].taskList[index].add_num2){
		    stuffNum = 2;
		}else{
		    stuffNum = 1;
		}
        var pos = cc.p(self._widget.getChildByName("Panel_prize_mask").getChildByName("Image_prize").getContentSize().width/2,self._widget.getChildByName("Panel_prize_mask").getChildByName("Image_prize").getContentSize().height/2);
        var cos = stuffTemplate.getContentSize();
        if(stuffNum%2){
			pos.x -= cos.width*parseInt(stuffNum/2)*2;
        }else{
			pos.x -= (cos.width*parseInt(stuffNum/2) - cos.width/2)*2;
        }

        for(var k = 1; k<=stuffNum; k++)
        {
            var stuff = stuffTemplate.clone();
            stuff.setPosition(pos);
            stuff.getChildByName("Text_num").setString(self._mc._model.task[self._type].taskList[index]["add_num"+k]);
            stuff.getChildByName("Text_name").setString(self._mc._model.task[self._type].taskList[index]["add_name"+k]);
            stuff.runAction(cc.sequence(cc.delayTime(delay),cc.spawn(cc.show(),cc.scaleTo(0.2,1))));
            delay += 0.2;
            pos.x += cos.width*2;
           	self._widget.getChildByName("Panel_prize_mask").getChildByName("Image_prize").addChild(stuff);
        }
    	self._widget.getChildByName("Panel_prize_mask").getChildByName("Button_confirm").addClickEventListener(function(){
            self._widget.getChildByName("Panel_prize_mask").setVisible(false);
            self.updateTaskSV();
            self._mc.deleteTask();
    	});

    },

    updateTaskSV : function(){
        var self = this;
        var taskNum = this._mc._model.task[self._type].length;
        var index = 0;
        var taskSV = this._widget.getChildByName("Panel_main").getChildByName("ScrollView_task");
        var taskTemplate = this._widget.getChildByName("Panel_main").getChildByName("Panel_task");

		var maxHeight = (taskNum)*(taskTemplate.getContentSize().height) + (taskNum+1)*self._interval;
		if(maxHeight<taskSV.getContentSize().height){
		    maxHeight = taskSV.getContentSize().height;
		}
		var taskPos = cc.p(taskSV.getContentSize().width/2,maxHeight-taskTemplate.getContentSize().height/2-self._interval) ;
		taskSV.setInnerContainerSize(cc.size(taskSV.getContentSize().width,maxHeight));
//        taskSV.setScrollBarEnabled(false);
        taskSV.removeAllChildren();
        for(var i =1;i <= this._mc._model.task[self._type].maxIndex;i++)
        {
            cc.log(i);
            if(self._mc._model.task[self._type].taskList[i].task_id == self._mc._model.complete_id){
                index = i;
            }
            var task = taskTemplate.clone();
            task.setVisible(true);
            task.setTag(i);
            task.setPosition(taskPos);
            this.setTaskInfo(task,i);
            taskPos.y -= taskTemplate.getContentSize().height+self._interval;
            taskSV.addChild(task);
        }
        var taskRemove = taskSV.getChildByTag(index);
        if(taskRemove){
            taskRemove.removeFromParent();
        }

        for(var i = index;i<= this._mc._model.task[self._type].maxIndex;++i){
            var taskTmp = taskSV.getChildByTag(i);
            if(taskTmp){
                taskTmp.runAction(cc.moveBy(0.2,0,taskTemplate.getContentSize().height+self._interval));
            }
        }
    },

    cleanup:function(){
        this._super();
        cc.log("TaskScene layer cleanup");        
    }
});

var TaskScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function (mc) {
        this._super();
        this.init(mc);
    },

    init:function(mc){
        this._super();
        this._mapLayer = new TaskLayer(mc);
        this.addChild(this._mapLayer);
        return true;
    },

    getMainLayer:function(){
        return this._mapLayer;
    }
});