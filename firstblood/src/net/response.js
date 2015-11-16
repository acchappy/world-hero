

/**
 * Created by fable on 15/09/09.
 * @Author fable
 * @desc   HttpRequest返回数据拆包处理
 *
 *	每包json格式：
 *	｛
 * 		"player":{"uid":10000, "coin":1000, "level":12,.....},         //login的时候会传完整的集合，后面只传有改变的属性集合，如没有任何改变，则"player"都不会有
 * 		"hero":[{"id":128965, "mid":454, "name":"xxxx", ...},{"id":128965, "mid":454, "name":"xxxx", ...},...], //所有全属性英雄列表， 子项同上
 * 		//"fushi":[{"id":4334535, "mid":454, "heroid":128965, "heromid":454,....}, ],                             //所有全属性符石列表，  子项同上
 *   	"package":[{"id":xxx, "name":"xxx", "price":56},.....}],                                               //所有背包材料列表，  子项同上
 *
 * * 	"add_hero":[{"id":128965, "mid":454, "name":"xxxx", ...},{"id":128965, "mid":454, "name":"xxxx", ...},...], //新增全属性英雄列表， 子项同上
 * 		//"add_fushi":[{"id":4334535, "mid":454, "heroid":128965, "heromid":454,....}, ],                                 //新增全属性符石列表， 子项同上
 *   	"add_package":[{"id":xxx, "name":"xxx", "price":56},.....}],                              
 *
 * *  	"update_hero":[{"id":128965, "mid":454, "name":"xxxx", ...},{"id":128965, "mid":454, "name":"xxxx", ...},...], //更新了部分属性英雄列表， 子项同上
 * 		//"update_fushi":[{"id":4334535, "mid":454, "heroid":128965, "heromid":454,....}, ],                                 //更新了部分属性符石列表， 子项同上
 *   	"update_package":[{"id":xxx, "name":"xxx", "price":56},.....}],      
 *
 * *  	"del_hero":[{"id":128965, "mid":454, "name":"xxxx", ...},{"id":128965, "mid":454, "name":"xxxx", ...},...], //删除全属性英雄列表， 子项同上
 * 		//"del_fushi":[{"id":4334535, "mid":454, "heroid":128965, "heromid":454,....}, ],                                 //删除全属性符石列表， 子项同上
 *   	"del_package":[{"id":xxx, "name":"xxx", "price":56},.....}],
 *
 *		"battle":{...}  //参考src/data/battle.js
 *
 * 
 *  ｝
 *
**/

// var HTTP_RESPONSE_JSON_PLAYER  = "login";
// var HTTP_RESPONSE_JSON_HERO    = "hero";
// var HTTP_RESPONSE_JSON_FUSHI   = "fushi";
// var HTTP_RESPONSE_JSON_PACKAGE = "package";
// var HTTP_RESPONSE_JSON_ALIVE   = "alive";    //上阵英雄数据
// var HTTP_RESPONSE_JSON_BATTLE  = "battle";
var HTTP_RESPONSE_JSON_ERROR   = "error";

// var HTTP_RESPONSE_JSON_ADD     = "add";
// var HTTP_RESPONSE_JSON_DEL     = "del";
// var HTTP_RESPONSE_JSON_UPDATE  = "update";


