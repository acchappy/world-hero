
/**
 * Created by fable on 15/09/24.
 * @Author fable
 * @desc   ...
 */

var button_share = {
    "login": "loginClick",
    "loginWithPermission": "loginWithPermissionClick",
    "logout": "logoutClick",
    "getUid": "getUidClick",
    "getToken": "getTokenClick",
    "getPermissions": "getPermissionClick",
    "request API": "requestClick",
    "activateApp": "activateAppClick",
    "logEvent": "LogEventClick",
    "logPurchase": "LogPurchaseClick",
    "payment": "paymentClick"
};



var FacebookUserLayerTest = cc.Layer.extend({
    _title: "Facebook SDK User Test",
    _subtitle: "",
    _agentManager: null,
    _isLogin: false,
    _facebook: null,
    ctor: function (title) {
        this._super(title);
        cc.log("FacebookTestScene plugin", plugin, JSON.stringify(plugin));
        //window.facebook = window.facebook || (window["plugin"] ? window["plugin"]["FacebookAgent"]["getInstance"]() : null);
        this._facebook = plugin.FacebookAgent.getInstance();//window.facebook || (window["plugin"] ? window["plugin"]["FacebookAgent"]["getInstance"]() : null);
        cc.log("FacebookTestScene plugin, facebook,", plugin, this._facebook, JSON.stringify(plugin));


        var menu = cc.Menu.create();
        for (var action in button_share) {
            var label = new cc.LabelTTF(action, "Arial", 22);
            var item = new cc.MenuItemLabel(label, this[button_share[action]], this);
            menu.addChild(item);
        }
        menu.alignItemsVerticallyWithPadding(8);
        menu.setPosition(cc.pAdd(cc.visibleRect.left, cc.p(+180, 0)));
        this.addChild(menu);


        this.result = new cc.LabelTTF("You can see the result at this label", "Arial", 22);
        this.result.setPosition(cc.pAdd(cc.visibleRect.right, cc.p(-this.result.width / 2 - 30, 0)));
        this.result.boundingWidth = this.result.width;
        this.addChild(this.result, 1);
    },
    activateAppClick: function () {
        if (cc.sys.isNative|| facebook_is_canvas) {
            this._facebook.activateApp();
            this.result.setString("activateApp is invoked");
        }
        else {
            this.result.setString("activateApp is only available for Facebook Canvas App");
        }
    },
    LogEventClick: function () {
        if (cc.sys.isNative || facebook_is_canvas) {
            var parameters = {};
            var floatVal = 888.888;
            parameters[plugin.FacebookAgent.AppEventParam.SUCCESS] = plugin.FacebookAgent.AppEventParamValue.VALUE_YES;
    //        facebook.logEvent(plugin.FacebookAgent.AppEvent.COMPLETED_TUTORIAL);
            this._facebook.logEvent(plugin.FacebookAgent.AppEvent.COMPLETED_TUTORIAL, floatVal);
            this._facebook.logEvent(plugin.FacebookAgent.AppEvent.COMPLETED_TUTORIAL, parameters);
            this._facebook.logEvent(plugin.FacebookAgent.AppEvent.COMPLETED_TUTORIAL, floatVal, parameters);
            this.result.setString("logEvent is invoked");
        }
        else {
            this.result.setString("LogEvent is only available for Facebook Canvas App");
        }
    },
    loginClick: function (sender) {
        var self = this;

        if (this._facebook.isLoggedIn()) {
            self.result.setString("logged in");
        }
        else {
            this._facebook.login(function (type, msg) {
                self.result.setString("type is " + type + " msg is " + JSON.stringify(msg));
            });
        }
    },
    logoutClick: function (sender) {
        var self = this;
        this._facebook.logout(function (type, msg) {
            self.result.setString(JSON.stringify(msg));
        });
    },
    getUidClick: function (sender) {
        var self = this;

        if (this._facebook.isLoggedIn()) {
            self.result.setString(this._facebook.getUserID());
        }
        else {
            self.result.setString("User haven't been logged in");
        }
    },
    getTokenClick: function (sender) {
        var self = this;

        if (this._facebook.isLoggedIn()) {
            self.result.setString(this._facebook.getAccessToken());
        }
        else {
            self.result.setString("User haven't been logged in");
        }
    },

    loginWithPermissionClick: function (sender) {
        var self = this;
        var permissions = ["create_event", "create_note", "manage_pages", "publish_actions"];
        this._facebook.login(permissions, function (type, msg) {
            if (type == plugin.FacebookAgent.CODE_SUCCEED) {
                self.result.setString(msg["permissions"]);
            }
        });
    },
    getPermissionClick: function (sender) {
        var self = this;
        this._facebook.api("/me/permissions", plugin.FacebookAgent.HttpMethod.GET, {}, function (type, data) {
            if (type == plugin.FacebookAgent.CODE_SUCCEED) {
                data = JSON.stringify(data);
                self.result.setString(data);
            }
            else {
                self.result.setString(JSON.stringify(data));
            }
        });
    },
    requestClick: function (sender) {
        var self = this;
        this._facebook.api("/me/photos", plugin.FacebookAgent.HttpMethod.POST, {"url": "http://files.cocos2d-x.org/images/orgsite/logo.png"}, function (type, msg) {
            if (type == plugin.FacebookAgent.CODE_SUCCEED) {
                self.result.setString("post_id: " + msg["post_id"]);
            }
        });
    },
    LogPurchaseClick: function (sender) {
        if (cc.sys.isNative || facebook_is_canvas) {
            var params = {};
            // All supported parameters are listed here
            params[plugin.FacebookAgent.AppEventParam.CURRENCY] = "CNY";
            params[plugin.FacebookAgent.AppEventParam.REGISTRATION_METHOD] = "Facebook";
            params[plugin.FacebookAgent.AppEventParam.CONTENT_TYPE] = "game";
            params[plugin.FacebookAgent.AppEventParam.CONTENT_ID] = "201410102342";
            params[plugin.FacebookAgent.AppEventParam.SEARCH_STRING] = "cocos2djs";
            params[plugin.FacebookAgent.AppEventParam.SUCCESS] = plugin.FacebookAgent.AppEventParamValue.VALUE_YES;
            params[plugin.FacebookAgent.AppEventParam.MAX_RATING_VALUE] = "10";
            params[plugin.FacebookAgent.AppEventParam.PAYMENT_INFO_AVAILABLE] = plugin.FacebookAgent.AppEventParamValue.VALUE_YES;
            params[plugin.FacebookAgent.AppEventParam.NUM_ITEMS] = "99";
            params[plugin.FacebookAgent.AppEventParam.LEVEL] = "10";
            params[plugin.FacebookAgent.AppEventParam.DESCRIPTION] = "Cocos2d-JS";
            this._facebook.logPurchase(1.23, "CNY", params);
            this.result.setString("Purchase logged.");
        }
        else {
            this.result.setString("LogPurchase is only available for Facebook Canvas App");
        }
    },
    paymentClick: function () {
        if(facebook_is_canvas){
            var info = {
                product: 'https://www.cocos2d-x.org/demo/facebooktest/pay/item1.html'
            };

            var self = this;
            this._facebook.canvas.pay(info, function(code, response){
                if (code == plugin.FacebookAgent.CODE_SUCCEED){
                    if (response['status'] === 'completed')
                        self.result.setString("Payment succeeded: " + response['amount'] + response['currency']);
                    else
                        self.result.setString("Payment failed: " + JSON.stringify(response['status']))
                } else {
                    self.result.setString("Request send failed, error #" + code + ": " + JSON.stringify(response));
                }
            });
        }else{
            this.result.setString("canvas.pay is only available for Facebook Canvas App");
        }
    }
});



var FacebookTestScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function(){

        this._super();
        this._mapLayer = new FacebookUserLayerTest();
        this.addChild(this._mapLayer, 0, 10000);

        return true;
    }

});