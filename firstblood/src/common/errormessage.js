

/**
 * Created by fable on 15/09/18.
 * @Author fable
 * @desc   网络错误消息处理
 *
 * 要加载 error.json 处理才行
 * 
**/

//doc/config error.xlsx
//
//
var ErrorMessageUnit = {

	error:100,
	type:0,         //0 不显示对话框， 1，tips, 3s 消失， 2 要点击才会消失
	content: "xxxxx",
	desc:"fdfdfdf"
}

var ErrorMessage = cc.Class.extend({

	_errorStaticJsonData : null,
	ctor:function(){
		return true;
	},

	loadData:function(){
		this._errorStaticJsonData = cc.loader.getRes(res.error_data_json);	

		if(this._errorStaticJsonData == null)
			cc.log("ErrorMessage cc.loader.getRes(res.error_data_json) fail!!");			
	},

	handle:function(error){

		//是否消息继续往下传递
		var isMsgTransfer = false;

		if(error == 0)
			return;

	    switch(error){
	        case 100:  //facebook 没有登录态
	        {
	        	LoginData.getInstance().clearData();
		        var login_mc = new LoginMC(true);
		        login_mc.view();	        	
	            break;
	        }
	        case 102:  //socket server 检测的重复登录
	        {
	        	LoginData.getInstance().clearData();
		        var login_mc = new LoginMC(true);
		        login_mc.view();	        	
	            break;
	        }

	        default:
	        	break;    
	    }

		if(!this._errorStaticJsonData[error]){
	    	TipDlg.getInstance().tips(error);
		} else {
	    	TipDlg.getInstance().tips(this._errorStaticJsonData[error].content);
		}

		return isMsgTransfer;
	}

});


ErrorMessage.sharedErrorMessage = null;
ErrorMessage.firstUse       = true;
ErrorMessage.getInstance  = function () {
    if (ErrorMessage.firstUse) {
        ErrorMessage.firstUse = false;
        ErrorMessage.sharedErrorMessage = new ErrorMessage();
    }
    return ErrorMessage.sharedErrorMessage;
};





