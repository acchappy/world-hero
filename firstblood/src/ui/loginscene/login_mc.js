
/**
 * Created by fable on 15/09/08.
 * @Author fable
 * @desc   MVC 模式， login_scene的model,controller
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
 * 
 */


// var LoginMCUnit = 
// {

// }

var LoginMC = cc.Class.extend({

    _scene:null,
    _mainLayer:null,
    _facebook:null,
    _exit:false,      //是否是玩家退出登录操作

    ctor:function(exit){ 
        this._exit = exit;   
        return true;
    },

    view:function(){
        //是否有保存上次登录信息
        if (LoginData.getInstance().getChannel() == 0) {
            this.loginSceneShow();
        } else {          
            HttpRequest.getInstance().sendLogin(this.cbHttpSendLogin.bind(this));            
        }
    },

    loginSceneShow:function(){
        // this._scene = new LoginScene(this);
        // cc.director.replaceScene(this._scene);
        // this._mainLayer = this._scene.getMainLayer();  
        SceneManager.getInstance().replace("LoginScene", this);          
    },

    youkeLogin:function(){
        var data = {};
        data.macid = "rtyuroyioouityutyu";//得到真实手机的macid 才行 ?????
        LoginData.getInstance().loadNetData(fb.LOGIN_CHANNEL_YOUKE, data);
        HttpRequest.getInstance().sendLogin(this.cbHttpSendLogin.bind(this));   
    },

    facebookLogin:function(){

        //win32 just test logic for facebook
        if (cc.sys.os == cc.sys.OS_WINDOWS) {
            var data = {};
            data.accesstoken = "yiptpoiiffffffffffffffffffffffff";
            LoginData.getInstance().loadNetData(fb.LOGIN_CHANNEL_FACEBOOK, data);
            HttpRequest.getInstance().sendLogin(this.cbHttpSendLogin.bind(this));
        } else {

            //首先禁用点击
            cc.eventManager.setEnabled(false);//facebook 在登录过程中禁止点击     
            var self = this;
            this._facebook = plugin.FacebookAgent.getInstance();
            if (this._exit) {
                cc.log("login mc exit facebookLogin logout cb ");
                //如果已经登录，先退出，再登录
                this._facebook.logout(function (type, msg) {
                    cc.log("login mc facebookLogin logout cb");
                    self._facebook.login(self.cbFacebookLogin.bind(self));
                });   

            } else {
                if (this._facebook.isLoggedIn()) {
                    cc.log("login mc facebook have logged in! logout first,then login");
                    //如果已经登录，先退出，再登录
                    this._facebook.logout(function (type, msg) {
                        cc.log("login mc facebookLogin logout cb");
                        self._facebook.login(self.cbFacebookLogin.bind(self));
                    });   
                } 
                else
                {
                    this._facebook.login(this.cbFacebookLogin.bind(this));
                } 
            }       
        }
    },

    cbFacebookLogin:function(type, msg){
        cc.log("type is " + type + " msg is " + JSON.stringify(msg));

        if (this._facebook.isLoggedIn()) {
            cc.log("login mc facebook accesstoken", this._facebook.getAccessToken());

            var data = {};
            data.accesstoken = this._facebook.getAccessToken();
            LoginData.getInstance().loadNetData(fb.LOGIN_CHANNEL_FACEBOOK, data);

            HttpRequest.getInstance().sendLogin(this.cbHttpSendLogin.bind(this));   
        } else {          
            cc.log("login mc facebook have not logged in! check");          
        }
    },

    //?????socket server login失败都会让其进入游戏，只不过是每10s要重连
    socketServerLoginAfterHttpLoginOK:function(){
        SocketNet.getInstance().setLoginProxy(LoginData.getInstance());
        if(!fb.SOCKET_NET_CLOSE)
            SocketNet.getInstance().createConnect(fb.LOGIN_SOCKET_SERVER_IP, fb.LOGIN_SOCKET_SERVER_PORT);
    },

    cbHttpSendLogin:function(jsonObj){

        cc.eventManager.setEnabled(true);  //facebook 在登录过程中禁止点击        
        cc.log("LoginMC cbSendLogin", jsonObj);

        this.socketServerLoginAfterHttpLoginOK();
            
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getHeroListCmd(), this.cbHttpSendHeroList.bind(this)); //请求英雄列表
    },

    cbHttpSendHeroList:function(jsonObj){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getPackageListCmd(), this.cbHttpSendPackageList.bind(this));
    },

    cbHttpSendPackageList:function(jsonObj){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().getMapListCmd(), this.cbHttpSendMapList.bind(this));
    },

    cbHttpSendMapList:function(jsonObj){

        this.loadDataBeforeEnterGameAndAfterHttp();//进入游戏之前及所有的网络请求发送之后的一些数据加载处理

        var main_mc = new MainMC();
        main_mc.view();    
    },

    loadDataBeforeEnterGameAndAfterHttp:function(){
        var heroAry     = HeroData.getInstance().getHeroAry();
        var fragmentAry = PackageData.getInstance().getNotHaveHeroFragmentAry(heroAry);
        HeroData.getInstance().loadNotHaveHeroData(fragmentAry);
        PackageData.getInstance().setNotHaveHeroAry(HeroData.getInstance().getNotHaveHeroAry());
    }

});



//单例模式
// LoginMC.sharedLoginMC = null;
// LoginMC.firstUse       = true;
// LoginMC.getInstance  = function () {
//     if (LoginMC.firstUse) {
//         LoginMC.firstUse = false;
//         LoginMC.sharedLoginMC = new LoginMC();
//     }
//     return LoginMC.sharedLoginMC;
// };





