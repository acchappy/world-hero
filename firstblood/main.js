/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

cc.game.onStart = function(){
    cc.view.adjustViewPort(true);

    var frameSize = cc.view.getFrameSize();
    // 设置 LsSize 固定值
    var lsSize = fb.DESIGN_LSSIZE;//cc.size(960, 640);

    var scaleX =  frameSize.width / lsSize.width;
    var scaleY =  frameSize.height / lsSize.height;

    cc.log("xxx x: %f; y: %f; scale: %f", scaleX, scaleY);
    // 定义 scale 变量
    var scale = 0.0; // MAX(scaleX, scaleY);
     if (scaleX > scaleY) {
         // 如果是 X 方向偏大，那么 scaleX 需要除以一个放大系数，放大系数可以由枞方向获取，
         // 因为此时 FrameSize 和 LsSize 的上下边是重叠的
         scale = scaleX / (frameSize.height /  lsSize.height);
     } else {
         scale = scaleY / (frameSize.width / lsSize.width);
     }

    cc.log("x: %f; y: %f; scale: %f", scaleX, scaleY, scale);

    // 要实现这种功能，我们需要做的就是算得 缩放系数，缩放系数由 原来的设计稍作演变即可
    // 由于 NoBorder 的缩放是根据 scaleX 和 scaleY 的熟大熟小来判断缩放系数是参照横向还是竖向
    // 固我们需要两个先决条件，固定的方向 和 缩放的参照方向，而得到如下算法

    // 固定高度
//     if (scaleX > scaleY)
//         scale = scaleX / (frameSize.height /  lsSize.height);
//     else
//         scale = scaleX / (frameSize.width / lsSize.width);

    // // 固定宽度
//    if (scaleX > scaleY)
//        scale = scaleY / (frameSize.height /  lsSize.height);
//    else
//        scale = scaleY / (frameSize.width /  lsSize.width);


    // 根据 LsSize 和屏幕宽高比动态设定 WinSize
    cc.view.setDesignResolutionSize(lsSize.width * scale,
            lsSize.height * scale, cc.ResolutionPolicy.NO_BORDER);

    var viewSize = cc.view.getVisibleSize();
    if(viewSize.width/fb.RES_SIZE.width > viewSize.height/fb.RES_SIZE.height)
    {
        cc.log("main game onStart BG_SCALE_FACTOR, width");
        fb.BG_SCALE_FACTOR = viewSize.width/fb.RES_SIZE.width;
    } else {
        cc.log("main game onStart BG_SCALE_FACTOR, height");
        fb.BG_SCALE_FACTOR = viewSize.height/fb.RES_SIZE.height;
    }

    cc.log("main game onStart visibleSize w, h, res w, h--BGSCALE factor", viewSize.width, viewSize.height, fb.RES_SIZE.width, fb.RES_SIZE.height, fb.BG_SCALE_FACTOR);
//    cc.view.setDesignResolutionSize(960, 640,cc.ResolutionPolicy.FIXED_WIDTH);
    cc.view.resizeWithBrowserSize(true);
    //load resources
//    cc.LoaderScene.preload(g_resources, function () {
//        cc.director.runScene(new HelloWorldScene());
//    }, this);
//    MyLoaderScene.preload(g_resources, function () {
        cc.director.runScene(new LoaderScene());
//    });
};
cc.game.run();
