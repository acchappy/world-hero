

/**
 * Created by fable on 15/09/18.
 * @Author fable
 * @desc   错误提示框处理
 *
 * 可以多次叠加调用，如果是同一个会覆盖，不是会上移前一个
**/

var TIPDLG_DELAY_TIME  = 1.0;
var TIPDLG_FADETO_TIME = 1.0;


var TipDlg = cc.Class.extend({

	_tips : [],
	_code : [],
	_widget : null,
	ctor:function(){
		return true;
	},

	loadData:function(){

		this._widget = ccs.load(res.tipdlg_layer_json).node;
        cc.assert(this._widget != null, "TipDlg ctor fail");

        this._widget.retain();

        this._tips = [];
        this._code = [];

	},

	tips:function(str, pos){

		var node = null;
		var tipsNum = this.getTipsNum();
		if(tipsNum == 0)
		{
			node = new cc.Node();
			node.setOnExitCallback(function(){
				cc.log("tipdlg tips  111111");
				this._tips = [];
			}.bind(this));

			//cc.director.setNotificationNode(node);
			if(cc.director.getRunningScene().getChildByTag(fb.DLG_TIP_TAG))
				cc.director.getRunningScene().removeChildByTag(fb.DLG_TIP_TAG);

			cc.director.getRunningScene().addChild(node, fb.DLG_TIP_ZORDER, fb.DLG_TIP_TAG);								
		}
		else
		{
			cc.log("tipdlg tips  2222222");			
			node = cc.director.getRunningScene().getChildByTag(fb.DLG_TIP_TAG);
			//node = cc.director.getNotificationNode();
		}

		cc.assert(node != null, "TipDlg node null");

		var pan = this._widget.getChildByName("Panel_tip");
		pan.setVisible(false);

		cc.log("TipDlg tips pan x, y", pan.getPosition().x, pan.getPosition().y);
        var size = cc.director.getWinSize();

		if(pos && tipsNum == 0)
			node.setPosition(pos);
		else
			node.setPosition(cc.p(size.width/2, size.height/2));			
			//node.setPosition(pan.getPosition());			

		var hashCode = fb.getHashCode(str, true);
		var index    = this.getCodeIndex(hashCode)

		cc.log("TipDlg tips  index", index, hashCode);
		if (this._tips[index]) {

			cc.log("TipDlg tips  have ");
			var panShow1 = this._tips[index];
			panShow1.stopAllActions();
	        panShow1.setOpacity(255);
	        panShow1.setCascadeOpacityEnabled(true);
	        panShow1.runAction(cc.sequence(cc.delayTime(TIPDLG_DELAY_TIME), cc.fadeTo(TIPDLG_FADETO_TIME, 0), cc.callFunc(function(){
	        	panShow1.removeFromParent(true);
	        	this._tips[panShow1.getTag()] = null;
	        	delete this._tips[panShow1.getTag()];	//设置为null后，还必须delete,不然循环还是会有        	
	        }.bind(this), this)));	

		} else {

			var panShow = pan.clone();
			panShow.setVisible(true);

			var txt = panShow.getChildByName("Text_tip");
			txt.setVisible(false);
			//txt.setString("远在天边在天国天干轱在天国感恩一礓车克罗地亚压下历来");

			var img = panShow.getChildByName("Image_bg");
			var fullPathForFilename = jsb.fileUtils.fullPathForFilename(txt.getFontName());
			var label = new cc.LabelTTF(str, fullPathForFilename, txt.getFontSize(), cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER,cc.VERTICAL_TEXT_ALIGNMENT_CENTER);     //为了得到字符串宽度
	        cc.log("tipdlg tips", label.getContentSize().width, txt.getFontSize());

	        var w = label.getContentSize().width;
	        if (w > img.getContentSize().width) {
	       		img.setScaleX(w/img.getContentSize().width);
	        }

	        label.setPosition(txt.getPosition());
	        label.setAnchorPoint(cc.p(0.5, 0.5));

	        panShow.addChild(label, this.getTipsNum());
	        //panShow.setOpacity(0);
	        panShow.setCascadeOpacityEnabled(true);
	        panShow.runAction(cc.sequence(cc.delayTime(TIPDLG_DELAY_TIME), cc.fadeTo(TIPDLG_FADETO_TIME, 0), cc.callFunc(function(){
	        	panShow.removeFromParent(true);
	        	this._tips[panShow.getTag()] = null;
	        	delete this._tips[panShow.getTag()];
	        }.bind(this), this)));

			node.addChild(panShow, 0, index);
			panShow.setPosition(cc.p(0, 0));

			//cc.log("yyyyyyyyyyyyy1", hashCode);
			for(var i in this._tips){
				var panShow2 = this._tips[i];
				panShow2.setPositionY(panShow2.getPositionY() + panShow2.getContentSize().height);
				cc.log("TipsDlg tips _tips, i, ", i, this._tips[i], panShow2.getContentSize().height, panShow2.getPositionY());	
			}
			
			this._tips[index] = panShow;
			//panShow.setPositionY(panShow.getPositionY() + Math.random()*(200));

		}
	},

	getTipsNum:function(){
		var num = 0;
		for(var i in this._tips){
			num++;
		}

		return num;
	},

	getCodeIndex:function(hashCode){
		var b = false;
		var index = 0;
		for(var i = 0; i<this._code.length; i++){
			if (this._code[i] == hashCode) {
				b = true;
				index = i;
				break;
			}
		}

		if (!b) {
			this._code.push(hashCode);
			index = this._code.length - 1;
		}

		return index;
	}

});


TipDlg.sharedTipDlg = null;
TipDlg.firstUse       = true;
TipDlg.getInstance  = function () {
    if (TipDlg.firstUse) {
        TipDlg.firstUse = false;
        TipDlg.sharedTipDlg = new TipDlg();
    }
    return TipDlg.sharedTipDlg;
};





