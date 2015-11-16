/**
 * Created by fable on 15/10/26.
 * @Author fable
 * @desc   hero spine 继承自 ASpine
 *
 *         管理每个英雄spine的一些公共接口及属性，包括一些技能施放的相关接口
 *         
 *
**/

var HeroSpine = ASpine.extend({

	_config             : null,
    _skillAttacked      : [],      
    _effectHeroSpineAry : [], //???? HeroSpine对象池,优化战斗卡帧现象
	_needEffectCache    : false,
    ctor:function(spineName, config, isLeft, effectCache){
		this._super(spineName, config.sp_scale, isLeft);

        this._config             = config;
        this._skillAttacked      = [],  
        this._effectHeroSpineAry = [];
        this._needEffectCache    = effectCache;
        
        //????如果在外面调用了，在这里就不需要调用了
        this.createEffectHeroSpineCache();
	},

    getConfig:function(){   
        return this._config;
    },

    createEffectHeroSpineCache:function(cbCompleteOne){
        //?????, js没有注册createWithData(),所以在这里创建一个HeroSpine对象池,优化战斗卡帧现象
        if(this._needEffectCache == true && this._config.effctCacheNum != null && this._config.effctCacheNum > 0){
            for (var i=0; i<this._config.effctCacheNum; i++) {
                cc.log("heroSpine node  _effectHeroSpineAry retain", this._config.sp_name, this._isLeft);
                var heroSpine = HeroSpine.createInstance(this._config.sp_name, this._isLeft, false);
                heroSpine.retain();
                // heroSpine.cleanup = function(){
                //     
                //     cc.log("heroSpine node  _effectHeroSpineAry cleanup", this._config.sp_name, this._isLeft);
                // };
                this._effectHeroSpineAry.push(heroSpine);

                //??????方便loading资源时，回调界面更新进度
                if(cbCompleteOne)
                    cbCompleteOne();
            }  
            //节点删除的时候，清理HeroSpine对象池
            this.setOnExitCallback(function(){
                for (var i=0; i<this._effectHeroSpineAry.length; i++) {
                    var heroSpine = this._effectHeroSpineAry[i];
                    //this._effectHeroSpineAry.pop();
                    cc.log("heroSpine node OnExitCallback _effectHeroSpineAry release", i, this._config.sp_name, heroSpine._isLeft);                    
                    heroSpine.release();
                }   
            }.bind(this));   
        }         
    },

    getEffectHeroSpine:function(index){
        var heroSpine = null;
        if(index >= 0 && index < this._effectHeroSpineAry.length){
            heroSpine = this._effectHeroSpineAry[index];
            heroSpine.setPosition(cc.p(0, 0));    //????, 要还原前面一个特效的设置过的坐标信息什么的，不然会影响下一个特效
        }
        else
            heroSpine = HeroSpine.createInstance(this._config.sp_name, this._isLeft, false);            

        return heroSpine;
    },

	getScalePos:function(pos, isUseLeft){
        var p = cc.p(pos.x, pos.y);

        if(isUseLeft == true){
            if(this._isLeft)
                p.x =  p.x * this.getConfig().sp_scale.x;
            else
                p.x = -p.x * this.getConfig().sp_scale.x;
            p.y = p.y * this.getConfig().sp_scale.y;    
        }
        else{
            p.x = p.x * this.getConfig().sp_scale.x;
            p.y = p.y * this.getConfig().sp_scale.y; 
        }

		return p;
	},

    getScaleSize:function(size){
        var ss    = cc.size(size.width, size.height);
        ss.width  = ss.width  * this.getConfig().sp_scale.x;
        ss.height = ss.height * this.getConfig().sp_scale.y;    

        return ss;
    },

    getFarBulletBeginPos:function(){
        var pos = cc.p(0, this.getConfig().attack_box.height / 2 * this.getConfig().sp_scale.y);                 
        return pos;
    },

    getFarBulletEndPos:function(xDis){
        var pos = cc.p(0, 0);  
        if(this._isLeft)
            pos.x = -xDis;  
        else
            pos.x = xDis;

        pos.y = this.getConfig().attacked_box.height / 2 * this.getConfig().sp_scale.y;
        return pos;
    },

    getFarBulletHitPos:function(){
        var pos = cc.p(0, this.getConfig().attacked_box.height / 2 * this.getConfig().sp_scale.y);
        return pos;
    },

    //技能造成的分段连续受击及伤害
    skillAttacked:function(status, attHero, defHero, att, def, startFrameForAttackedAni, attackedNum, rateAry){
        
        var i = def.seat;
        if(status == "init"){
            cc.log("hero jianshi skillAttacked xxxxxxxxxxxinit ", def.drop, def.blood);
            //def.drop < 0 减血， 大于0 加血
            this._skillAttacked[i]           = {};
            this._skillAttacked[i].rate      = rateAry;//
            this._skillAttacked[i].num       = attackedNum;//
            this._skillAttacked[i].cur_index = 0;
            this._skillAttacked[i].cur_drop  = def.drop / this._skillAttacked[i].num;   
            this._skillAttacked[i].cur_blood = defHero.getCurLife();//this._param.def.blood - this._param.def.drop;

            if(rateAry)
                this._skillAttacked[i].commAttacked_drop  = rateAry[attackedNum - 1] / 100 * def.drop; //最后一次的伤害
            else
                this._skillAttacked[i].commAttacked_drop  = def.drop / attackedNum; //最后一次的伤害
            //如果每次伤害的值少于1，让其为1 ?????
            if(def.drop <= 0 && this._skillAttacked[i].commAttacked_drop >= -1)  
                this._skillAttacked[i].commAttacked_drop = -1;
            else if(def.drop > 0 && this._skillAttacked[i].commAttacked_drop <= 1)
                this._skillAttacked[i].commAttacked_drop = 1;
            this._skillAttacked[i].commAttacked_blood     = def.blood; //最后一次的血量

            if(rateAry)
            {
                var total = 0;
                for(var i=0; i<rateAry.length; i++)
                    total += rateAry[i];
                cc.log("hero jianshi skillAttacked xxxxxxxxxxxinit rateAry total == 100 ", total);              
            }
        }
        else if(status == "attacked"){

            this._skillAttacked[i].cur_index = this._skillAttacked[i].cur_index + 1;
            var cur_drop = this._skillAttacked[i].cur_drop;
            if(this._skillAttacked[i].rate)
                cur_drop = this._skillAttacked[i].rate[this._skillAttacked[i].cur_index - 1] / 100 * def.drop;
            //如果每次伤害的值少于1，让其为1 ?????
            if(def.drop <= 0 && cur_drop >= -1)  
                cur_drop = -1;
            else if(def.drop > 0 && cur_drop <= 1)
                cur_drop = 1;

            this._skillAttacked[i].cur_blood = this._skillAttacked[i].cur_blood + cur_drop;
            //cc.log("hero jianshi skillAttacked xxxxxxxxxx11 start",this._skillAttacked[i].cur_index, this._skillAttacked[i].all_drop, cur_drop, this._skillAttacked[i].cur_blood, this._param.def.blood);
            var def_   = {};
            fb.extend(def_, def, true); //一定要这样，不能直接引用?????
            def_.drop  = cur_drop;
            def_.blood = this._skillAttacked[i].cur_blood;
            def_.dead  = false; //连续受击不会有死亡

            var bPlayAttackedAni = false;
            //因为是回血， 不需要播放受击动画
            if(startFrameForAttackedAni)
                bPlayAttackedAni = true;
            
            defHero.continueAttacked(attHero, att, def_, bPlayAttackedAni);

            var defSpine = defHero.getHeroSpine();  
            if(startFrameForAttackedAni)
                defSpine.startPlayFromFrame(startFrameForAttackedAni);  //从第n帧开始，让其快速进入受击状态，应该是根据不同的英雄来的，但这做不到，只能给一个恰当的值    ?????       
        }
        //如果是技能造成的连续受击，但不倒地，则最后一次攻击必须用commAttacked收尾 ?????
        else if(status == "commAttacked"){
            this._skillAttacked[i].cur_index = this._skillAttacked[i].cur_index + 1;
            //
            def.drop  = this._skillAttacked[i].commAttacked_drop;
            def.blood = this._skillAttacked[i].commAttacked_blood;

            defHero.commAttacked(attHero, att, def);
            var defSpine = defHero.getHeroSpine();  
            if(startFrameForAttackedAni)
                defSpine.startPlayFromFrame(startFrameForAttackedAni);  //从第n帧开始，让其快速进入受击状态，应该是根据不同的英雄来的，但这做不到，只能给一个恰当的值    ?????       
        }
    },

    smallSkillAttack:function(process, attHero, defHero, att, def, runToPos, roundEndCallback){
        //每个英雄特殊处理
        if (this.getConfig().small_skill_spec) {

            this._skillAttacked  = [];            
            this.smallSkillSpecAttack(attHero, defHero, att, def, runToPos, roundEndCallback);
        } 
        else { //公共处理
            process.smallSkillCommAttack(attHero, defHero, att, def, runToPos, roundEndCallback);
        } 
    },

    bigSkillAttack:function(process, attHero, defHeroAry, att, defAry, runToPos, roundEndCallback){
        //每个英雄特殊处理
        if (this.getConfig().big_skill_spec) {

            this._skillAttacked  = [];              
            this.bigSkillSpecAttack(attHero, defHeroAry, att, defAry, runToPos, roundEndCallback);
        } 
        else { //公共处理
            process.bigSkillCommAttack(attHero, defHeroAry, att, defAry, runToPos, roundEndCallback);
        }   
    },

    ///////子类提供以下两个方法实现
    smallSkillSpecAttack:function(attHero, defHero, att, def, runToPos, roundEndCallback){
        cc.assert(false, "Hero_Spine smallSkill  no skill !!!");  
    },

    bigSkillSpecAttack:function(attHero, defHeroAry, att, defAry, runToPos, roundEndCallback){
        cc.assert(false, "Hero_Spine bigSkill  no skill !!!"); 
    }
});


HeroSpine.createInstance = function(spname, isLeft, effectCache){
    var heroSpec     = eval("Hero_" + spname);
    var hero_spec    = new heroSpec(spname, isLeft, effectCache);

    return hero_spec;  
};



