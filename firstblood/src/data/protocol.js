

/**
 * Created by fable on 15/10/09.
 * @Author fable
 * @desc   发送请求的命令
**/


//http request cmd
var ProtocolRequest = cc.Class.extend({

	_debug:false,
    _debugJson:[],
	ctor:function(){

		this._debug = fb.NON_NET_DEBUG;

		return true;
	},

    getHeroListCmd:function(){
		var cmd = [];
		cmd["gate"] = "user_heroList";

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getHeroListJson();

		return cmd;
    },

    getPackageListCmd:function(){
		var cmd = [];
		cmd["gate"] = "user_getPackage";

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getPackageListJson();

		return cmd;
    },

    //升级，使用经验
    getUseMedicineCmd:function(hid, id, num){
		var cmd = [];
		cmd["gate"] = "user_useMedicine";
		cmd["hid"]  = hid;
		cmd["id"]   = id;
		cmd["num"]  = num;


		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getUseMedicineJson();

		return cmd;
    },

	//换位
	setAliveHeroCmd : function(s1,s2,s3,s4,s5,s6,s7){
		var cmd = [];
		cmd["gate"] = "user_setAliveHero";
//		cmd["gate"] = "tower_setRank";
		cmd["s1"]  = s1;
		cmd["s2"]  = s2;
		cmd["s3"]  = s3;
		cmd["s4"]  = s4;
		cmd["s5"]  = s5;
		cmd["s6"]  = s6;
		cmd["s7"]  = s7;

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getAliveHeroJson();
		return cmd;
    },

	//英雄进阶
	getAdvanceCmd :function(hid){
		var cmd = [];
		cmd["gate"] = "heroquality_up";
		cmd["hid"]  = hid;

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getAdvanceJson();
		return cmd;
	},

    //酒馆召唤
    getPubSummonCmd:function(number,c){
		var cmd = [];
		cmd["gate"] = "pub_reward";
		cmd["number"]  = number;
		cmd["c"] = c;

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getPubSummonJson();
		return cmd;
    },

    // 合成
    getUserMergeHeroCmd:function(hid){
		var cmd = [];
		cmd["gate"] = "user_mergeHero";
		cmd["hid"]  = hid;

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getUserMergeHeroJson();
		return cmd;
    },

	//获取用户推图进度
    getMapListCmd:function(hid){
		var cmd = [];
		cmd["gate"] = "map_getMapList";

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getMapListJson();
		return cmd;
    },

	//邮件物品领取
	getMailReadCmd : function(id){
		var cmd = [];
		cmd["gate"] = "mail_read";
		cmd["id"] = id;

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getMapListJson();
		return cmd;
	},

	//得到邮件列表
	getMailListCmd : function(name){
		var cmd = [];
		cmd["gate"] = "mail_list";
		cmd["name"] = name;

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getMailListJson();
		return cmd;
	},

	getTaskListCmd : function(){
		var cmd = [];
		cmd["gate"] = "task_getlist";

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getTaskListJson();
		return cmd;
	},

	getTaskRewardCmd : function(task_id){
		var cmd = [];
		cmd["gate"] = "task_reward";
		cmd["task_id"]  = task_id;

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getTaskRewardJson();
		return cmd;
	},

	//
	getMailRenewPropCmd : function(name){
		var cmd = [];
		cmd["gate"] = "mall_renewProp";

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getMailRenewPropJson();
		return cmd;
	},

	getTowerUpCmd : function(){
		var cmd = [];
		cmd["gate"] = "tower_up";

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getTowerUpJson();
		return cmd;
	},

	getTowerBattleCmd : function(tid){
		var cmd = [];
		cmd["gate"] = "tower_battle";
		cmd["tid"] = tid;
		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getTowerBattleJson();
		return cmd;
	},

	getTowerRewardCmd : function(tid){
		var cmd = [];
		cmd["gate"] = "tower_reward";
		cmd["tid"] = tid;
		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getTowerRewardJson();
		return cmd;
	},



	//杂货商品支付接口
	getMallPayPropCmd : function(id){
		var cmd = [];
		cmd["gate"] = "mall_payProp";
		cmd["id"] = id
		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getMallPayPropJson();
		return cmd;

	},
	//杂货商店物品列表
	getMallPropListCmd : function(){
		var cmd = [];
		cmd["gate"] = "mall_Proplist";

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getMallPropListJson();
		return cmd;

	},

	//推图战斗or扫荡(普通)
    getChallenge : function(sweep,c,s,n,t){
		var cmd = [];
		cmd["gate"] = "map_challenge";
		cmd["sweep"] = sweep;
		cmd["c"] = c;
		cmd["s"] = s;
		cmd["n"] = n;
		cmd["t"] = t;

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getChallengeSimpleJson();
		return cmd;
    },

    // 奥义升级
    getUserAoyiUpCmd:function(hid, type){
		var cmd = [];
		cmd["gate"] = "aoyi_up";
		cmd["hid"]  = hid;
		cmd["aoyi_type"]  = type;

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getUserAoyiUpJson();
		return cmd;
    },

    getUpSkillCmd:function(hid,skill){
		var cmd = [];
		cmd["gate"] = "skill_up";
    	cmd["hid"]  = hid;
    	cmd["skill_type"]  = skill;//skill1 - skill4

		//单机测试数据
		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getUpSkillJson();

		return cmd;
    },

    getBattleCmd:function(fuid){
		var cmd = [];
		cmd["gate"] = "fight_process";
		cmd["fuid"] = fuid;

		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getBattleJson();
		return cmd;
    },

    getBattleTestCmd:function(fuid){
		var cmd = [];
		cmd["gate"] = "fight_test";
		cmd["fuid"] = fuid;

		if(this._debug)
			this._debugJson[cmd["gate"]] = HttpResponseDebug.getInstance().getBattleTestJson();
		
		return cmd;
    },
	//在无网的条件下，模拟有网条件下的json数据，或者是读取之保存的有网条件下各协议的数据给recv解析
	//格式要与有网条件一样
	//每条请求都必须配置一条静态的单机回复数据
    recvDebug:function(param, cb, isLogin){
		var jsonObj = null;
		if (isLogin) {
        	jsonObj = HttpResponseDebug.getInstance().getLoginJson();		
		}
		else if(cc.isArray(param)) {
			//根据不同的命令参数配置不同的回复	
			jsonObj = this._debugJson[param["gate"]];
		}
		else if(param.cmd){
			jsonObj = this._debugJson["cmd"+param.cmd];
		}

		return jsonObj;
    }

});

