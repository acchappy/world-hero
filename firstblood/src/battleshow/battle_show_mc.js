
/**
 * Created by fable on 15/09/15.
 * @Author fable
 * @desc  ....
 */

var BATTLE_SHOW_MODE = {
    fight : 1000, //竞技
    map   : 1001, //推图
    tower : 1002,  //爬塔
    test  : 1005  //测试
};


var BattleShowMC = cc.Class.extend({
    _scene      : null,
    _mainLayer  : null,
    _model      : null,
    _mode       : BATTLE_SHOW_MODE.fight,
    _param      : null,

    _prize      : {},

    ctor:function(mode, param){
        this._mode  = mode;
        this._param = param;
        this._prize = {};

        return true;
    },

    initModel:function(){
        this._model = BattleData.getInstance();
        this._prize.coin = this._model.getWinCoin();
        if(this._prize.coin == null)
            this._prize.coin = 0;

        if(this._mode == BATTLE_SHOW_MODE.map && this._param.t == 2)            
            this._prize.exp  = 12;
        else
            this._prize.exp  = 6;   

        this._prize.ary = [];
        if(this._model.getWinPrizeAry().length){
            this._prize.ary = this._model.getWinPrizeAry()[0]; 
            var ary = this._model.getWinPrizeAry()[0]; 
            for(var i=0; i<ary.length; i++) {
                var prizeDataUnit  = {};
                prizeDataUnit.id   = ary[i].id;
                prizeDataUnit.num  = ary[i].num;
                prizeDataUnit.t    = ary[i].t;
                prizeDataUnit.name = PackageData.getInstance().getPackageStaticJsonObjForId(prizeDataUnit.id).name;
                this._prize.ary[i] = prizeDataUnit;
            }             
        }                           
    },

    getHeroSpineNameForHid:function(hid, left){

        var heroUnit  = null;
        if(left)
            heroUnit = HeroData.getInstance().getHeroUnitForHid(hid);
        else{
            if(this._mode == BATTLE_SHOW_MODE.fight || this._mode == BATTLE_SHOW_MODE.test)
                heroUnit = HeroData.getInstance().getHeroUnitForHid(hid);
            else if(this._mode == BATTLE_SHOW_MODE.map)
                heroUnit = MonsterData.getInstance().getMonsterDataById(hid);
            else if(this._mode == BATTLE_SHOW_MODE.tower)
                heroUnit = HeroData.getInstance().getHeroUnitForHid(hid);
        }            

        cc.log("battle show mc initHeroStandSub mode, hid", this._mode, hid);
        cc.assert(heroUnit != null, "battle show mc initHeroStandSub fail!!");

        return heroUnit.spine;
    },

    view:function(){
        this.sendBattle();
    },

    sendBattle:function(){
        var p = this._param;
        if(this._mode == BATTLE_SHOW_MODE.fight)
            HttpRequest.getInstance().send(ProtocolRequest.getInstance().getBattleCmd(p.fuid), this.cbHttpSendBattle.bind(this));
        else if(this._mode == BATTLE_SHOW_MODE.test)
            HttpRequest.getInstance().send(ProtocolRequest.getInstance().getBattleTestCmd(p.fuid), this.cbHttpSendBattle.bind(this));        
        else if(this._mode == BATTLE_SHOW_MODE.map)
            HttpRequest.getInstance().send(ProtocolRequest.getInstance().getChallenge(p.sweep, p.c, p.s, p.n, p.t), this.cbHttpSendBattle.bind(this));
        else if(this._mode == BATTLE_SHOW_MODE.tower)
            HttpRequest.getInstance().send(ProtocolRequest.getInstance().getTowerBattleCmd(p.tid), this.cbHttpSendBattle.bind(this));
    },

    cbHttpSendBattle:function(jsonObj){

         //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.initModel();
        this.enterBattle();
    },

    enterBattle:function(){
        // this._scene = new BattleShowScene(this);
        // //var tt = new cc.TransitionSlideInB(0.25, this._scene);
        // cc.director.replaceScene(this._scene); //?????,这里用到了replace scene，要处理场景管理，因为之前有很push压栈，会得不到释放
        // //cc.director.pushScene(this._scene); //?????,如果push,不释放之前的场景，不知战场内存够不够用
        // this._mainLayer = this._scene.getMainLayer();  

        SceneManager.getInstance().enterBattleScene("BattleShowScene", this);
    },

    exitBattle:function(strongScene){
        // var scene = new MainScene();
        // var tt = new cc.TransitionFade(0.5, scene);
        // cc.director.replaceScene(tt);
        // var main_mc = new MainMC();
        // main_mc.view();
        //cc.director.popScene();  
        // cc.director.popToRootScene();
        // var hero_manager_mc = new HeroMangerMC();
        // hero_manager_mc.view();   
        // 
        SceneManager.getInstance().exitBattleScene(strongScene);             
    },

});
