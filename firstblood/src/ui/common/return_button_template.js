/**
 * Created by xiaojian on 15/09/18.
 * @Author xiaojian
 * @desc   公共return模板
**/


var ReturnButtonTemplate = cc.Class.extend({

	_widget:null,
	_btn : null,
	ctor:function(){
		//this.loadData();
		this._widget = ccs.load(res.return_layer_json).node;
		this._widget.retain();
		return true;
	},

	addReturnButtonTemplate : function(parent){
	    this._btn = this._widget.getChildByName("Button_return").clone();
        this._btn.addClickEventListener(function (){
            //cc.director.popScene();
            SceneManager.getInstance().pop();
        });


	    this._btn.setPosition(cc.director.getVisibleSize().width,cc.director.getVisibleSize().height);
        parent.addChild(this._btn);
	},

	getReturnButton : function(){
		return this._btn;
	},

});

ReturnButtonTemplate.sharedReturnButtonTemplate = null;
ReturnButtonTemplate.firstUse = true;
ReturnButtonTemplate.getInstance  = function () {
    if (ReturnButtonTemplate.firstUse) {
        ReturnButtonTemplate.firstUse = false;
        ReturnButtonTemplate.sharedReturnButtonTemplate = new ReturnButtonTemplate();
    }
    return ReturnButtonTemplate.sharedReturnButtonTemplate;
};
