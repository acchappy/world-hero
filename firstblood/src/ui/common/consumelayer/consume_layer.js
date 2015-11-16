/**
 * Created by xiaojian on 15/09/18.
 * @Author xiaojian
 * @desc   公共consume模板
**/

var ConsumeLayer = cc.Layer.extend({
	_widget:null,
	_mc:null,

	ctor:function(mc){
		this._super();
		this._mc = mc;

		this._widget = ccs.load(res.consume_template_json).node;
        this.addChild(this._widget);

        this._widget.setAnchorPoint(cc.p(1, 1));
        var or = cc.view.getVisibleOrigin();
        var vs = cc.view.getVisibleSize();
        this._widget.setPosition(cc.p(or.x+vs.width-110, or.y+vs.height-10));

		this.updateUI();

		return true;
	},

	reSetPosition : function(p){
	    var or = cc.view.getVisibleOrigin();
        var vs = cc.view.getVisibleSize();
        this._widget.setAnchorPoint(1,0.5);
		this._widget.setPosition(cc.p(or.x+p.x,or.y+p.y));
	},

	updateUI : function(parent){
		var playerCoinText = this._widget.getChildByName("Panel_consume").getChildByName("Image_addbg_gold").getChildByName("Text_Value");
		playerCoinText.setString(this._mc._model.coin);
		var playerDiamondText = this._widget.getChildByName("Panel_consume").getChildByName("Image_addbg_diamond").getChildByName("Text_Value");
		playerDiamondText.setString(this._mc._model.diamond);
		var playerPowerText = this._widget.getChildByName("Panel_consume").getChildByName("Image_addbg_power").getChildByName("Text_Value");
		playerPowerText.setString(this._mc._model.manual);
		cc.log("consume_layer : ",this._mc._model.coin,this._mc._model.diamond);
	},

	cleanup:function(){
		this._super();
		this._mc.destroy();
	}
//    onEnter:function(){
//        this._super();
//        cc.log("555555555555555555555555555555555");
//    },
//    onExit:function(){
//        this._super();
//        cc.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx33333333333333333");
//    }
});