ProtocolRequest.sharedProtocolRequest = null;
ProtocolRequest.firstUse       = true;
ProtocolRequest.getInstance  = function () {
    if (ProtocolRequest.firstUse) {
        ProtocolRequest.firstUse = false;
        ProtocolRequest.sharedProtocolRequest = new ProtocolRequest();
    }
    return ProtocolRequest.sharedProtocolRequest;
};


//response cmd
/**

	HttpRequest返回数据拆包处理
 *
 *	每包json格式：
 *	｛
 * 		"player":{"uid":10000, "coin":1000, "level":12,.....},         //login的时候会传完整的集合，后面只传有改变的属性集合，如没有任何改变，则"player"都不会有
 * 		"hero":[{"id":128965, "mid":454, "name":"xxxx", ...},{"id":128965, "mid":454, "name":"xxxx", ...},...], //所有全属性英雄列表， 子项同上
 * 		//"fushi":[{"id":4334535, "mid":454, "heroid":128965, "heromid":454,....}, ],                             //所有全属性符石列表，  子项同上
 *   	"package":[{"id":xxx, "name":"xxx", "price":56},.....}],                                               //所有背包材料列表，  子项同上
 *
 * * 	"add_hero":[{"id":128965, "mid":454, "name":"xxxx", ...},{"id":128965, "mid":454, "name":"xxxx", ...},...], //新增全属性英雄列表， 子项同上
 * 		//"add_fushi":[{"id":4334535, "mid":454, "heroid":128965, "heromid":454,....}, ],                                 //新增全属性符石列表， 子项同上
 *   	"add_package":[{"id":xxx, "name":"xxx", "price":56},.....}],                              
 *
 * *  	"update_hero":[{"id":128965, "mid":454, "name":"xxxx", ...},{"id":128965, "mid":454, "name":"xxxx", ...},...], //更新了部分属性英雄列表， 子项同上
 * 		//"update_fushi":[{"id":4334535, "mid":454, "heroid":128965, "heromid":454,....}, ],                                 //更新了部分属性符石列表， 子项同上
 *   	"update_package":[{"id":xxx, "name":"xxx", "price":56},.....}],      
 *
 * *  	"del_hero":[{"id":128965, "mid":454, "name":"xxxx", ...},{"id":128965, "mid":454, "name":"xxxx", ...},...], //删除全属性英雄列表， 子项同上
 * 		//"del_fushi":[{"id":4334535, "mid":454, "heroid":128965, "heromid":454,....}, ],                                 //删除全属性符石列表， 子项同上
 *   	"del_package":[{"id":xxx, "name":"xxx", "price":56},.....}],
 *
 *		"battle":{...}  //参考src/data/battle.js
 *
 * 
 *  ｝
 *
**/

