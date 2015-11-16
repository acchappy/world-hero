

/**
 * Created by fable on 15/11/12.
 * @Author fable
 * @desc   主要用websocket, 主要服务器消息推送，聊天等
**/

var SOCKET_HEART_TIME  = 20; //s
var SOCKET_RECONN_TIME = 10; //s

var SocketNet = cc.Class.extend({

	_ip            : "",
	_port          : 0,
	_mtkey         : "",
	_callback      : null,
	_loadingProxy  : null,
	_innerSocket   : null,
	_loginProxy    : null,
	_isLogin       : false,

	ctor:function(){
		this._innerSocket = null;
		return true;
	},

	setLoginProxy:function(login){
		this._loginProxy = login;
	},

	createTime:function(time, delayTime, cb){

		this.cancelTime();

        var scheduler = cc.director.getScheduler();
        var interval  = time;//0.25; // every 1/4 of second
        var repeat    = cc.REPEAT_FOREVER; // how many repeats. cc.REPEAT_FOREVER means forever
        var delay     = delayTime; // start after 2 seconds;
        var paused    = false; // not paused. queue it now.
        
        scheduler.scheduleCallbackForTarget(this, cb, interval, repeat, delay, paused);		
	},

	cancelTime:function(){
        var scheduler = cc.director.getScheduler();
        scheduler.unscheduleAllCallbacksForTarget(this);
	},

	createConnect:function(ip, port){

		this._ip    = ip;
		this._port  = port;
		var address = "ws://" + ip + ":" + port;
    	this._innerSocket = new WebSocket(address);
    	cc.log("SocketNet createConnect, ip, port, address", ip, port, address);
    	cc.assert(this._innerSocket != null, "SocketNet createConnect error");

    	this._innerSocket.onopen    = this.open.bind(this);
    	this._innerSocket.onmessage = this.receive.bind(this);
    	this._innerSocket.onerror   = this.error.bind(this);
    	this._innerSocket.onclose   = this.close.bind(this);
	},

	//connect ok
	open:function(evt){
		//removeLoading();// 登录完成，再去掉
		cc.log("SocketNet connect ok");
		this.sendLogin();
	},

	receive:function(evt){
        this.removeLoading();	

        var jsonTxt = evt.data;
    	console.log("SocketNet response text msg: " + evt.data);

        var responseJsonObj = HttpResponse.getInstance().recv(jsonTxt);//?????.发过来的数据都是json格式，故可以用HttpResponse统一处理
    	console.log("SocketNet responseJsonObj text msg: " + JSON.stringify(responseJsonObj));
        //登录ok，发送心跳包,每20s
        if(this._isLogin){
        	this._isLogin = false;
	        if(this._loginProxy.isServerLoginOk(responseJsonObj)){
	        	this.createTime(SOCKET_HEART_TIME, 4, function(){
	        		this.send(this._loginProxy.getSocketServerHeartJson());
	        	}.bind(this));
	        }
	        else{    
		        this.createTime(20, 5, function(){
		        	//?????登录失败，应该关闭连接
		        	this._innerSocket.close();	       	
		        }.bind(this));
	        }        	
        }

        if (this._callback && responseJsonObj.isMsgTransfer)
        	this._callback(responseJsonObj);
	},

	error:function(evt){
        this.removeLoading();		
        cc.log("SocketNet Error was fired");
	},

	close:function(evt){
        this.removeLoading();		
        cc.log("SocketNet websocket instance closed.");
        this._innerSocket = null;

        //10s 断线重连
        this.createTime(SOCKET_RECONN_TIME, 3, function(){
	        this.showLoading();
	        this.createConnect(this._ip, this._port);        	
        }.bind(this));
	},


	sendLogin:function(){
		this._isLogin = true;
		var param = this._loginProxy.getSocketServerLoginJson();
		this.send(param);		
	},
	
	//对外数据统一发送接口
	// jsonObj.cmd = 1001
	// jsonObj.mtkey = xxx;
	send:function(jsonObj, cb, loading){
        if (this.nonNetDebug(jsonObj, cb, false)) {return;}
		if(loading)
			this.showLoading();

		if(cb)
			this._callback = cb;

		var param = JSON.stringify(jsonObj);
		cc.log("SocketNet send param", param);
        this._innerSocket.send(param);
	},

	//单机模式，无网调试
	nonNetDebug:function(param, cb, isLogin){

		if(fb.NON_NET_DEBUG && cb)
		{
			var jsonObj = HttpResponse.getInstance().recvDebug(param, cb, isLogin);
            cb(jsonObj);

			return true;			
		}

		return false;			
	},

	setLoadingProxy:function(loading){
		this._loadingProxy = loading;
	},

	showLoading:function(){
		if(this._loadingProxy)
			this._loadingProxy.show();
	},

	removeLoading:function(){
		if(this._loadingProxy)
			this._loadingProxy.remove();	
	}	
});


SocketNet.sharedSocketNet = null;
SocketNet.firstUse          = true;
SocketNet.getInstance = function(){
    if (SocketNet.firstUse) {
        SocketNet.firstUse = false;
        SocketNet.sharedSocketNet = new SocketNet();
    }
    return SocketNet.sharedSocketNet;
};