var HttpResponse = cc.Class.extend({

	_error_handle     : null,
	_responseProxy    : null,
	_pushMessageProxy : null,

	ctor:function(){
		//this._responseProxy = ResponseCmd.getInstance();
		return true;
	},

	recv:function(jsonTxt){
        cc.log("httpResponse...recv--jsonTxt:  ", jsonTxt);

        var jsonObj       = null;
        var isMsgTransfer = true;

		try{ 
        	jsonObj = JSON.parse(jsonTxt);
		}
		catch(error){ 
			cc.log("response recv JSON.parse  error !!");

			jsonObj = {error:101}; //网络异常弹框
		}
		//无论try 中是否有异常抛出，都会执行finally代码
		finally{ 
			cc.log("response recv try finally");
		} 

        if (jsonObj) {
        	isMsgTransfer = this.dispatcher(jsonObj);
        } else {	
        	cc.log("HttpResponse recv jsonTxt parse error!!");
        }

        jsonObj.isMsgTransfer = isMsgTransfer;
        
        return jsonObj;
	},

	setErrorHandle:function(handle){
		this._error_handle = handle;
		cc.assert(this._responseProxy != null, "Response setErrorHandle error");
		//this._responseProxy.setErrorHandle(handle);
	},

	setResponseProxy:function(proxy){
		this._responseProxy = proxy;
	},

	setPushMessageProxy:function(proxy){
		this._pushMessageProxy = proxy;
	},

	dispatcher:function(jsonObj){

		// var add_hero          = HTTP_RESPONSE_JSON_ADD    + "_" + HTTP_RESPONSE_JSON_HERO;
		// var del_hero          = HTTP_RESPONSE_JSON_DEL    + "_" + HTTP_RESPONSE_JSON_HERO;
		// var update_hero       = HTTP_RESPONSE_JSON_UPDATE + "_" + HTTP_RESPONSE_JSON_HERO;

		// //符石不要了
		// // var add_fushi         = HTTP_RESPONSE_JSON_ADD    + "_" + HTTP_RESPONSE_JSON_FUSHI;
		// // var del_fushi         = HTTP_RESPONSE_JSON_DEL    + "_" + HTTP_RESPONSE_JSON_FUSHI;
		// // var update_fushi      = HTTP_RESPONSE_JSON_UPDATE + "_" + HTTP_RESPONSE_JSON_FUSHI;

		// var add_package       = HTTP_RESPONSE_JSON_ADD    + "_" + HTTP_RESPONSE_JSON_PACKAGE;
		// var del_package       = HTTP_RESPONSE_JSON_DEL    + "_" + HTTP_RESPONSE_JSON_PACKAGE;
		// var update_package    = HTTP_RESPONSE_JSON_UPDATE + "_" + HTTP_RESPONSE_JSON_PACKAGE;		

		// for(var key in jsonObj){

	 //        //加载整个player		
	 //       	if (jsonObj.hasOwnProperty(HTTP_RESPONSE_JSON_PLAYER)) {
	 //       		PlayerData.getInstance().loadData(jsonObj[HTTP_RESPONSE_JSON_PLAYER]);
	 //       	} 
	 //       	//hero	
	 //       	if(jsonObj.hasOwnProperty(HTTP_RESPONSE_JSON_HERO)) {
	 //       		HeroData.getInstance().loadData(jsonObj[HTTP_RESPONSE_JSON_HERO]);
	 //       	}
	 //       	//fushi
	 //       	if(jsonObj.hasOwnProperty(HTTP_RESPONSE_JSON_FUSHI)) {
	 //       	// 	FushiData.getInstance().loadData(jsonObj[HTTP_RESPONSE_JSON_FUSHI]);
	 //       	//package
	 //       	} 

	 //       	if(jsonObj.hasOwnProperty(HTTP_RESPONSE_JSON_PACKAGE)){
	 //       	}
	 //       	//add_hero
	 //       	if(jsonObj.hasOwnProperty(add_hero)){
	 //       		HeroData.getInstance().addData(jsonObj[add_hero]);
	 //       	}
	 //       	//del_hero
	 //       	if(jsonObj.hasOwnProperty(del_hero)){
	 //       		HeroData.getInstance().delData(jsonObj[del_hero]);	 
	 //       	}      		
	 //       	//update_hero
	 //       	if(jsonObj.hasOwnProperty(update_hero)){
	 //       		HeroData.getInstance().updateData(jsonObj[update_hero]);	
	 //       	}	
	 //       	//add_fushi
	 //       	//if(jsonObj.hasOwnProperty(add_fushi)){
	 //       	// 	FushiData.getInstance().addData(jsonObj[add_fushi]);
	 //       	// }	       		
	 //       	//del_fushi
	 //       	//if(jsonObj.hasOwnProperty(del_fushi)){
	 //       	// 	FushiData.getInstance().delData(jsonObj[del_fushi]);	
	 //       	//} 		       		
	 //       	//update_fushi
	 //       	//if(jsonObj.hasOwnProperty(update_fushi)){
	 //       	// 	FushiData.getInstance().updateData(jsonObj[update_fushi]);
	 //       	//} 		
	 //       	//add_package
	 //       	if(jsonObj.hasOwnProperty(add_package)){
	 //       	}	
	 //       	//del_package
	 //       	if(jsonObj.hasOwnProperty(del_package)){
	 //       	}	
	 //       	//update_package
	 //       	if(jsonObj.hasOwnProperty(update_package)){
	 //       	}	
	 //       	//battle
	 //       	if(jsonObj.hasOwnProperty(HTTP_RESPONSE_JSON_BATTLE)){
	 //       		BattleData.purge();//因为会每次下发所有战斗数据，故要清除之前的所有数据, 因为是数据合并，故一定要这么做
	 //       		BattleData.getInstance().loadData(jsonObj[HTTP_RESPONSE_JSON_BATTLE]);	
	 //       	}	       		
	 //       	//alive
	 //       	if(jsonObj.hasOwnProperty(HTTP_RESPONSE_JSON_ALIVE)){
	 //       		AliveData.purge();//因为每次改动，都会下发所有数据，故要清除之前的所有数据	       		
	 //       		AliveData.getInstance().loadData(jsonObj[HTTP_RESPONSE_JSON_ALIVE]);	       		
	 //       	}
	 //       	//error
	 //       	if(jsonObj.hasOwnProperty(HTTP_RESPONSE_JSON_ERROR)){
	 //       		if (this._error_handle) {
	 //       			var err = parseInt(jsonObj[HTTP_RESPONSE_JSON_ERROR]);
	 //       			this._error_handle.handle(err);
	 //       		}    		   		
	 //       	}

		// }
	
		var isMsgTransfer = true;
		if (jsonObj.hasOwnProperty(HTTP_RESPONSE_JSON_ERROR)) {
   			var err = parseInt(jsonObj[HTTP_RESPONSE_JSON_ERROR]);
	   		if (this._error_handle && err > 0) {
	   			//cc.log("response dispatcher" ,err, this._error_handle);
	   			isMsgTransfer = this._error_handle.handle(err);
	   		}       			
		}

		if(isMsgTransfer)
		{
			var cmdAry = this._responseProxy.getCmd();			
			for (var key in jsonObj) {
				for (var cmd in cmdAry) {
			       	if (cmd == key) {
			       		cmdAry[cmd](jsonObj[key]);
			       		break;
			       	}
				}
			}	
		}

		//??????推送消息分发,方便更新UI
		//Message.getInstance().dispatcher(jsonObj);
		if(this._pushMessageProxy)
			this._pushMessageProxy.dispatcher(jsonObj);

		return isMsgTransfer;
	},

	//在无网的条件下，模拟有网条件下的json数据，或者是读取之保存的有网条件下各协议的数据给recv解析
	//格式要与有网条件一样
	//每条请求都必须配置一条静态的单机回复数据
	recvDebug:function(param, cb, isLogin){

		var jsonObj = null;
		jsonObj = this._responseProxy.recvDebug(param, cb, isLogin);

		//var jsonObj = this.recv(jsonObj);
        if (jsonObj) {
        	this.dispatcher(jsonObj);
        } else {	
        	cc.log("HttpResponse recvDebug jsonObj parse error!!");
        }

		return jsonObj;
	}

});



HttpResponse.sharedHttpResponse = null;
HttpResponse.firstUse       = true;
HttpResponse.getInstance  = function () {
    if (HttpResponse.firstUse) {
        HttpResponse.firstUse = false;
        HttpResponse.sharedHttpResponse = new HttpResponse();
    }
    return HttpResponse.sharedHttpResponse;
};






