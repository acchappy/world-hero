
/**
 * Created by Tom on 15/09/24.
 * @Author Tom
 * @desc   MVC 模式， CustomsScene的model,controller
 */


var CustomsMC = cc.Class.extend({
    _scene:null,
    _mainLayer:null,
    _model:{},

    ctor:function(num,type){
        this._model.chapter = num;
        this._model.type = type;
        return true;
    },

    httpChallengeSend : function(sweep,c,s,n,t){
        if(sweep == 1){
            cc.log("CustomsMC  httpChallengeSend");
            var battle = new BattleShowMC(BATTLE_SHOW_MODE.map, {sweep:sweep, c:c, s:s, n:n, t:t});
            battle.view();
        }
        else
            HttpRequest.getInstance().send(ProtocolRequest.getInstance().getChallenge(sweep,c,s,n,t), this.update.bind(this));
    },

    showBattle:function(jsonObj){
   
    },

    update : function(jsonObj){
        var times = [];
        var tCnt = 0;

        var obj = BattleData.getInstance().getWinPrizeAry();
        for(var key in obj)
        {
            var timesUnit = {};
            var prize = [];
            var pCnt = 0;
            var oobj = obj[key];
            for(var n in oobj)
            {
                var prizeDataUnit = {};
                prizeDataUnit.id   = oobj[n].id;
                prizeDataUnit.num  = oobj[n].num;
                prizeDataUnit.t    = oobj[n].t;
                prizeDataUnit.name = PackageData.getInstance().getPackageStaticJsonObjForId(prizeDataUnit.id).name;
                prize[++pCnt]      = prizeDataUnit;
            }
            timesUnit.prize  = prize;
            timesUnit.length = pCnt;
            times[++tCnt]    = timesUnit;
        }
        this._model.coin = BattleData.getInstance().getWinCoin();

        this._model.times = times;
        this._model.timesCnt = tCnt;
        this._mainLayer.initPrize();
        this._mainLayer.updateUI();
    },

    model:function(){
    //普通关卡数据封装
        var simp = {};
        simp.SectionNum = SimpleMapData.getInstance().getSenctionCurrNumberByChapter(this._model.chapter);
        simp.TotalNum = SimpleMapData.getInstance().getSenctionTotalNumberByChapter(this._model.chapter);
        simp.CurrStarNum =  SimpleMapData.getInstance().getSenctionCurrStarByChapter(this._model.chapter);
        simp.InfoList =  SimpleMapData.getInstance().getSenctionInfoByChapter(this._model.chapter);
        for(var i in simp.InfoList)
        {
            var monster =simp.InfoList[i].Info;
            var monsterList = [];
            var rewardList = [];
            var index = 1;
            for(var j in monster)
            {
                if(j == "reward")
                {
                    var reward = monster[j].match(/\d+/ig);
                    var number = 1;
                    for(var k in reward)
                    {
                        rewardList[number++]  = PackageData.getInstance().getPackageStaticJsonObjForId(reward[k]);
                    }
                }else if(j != "reward" && j!="level")
                {
                    monsterList[index++] = MonsterData.getInstance().getMonsterDataById(parseInt(monster[j]));
                }else{
                   simp.InfoList[i].level = monster[j];
                }
            }
           simp.InfoList[i].monsterList = monsterList;
           simp.InfoList[i].rewardList = rewardList;
        }

        var elite = {};
        elite.SectionNum = EliteMapData.getInstance().getSenctionCurrNumberByChapter(this._model.chapter);
        elite.TotalNum = EliteMapData.getInstance().getSenctionTotalNumberByChapter(this._model.chapter);
        elite.CurrStarNum =  EliteMapData.getInstance().getSenctionCurrStarByChapter(this._model.chapter);
        elite.InfoList =  EliteMapData.getInstance().getSenctionInfoByChapter(this._model.chapter);
        for(var i in elite.InfoList)
        {
            var monster = elite.InfoList[i].Info;
            var monsterList = [];
            var rewardList = [];
            var index = 1;
            for(var j in monster)
            {
                if(j == "reward")
                {
                    var reward = monster[j].match(/\d+/ig);
                    var number = 1;
                    for(var k in reward)
                    {
                        rewardList[number++]  = PackageData.getInstance().getPackageStaticJsonObjForId(reward[k]);
                    }
                }else if(j != "reward" && j!="level")
                {
                    monsterList[index++] = MonsterData.getInstance().getMonsterDataById(parseInt(monster[j]));
                }else{
                   elite.InfoList[i].level = monster[j];
                }
            }
           elite.InfoList[i].monsterList = monsterList;
           elite.InfoList[i].rewardList = rewardList;
        }

        var customs = [];
        customs[1] = simp;
        customs[2] = elite;

        this._model.customs = customs;
    },

    view:function(cbScene){

        //在new新场景前，先组装数据model,作为场景里面的数据模型
        this.model();
        if(cbScene)
            cbScene();
        else
            SceneManager.getInstance().push("CustomsScene", this);
    }
});
