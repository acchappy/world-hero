

/**
 * Created by fable on 15/09/14.
 * @Author fable
 * @desc   多语言的数据处理
**/


var TextDataUnit = 
{	
	id:"XXX_XXX",
	text:"xxxxxx"
};


/**
 * 
 * 在游戏开始的loading 里加载
 *	
 * **/
var TextData = cc.Class.extend({

	_cur_lang : null,
	ctor:function(){
		this._cur_lang = cc.LANGUAGE_CHINESE;	
		return true;
	},

	getTextFileName:function(){
        var language = cc.Application.getInstance().getCurrentLanguage();
        this._cur_lang = language;
        cc.log("text getTextFileName lang:", language);
        switch(language){
            case cc.LANGUAGE_ENGLISH: return res.text_en_data_json;
            case cc.LANGUAGE_CHINESE: return res.text_zh_data_json;
            case cc.LANGUAGE_FRENCH: return res.text_zh_data_json;
            case cc.LANGUAGE_ITALIAN: return res.text_zh_data_json;
            case cc.LANGUAGE_GERMAN: return res.text_zh_data_json;
            case cc.LANGUAGE_SPANISH: return res.text_zh_data_json;
            case cc.LANGUAGE_RUSSIAN: return res.text_zh_data_json;
            case cc.LANGUAGE_KOREAN: return res.text_zh_data_json;
            case cc.LANGUAGE_JAPANESE: return res.text_zh_data_json;
            case cc.LANGUAGE_HUNGARIAN: return res.text_zh_data_json;
            case cc.LANGUAGE_PORTUGUESE: return res.text_zh_data_json;
            case cc.LANGUAGE_ARABIC: return res.text_zh_data_json;
            default : return res.text_zh_data_json;
        }

        return res.text_zh_data_json
	},

	loadData:function(){
        var obj = cc.loader.getRes(this.getTextFileName()); 
        fb.extend(this, obj, true);//合并两个对象, 并且覆盖原有值
	}
});


TextData.sharedTextData = null;
TextData.firstUse       = true;
TextData.getInstance  = function () {
    if (TextData.firstUse) {
        TextData.firstUse = false;
        TextData.sharedTextData = new TextData();
        //TextData.sharedTextData.loadData();// loading 里面加载
    }
    return TextData.sharedTextData;
};

/**
	eg:
	label.setString(TextData.getInstance().XXX_XXX.text);
*/



