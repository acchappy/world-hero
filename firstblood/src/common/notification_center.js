

/**
 * Created by fable on 15/10/23.
 * @Author fable
 * @desc   观察者通知模式
 *
 * 
**/

var NotificationCenter = cc.Class.extend({

    _observers: [],
	ctor:function(){
		return true;
	},

    addObserver:function(name, cb){
        if (!this._observers[name]) {
            var ob = {};
            ob.name = name;
            ob.cb   = cb;

            this._observers[name] = ob;    
        }
    },

    removeObserver:function(name){
        if (this._observers[name]) {
            delete this._observers[name];
            this._observers[name] = null;
        }
    },

    postNotification:function(name, obj){
        for (var key in this._observers) {
            if (this._observers[name]) {
                var cb = this._observers[name].cb;
                cb(name, obj);
            } 
        }
    }

});


NotificationCenter.sharedNotificationCenter = null;
NotificationCenter.firstUse       = true;
NotificationCenter.getInstance  = function () {
    if (NotificationCenter.firstUse) {
        NotificationCenter.firstUse = false;
        NotificationCenter.sharedNotificationCenter = new NotificationCenter();
    }
    return NotificationCenter.sharedNotificationCenter;
};

NotificationCenter.purge = function () {
    if (NotificationCenter.sharedNotificationCenter) {
        delete NotificationCenter.sharedNotificationCenter;
        NotificationCenter.sharedNotificationCenter = null;
        NotificationCenter.firstUse = true;
    }
};



