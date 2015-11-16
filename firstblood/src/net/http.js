

/**
 * Created by fable on 15/09/07.
 * @Author fable
 * @desc   http请求
 *         针对一个请求对应一个回应，然后接下一个请求
 *         不支持连续发请求，是为了避免逻辑混乱及不必要的麻烦
**/

var HTTP_REQUEST_GET     = "GET";
var HTTP_REQUEST_POST    = "POST";

var HttpRequest = cc.Class.extend({

	_xhr           : null,
	_type          : "",
	_isLogin       : false,
	_callback      : null,
	//_response : null,
	_loadingProxy  : null,
	_loginProxy    : null,

	ctor:function(){

		this._type = HTTP_REQUEST_POST; //GET, 默认是POST方式（请求参数与URL分开）

		return true;
	},

	// loadData:function(){
	// 	//this._xhr  = cc.loader.getXMLHttpRequest();
	// 	this._loadingUI = this.loadLoadingUI();
	// 	this._loadingUI.retain();//常驻内存
	// 	//this._response = new HttpResponse();
	// },

	setLoadingProxy:function(loading){
		this._loadingProxy = loading;
	},

	setLoginProxy:function(login){
		this._loginProxy = login;
	},

	setType:function(type){
		this._type = type;
	},

	httpResponse:function(){

        this.removeLoading();		
        if (this._xhr.readyState == 4 && (this._xhr.status >= 200 && this._xhr.status <= 207))  //有可能会有其他的网络状态，留着以后让候哥改
        {
            var jsonTxt = this._xhr.responseText;
            //cc.log("httpResponse...jsonTxt:  ", jsonTxt);           
            //var responseJsonObj = JSON.parse(jsonTxt);
        	console.log("http httpResponse...responseTxt: " + jsonTxt);
            //cc.log("http httpResponse...responseTxt:  ", jsonTxt);
            //var responseJsonObj = this._response.recv(jsonTxt);
            var responseJsonObj = HttpResponse.getInstance().recv(jsonTxt);//this._response.recv(jsonTxt);

            if (this._isLogin){
            	this._isLogin = false;
				cc.assert(this._loginProxy != null, "httpResponse loginproxy is null !!!");            	
            	this._loginProxy.recvData(responseJsonObj.login);

            }

            if (this._callback && responseJsonObj.isMsgTransfer)
            	this._callback(responseJsonObj);

        } 
        else {
        	//////////////???????        网络异常情况还没有处理///////////////////////////////////
            cc.log("http error status:, readyState:", this._xhr.status, this._xhr.readyState);
            
            var jsonTxt         = "{\"error\":101}";  //????? 网络异常弹框
            var responseJsonObj = HttpResponse.getInstance().recv(jsonTxt);

            if (this._callback && responseJsonObj.isMsgTransfer)
            	this._callback(responseJsonObj);            
        }


	},

	setParam:function(ary){
		var param = "";

		for (var key in ary) {
			param += key;
			param += "=";
			param += ary[key];
			param += "&";
		}

		if(param != "")
			param = param.slice(0, -1);

		return param;
	},

	sendLogin:function(cb){
        var paramAry = []; 
        this.sendEnd(paramAry, cb, true);
	},

	send:function(paramAry, cb){
        this.sendEnd(paramAry, cb, false);		
	},

	// ary ["xxx"]=88, ary["tyty"]="xxx"
	// isLogin 是否是登录
	sendEnd:function(paramAry, cb, isLogin){
		//arguments.length
        //var param = setParam(arguments);
      //   this._isLogin = true;
     	// if (isLogin == false || isLogin == null) {
     	// 	this._isLogin = false;
     	// }

        if (this.nonNetDebug(paramAry, cb, isLogin)) {return;}
        
		if(!cc.isArray(paramAry))
		{
			cc.log("http send paramAry is must be array!!");
			return;
		}

		cc.assert(this._loginProxy != null, "sendEnd loginproxy is null !!!");

		this.showLoading();

		this._callback = cb;

        var url   = this._loginProxy.getHttpURL(isLogin);//fb.getHttpURL(LoginData.getInstance().getChannel(), isLogin);
        var param = "";

	    //var ary = this.addUserInfoToParamAry(paramAry);
	    var ary   = this._loginProxy.sendData(paramAry, isLogin);
        param     = this.setParam(ary);
        //cc.log("xxxxxxxxxxxxxx", param, (param != ""), (this._type === HTTP_REQUEST_POST));
        if(this._type == HTTP_REQUEST_GET && param != "") {
        	url += "?";
        	url += param;

        	cc.log("http send get-url", url);
        }

        this._xhr  = cc.loader.getXMLHttpRequest();
        this._xhr.open(this._type, url);	        
        this._xhr.onreadystatechange = this.httpResponse.bind(this);

        if(this._type == HTTP_REQUEST_POST && param != "") {
        	this._xhr.send(param);  
	       	cc.log("http send post-param", param, url);        	
        } else {
 			this._xhr.send();       	
        }

     	this._isLogin = isLogin;        
	},

	//单机模式，无网调试
	nonNetDebug:function(param, cb, isLogin){

		if(fb.NON_NET_DEBUG && cb)
		{
			//var jsonObj = this._response.recvDebug(param, cb);
			var jsonObj = HttpResponse.getInstance().recvDebug(param, cb, isLogin);
            cb(jsonObj);

			return true;			
		}

		return false;			
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


HttpRequest.sharedHttpRequest = null;
HttpRequest.firstUse          = true;
HttpRequest.getInstance = function(){
    if (HttpRequest.firstUse) {
        HttpRequest.firstUse = false;
        HttpRequest.sharedHttpRequest = new HttpRequest();
    }
    return HttpRequest.sharedHttpRequest;
};





