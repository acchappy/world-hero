

/**
 * Created by fable on 15/11/10.
 * @Author fable
 * @desc   场景管理类
 *
 *  大部分情况下，场景都是遵循cocos2djs栈的管理方式，即依次push scene，然后依次pop释放场景
 *  但由于战斗场景的特殊情况，进战斗场景会要求释放之前所有场景及战斗完后，会要求直接进入升级场景等
 *  故要加入自己的场景管理类
 *
 *  注意： 主场景,mainscene 永远在内存中
 *         进入战场之前，会把所有除主场景外的场景都删除掉
 * 
**/

var SceneManager = cc.Class.extend({

    _scenes       :   [],
    _view         :   null,  //当前运行的view
	ctor:function(){
        this._scenes = [];
        this._view   = null;

		return true;
	},

    scene:function(name, view){

        this._view             = view;
        this._view._name       = name;
        var scene              = eval(name);
        view._scene            = new scene(view);
        view._mainLayer        = view._scene.getMainLayer();
        view._scene._name      = name;  //????，作为场景查找索引
        view._scene._view      = view;
    },

    push:function(name, view){

        this.scene(name, view);
        this._scenes.push(view._scene);
        cc.director.pushScene(view._scene);       
    },

    replace:function(name, view){
        this.scene(name, view);
        if(this._scenes.length > 0)
            this._scenes.pop();    
        this._scenes.push(view._scene);  
        cc.director.replaceScene(view._scene);                
    },

    pop:function(){
        cc.director.popScene();     

        var scene  = this._scenes.pop();
        cc.log("scene manager pop scene.name", scene._name);
        this._view = scene._view;
    },

    //进入战斗场景,为了让出内存，释放掉除了主场景的其他所有场景，退出战场要恢复章节界面
    enterBattleScene:function(name, view){
        var num = this._scenes.length;
        cc.director.popToRootScene();//除了主场景，其他都干掉
        for(var i=0; i<this._scenes.length-1; i++){
            this._scenes.pop();
        }

        //?????, 战斗场景push在主场景上，会重置_sendCleanupToScene,其实是在popToRootScene已经cleanup
        if(num > 1)
            cc.director.getRunningScene().cleanup();

        this.push(name, view);
    }, 


    //正常退出战场要恢复章节界面
    exitBattleScene:function(strongScene){

        //????战斗失败后，点击强化直接跳到强化界面，升级，升品等界面        
        if(strongScene){
            // var num = this._scenes.length;            
            // cc.director.popToRootScene(); //除了主场景，其他都干掉
            // for(var i=0; i<this._scenes.length-1; i++){
            //     this._scenes.pop();
            // }
            // //?????, 战斗场景push在主场景上，会重置_sendCleanupToScene,其实是在popToRootScene已经cleanup
            // if(num > 1)
            //     cc.director.getRunningScene().cleanup();

            // var v = new HeroUpLevelMC(0);
            // v.view();
            
            var v = new HeroUpLevelMC(0);
            v.view(function(){
                this.replace("HeroUpLevelScene", v);//进入战场之前，已经删除了除主场景外的所有场景，故可用replace
            }.bind(this));
        }
        //????,推图直接到某章某关界面，包括精英与普通
        else if(this._view._mode == BATTLE_SHOW_MODE.map){
            // var chapter = new ChapterMC(this._view._param.c);
            // chapter.view();            
            var customs = new CustomsMC(this._view._param.s, this._view._param.t);
            //customs.view(cbScene);
            customs.view(function(){
                this.replace("CustomsScene", customs);//进入战场之前，已经删除了除主场景外的所有场景，故可用replace
            }.bind(this));
        }
        else if(this._view._mode == BATTLE_SHOW_MODE.tower){
            var v = new TowerMC();
            v.view(function(){
                this.replace("TowerScene", v);//进入战场之前，已经删除了除主场景外的所有场景，故可用replace
            }.bind(this));
        }
        else
            this.pop();
    }

});


SceneManager.sharedSceneManager = null;
SceneManager.firstUse       = true;
SceneManager.getInstance  = function () {
    if (SceneManager.firstUse) {
        SceneManager.firstUse = false;
        SceneManager.sharedSceneManager = new SceneManager();
    }
    return SceneManager.sharedSceneManager;
};

SceneManager.purge = function () {
    if (SceneManager.sharedSceneManager) {
        delete SceneManager.sharedSceneManager;
        SceneManager.sharedSceneManager = null;
        SceneManager.firstUse = true;
    }
};



