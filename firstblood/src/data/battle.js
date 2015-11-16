

/**
 * Created by fable on 15/09/06.
 * @Author fable
 * @desc   战斗数据处理，由服务器下发的战斗显示数据
 *
 * 服务器数据包格式如下：
 *
 { 
    "battle":
    {
        "win":{
        "status":1,
        "star":3,
        "prize":[[{"id":"20042","num":9,"type":"2"},{"id":"30023","num":6,"type":"3"},{"id":"30044","num":6,"type":"3"}]]
        },
        
        "coin":10000,

        //对战双方的英雄阵形
        "stand":
        {
            //攻击方英雄阵形
            "attack":
            [
                {
                    "seat":    英雄站位编号
                    "hid" :    英雄id
                    "mid" :    重复的英雄id
                    "level":   英雄等级
                    "blood":   英雄血量
                    "star":    英雄星级
                    "quality": 英雄品质
                    "battle":  英雄战斗力
                }
            ],
            防守方英雄阵形
            "def":
            [
                {
                    "seat":    英雄站位编号
                    "hid" :    英雄id
                    "mid" :    重复的英雄id
                    "level":   英雄等级
                    "blood":   英雄血量
                    "star":    英雄星级
                    "quality": 英雄品质
                    "battle":  英雄战斗力
                }
            ]
        },
        "huihe":
        [
            {
                //战斗中期
                "mid":
                {
                // 攻击方一个英雄的状态
                    "att": 
                    {
                        "seat":   英雄站位编号，左边是1、2、3、4、5、6，顺序是由上到下，由右到左，右边是11、12、13、14、15、16，顺序是由上到下，由左到右
                        "hid":    英雄id
                        "type":   特效效果类型，1表示伤害类，2表示加血类
                        "skill":  技能类型，1表示普通攻击，2表示小招，3表示大招
                        "range":  如果是伤害类英雄，这个值就是防守方英雄的站位编号；如果是加血类英雄，这个值就是攻击方英雄的站位编号；100表示攻击方或者防守方所有英雄
                        "effect": 0表示没有特效，1表示暴击，2表示必杀
                    },
                    // 防守方每个英雄的状态；如果是加血类英雄，则表示攻击方每个英雄的状态
                    "def":
                    [
                        {
                            "seat":   英雄站位编号
                            "hid":    英雄id
                            "effect": 0表示没有特效，1表示格挡，2表示闪避
                            "drop":   负数表示伤害掉了多少点血，正数表示治愈加了多少点血
                            "blood":  剩余多少点生命
                            "dead":   0表示没有死亡，1表示死亡
                        }
                    ],
                    // 怒气值
                    "anger":
                    {
                        "att":   攻击方怒气值总数
                        "def":   防守方怒气值总数
                    }
                },
                //战斗后期
                "end":
                {
                    //攻击方一个英雄的状态
                    "att":
                    {
                        "seat":   英雄站位编号
                        "hid":    英雄id
                        "effect": 0表示没有特效，1增加攻击力，2表示增加护甲
                        "value":  特效增加的数值
                    },
                    //防守方每个英雄的状态
                    "def":
                    [
                        {
                            "seat":   英雄站位编号
                            "hid":    英雄id
                            "effect": 0表示没有特效，1表示回血，2表示复活
                            "value":  特效增加的数值
                        }
                    ]
                }
            }
        ]
    }
}
 *
 * 
**/

var BattleData = cc.Class.extend({

	ctor:function(){
		return true;
	},

	loadData:function(jsonObj){
        fb.extend(this, jsonObj, true);//合并两个对象, 并且覆盖原有值
	},

    getWinPrizeAry:function(){
        return this.win.prize;
    },

    getWinCoin:function(){
        return this.coin;
    },
});


BattleData.sharedBattleData = null;
BattleData.firstUse       = true;
BattleData.getInstance  = function () {
    if (BattleData.firstUse) {
        BattleData.firstUse = false;
        BattleData.sharedBattleData = new BattleData();
    }
    return BattleData.sharedBattleData;
};

BattleData.purge = function () {
    if (BattleData.sharedBattleData) {
        delete BattleData.sharedBattleData;
        BattleData.sharedBattleData = null;
        BattleData.firstUse = true;
    }
};



