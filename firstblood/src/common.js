/**
 * Created by fable on 15/10/09.
 * @Author fable
 * @desc   独立于某个具体游戏，只跟框架相关的全局常量，数据，函数
 */

var fb = fb || {};

//fb.LANGUAGE        = cc.LANGUAGE_CHINESE;
fb.BG_SCALE_FACTOR   = 0.0;
fb.DESIGN_LSSIZE     = cc.size(960,  640);   //更改winSize大小，资源背景用1056*640
fb.RES_SIZE          = cc.size(1024, 614);  //用跟dota一样的资源比例， cc.size(1056, 640);  //用的是1.65(1056/640)的资源比例, 在1.3-1.7之间，节省资源

fb.NON_NET_DEBUG     = false;   //单机调试
fb.SOCKET_NET_CLOSE  = false;   //socket，server关闭
fb.BATTLE_DEBUG      = false;   //战场调试开关，发布必须关闭

//dlg zorder and tag
fb.DLG_NET_LOADING_ZORDER = 99999;  //网络loading zorder
fb.DLG_NET_LOADING_TAG    = 99999;
fb.DLG_TIP_ZORDER         = 91000;  //几秒后消失的对话框的zorder
fb.DLG_TIP_TAG            = 91000;


//合并两个对象，override,是否覆盖
fb.extend = function(o, n, override){
	for(var p in n)
   		if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))
   			o[p] = n[p];
};

fb.getHashCode = function(str, caseSensitive){

	if(!caseSensitive){
		str = str.toLowerCase();
	}
	// 1315423911=b'1001110011001111100011010100111'
	var hash  =   1315423911,i,ch;
	for (i = str.length - 1; i >= 0; i--) {
		ch = str.charCodeAt(i);
		hash ^= ((hash << 5) + ch + (hash >> 2));
	}

	return  (hash & 0x7FFFFFFF);
};

//scene
fb.widgetAdapter = function(widget){
	cc.assert(widget != null, "fb.widgetAdapter  widget is null !!!");

    var size = cc.director.getWinSize();
    //通过调整panel的setContentSize大小，设置panel上的控件固定与拉伸，能动态调整控件的相对位置来达到适配效果
    widget.setAnchorPoint(cc.p(0.5, 0.5));
    //widget.setPosition(cc.p((size.width)/2, (size.height)/2));
    var or = cc.view.getVisibleOrigin();
    var vs = cc.view.getVisibleSize();

    //cc.log("fb.widgetAdapter, win:, or:, vs:", size.width, size.height, or.x, or.y, vs.width, vs.height);
    widget.setPosition(cc.p(or.x+vs.width/2, or.y+vs.height/2));
    widget.setContentSize(cc.size(vs.width, vs.height));
    ccui.helper.doLayout(widget);

    //等比拉大背景图，使其能适配. 
    var bg_node = widget.getChildByName("Image_bg");
    if(bg_node)
    	bg_node.setScale(fb.BG_SCALE_FACTOR);
};
//不会铺满屏幕的框 dlg
fb.widgetDlgAdapter = function(widget){
    cc.assert(widget != null, "fb.widgetDlgAdapter  widget is null !!!");

    //只需要让其居中即可,但在ccs中一定要一个Panel_main_mask事件及半暗的屏蔽层,大小比960*640大，为了适配 1138*768
    widget.setAnchorPoint(cc.p(0.5, 0.5));
    var or = cc.view.getVisibleOrigin();
    var vs = cc.view.getVisibleSize();
    widget.setPosition(cc.p(or.x+vs.width/2, or.y+vs.height/2));
};

// num 8, length 3  ---> 008
fb.fixZero = function fix(num, length) {
  	return ('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;
}







