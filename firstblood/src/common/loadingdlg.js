

/**
 * Created by fable on 15/10/09.
 * @Author fable
 * @desc   网络loading框
 *
 * 
**/

var LOADINGDLG_DELAY_TIME = 0.3;

var LoadingDlg = cc.Class.extend({

	_widget : null,
	ctor:function(){

		this.loadLoadingUI();
		return true;
	},

	loadLoadingUI:function(){
        var size = cc.director.getWinSize();
        var layer = ccs.load(res.loading_layer_json);
        this._widget = layer.node;
        this._widget.setAnchorPoint(cc.p(0.5, 0.5));
        var or = cc.view.getVisibleOrigin();
        var vs = cc.view.getVisibleSize();

        this._widget.setPosition(cc.p(or.x+vs.width/2, or.y+vs.height/2));

        this._widget.retain();//常驻内存
	},

	show:function(){
		//首先禁用点击
		cc.eventManager.setEnabled(false);
		//延迟弹连接框
		var seq = cc.sequence(cc.delayTime(LOADINGDLG_DELAY_TIME), cc.callFunc(function(){
			cc.director.getRunningScene().addChild(this._widget, fb.DLG_NET_LOADING_ZORDER, fb.DLG_NET_LOADING_TAG);
		}, this));

		seq.setTag(fb.DLG_NET_LOADING_TAG);
		cc.director.getRunningScene().runAction(seq);
	},

	remove:function(){
		cc.eventManager.setEnabled(true);
		cc.director.getRunningScene().stopActionByTag(fb.DLG_NET_LOADING_TAG);
		if (cc.director.getRunningScene().getChildByTag(fb.DLG_NET_LOADING_TAG)) {
			this._widget.removeFromParent();
		}	
	}
});


LoadingDlg.sharedLoadingDlg = null;
LoadingDlg.firstUse       = true;
LoadingDlg.getInstance  = function () {
    if (LoadingDlg.firstUse) {
        LoadingDlg.firstUse = false;
        LoadingDlg.sharedLoadingDlg = new LoadingDlg();
    }
    return LoadingDlg.sharedLoadingDlg;
};





