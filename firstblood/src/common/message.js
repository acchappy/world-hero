

/**
 * Created by fable on 15/11/11.
 * @Author fable
 * @desc   
 *
 *
 *  网络推送消息处理类,包括 Http, websocket等
 *
**/

var Message = cc.Class.extend({

	_handles : null,

	ctor:function(){
		
		this._handles = {};
		
		return true;
	},

	//handle 唯一标识字符串
	//cb, 事件回调，一定要bind(this)
	//关注的事件，可以有多个 "player,update_player",这里的事件，一定是data/protocol.js定义好的协议名
	register:function(handle, cb, events){
        cc.log("Message...register:  ", handle, events);

       	var strAry  = events.split(",");
       	var itemAry = [];
       	for(var i=0; i<strAry.length; i++){
       		var item = {handle:handle, cb:cb, event:strAry[i]};
       		itemAry.push(item);
       	}
        this._handles[handle] = itemAry;

		for (var key in this._handles) {
			if(this._handles[key])
        		cc.log("Message...register:  xxxxxxxxxxxxxxxxxxx", key, handle);
		}
	},

	unregister:function(handle){
       	cc.log("Message...unregister111:  xxxxxxxxxxxxxxxxxxx", handle);		
		if(this._handles[handle]){			
			delete this._handles[handle];
			this._handles[handle] = null;	

		}

		for (var key in this._handles) {
			if(this._handles[key])
        		cc.log("Message...unregister333:  xxxxxxxxxxxxxxxxxxx", key, handle, key==handle);
		}		
	},

	dispatcher:function(jsonObj){		
		for (var key in jsonObj) {
			for (var h in this._handles) {
				if(this._handles[h]){
					var itemAry = this._handles[h];
					for (var i=0; i<itemAry.length; i++) {
						cc.log("Message...register:  itemAry", itemAry[i].event, key);
				       	if (itemAry[i].event == key && itemAry[i].cb) {
				       		itemAry[i].cb(itemAry[i].event, jsonObj[key]);
				       		break;
				       	}					
					}					
				}
			}
		}	
	}
});



Message.sharedMessage = null;
Message.firstUse       = true;
Message.getInstance  = function () {
    if (Message.firstUse) {
        Message.firstUse = false;
        Message.sharedMessage = new Message();
    }
    return Message.sharedMessage;
};






