/**
 * Created by fable on 15/11/02.
 * @Author fable
 * @desc   hero config 
 *
 *
 * 修女，所有技能都是加血的，所以不会有倒地，死亡，重生等
 * 		 小招， 单体加血
 * 		 大招， 全体加血
**/

///

/////////////////////////////英雄可配置参数 start ???????//////////////////////////////////////////////////
//根据美术提供的每个动画资源进行配置 ?????
var SpineConfig_xiunv =
{
//	hid                 : 1001,
	sp_name             : "xiunv",
	sp_type             : "far",   //near 近战, far远程	
	sp_scale            : cc.p(0.90,   0.90), //缩放系数
	attack_box          : cc.size(80,   144),   //攻击范围，使用时要乘缩放系数
	attacked_box        : cc.size(80,   144),  //受击范围，使用时要乘缩放系数
	effctCacheNum       : 5,      //????,因为大招的特效是做在一个spine里面，故如果没个人身上加一个特效，就会要创建5个对象，0不用创建
								  //js没有注册createWithData(),创建对象IO很耗时，故在一开始加载的时候，创建一个大招需要特效对象列表,根据大招是否有全体攻击，及受击特效来配置,优化战斗卡帧现象

	small_skill_spec    : true,      //?????   //true 小技能攻击，由下面的Hero_xxx提供，一定要实现下面的smallSkillAttack, false,则用AttackProcess的公共处理
	big_skill_spec      : true,      //?????   //true 大技能攻击，由下面的Hero_xxx提供，一定要实现下面的bigSkillAttack, false,则用AttackProcess的公共处理
}
/////////////////////////////英雄可配置参数 end//////////////////////////////////////////////////


