

/**
 * Created by fable on 15/09/06.
 * @Author fable
 * @desc   登录相关数据处理
 *
 *  登录流程：用户第一次登录，会显示 login_scene,  上面会有facebook, youke两种方式
 *            1. facebook登录，会调用facebook登录界面，得到accessToken,给到服务器，服务器下发信息siteuid,uid,本地保存accessToken,进入系统，完成登录
 *            2. youke(游客)登录， 会得到手机的macid, 然后发送给服务器，服务器下发信息及游客siteuid,uid，本地保存macid,进入系统，完成登录
 *            
 *            如果是已经登录过，即在本地有保存accessToken或者macid,则用保存的信息去请求登录，不用再调用login_scene, 服务器下发信息有两种：
 *            1. 正常，则直接进入游戏主界面。
 *            2. 返回错误信息error：a. facebook accessToken失效或过期，则需要重置本地保存信息，再次显示login_scene, 让用户手动重新登录。
 *                                  b. 游客， 同上处理。
 *
 * 
 *  登出流程：1. facebook 登出，则直接调用facebook相关接口，清除facebook保存的本地信息，siteuid,uid重置为0，跳转到login_scene
 *            2. youke    登出, 清除保存的本地信息，siteuid,uid重置为0， 跳转到login_scene           
 
 * 
**/

//socket 
fb.LOGIN_SOCKET_SERVER_IP      = "192.168.0.199";
fb.LOGIN_SOCKET_SERVER_PORT    = 8888;
fb.LOGIN_SOCKET_SERVER_CMD_L   = 1001;  //登录
fb.LOGIN_SOCKET_SERVER_CMD_H   = 1002;  //心跳

 
//http
fb.LOGIN_REQUEST_YOUKE_URL     = "http://192.168.0.199/";  //http://www.acchappy.com/
fb.LOGIN_REQUEST_FACEBOOK_URL  = "http://203.88.161.95/";  //http://hk.acchappy.com/";//203.88.161.95
fb.LOGIN_REQUEST_LOGIN_PHP     = "login.php";
fb.LOGIN_REQUEST_SEND_PHP      = "gate.php";

fb.LOGIN_CHANNEL_YOUKE         = 1;   //myself
fb.LOGIN_CHANNEL_FACEBOOK      = 2;   //facebook



var LOGIN_LS_MACID_KEY        = "macid";       //游客第一次登录,要得到android或ios手机上的macid才行
var YoukeData = cc.Class.extend({
    _macid : "", //游客第一次登录
    ctor:function(){
        this._macid = "";
        return true;
    },

    loadData:function(ls, data){
        if(ls){
            var ls  = cc.sys.localStorage;
            this._macid = ls.getItem(LOGIN_LS_MACID_KEY);
        } else {
            this._macid = data.macid; //实际是要得到android,ios手机的mac地址 ??????
        }
    },

    saveData:function(){
        var ls  = cc.sys.localStorage;
        ls.setItem(LOGIN_LS_MACID_KEY, this._macid);        
    },

    addInfoToParamAry:function(paramAry){
        var ary = paramAry;
        ary[LOGIN_LS_MACID_KEY] = this._macid;

        return ary;
    }

});

var LOGIN_LS_ACCESSTOKEN_KEY  = "accesstoken";     //接facebook平台登录用到，这样就不再用_macid
var FacebookData = cc.Class.extend({
    _accessToken:"",  //接facebook平台登录用到，这样就不再用_macid
    ctor:function(){
        this._accessToken = "";
        return true;
    },

    loadData:function(ls, data){
        if(ls){
            var ls  = cc.sys.localStorage;            
            this._accessToken = ls.getItem(LOGIN_LS_ACCESSTOKEN_KEY);            
        } else {
            this._accessToken = data.accesstoken;
        }     
    },

    saveData:function(){
        var ls  = cc.sys.localStorage;
        ls.setItem(LOGIN_LS_ACCESSTOKEN_KEY, this._accessToken);
    },

    addInfoToParamAry:function(paramAry){
        var ary = paramAry;
        ary[LOGIN_LS_ACCESSTOKEN_KEY] = this._accessToken;

        return ary;
    }

});


var LOGIN_LS_UID_KEY          = "uid";
var LOGIN_LS_SKEY_KEY         = "skey";
var LOGIN_LS_MTKEY_KEY        = "mtkey";
var LOGIN_LS_SITEUID_KEY      = "siteuid";
var LOGIN_LS_CHANNEL_KEY      = "channel";      //渠道号 0,没有渠道， 1，游客，2，facebook

