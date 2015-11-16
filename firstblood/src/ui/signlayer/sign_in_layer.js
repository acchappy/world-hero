/**
 * Created by xiaojian on 15/09/18.
 * @Author xiaojian
 * @desc   公共hero模板
**/



var SignInLayer = cc.Layer.extend({
	_widget:null,
	_mc:null,

	ctor:function(mc){
		this._super();

		this._mc = mc;
		this._widget = ccs.load(res.sign_in_layer_json).node;
		this.addChild(this._widget);

        fb.widgetDlgAdapter(this._widget);

		this.initUI();

		return true;
	},

	initUI : function(){
		var day = 30;
		var signInDay = 5;
	    var closeBtn = this._widget.getChildByName("Panel_main").getChildByName("Button_close");
	   	self = this;
	   	closeBtn.addClickEventListener(function(){
	    	self.removeFromParent();
	   	});

	   	var SignInScrollView = this._widget.getChildByName("Panel_main").getChildByName("ScrollView_sign_in");
       	var giftTemplate = SignInScrollView.getChildByName("Image_Template");
		var maxHeight = Math.ceil(day/4)*(giftTemplate.getContentSize().height+5)+5;
	   	var pos = cc.p(giftTemplate.getPosition().x,maxHeight-giftTemplate.getContentSize().height/2-5);
	   	for(var i = 1 ;i <= day;i++)
	   	{
	   		var gift = giftTemplate.clone();
	   		gift.setPosition(pos);
	   		if(i>signInDay)
	   			gift.getChildByName("Image_isGet").setVisible(false);
	   		if(i%4 == 0){
				pos.x -= 3*(giftTemplate.getContentSize().width + 5);
				pos.y -= giftTemplate.getContentSize().height +5;
	   		}else{
	   			pos.x += giftTemplate.getContentSize().width + 5;
	   		}
			giftTemplate.getParent().addChild(gift);
	   	}

	  	SignInScrollView.setInnerContainerSize(cc.size(SignInScrollView.getContentSize().width, maxHeight));
	}

});