var ProtocolResponse = cc.Class.extend({
	_error_handle:null,	
    _cmd:[],
	ctor:function(){

		this.initResponseCmd();
		return true;
	},

    initResponseCmd:function(){
        this._cmd["login"]           	= this.login.bind(this);
        this._cmd["player"]          	= this.player.bind(this);
        this._cmd["update_player"]      = this.update_player.bind(this);
        this._cmd["hero"]            	= this.hero.bind(this);
        this._cmd["add_hero"]        	= this.add_hero.bind(this);
        this._cmd["del_hero"]        	= this.del_hero.bind(this);
        this._cmd["update_hero"]     	= this.update_hero.bind(this);
        this._cmd["simple"]				= this.simple.bind(this);
        this._cmd["add_simple_map"]     = this.add_simple_map.bind(this);
        this._cmd["update_simple_map"]  = this.update_simple_map.bind(this);
        this._cmd["elite"]				= this.elite.bind(this);
        this._cmd["add_elite_map"]    	= this.add_elite_map.bind(this);
        this._cmd["update_elite_map"]  	= this.update_elite_map.bind(this);
        this._cmd["package"]         	= this.bag.bind(this);
        this._cmd["add_package"]     	= this.add_package.bind(this);
        this._cmd["del_package"]     	= this.del_package.bind(this);
        this._cmd["update_package"]  	= this.update_package.bind(this);
        this._cmd["alive"]           	= this.alive.bind(this); //上阵英雄数据
        this._cmd["battle"]          	= this.battle.bind(this);
        this._cmd["error"]           	= this.err.bind(this);
        this._cmd["task_list"]          = this.task.bind(this);
        this._cmd["tower_list"]         = this.tower.bind(this);
        this._cmd["add_tower"]     		= this.add_tower.bind(this);
        this._cmd["update_tower"]     	= this.update_tower.bind(this);

        //
    },

	setErrorHandle:function(handle){
		this._error_handle = handle;
	},

    getCmd:function(){
    	return this._cmd;
    },

    recvDebug:function(param, cb, isLogin){
    	return ProtocolRequest.getInstance().recvDebug(param, cb, isLogin);
    },

//protocol start................................................................
    login:function(jsonObj){
	    PlayerData.getInstance().loadLoginData(jsonObj);
    },

    player:function(jsonObj){
	    PlayerData.getInstance().loadPlayerData(jsonObj);
    },

	update_player :function(jsonObj){
	    PlayerData.getInstance().updatePlayerData(jsonObj);
    },

    hero:function(jsonObj){
	    HeroData.getInstance().loadData(jsonObj);
    },

    add_hero:function(jsonObj){
	    HeroData.getInstance().addData(jsonObj);
    },

    del_hero:function(jsonObj){
	    HeroData.getInstance().delData(jsonObj);
    },

    update_hero:function(jsonObj){
	    HeroData.getInstance().updateData(jsonObj);
    },

    task:function(jsonObj){
	    TaskData.getInstance().loadData(jsonObj);
    },

    tower:function(jsonObj){
	    TowerData.getInstance().loadData(jsonObj);
    },

    add_tower:function(jsonObj){
    	cc.log("add_tower");
	    TowerData.getInstance().addData(jsonObj);
    },

    update_tower:function(jsonObj){
    	cc.log("update_tower");
	    TowerData.getInstance().updateData(jsonObj);
    },

    elite : function(jsonObj){
	   	EliteMapData.getInstance().loadData(jsonObj);
    },

    simple : function(jsonObj){
	    SimpleMapData.getInstance().loadData(jsonObj);
    },

    add_simple_map:function(jsonObj){
	   	SimpleMapData.getInstance().addData(jsonObj);
    },

    update_simple_map:function(jsonObj){
	    SimpleMapData.getInstance().updateData(jsonObj);
    },

    add_elite_map:function(jsonObj){
	   	EliteMapData.getInstance().addData(jsonObj);
    },

    update_elite_map:function(jsonObj){
	    EliteMapData.getInstance().updateData(jsonObj);
    },

    bag:function(jsonObj){
	    PackageData.getInstance().loadData(jsonObj);
    },

    add_package:function(jsonObj){
	    PackageData.getInstance().addData(jsonObj);
    },

    del_package:function(jsonObj){
	    PackageData.getInstance().delData(jsonObj);
    },

    update_package:function(jsonObj){
	    PackageData.getInstance().updateData(jsonObj);
    },

    alive:function(jsonObj){
   		AliveData.purge();//因为每次改动，都会下发所有数据，故要清除之前的所有数据	       		
   		AliveData.getInstance().loadData(jsonObj);
    },

    battle:function(jsonObj){
   		BattleData.purge();//因为会每次下发所有战斗数据，故要清除之前的所有数据, 因为是数据合并，故一定要这么做
   		BattleData.getInstance().loadData(jsonObj);	
    },

    err:function(jsonObj){
   		if (this._error_handle) {
   			var err = parseInt(jsonObj);
   			this._error_handle.handle(err);
   		}    
    }
//protocol end................................................................

});

ProtocolResponse.sharedProtocolResponse = null;
ProtocolResponse.firstUse       = true;
ProtocolResponse.getInstance  = function () {
    if (ProtocolResponse.firstUse) {
        ProtocolResponse.firstUse = false;
        ProtocolResponse.sharedProtocolResponse = new ProtocolResponse();
    }
    return ProtocolResponse.sharedProtocolResponse;
};
