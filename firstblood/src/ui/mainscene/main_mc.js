
/**
 * Created by fable on 15/09/08.
 * @Author fable
 * @desc   MVC 模式， main_scene的model,controller
 */


// var MainMCUnit = 
// {

// }

var MainMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(){    
        return true;
    },

    model:function(){
        //this._model
        this._model.name =  PlayerData.getInstance().name;
        this._model.level = PlayerData.getInstance().level;
        this._model.fight = PlayerData.getInstance().fight;

        var alive = AliveData.getInstance().getAliveAry();
        var hero  = HeroData.getInstance();

        //cc.log("main mc model", hero.getHeroUnitForMid(2));

        var view_alive = [];
        for (var key in alive) {
            var item = {};
            item.seat = alive[key].seat;
            item.hid  = alive[key].hid;

            var heroUnit = hero.getHeroUnitForHid(alive[key].hid);
            if (heroUnit) 
                item.name = heroUnit.name;  
            else
                item.name = "";             

            view_alive.push(item);
        }

        this._model.alive = view_alive;
    },


    updateUI : function(name,obj){
        this.updateConsumelayer();
        this._mainLayer.addHero();
    },

    updateConsumelayer : function(){
        this.model();
        this._mainLayer.updateUI();
    },

    view:function(){

        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();
        SceneManager.getInstance().replace("MainScene", this);  
    }

});





//单例模式
// MainMC.sharedMainMC = null;
// MainMC.firstUse       = true;
// MainMC.getInstance  = function () {
//     if (MainMC.firstUse) {
//         MainMC.firstUse = false;
//         MainMC.sharedMainMC = new MainMC();
//     }
//     return MainMC.sharedMainMC;
// };





