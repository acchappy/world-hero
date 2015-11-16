
/**
 * Created by fable on 15/08/20.
 * @Author fable
 * @desc   ...
 */

var TestMapLayer = cc.Layer.extend({

    _bg: null,
    _spine : null,
    ctor:function () {
        this._super();

        var size = cc.director.getWinSize();

        this._bg = new cc.Sprite(res.logo_jpg);
        //this._bg.setVisible(false);

        this._bg.setScale(size.height/this._bg.getContentSize().height);
        this._bg.setAnchorPoint(cc.p(0.5, 0.5));
        this._bg.setPosition(cc.p(size.width/2, size.height/2));
        this.addChild(this._bg, -1, 88888);

        var replay = new cc.MenuItemImage(res.battle_bloodgray_png, res.battle_bloodgray_png, this.onMenuTest, this);

        var menu = new cc.Menu(replay);
        this.addChild(menu, 20000);
        menu.setPosition(cc.p(size.width/2, size.height/2-200));        


        var runScene = cc.director.getRunningScene().getChildren();
        for(var i in runScene){
            cc.log("rrrrrrrrrrrrr", runScene[i].getTag(), runScene[i].getLocalZOrder());

        }   
        //this.spineTest();
        //this.ccsTest();
        //this.ccsTest1();
        //this.testJson();
        //this.testHttpJson();
        //this.testLocalStorage();
        //this.testHttpRequest();
        //this.testResponseProto();
       // this.testHeroDataAry();
        //this.testAnchorPoint();
        //this.testTipDlg();
        //this.testAry();
        //this.testDate();
        //this.testSocketIO();
        //this.tesWebSocket();
        //this.testSpine1();
        //this.testSpineRaptor();
        //this.testHeroConfig();
        //this.testTryCatch();
        //this.testBlendFunc();
        this.testShader();
    },
    testBlendFunc:function(){
        // cc.ONE = 1;
        // cc.ZERO = 0;
        // cc.SRC_ALPHA = 0x0302;
        // cc.SRC_ALPHA_SATURATE = 0x308;
        // cc.SRC_COLOR = 0x300;
        // cc.DST_ALPHA = 0x304;
        // cc.DST_COLOR = 0x306;
        // cc.ONE_MINUS_SRC_ALPHA = 0x0303;
        // cc.ONE_MINUS_SRC_COLOR = 0x301;
        // cc.ONE_MINUS_DST_ALPHA = 0x305;
        // cc.ONE_MINUS_DST_COLOR = 0x0307;
        // cc.ONE_MINUS_CONSTANT_ALPHA = 0x8004;
        // cc.ONE_MINUS_CONSTANT_COLOR = 0x8002;

        var size = cc.director.getWinSize();        
        var spineBoy1 = new sp.SkeletonAnimation('res/spine/heianfashi/heianfashi.json', 'res/spine/heianfashi/heianfashi.atlas');
        spineBoy1.setPosition(cc.p(size.width / 2+400, size.height / 2 - 150));
        //spineBoy1.setScale(0.2);
        this.addChild(spineBoy1, 4);
        //spineBoy1.setBlendFunc({src:cc.ONE_MINUS_CONSTANT_COLOR, dst:cc.ONE});
        //spineBoy1.setBlendFunc({src:cc.SRC_ALPHA, dst:cc.ONE_MINUS_SRC_ALPHA});
        spineBoy1.setBlendFunc({src:cc.SRC_ALPHA, dst:cc.ONE});


        //spineBoy1.setColor(cc.color.GREEN);
    },
    testShader:function(){
        //shader test
       //  var program = cc.GLProgram.create('res/shaders/texturecolor.vert', 'res/shaders/greyscale.frag');
       //  //CCShaderCache:sharedShaderCache():addProgram(shader, key);        

       //  //program = new cc.GLProgram(); 
       // //program.initWithVertexShaderByteArray(Filter.DEFAULT_VERTEX_SHADER, Filter.SEPIA_FRAGMENT_SHADER); 
       //  program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);        //cocos会做初始化的工作 
       //  program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS); 
       //  program.link(); 
       //  program.updateUniforms(); 
       //  // var degreeLocation = program.getUniformLocationForName("u_degree"); 
       //  // program.setUniformLocationF32(degreeLocation, degree); 
       //  // Filter.programs["sepia"+degree] = program; 

       //  gl.useProgram(program.getProgram()); 
       //  this._bg.shaderProgram = program; 

        // var shader = new cc.GLProgram('res/shaders/texturecolor.vert', 'res/shaders/greyscale.frag');
        // var state = cc.GLProgramState.create(shader);


        // this._bg.setGLProgramState(state);
        
        this.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function(){
            //Shader.grayScale(this._bg);
            var program = cc.shaderCache.getProgram(cc.SHADER_POSITION_TEXTURECOLOR);
            //cc.glUseProgram(program.getProgram());
            program.use();
            this._bg.shaderProgram = program;
        }.bind(this) ,this)));

        //Shader.grayScale(this._bg);
        Shader.sepia(this._bg, 0.5);
    },

    testTryCatch:function(){

        var jsonObj = null;
        var jsonTxt = "{error:400, \"msgname\":\"xxxxx\", \"login\":{\"a\":12, \"b\":100}}";
        //var jsonTxt = "{\"error\":400, \"msgname\":\"xxxxx\", \"login\":{\"a\":12, \"b\":100}}";
        try{ 
            jsonObj = JSON.parse(jsonTxt);
        }
        catch(error){ 
            cc.log("test scene testTryCatch recv JSON.parse  error !!");

            jsonObj = {error:101}; //网络异常弹框
        }
        //无论try 中是否有异常抛出，都会执行finally代码
        finally{ 
            cc.log("test scene  testTryCatch recv try finally");
        }         

        cc.log("test scene xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", jsonObj.error, JSON.stringify(jsonObj));

    },

    testHeroConfig:function(){
        var heroconfig = {};
        heroconfig.aaa_bbb = {x:"nnnnn", y:"dfdfdfdfdfdf"};
        var aaaa_bbb = {x:"mmmmmmm", y:"dfdfmmmmmdfdfdfdf"};

        var pre = "bbb";
        var config = "aaa_"+pre;
        var config1 = eval("aaaa_"+pre);
        cc.log("test scene testHeroConfig1", heroconfig[config].x);
        cc.log("test scene testHeroConfig2", config1.x);

        var ppp  = "jianshi";
        var hero = eval("Hero_"+ppp);

        var h = new hero();
        //h.test();
    },

    testSpineRaptor:function(){
        var size = cc.director.getWinSize();        
        var spineBoy1 = new sp.SkeletonAnimation('res/battle/raptor/raptor.json', 'res/battle/raptor/raptor.atlas');
        spineBoy1.setPosition(cc.p(size.width / 2-250, size.height / 2 - 150));
        spineBoy1.setScale(0.5);
        this.addChild(spineBoy1, 4);
        //spineBoy1.setMix('win', 'attack', 0.2);
        spineBoy1.setAnimation(0, 'walk',   true);
        spineBoy1.addAnimation(1, "gungrab", true);
    },

    testSpine1:function(){
        var size = cc.director.getWinSize();        
        var spineBoy1 = new sp.SkeletonAnimation('res/spine/heianfashi/heianfashi.json', 'res/spine/heianfashi/heianfashi.atlas');
        spineBoy1.setPosition(cc.p(size.width / 2+400, size.height / 2 - 150));
        //spineBoy1.setScale(0.2);
        this.addChild(spineBoy1, 4);

        // spineBoy1.setAnimation(0, "T_attack_1",    false   );
        // spineBoy1.addAnimation(0, "T_attack_2",    false   );
        // spineBoy1.addAnimation(0, "T_skill2",      false    );
         spineBoy1.addAnimation(0, "T_skill2_1",     true    );
         //spineBoy1.addAnimation(0, "T_skill_2",     false    );
        // spineBoy1.addAnimation(0, "skill1",        false    );
        //spineBoy1.addAnimation(0, "skill2",        true    );  


        // var size = cc.director.getWinSize();        
        // var spineBoy1 = new sp.SkeletonAnimation('res/spine/xiunv/xiunv.json', 'res/spine/xiunv/xiunv.atlas');
        // spineBoy1.setPosition(cc.p(size.width / 2-250, size.height / 2 - 150));
        // //spineBoy1.setScale(0.2);
        // this.addChild(spineBoy1, 4);

        // spineBoy1.setAnimation(0, "T_attack_1",    false   );
        // spineBoy1.addAnimation(0, "T_attack_2",    false   );
        // spineBoy1.addAnimation(0, "T_skill2",      false    );
        // spineBoy1.addAnimation(0, "T_skill_1",     false    );
        // spineBoy1.addAnimation(0, "T_skill_2",     false    );
        // spineBoy1.addAnimation(0, "skill1",        false    );
        // spineBoy1.addAnimation(0, "skill2",        false    );       



        // var size = cc.director.getWinSize();        
        // var spineBoy1 = new sp.SkeletonAnimation('res/spine/jianshi/jianshi.json', 'res/spine/jianshi/jianshi.atlas');
        // spineBoy1.setPosition(cc.p(size.width / 2-250, size.height / 2 - 150));
        // //spineBoy1.setScale(0.2);
        // this.addChild(spineBoy1, 4);

        // spineBoy1.setMix('walk', 'jump', 0.2);
        // spineBoy1.setMix('jump', 'run', 0.2);
        //spineBoy1.setMix('win', 'attack', 0.2);
        //spineBoy1.setAnimation(0, 'win',   true);

        //spineBoy1.update(1);
        //spineBoy1.addAnimation(0, "skill2",   false);
        //spineBoy1.addAnimation(0, "attack",   false, 2);
        //spineBoy1.addAnimation(0, "unattack", true,  5);
        //spineBoy1.addAnimation(1, "attack",     true   );
        //spineBoy1.addAnimation(0, "get up",   true,  5);
        //spineBoy1.addAnimation(1, "skill",    false, 3);
        // spineBoy1.addAnimation(0, "skill",   true,  5);
        // spineBoy1.addAnimation(0, "win",      true,  5);


        var replay = new cc.MenuItemImage(res.battle_bloodgray_png, res.battle_bloodgray_png, function(){
            spineBoy1.setAnimation(0, "attack", false);            
        }, this);

        var btn1 = new cc.MenuItemImage(res.battle_bloodgray_png, res.battle_bloodgray_png, function(){
            spineBoy1.addAnimation(0, "skill", false);           
        }, this);

        btn1.setPosition(cc.p(50, 200));

        var btn4 = new cc.MenuItemImage(res.battle_bloodgray_png, res.battle_bloodgray_png, function(){

            spineBoy1.setAnimation(0, "skill2",   false); 
            spineBoy1.update(1.5);                    
        }, this);

        btn4.setPosition(cc.p(50, 300));        

        var btn2 = new cc.MenuItemImage(res.battle_bloodgray_png, res.battle_bloodgray_png, function(){
            spineBoy1.setAnimation(1, "skill2", false);           
        }, this);
        btn2.setPosition(cc.p(50, 100));

        var btn3 = new cc.MenuItemImage(res.battle_bloodgray_png, res.battle_bloodgray_png, function(){
            spineBoy1.setAnimation(2, "unattack", true);           
        }, this);
        btn3.setPosition(cc.p(0, 150));

        var menu = new cc.Menu(replay, btn1, btn2, btn3, btn4);
        this.addChild(menu, 20000);
        menu.setPosition(cc.p(size.width/2, size.height/2-200));        

    },

    tesWebSocket:function(){
        var self = this;

         this._wsiSendText = new WebSocket("ws://192.168.0.199:8888");
         this._wsiSendText.onopen = function(evt) {
             //self._sendTextStatus.setString("Send Text WS was opened.");
             cc.log("test scene sendtext ok");
             self._wsiSendText.send("hello websocket");
         };

         this._wsiSendText.onmessage = function(evt) {
             //self._sendTextTimes++;
             var textStr = "response text msg: "+evt.data+", ";//+self._sendTextTimes;
             cc.log(textStr);

             //self._sendTextStatus.setString(textStr);
         };

         this._wsiSendText.onerror = function(evt) {
             cc.log("sendText Error was fired");
         };

         this._wsiSendText.onclose = function(evt) {
             cc.log("_wsiSendText websocket instance closed.");
             self._wsiSendText = null;
         }


        cc.log("gggggggggggggggggggggggggggggggggggggggggggggggggg");
//        this._wsiSendBinary = new WebSocket("ws://192.168.0.199:8888");
//        this._wsiSendBinary.binaryType = "arraybuffer";
//        this._wsiSendBinary.onopen = function(evt) {
//            //self._sendBinaryStatus.setString("Send Binary WS was opened.");
//            cc.log("send binary open ok");
//
//            //this._sendBinaryStatus.setString("Send Binary WS is waiting...");
//            var strData = "Hello WebSocket\0.";
//            //var binary = this._stringConvertToArray(buf);
//
//            var arrData = new Uint8Array(strData.length+2);
//            var len = strData.length;
//            arrData[0] = (len>>8)&0xff;
//            arrData[1] = len&0xff;
//
//            cc.log("test scene xxxxxxx", arrData[0]);
//            cc.log("test scene xxxxxxx", arrData[1]);
//
//            for (var i = 0; i < strData.length; i++) {
//                arrData[i+2] = strData.charCodeAt(i);
//            }
//
//            self._wsiSendBinary.send(arrData.buffer);
//
//            cc.log("test scene len, data",len, JSON.stringify(arrData));
//        };
//
//        this._wsiSendBinary.onmessage = function(evt) {
//            //self._sendBinaryTimes++;
//            var binary = new Uint8Array(evt.data);
//            var binaryStr = "response bin msg: ";
//
//            var str = "";
//            for (var i = 0; i < binary.length; i++) {
//                if (binary[i] == 0)
//                {
//                    str += "\'\\0\'";
//                }
//                else
//                {
//                    var hexChar = "0x" + binary[i].toString("16").toUpperCase();
//                    str += String.fromCharCode(hexChar);
//                }
//            }
//
//            binaryStr += str + ", ";// + self._sendBinaryTimes;
//            cc.log(binaryStr);
//            //self._sendBinaryStatus.setString(binaryStr);
//        };
//
//        this._wsiSendBinary.onerror = function(evt) {
//            cc.log("sendBinary Error was fired");
//        };
//
//        this._wsiSendBinary.onclose = function(evt) {
//            cc.log("_wsiSendBinary websocket instance closed.");
//            self._wsiSendBinary = null;
//        };


    },

    testSocketIO:function(){

        //create a client by using this static method, url does not need to contain the protocol
        var sioclient = SocketIO.connect("192.168.0.199:8888", {"force new connection" : true});

        //if you need to track multiple sockets it is best to store them with tags in your own array for now
        sioclient.tag = "TestClient";

        //attaching the status label to the socketio client
        //this is only necessary in javascript due to scope within shared event handlers,
        //as 'this' will refer to the socketio client
        
        //sioclient.statusLabel = this._sioClientStatus;

        //register event callbacks
        //this is an example of a handler declared inline
        sioclient.on("connect", function() {
            var msg = sioclient.tag + " Connected!";
            //this.statusLabel.setString(msg);
            cc.log(msg);
            cc.log("test scene testSocket ..................");
            sioclient.send(msg);
        });

        // //example of a handler that is shared between multiple clients
        // sioclient.on("message", this.message);

        // sioclient.on("echotest", function(data) {
        //     cc.log("echotest 'on' callback fired!");
        //     var msg = this.tag + " says 'echotest' with data: " + data;
        //     this.statusLabel.setString(msg);
        //     cc.log(msg);
        // });

        // sioclient.on("testevent", this.testevent);

        // sioclient.on("disconnect", this.disconnection);

        // this._sioClient = sioclient; 


     },

    testDate:function(){

        var date = new Date();

        cc.log("test scene testDate ", date.getFullYear(), date.getMonth()+1, date.getDate(), date.getDay(), date.getHours(), date.getMinutes(), date.getSeconds());    
    },

    testAry:function(){

        var ary = [];
        ary[1] = null;
        ary[5] = undefined;
        ary[2] = null;

        delete ary[2];
        for (var i in ary) {
            //if (ary[i])
                cc.log("test scene  testAry", i, ary[i], ary.length);
        }

        for (var i=0; i<ary.length; i++) {
            cc.log("test scene  testAry", i, ary[i], ary.length);
        }  

        cc.log("test scene, testAry  join 0 Ary",  (new Array(8 + 1)).join('0')); //00000000
        cc.log("test scene, testAry  join 1 Ary",  (new Array(8 + 1)).join('1')); //11111111
        cc.log("test scene, testAry  join 0 Ary + num",  (new Array(8 + 1)).join('0') + 12345); //0000000012345

        cc.log("test scene, testAry  join 0 Ary + num slice",  ((new Array(8 + 1)).join('1') + 12345).slice(-2));

        var joinAry = [];
        joinAry[1] = "tyu";
        joinAry[2] = 99;
        joinAry["hhh"] = "kl";
        joinAry[3] = "78";
        joinAry[8] = "nmmm";
        cc.log("test scene, testAry  joinjoin",  joinAry.join('0'));


        //('' + num).length < length ? ((new Array(length + 1)).join('0') + num).slice(-length) : '' + num;


    },

    onMenuTest:function(){
        TipDlg.getInstance().tips("远在天边在天国天干轱在天国感恩一礓车克罗地亚压下历来"); 
        TipDlg.getInstance().tips("ssssssssssssssssssssssssssss");
        TipDlg.getInstance().tips("酑口感二 吐地一五五朱已"); 
        //this.testTipDlg();   
        //
        
    },

    testTipDlg:function(){

        this.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function(){

            cc.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            //TipDlg.getInstance().tips("十三雨辰");       

            var runScene = cc.director.getRunningScene().getChildren();
            for(var i in runScene){
                cc.log("uuuuuuuuuuuuu", runScene[i].getTag(), runScene[i].getLocalZOrder());

            }   

        }),this));

        //???????????????????会改变zorder

    },

    testAnchorPoint:function(){
        var bg = new cc.Sprite(res.battle_bg_jpg);

        var node = cc.Node();
        this._bg.addChild(node);
        cc.log("test scene anchor x,x", node.getAnchorPoint().x, bg.getAnchorPoint().x);
        this._bg.addChild(bg);
    },

    testHeroDataAry:function(){

        var heroAry = [];
        var heroStaticData  = cc.loader.getRes(res.hero_data_json);
        var heroDynamicData = [{id:1111,mid:12222,name:"sgdggfgffffff"},{id:1112,mid:12223,name:"sgdggfgffffff"}];

        for(var key in heroDynamicData){

            var hero_unit = new HeroUnit();
            //var jsonObj = this.getJsonObj();
            fb.extend(hero_unit, heroDynamicData[key], true);//合并两个对象, 并且覆盖原有值  

            cc.log("testHeroDataAry json111", JSON.stringify(hero_unit));
            fb.extend(hero_unit, heroStaticData[hero_unit.mid], true);//合并两个对象, 并且覆盖原有值
            cc.log("testHeroDataAry json222", hero_unit.mid, JSON.stringify(heroStaticData[hero_unit.mid]));
            cc.log("testHeroDataAry json333", JSON.stringify(hero_unit));

            heroAry[hero_unit.id] = hero_unit;
        }

        cc.log("testHeroDataAry json11", JSON.stringify(heroAry[1111]), heroAry.hasOwnProperty("1111"), heroAry.hasOwnProperty(3454536));

        for(var key in heroAry){
            cc.log("testHeroDataAry 4444", key);
        }

        delete heroAry[1111];

        cc.log("testHeroDataAry json22", JSON.stringify(heroAry[1111]), heroAry.hasOwnProperty("1111"), heroAry.hasOwnProperty(3454536));
        cc.log("testHeroDataAry json33", JSON.stringify(heroAry[1112]), heroAry.hasOwnProperty("1112"), heroAry.hasOwnProperty(3454536));

        for(var key in heroAry){
            cc.log("testHeroDataAry 5555", key);
        }

    },

    testResponseProto:function(){

        // var json = {
        //                 player:{id:2020,name:"ccc"},
        //                 hero:[{id:1111,name:"ddd"}, {id:22222,name:"qqqq"}],
        //            };

        var UUUUID = "uid";
        
        json = cc.loader.getRes("res/data/player.json");   

        cc.log("testResponseProto have player, have hero, have fushi", json.hasOwnProperty("siteuid"), json.hasOwnProperty(UUUUID), json.hasOwnProperty("fushi"));   

        if (json.hasOwnProperty(UUUUID)) {
            var uid = json[UUUUID];
            cc.log("testResponseProto UUUUID", JSON.stringify(uid));
        }
    },


    testLocalStorage:function(){

        var ls    = cc.sys.localStorage;
        var uid   = ls.getItem("uid");
        var skey  = ls.getItem("skey");
        var mtkey = ls.getItem("mtkey");  

        cc.log(uid);

        ls.setItem("uid", 1000);
        var xxx = ls.getItem("uid");
        cc.log("uid  ty:", xxx, typeof(xxx));
        ls.setItem("skey", "cxvxbbdwewrw2323");
        var bbb = ls.getItem("skey");
        cc.log("skey, ty:", bbb, typeof(bbb));   


    },


    testHttpRequest:function(){

        var ary = [];
        ary["xxx"] = 899;
        ary["vvv"] = "otryrtyirtjdfg";       
        var req = HttpRequest.getInstance();
        cc.log("testHttpRequest req", req);
        // req.send(ary, function(xx){
        //     cc.log(xx);
        // });
         
        //req.send(ary);
        req.send(ary, this.cbHttpRequest);
    },    

    cbHttpRequest:function(jsonObj){

        cc.log("test_scene cbHttpRequest xxxxx", JSON.stringify(jsonObj));
    },

    testHttpJson:function(){

        // var json = cc.loader.loadJson("http://www.acchappy.com/test.php", function(err, json){

        //     cc.log("testHttpJson :", JSON.stringify(json));

        // });     

        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", "http://www.acchappy.com/");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207))  //有可能会有其他的网络状态，留着以后让候哥改
            {
                var httpStatus = xhr.responseText;
                var res = JSON.parse(httpStatus);
                cc.log("testHttpJson...:  ", res.b);
            } else {
                cc.log("http error status:, readyState:", xhr.status, xhr.readyState);
            }
        };

        cc.log("testHttpJson :", xhr);
        xhr.send("skey=xxx&mtkey=xxx");  

    },

    testJson:function(){

        var json = cc.loader.getRes("res/data/player.json");     
        cc.log("test_scene", JSON.stringify(json));
        //cc.log("test_scene", json.init_cfg.width);
        //cc.log("test_scene", json.simulator_screen_size[0].width);

       var data = PlayerData.getInstance();

       cc.log("test_scene data...", JSON.stringify(data));
       cc.log("test_scene data...id", data.id);
       cc.log("test_scene data..._xxxxx", data._xxxxx);
       //cc.log("test_scene data... width", data.simulator_screen_size[0].width);

    },

    spineTest:function(){
        var size = cc.director.getWinSize();
        // spine1
        var spineBoy1 = new sp.SkeletonAnimation('res/battle/spine/spineboy.json', 'res/battle/spine/spineboy.atlas');
        spineBoy1.setPosition(cc.p(size.width / 2-250, size.height / 2 - 150));
        spineBoy1.setScale(0.2);
        this.addChild(spineBoy1, 4);
//        spineBoy1.setMix('walk', 'jump', 0.2);
//        spineBoy1.setMix('jump', 'run', 0.2);
//        spineBoy1.setAnimation(0, 'idle', true);
//        spineBoy1.addAnimation(0, "run", true);
//        spineBoy1.addAnimation(0, "jump", false, 3);
//        spineBoy1.addAnimation(0, "walk", true);

        spineBoy1.setMix('walk', 'jump', 0.2);
        spineBoy1.setMix('jump', 'run',  0.2);
//        spineBoy1.setAnimation(0, 'walk', true);
//        spineBoy1.addAnimation(0, "jump", true);
//
//        this._spine = spineBoy1;
//        // this.runAction(cc.sequence(cc.delayTime(0.9), cc.callFunc(function(){
//        //     this._spine.setAnimation(0, "run", true);
//        // },this)));
//        spineBoy1.setAnimation(0, "run", true);


       //spineBoy1.setAnimation(0, 'idle', true);
       spineBoy1.addAnimation(0, "run", true);
       spineBoy1.addAnimation(0, "idle", true);
       //spineBoy1.setAnimation(0, "jump", true);



//        // spine2
//        var spineBoy2 = new sp.SkeletonAnimation('res/spine/spineboy.json', 'res/spine/spineboy.atlas');
//        spineBoy2.setPosition(cc.p(size.width / 2-200, size.height / 2 ));
//        spineBoy2.setScale(0.2);
//        this.addChild(spineBoy2, 4);
//        spineBoy2.setAnimation(0, 'run', true);
//
//        // spine3
//        var spineBoy3 = new sp.SkeletonAnimation('res/spine/spineboy.json', 'res/spine/spineboy.atlas');
//        spineBoy3.setPosition(cc.p(size.width / 2-250, size.height / 2-150 ));
//        spineBoy3.setScale(0.2);
//        this.addChild(spineBoy3, 4);
//        spineBoy3.setAnimation(0, 'jump', true);
//
//
//        // spine4
//        var spine4 = new sp.SkeletonAnimation('res/spine/raptor.json', 'res/spine/raptor.atlas');
//        spine4.setPosition(cc.p(size.width / 2+200, size.height / 2 ));
//
//        spine4.setScaleX(-0.2);
//        spine4.setScaleY(0.2);
//        this.addChild(spine4, 4);
//        spine4.setAnimation(0, 'walk', true);
//
//        // spine5
//        var spine5 = new sp.SkeletonAnimation('res/spine/goblins-ffd.json', 'res/spine/goblins-ffd.atlas');
//        spine5.setPosition(cc.p(size.width / 2+250, size.height / 2-150 ));
//        spine5.setScaleX(-0.4);
//        spine5.setScaleY(0.4);
//        this.addChild(spine5, 4);
//        spine5.setAnimation(0, 'walk', true);
//        spine5.setSkin('goblin');
//
//        // spine6
//        var spine6 = new sp.SkeletonAnimation('res/spine/spineboy.json', 'res/spine/spineboy.atlas');
//        spine6.setPosition(cc.p(size.width / 2+250, size.height / 2 + 150));
//        spine6.setScaleX(-0.2);
//        spine6.setScaleY(0.2);
//        this.addChild(spine6, 4);
//        spine6.setAnimation(0, 'walk', true);

    },

    ccsTest:function(){
        var size = cc.director.getWinSize();

        //var mainscene = ccs.load("res/SceneTest.json");
        var mainscene = ccs.load("res/test/Layer3.json");

        //通过调整panel的setContentSize大小，设置panel上的控件固定与拉伸，能动态调整控件的相对位置来达到适配效果
        mainscene.node.setAnchorPoint(cc.p(0.5, 0.5));
        mainscene.node.setPosition(cc.p((size.width)/2, (size.height)/2));
        mainscene.node.setContentSize(cc.size(size.width, size.height));
        ccui.helper.doLayout(mainscene.node);
        this.addChild(mainscene.node);
        /////////////////////////////////


        var conSize = mainscene.node.getContentSize();
        cc.log("home_scene xx", conSize.width, conSize.height);

        //mainscene.node.setScaleX(0.5);



       // var lay1 = ccs.load("res/Layer1.json");
       // this.addChild(lay1.node, 1);
       // var conSize1 = lay1.node.getContentSize();
       // lay1.node.setPosition(cc.p(0, (size.height-conSize1.height)));

       // var lay2 = ccs.load("res/Layer1.json");
       // this.addChild(lay2.node, 2);
       // var conSize2 = lay2.node.getContentSize();
       // lay2.node.setPosition(cc.p((size.width-conSize2.width), (size.height-conSize2.height)));

    },

    ccsTest1:function(){
        var size = cc.director.getWinSize();

        //var mainscene = ccs.load("res/SceneTest.json");
        var mainscene = ccs.load("res/ui/MainScene.json");

        //通过调整panel的setContentSize大小，设置panel上的控件固定与拉伸，能动态调整控件的相对位置来达到适配效果
        mainscene.node.setAnchorPoint(cc.p(0.5, 0.5));
        mainscene.node.setPosition(cc.p((size.width)/2, (size.height)/2));
        mainscene.node.setContentSize(cc.size(size.width, size.height));
        ccui.helper.doLayout(mainscene.node);
        this.addChild(mainscene.node);
        /////////////////////////////////

        var conSize = mainscene.node.getContentSize();
        cc.log("home_scene xx", conSize.width, conSize.height);


    },

});

var TestScene = cc.Scene.extend({
    _mapLayer:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function(){

        this._super();
        this._mapLayer = new TestMapLayer();
        this.addChild(this._mapLayer, 0, 10000);

        return true;
    }

});