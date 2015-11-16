
/**
 * Created by Tom on 15/09/11.
 * @Author Tom
 * @desc   MVC 模式， embattle_scene的model,controller
 */


var EmbattleMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(){
        this.model();
        return true;
    },

    model:function(){
    //this._model
        var seatList = [];
        for(var k = 1;k<=6;k++){
            var unit ={};
            unit.hid = 0;
            unit.battle = 0;
            seatList[k] = unit;
        }

        var heroList = [];
        var j = 1;
        var m = 0;
        for(var i in HeroData.getInstance()._heroAry)
        {
            var heroMangerDataUnit = {};
            //heroMangerDataUnit.mid = HeroData.getInstance()._heroAry[i].mid;
            heroMangerDataUnit.uuid = HeroData.getInstance()._heroAry[i].uuid;
            heroMangerDataUnit.hid = HeroData.getInstance()._heroAry[i].hid;
            heroMangerDataUnit.level = HeroData.getInstance()._heroAry[i].level;
            heroMangerDataUnit.star = HeroData.getInstance()._heroAry[i].star;
            heroMangerDataUnit.quality = HeroData.getInstance()._heroAry[i].quality;
            heroMangerDataUnit.name = HeroData.getInstance()._heroAry[i].name;
            heroMangerDataUnit.battle = HeroData.getInstance()._heroAry[i].battle;
            heroMangerDataUnit.seat = AliveData.getInstance().getSeat(heroMangerDataUnit.hid);
            heroMangerDataUnit.alive = AliveData.getInstance().isAlive(heroMangerDataUnit.hid);
            if(heroMangerDataUnit.alive){
                seatList[heroMangerDataUnit.seat].hid = heroMangerDataUnit.hid
                seatList[heroMangerDataUnit.seat].battle = heroMangerDataUnit.battle;
                m++;
            }
            heroList[j++] = heroMangerDataUnit;
            cc.log("heroMangerDataUnit.hid",heroMangerDataUnit.hid);

        }
        this._model.seatList = seatList;
        fb.UI_sortHeroList(heroList);
        this._model.heroList = heroList;
        this._model.heroNumber = j-1;
        cc.log("j ",j);
        this._model.aliveNumber = m;
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
        SceneManager.getInstance().push("EmbattleScene", this);
    }
});