var LoginData = cc.Class.extend({

    _uid       : 0,       //服务器给定的用户唯一标识id
    _skey      : "",      //http访问的安全性
    _mtkey     : "",      //防止用户在不同的手机上同时登录
    _siteuid   : 0,       //现在没有用到，客户端仅作为保存
    //除第一次外，其他每次登录都必须给服务器传_uid, _skey, _mtkey,同时保存最新的_uid,_skey,_mtkey

    _channel   : 0,  //0,没有渠道， 1，游客，2，facebook
    _innerData : null,

	ctor:function(){

        this._uid     = 0;
        this._skey    = "";
        this._mtkey   = "";
        this._siteuid = 0;     
        this._channel = 0;

        var ls        = cc.sys.localStorage;
        var channel   = ls.getItem(LOGIN_LS_CHANNEL_KEY);  

        cc.log("logindata cotr channel, loginkey", channel);
        //本地没用保存，肯定是第一次登录，必须进入loginscene 界面  
        if (channel == "" || channel == null || channel == NaN) {
        //不是第一次登录，则直接用保存的key,进入游戏，不用loginscene
        } else {
            this._channel = parseInt(channel);
        }

		return true;
	},

    getChannel:function(){
        return this._channel;
    },

    getHttpURL:function(isLogin){
        var url = "";
        var php = "";

        if (isLogin) {
            php = fb.LOGIN_REQUEST_LOGIN_PHP;
        } else {
            php = fb.LOGIN_REQUEST_SEND_PHP;
        }

        if (this._channel == fb.LOGIN_CHANNEL_YOUKE) {
            url = fb.LOGIN_REQUEST_YOUKE_URL
        } else if (this._channel == fb.LOGIN_CHANNEL_FACEBOOK) {
            url = fb.LOGIN_REQUEST_FACEBOOK_URL;
        } else {
            cc.log("login channel", this._channel);
        }

        var uri = url + php;

        return uri;
    },

    getSocketServerLoginJson:function(){
        var param   = {};
        param.cmd   = fb.LOGIN_SOCKET_SERVER_CMD_L;
        param.uid   = this._uid;  
        param.mtkey = this._mtkey;  

        return param;      
    },

    getSocketServerHeartJson:function(){
        var param   = {};
        param.cmd   = fb.LOGIN_SOCKET_SERVER_CMD_H; 

        return param;   
    },

    isServerLoginOk:function(jsonObj){
        if(jsonObj.cmd == fb.LOGIN_SOCKET_SERVER_CMD_L)
            if(jsonObj.hasOwnProperty("error"))
                if(parseInt(jsonObj.error) == 0)
                    return true;
        return false;        
    },

    sendData:function(paramAry, isLogin){
        var ary = paramAry;

        if (isLogin) {

            ary = this._innerData.addInfoToParamAry(ary);

            if(this._uid   != 0)
                ary[LOGIN_LS_UID_KEY]     = this._uid; 

            if(this._skey  != "")
                ary[LOGIN_LS_SKEY_KEY]    = this._skey;    

            if(this._mtkey != "")
                ary[LOGIN_LS_MTKEY_KEY]   = this._mtkey;     

        } else {
            ary[LOGIN_LS_UID_KEY]    = this._uid;
            ary[LOGIN_LS_SKEY_KEY]   = this._skey;
            ary[LOGIN_LS_MTKEY_KEY]  = this._mtkey;
        }

        return ary;
    },

    recvData:function(login){

        this._uid     = parseInt(login.uid);
        this._skey    = login.skey;
        this._mtkey   = login.mtkey;
        this._siteuid = parseInt(login.siteuid);

        this.saveData();
    },  

    saveData:function(login){
        var ls        = cc.sys.localStorage;

        ls.setItem(LOGIN_LS_UID_KEY,     this._uid);
        ls.setItem(LOGIN_LS_SKEY_KEY,    this._skey);
        ls.setItem(LOGIN_LS_MTKEY_KEY,   this._mtkey); 
        ls.setItem(LOGIN_LS_SITEUID_KEY, this._siteuid); 
        ls.setItem(LOGIN_LS_CHANNEL_KEY, this._channel);

        this._innerData.saveData();
    },       

    loadData:function(){
        var ls        = cc.sys.localStorage;

        var lsv1      = ls.getItem(LOGIN_LS_UID_KEY);              
        var lsv2      = ls.getItem(LOGIN_LS_SKEY_KEY);              
        var lsv3      = ls.getItem(LOGIN_LS_MTKEY_KEY);              
        var lsv4      = ls.getItem(LOGIN_LS_SITEUID_KEY);  

        this._uid     = parseInt(lsv1);      
        this._skey    = lsv2;
        this._mtkey   = lsv3;
        this._siteuid = parseInt(lsv4);  

        this._innerData.loadData(true, null);          
    },

    clearData:function(){
        this._uid     = 0;
        this._skey    = "";
        this._mtkey   = "";
        this._siteuid = 0;     
        this._channel = 0;
        
        var ls        = cc.sys.localStorage;
        ls.setItem(LOGIN_LS_CHANNEL_KEY, "");            
    },

    //联网登录
	loadNetData:function(channel, data){

        this._channel = channel;
        if (this._channel == fb.LOGIN_CHANNEL_YOUKE) {
            this._innerData = new YoukeData();

        } else if (this._channel == fb.LOGIN_CHANNEL_FACEBOOK) {
            this._innerData = new FacebookData();

        } else {
            cc.assert(false, "LoginData loadNetData channel is out");
        }

        this._innerData.loadData(false, data);      
	},

    //取本地数据的登录
    loadLocalData:function(channel){

        this._channel = channel;
        if (this._channel == fb.LOGIN_CHANNEL_YOUKE) {
            this._innerData = new YoukeData();

        } else if (this._channel == fb.LOGIN_CHANNEL_FACEBOOK) {
            this._innerData = new FacebookData();

        } else {
            cc.assert(false, "LoginData  loadLocalData channel is out");
        }

        this.loadData(); 
    }

});

LoginData.sharedLoginData = null;
LoginData.firstUse       = true;
LoginData.getInstance  = function () {
    if (LoginData.firstUse) {
        LoginData.firstUse = false;
        LoginData.sharedLoginData = new LoginData();
    }
    return LoginData.sharedLoginData;
};

// LoginData.purge = function () {
//     if (LoginData.sharedLoginData) {
//         delete LoginData.sharedLoginData;
//         LoginData.sharedLoginData = null;
//         LoginData.firstUse = true;
//     }
// };



