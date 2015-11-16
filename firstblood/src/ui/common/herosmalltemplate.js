/**
 * Created by xiaojian on 15/09/18.
 * @Author xiaojian
 * @desc   公共hero模板
**/



var HeroSmallTemplate = cc.Class.extend({

	_widget:null,
	ctor:function(){
		//this.loadData();
		return true;
	},

	loadData:function(){
        this._widget = ccs.load(res.hero_small_template_json).node.getChildByName("Image_heroIcon");
        this._widget.retain();
	},

    getNotHaveHeroSmallTemplate : function(){
		var heroIcon = this._widget.clone();
        heroIcon.getChildByName("Image_heroStar").setVisible(false);
        heroIcon.getChildByName("Image_qualityStar").setVisible(false);
        heroIcon.getChildByName("Image_heroFrame").setVisible(false);
        heroIcon.getChildByName("Image_heroIsON").setVisible(false);
        heroIcon.getChildByName("Text_heroLevel").setVisible(false);
        return heroIcon;
    },

	getHeroSmallTemplate : function(herodata){
		var heroIcon = this._widget.clone();
        var heroStarTemplate = heroIcon.getChildByName("Image_heroStar");
        var qualityStarTemplate = heroIcon.getChildByName("Image_qualityStar");
        //选中框关闭显示
        heroIcon.getChildByName("Image_heroFrame").setVisible(false);
        //设置英雄品质颜色
        switch(parseInt(herodata.quality/10)){
            case fb.UI_QUALITY_WHITE :
                heroIcon.getChildByName("Image_heroQuality").loadTexture(res.common_quality_white);
                break;
            case fb.UI_QUALITY_GREEN :
                heroIcon.getChildByName("Image_heroQuality").loadTexture(res.common_quality_green);
                break;
            case fb.UI_QUALITY_BLUE :
                heroIcon.getChildByName("Image_heroQuality").loadTexture(res.common_quality_blue);
                break;
            case fb.UI_QUALITY_PURPLE :
                heroIcon.getChildByName("Image_heroQuality").loadTexture(res.common_quality_purple);
                break;
            case fb.UI_QUALITY_GOLDEN :
                heroIcon.getChildByName("Image_heroQuality").loadTexture(res.common_quality_golden);
                break;
            default:
                cc.log("get quality error",herodata.quality);
                break;
        }
        //设置英雄品质星级
        this.initStars(heroIcon,qualityStarTemplate,herodata.quality%10);
        //设置英雄星级
        this.initStars(heroIcon,heroStarTemplate,herodata.star);
        //星级模板关闭显示
        qualityStarTemplate.setVisible(false);
        heroStarTemplate.setVisible(false);
        //是否已上阵
        heroIcon.getChildByName("Image_heroIsON").setVisible(herodata.alive);
        //设置英雄等级
        heroIcon.getChildByName("Text_heroLevel").setString(herodata.level);
        return heroIcon;
	},

    initStars : function(heroIcon,starTemplate,number){
        switch(number%2){
            case 0:
            {
                var pos = starTemplate.getPosition();
                var cos = starTemplate.getContentSize();
                pos.x -= (cos.width*parseInt(number/2) - cos.width/2);
                for(var i = 0; i<number; i++)
                {
                    var star = starTemplate.clone();
                    star.setPosition(pos);
                    pos.x += cos.width;
                    heroIcon.addChild(star);
                }
                break;
            }
            case 1:
            {
                var pos = starTemplate.getPosition();
                var cos = starTemplate.getContentSize();
                pos.x -= cos.width*parseInt(number/2);
                for(var i = 0; i<number; i++)
                {
                    var star = starTemplate.clone();
                    star.setPosition(pos);
                    pos.x += cos.width;
                    heroIcon.addChild(star);
                }
                break;
            }
        }
    },

    setHeroFrameVisible : function(hero,flag){
        hero.getChildByName("Image_heroFrame").setVisible(flag);
    }

});


HeroSmallTemplate.sharedHeroSmallTemplate = null;
HeroSmallTemplate.firstUse       = true;
HeroSmallTemplate.getInstance  = function () {
    if (HeroSmallTemplate.firstUse) {
        HeroSmallTemplate.firstUse = false;
        HeroSmallTemplate.sharedHeroSmallTemplate = new HeroSmallTemplate();
    }
    return HeroSmallTemplate.sharedHeroSmallTemplate;
};




