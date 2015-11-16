

/**
 * Created by fable on 15/09/06.
 * @Author fable
 * @desc   玩家的数据处理
**/

//动态数据单元，即服务传过来的字段，要跟本地的静态数据对象合并，组成一个新的对象
var PlayerDynamicDataUnit = 
{	
	uid:10001,
	name:"mikeasdfadfafasfdasfadfafa",
	siteuid:109099881,
	mcard:30,
	level:25,
	nextexp:200,
	exp:120,
	coin:1000000000,
	diamond:1000000000,
	fight:1000000000,
	power:1000000000,
	imgurl:"http:\/\/www.acchappy.com\/head.jpg",
	skey:"dfsawqerfadfasfqwergagasdgadf",
	mtkey:"farqewdfdgargqetqeggagadfadf"
};




//玩家数据
var PlayerData = cc.Class.extend({

	ctor:function(){	
		return true;
	},

	loadLoginData:function(jsonObj){
        //var jsonObj = this.getTestJsonObj();
        fb.extend(this, jsonObj, true);//合并两个对象, 并且覆盖原有值
	},

	loadPlayerData:function(jsonObj){

        //var jsonObj = this.getTestJsonObj();
        fb.extend(this, jsonObj, true);//合并两个对象, 并且覆盖原有值
	},

	getPlayerDynamicDataUnit:function(){
        //var obj = cc.loader.getRes(res.player_data_json);  
        var obj = PlayerDynamicDataUnit;

        return obj;
	},

	updatePlayerData : function(jsonObj){
		for(var key in jsonObj){
			cc.log("key",this[key],jsonObj[key]);
			this[key] = jsonObj[key];
			cc.log("key",this[key],jsonObj[key]);
		}
	},
});


PlayerData.sharedPlayerData = null;
PlayerData.firstUse       = true;
PlayerData.getInstance  = function () {
    if (PlayerData.firstUse) {
        PlayerData.firstUse = false;
        PlayerData.sharedPlayerData = new PlayerData();
    }
    return PlayerData.sharedPlayerData;
};