var Hero_xiunv = HeroSpine.extend({

	_param  : {},

	ctor:function(spineName, isLeft, effectCache){
		this._super(spineName, SpineConfig_xiunv, isLeft, effectCache);

		this._param  = {};

		return true;
	},

	smallSkillSpecAttack:function(attHero, defHero, att, def, runToPos, roundEndCallback){

		cc.assert((att.range != 100 && att.type == BATTLE_ATT_TYPE_ADDHP), "Hero_xiunv smallSkill is single addblood!!!");   

		this._param                    = {};
		this._param.attHero            = attHero;
		this._param.defHero            = defHero;
		this._param.att                = att;
		this._param.def                = def;
		this._param.runToPos           = runToPos;

		this.skillAttacked("init", this._param.attHero, this._param.defHero, this._param.att, this._param.def, null, 8);
		attHero.smallSkill(defHero, att, def, null, function(){				
			//attHero.runBack(null, 0);
			//att.roundEnd();
		}.bind(this));	
	},

	smallSkillEventCallback:function(traceIndex, event){
        //cc.log( traceIndex + " event: %s, %d, %f, %s",event.data.name, event.intValue, event.floatValue, event.stringValue);
       	if(event.stringValue == "start"){
       		// var attSpine     = this._param.attHero.getHeroSpine();
         //    var heroSpine    = HeroSpine.createInstance(attSpine.getConfig().sp_name, this._param.attHero.getIsLeft());
         //    var heroSpine1   = HeroSpine.createInstance(attSpine.getConfig().sp_name, this._param.attHero.getIsLeft());

         //    this._param.defHero.addChild(heroSpine1, HERO_ZORDER_EFFECT_BODY);             
         //    this._param.defHero.addChild(heroSpine,  HERO_ZORDER_EFFECT_DIBAN); 

         //    heroSpine1.setAnimation("T_skill1_1", false, function(){
         //        heroSpine1.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
         //            heroSpine1.removeFromParent();
         //        }.bind(this), this))); 
         //    	//heroSpine1.removeFromParent(); 在spine帧事件回调里直接删除会死，一定要延时删除，?????              	
         //    });

         //    heroSpine.setAnimation("T_skill1_2", false, function(){
         //        heroSpine.runAction(cc.sequence(cc.delayTime(0.1), cc.callFunc(function(){
         //            heroSpine.removeFromParent();
         //        }.bind(this), this)));             	
         //    	//heroSpine.removeFromParent();在spine帧事件回调里直接删除会死，一定要延时删除，?????      
         //    });  
       		var def = this._param.def;    
       		var att = this._param.att;    
        	///////////////////////////////////////ooooooooooooooooooooo/////////////////////////////////////////
       		if(def.smallSkillHeroSpine == null){
       			var att                  = this._param.att;
       			var attSpine             = this._param.attHero.getHeroSpine();		       			
	            def.smallSkillHeroSpine  = this.getEffectHeroSpine(0);//HeroSpine.createInstance(attSpine.getConfig().sp_name, this._param.attHero.getIsLeft());      		          
	            def.smallSkillHeroSpine1 = this.getEffectHeroSpine(1);//HeroSpine.createInstance(attSpine.getConfig().sp_name, this._param.attHero.getIsLeft());      		          
	            this._param.defHero.addChild(def.smallSkillHeroSpine1, HERO_ZORDER_EFFECT_BODY);             
	            this._param.defHero.addChild(def.smallSkillHeroSpine,  HERO_ZORDER_EFFECT_DIBAN); 

	            def.isSmallSkillHeroSpineCompleteOk  = 0;
	            att.isSmallSkillHeroSpineCompleteNum = 0;		            
       		}
       		def.isSmallSkillHeroSpineCompleteOk  += 1;
       		if(def.isSmallSkillHeroSpineCompleteOk == 2){
	            def.smallSkillHeroSpine1.setAnimation("T_skill1_1", false, function(sender){
	                sender.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function(){
	                    sender.removeFromParent();
	                    att.isSmallSkillHeroSpineCompleteNum += 1;
	                    if(att.isSmallSkillHeroSpineCompleteNum == 2)
       						att.roundEnd();
	                }.bind(this), this))); 
	            }.bind(this)); 

	            def.smallSkillHeroSpine.setAnimation("T_skill1_2", false, function(sender){
	                sender.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function(){
	                    sender.removeFromParent();
	                    att.isSmallSkillHeroSpineCompleteNum += 1;
	                    if(att.isSmallSkillHeroSpineCompleteNum == 2)
       						att.roundEnd();
	                }.bind(this), this))); 
	            }.bind(this)); 	            		       			
       		}
        	else{
	            def.smallSkillHeroSpine.setAnimation("T_skill1_2", false); 	
	            def.smallSkillHeroSpine1.setAnimation("T_skill1_1", false); 	
        	}
        	///////////////////////////////////////ooooooooooooooooooooo/////////////////////////////////////////
       	}
		else if(event.stringValue == "addblood"){
			//变绿
			this._param.defHero.getHeroSpine().setColorSoon(cc.color.GREEN, 3*this.getFps());     	
       		this.skillAttacked("attacked", this._param.attHero, this._param.defHero, this._param.att, this._param.def);
		}
	},

	bigSkillSpecAttack:function(attHero, defHeroAry, att, defAry, runToPos, roundEndCallback){

		cc.assert((att.range == 100 && att.type == BATTLE_ATT_TYPE_ADDHP), "Hero_xiunv bigSkill is error!!!");  //修女的大招是全体加血

		this._param                  = {};
		this._param.attHero          = attHero;
		this._param.defHeroAry       = defHeroAry;
		this._param.defHero          = null;		
		this._param.att              = att;
		this._param.def              = null;
		this._param.defAry           = defAry;
		this._param.runToPos         = runToPos;
		//this._param.roundEndCallback = roundEndCallback;
		//
   		for (var i in this._param.defAry) {
   			//cc.log("xiunv xxxxxxxxxxx");
   			var def = this._param.defAry[i];
   			if(def.seat == this._param.att.seat)
   				this.skillAttacked("init", this._param.attHero, this._param.defHeroAry[def.seat], this._param.att, def, null, 7);//4
   			else
   				this.skillAttacked("init", this._param.attHero, this._param.defHeroAry[def.seat], this._param.att, def, null, 7);//3     			          			
   		}

		// //跑向指定地点	
		// attHero.runTo(runToPos, function(){
		// 	attHero.bigSkill(defHeroAry, att, defAry, null, function(){	
		// 		attHero.runBack(null, 0);					
		// 	}.bind(this));				
		// }.bind(this), HERO_RUN_SPEED_ATT);
		//原地施放，加血大招
		attHero.bigSkill(defHeroAry, att, defAry, null, function(){	
			attHero.runBack(null, 0);					
		}.bind(this));	
	},

	bigSkillEventCallback:function(traceIndex, event){
        //cc.log( traceIndex + " event: %s, %d, %f, %s",event.data.name, event.intValue, event.floatValue, event.stringValue);
       	//2 个start
       	if(event.stringValue == "start"){

       		var index = 0;
       		for (var i in this._param.defAry) {
       			var att          = this._param.att;
       			var def          = this._param.defAry[i];
       			var defHero      = this._param.defHeroAry[def.seat];   

       			if(def.seat != this._param.att.seat) 
       			{

		       		if(def.bigSkillHeroSpine == null){

		       			var attSpine = this._param.attHero.getHeroSpine();
		       			cc.log("xiunv, bigSkillEventCallback 11111", new Date().getTime());		       			
			            def.bigSkillHeroSpine = this.getEffectHeroSpine(index);//HeroSpine.createInstance(attSpine.getConfig().sp_name, this._param.attHero.getIsLeft());      		          
		       			cc.log("xiunv, bigSkillEventCallback 22222", new Date().getTime());					            
			            defHero.addChild(def.bigSkillHeroSpine,  HERO_ZORDER_EFFECT_BODY); 			            	
		            	def.bigSkillHeroSpine.setAnimation("T_skill2", false);	

		            	index++;
			            def.isBigSkillHeroSpineCompleteOk  = 0;
			            att.isBigSkillHeroSpineCompleteNum = 0;		            
		       		}

		       		def.isBigSkillHeroSpineCompleteOk  += 1;
		       		if(def.isBigSkillHeroSpineCompleteOk == 2){
			            def.bigSkillHeroSpine.setAnimation("T_skill2", false, function(sender){
			            	//?????必须用sender 不能用 def.bigSkillHeroSpine,不然，在这里永远会用最后一个
			            	//cc.log("xiunv start tttttttt", this._bigSkillHeroSpine[def.seat], def.seat, i);
			                sender.runAction(cc.sequence(cc.delayTime(0.01), cc.callFunc(function(){
			                    sender.removeFromParent();			                	
		       					att.isBigSkillHeroSpineCompleteNum += 1;
		       					cc.log("xiunv, bigSkillHeroSpine ", i, def.seat, att.isBigSkillHeroSpineCompleteNum, this._param.defAry.length);
		       					if(att.isBigSkillHeroSpineCompleteNum == this._param.defAry.length - 1)
		       						att.roundEnd();
			                }.bind(this), this))); 
			            	//this._bigSkillHeroSpine[def.seat].removeFromParent(); 在spine帧事件回调里直接删除会死，一定要延时删除，?????  
			            }.bind(this)); 		       			
		       		}
		        	// else
			        //     def.bigSkillHeroSpine.setAnimation("T_skill2", false); 		        		
       			} 			
       		}
       	}
       	// 4 addblood
       	else if(event.stringValue == "addblood"){ //myself
       		for (var i in this._param.defAry) {
       			var def = this._param.defAry[i];
       			//if(def.seat == this._param.att.seat)
       			{
       				var defHero = this._param.defHeroAry[def.seat];
					defHero.getHeroSpine().setColorSoon(cc.color.GREEN, 3*this.getFps());
       				this.skillAttacked("attacked", this._param.attHero, this._param.defHeroAry[def.seat], this._param.att, def);  
       				//break;        			
       			}
       		}	 				  
       	}
       	// 3 addblood
       	else if(event.stringValue == "addblood_m"){ //other
       		for (var i in this._param.defAry) {
       			var def = this._param.defAry[i];
					//变绿
       				var defHero = this._param.defHeroAry[def.seat];
					defHero.getHeroSpine().setColorSoon(cc.color.GREEN, 3*this.getFps());     			
       			//if(def.seat != this._param.att.seat)
       				this.skillAttacked("attacked", this._param.attHero, this._param.defHeroAry[def.seat], this._param.att, def);          			
       		}	
       	}	       			
	}
});
