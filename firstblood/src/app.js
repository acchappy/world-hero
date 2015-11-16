
/**
 * Created by fable on 15/08/20.
 * @Author fable
 * @desc   ...
 */

var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
 //       var size = cc.winSize;

       // var mainscene = ccs.load(res.MainScene_json);
       // this.addChild(mainscene.node);

        var visibleSize = cc.winSize;
        this.sprite = new cc.Sprite(res.logo_jpg);
        this.sprite.setPosition(visibleSize.width/2, visibleSize.height/2);
        this.addChild(this.sprite);

        this.setCascadeOpacityEnabled(true);
        this.setOpacity(0);

        return true;
    },

    onEnter:function () {

         this._super();
         var fadeIn = cc.fadeTo(0.2, 255);
         var fadeOut = cc.fadeTo(0.2, 0);
         var func = cc.callFunc(this.changeScene, this);
         var action = cc.sequence(fadeIn, fadeOut, func);

         this.runAction(action);
    },

    changeScene:function () {

        //var scene = new TestScene();
        //var scene = new FacebookTestScene();
        //var scene = new BattleScene();
        //var scene = new MainScene();
        // var scene = new LoginScene();
        
        // var tt = new cc.TransitionFade(0.5, scene);
       // cc.director.replaceScene(scene);

        var login_mc = new LoginMC(false);
        login_mc.view();

    }

});



var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

