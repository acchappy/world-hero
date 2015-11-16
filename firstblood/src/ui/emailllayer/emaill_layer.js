/**
 * Created by xiaojian on 15/11/03.
 * @Author xiaojian
 * @desc   公共hero模板
**/



var EmaillLayer = cc.Layer.extend({
	_widget:null,
	_mc:null,
	_letterNum : 0,
	_interval : 10,

	ctor:function(mc){
		this._super();

		this._mc = mc;
		this._widget = ccs.load(res.emaill_layer_json).node;
		this.addChild(this._widget);

        fb.widgetDlgAdapter(this._widget);

		this.initUI();

		return true;
	},

	initUI : function(){
		var self = this;
		self._letterNum = this._mc._model.emaillListMaxIndex;

		var mainMask = this._widget.getChildByName("Panel_main_mask");
		var prizeMask = this._widget.getChildByName("Panel_prize_mask");
		var letterMask = this._widget.getChildByName("Panel_letter_mask");
		var mainPanel = this._widget.getChildByName("Panel_main");

		prizeMask.setVisible(false);
		letterMask.setVisible(false);

    	letterMask.getChildByName("Image_letter_detail_bg").getChildByName("Button_close").addClickEventListener(function(){
			this.getParent().getParent().setVisible(false);
    	});
		mainPanel.getChildByName("Button_close").addClickEventListener(function(){
			self.removeFromParent();
		});

		var letterSV = mainPanel.getChildByName("ScrollView_letter");
		var letterTemplate = mainPanel.getChildByName("Image_letter_bg");
		var maxHeight = (self._mc._model.emaillListLength)*(letterTemplate.getContentSize().height) + (self._letterNum+1)*self._interval;
		var letterPos = cc.p(letterSV.getContentSize().width/2,maxHeight-letterTemplate.getContentSize().height/2-self._interval) ;
		letterSV.setInnerContainerSize(cc.size(letterSV.getContentSize().width,maxHeight));
        letterSV.setScrollBarEnabled(false);

		for(var i = 1;i<=self._letterNum;++i){
			if(this._mc._model.emaillList[i]){
				var letter = letterTemplate.clone();
				letter.setVisible(true);
				letter.setTag(i);
				letter.setPosition(letterPos);
				self.initLetterInfo(letter,i);
				letterPos.y -= letterTemplate.getContentSize().height + self._interval;
				letterSV.addChild(letter);
			}
		}

		letterTemplate.setVisible(false);
    },

    initLetterInfo : function(letter,index){
    	var self = this;
		letter.setTag(index);
//		letter.getChildByName("Image_icon").loadTexture(); //更换纹理
		letter.getChildByName("Image_icon").getChildByName("Text_num").setString(this._mc._model.emaillList[index].show.num);
		letter.getChildByName("Image_icon").getChildByName("Text_name").setString(this._mc._model.emaillList[index].show.name);
		letter.getChildByName("Text_theme").setString("主题：" + this._mc._model.emaillList[index].title);
		letter.getChildByName("Text_from").setString("来  自：" + this._mc._model.emaillList[index].from);
		letter.getChildByName("Text_date").setString("日  期：" + this._mc._model.emaillList[index].time);
		var load = this._mc._model.emaillList[index].status;
		if(load == 2){
			letter.getChildByName("Image_read").setVisible(true);
			letter.getChildByName("Image_notread").setVisible(false);
		}else{
			letter.getChildByName("Image_read").setVisible(false);
			letter.getChildByName("Image_notread").setVisible(true);
		}
		letter.addClickEventListener(function(sender){
			self._widget.getChildByName("Panel_letter_mask").setVisible(true);
			self.initLetterDetail(sender.getTag());
		});
    },

    initLetterDetail : function(index){
    	var self = this;
    	var letterDetail = self._widget.getChildByName("Panel_letter_mask").getChildByName("Image_letter_detail_bg");
		letterDetail.getChildByName("Text_letter_theme").setString(this._mc._model.emaillList[index].title); //主题
		letterDetail.getChildByName("Image_letter_detail").getChildByName("Text_detail").setString(this._mc._model.emaillList[index].content); //内容
		letterDetail.getChildByName("Image_letter_detail").getChildByName("Text_from").setString(this._mc._model.emaillList[index].from); //来自
		var stuffTemplate = letterDetail.getChildByName("Image_letter_detail").getChildByName("Image_prize").getChildByName("Image_stuff");
		var stuffNode = letterDetail.getChildByName("Image_letter_detail").getChildByName("Image_prize").getChildByName("Node_stuff");
		stuffNode.removeAllChildren();
		stuffTemplate.setVisible(false);
		var pos = cc.p(0,0);
		for(var i =1;i<=this._mc._model.emaillList[index].prizeLength ; i++)
		{
			var stuff = stuffTemplate.clone();
			stuff.setVisible(true);
			stuff.setTag(i);
			stuff.setPosition(pos);
			stuff.getChildByName("Text_num").setString(this._mc._model.emaillList[index].prize[i].num);
			stuff.getChildByName("Text_name").setString(this._mc._model.emaillList[index].prize[i].name);
			pos.x += stuffTemplate.getContentSize().width +20;
			stuffNode.addChild(stuff);
		}

		var got = this._mc._model.emaillList[index].status;
		if(got!=1){
			letterDetail.getChildByName("Image_letter_detail").getChildByName("Image_prize").getChildByName("Image_get").setVisible(false);
			letterDetail.getChildByName("Image_letter_detail").getChildByName("Image_prize").getChildByName("Image_got").setVisible(true);
		}else{
			letterDetail.getChildByName("Image_letter_detail").getChildByName("Image_prize").getChildByName("Image_get").setVisible(true);
			letterDetail.getChildByName("Image_letter_detail").getChildByName("Image_prize").getChildByName("Image_got").setVisible(false);
			letterDetail.getChildByName("Image_letter_detail").getChildByName("Image_prize").getChildByName("Image_get").addClickEventListener(function(){
				self._widget.getChildByName("Panel_prize_mask").setVisible(true);
				letterDetail.getChildByName("Image_letter_detail").getChildByName("Image_prize").getChildByName("Image_get").setVisible(false);
				letterDetail.getChildByName("Image_letter_detail").getChildByName("Image_prize").getChildByName("Image_got").setVisible(true);
				self._mc.getMailReadCmd(self._mc._model.emaillList[index].id,index);
			});
		}
    },

	initPrize : function(index){
		var self = this;
		var delay = 0;
		var letterSV = self._widget.getChildByName("Panel_main").getChildByName("ScrollView_letter");
		var letterTemplate = self._widget.getChildByName("Panel_main").getChildByName("Image_letter_bg");
		self._widget.getChildByName("Panel_prize_mask").getChildByName("Text_text").setString("xxxxxxxx");
		var stuffTemplate = self._widget.getChildByName("Panel_prize_mask").getChildByName("Image_prize").getChildByName("Image_stuff");
		stuffTemplate.retain();
		stuffTemplate.getParent().removeAllChildren();
		stuffTemplate.setVisible(false);
		stuffTemplate.setScale(0.01);
		var stuffNum = this._mc._model.emaillList[index].prizeLength;
        var pos = cc.p(self._widget.getChildByName("Panel_prize_mask").getChildByName("Image_prize").getContentSize().width/2,self._widget.getChildByName("Panel_prize_mask").getChildByName("Image_prize").getContentSize().height/2);
        var cos = stuffTemplate.getContentSize();
        if(stuffNum%2){
			pos.x -= cos.width*parseInt(stuffNum/2)*2;
        }else{
			pos.x -= (cos.width*parseInt(stuffNum/2) - cos.width/2)*2;
        }
        for(var i = 1; i<=stuffNum; i++)
        {
            var stuff = stuffTemplate.clone();
            stuff.setPosition(pos);
            stuff.getChildByName("Text_num").setString(this._mc._model.emaillList[index].prize[i].num);
            stuff.getChildByName("Text_name").setString(this._mc._model.emaillList[index].prize[i].name);
            stuff.runAction(cc.sequence(cc.delayTime(delay),cc.spawn(cc.show(),cc.scaleTo(0.2,1))));
            delay += 0.2;
            pos.x += cos.width*2;
           	self._widget.getChildByName("Panel_prize_mask").getChildByName("Image_prize").addChild(stuff);
        }
    	self._widget.getChildByName("Panel_prize_mask").getChildByName("Button_confirm").addClickEventListener(function(){
			this.getParent().setVisible(false);
			var maxHeight = (self._mc._model.emaillListLength)*(letterTemplate.getContentSize().height) + (self._mc._model.emaillListLength+1)*self._interval;
			if(maxHeight<letterSV.getContentSize().height){
				maxHeight = letterSV.getContentSize().height;
			}
			var letterPos = cc.p(letterSV.getContentSize().width/2,maxHeight-letterTemplate.getContentSize().height/2-self._interval) ;
			letterSV.setInnerContainerSize(cc.size(letterSV.getContentSize().width,maxHeight));

			self._widget.getChildByName("Panel_letter_mask").setVisible(false);
			letterSV.removeAllChildren()
			for(var j =1;j<=self._mc._model.emaillListMaxIndex;j++){
				if(self._mc._model.emaillList[j]){
					var letter = letterTemplate.clone();
					letter.setVisible(true);
					letter.setTag(j);
					letter.setPosition(letterPos);
					self.initLetterInfo(letter,j);
					letterPos.y -= letterTemplate.getContentSize().height + self._interval;
					letterSV.addChild(letter);
				}
			}
			letterSV.getChildByTag(index).removeFromParent();
			for(var k = index +1 ;k<=self._mc._model.emaillListMaxIndex;k++)
			{
				if(self._mc._model.emaillList[k]){
					letterSV.getChildByTag(k).runAction(cc.moveBy(0.2,0,letterTemplate.getContentSize().height+10));
				}
			}
			self._mc.deleteEmaill();
			self._letterNum--;
    	});
	},

});


