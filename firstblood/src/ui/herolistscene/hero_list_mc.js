
/**
 * Created by Tom on 15/09/11.
 * @Author Tom
 * @desc   MVC 模式， cast_scene的model,controller
 */


var HeroListMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(index){
        this._model.seat = index;
        return true;
    },

    model:function(){
    //this._model
        var heroList = [];
        var j = 0;
        for(var i in HeroData.getInstance()._heroAry)
        {
            var heroAliveDataUnit = {};
                //heroAliveDataUnit.mid = HeroData.getInstance()._heroAry[i].mid;
            fb.extend(heroAliveDataUnit, HeroData.getInstance()._heroAry[i],true);
            heroAliveDataUnit.seat = AliveData.getInstance().getSeat(heroAliveDataUnit.hid);
            heroAliveDataUnit.alive = AliveData.getInstance().isAlive(heroAliveDataUnit.hid);
            heroList[j++] = heroAliveDataUnit;
        }
        fb.UI_sortHeroList(heroList);

        var seatList = [];
        for(var i = 1;i<=7;i++){
            seatList[i] = 0;
        }
        var alive = AliveData.getInstance().getAliveAry();
        for(var i in alive)
        {
            seatList[alive[i].seat] = alive[i].hid;
        }

        this._model.seatList = seatList;
        this._model.heroList = heroList;
        this._model.length = j;

//        for(var i = 1;i<=7;i++){
//           cc.log("before seat[i]",seatList[i]);
//        }
    },

    httpsend : function(s1,s2,s3,s4,s5,s6,s7){
        HttpRequest.getInstance().send(ProtocolRequest.getInstance().setAliveHeroCmd(s1,s2,s3,s4,s5,s6,s7), this.update.bind(this));
    },

    update : function(){
        var heroList = [];
        var j = 0;
        for(var i in HeroData.getInstance()._heroAry)
        {
            var heroAliveDataUnit = {};
                //heroAliveDataUnit.mid = HeroData.getInstance()._heroAry[i].mid;
            fb.extend(heroAliveDataUnit, HeroData.getInstance()._heroAry[i],true);
            heroAliveDataUnit.seat = AliveData.getInstance().getSeat(heroAliveDataUnit.hid);
            heroAliveDataUnit.alive = AliveData.getInstance().isAlive(heroAliveDataUnit.hid);
            heroList[j++] = heroAliveDataUnit;
        }
        fb.UI_sortHeroList(heroList);

        var seatList = [];
        for(var i = 1;i<=7;i++){
            seatList[i] = 0;
        }
        var alive = AliveData.getInstance().getAliveAry();
        for(var i in alive)
        {
            seatList[alive[i].seat] = alive[i].hid;
        }
        for(var i = 1;i<=7;i++)
        {
            if(seatList[i] >0){
                 this._model.seat = i;
                 break;
            }
        }
        this._model.heroList = heroList;
        NotificationCenter.getInstance().postNotification("updateCS",this._model);
        cc.director.popScene();
    },

    view:function(){

        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();
        SceneManager.getInstance().push("HeroListScene", this);
    }
});
