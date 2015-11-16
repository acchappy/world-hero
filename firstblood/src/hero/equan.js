/**
 * Created by fable on 15/11/06.
 * @Author fable
 * @desc   hero config 
 *
 * 小怪，狗，没有小招及大招
 * 
**/
/////////////////////////////英雄可配置参数 start ???????//////////////////////////////////////////////////
//根据美术提供的每个动画资源进行配置 ?????
var SpineConfig_equan =
{
//	hid                 : 1001,
	sp_name             : "equan",
	sp_type             : "near",   //near 近战, far远程
	sp_scale            : cc.p(0.65, 0.65), //缩放系数
	attack_box          : cc.size(12*32,   5*32),    //攻击范围，使用时要乘缩放系数spine 32pi 一个格子, 狗会跳一段再攻击，故其width，会宽
	attacked_box        : cc.size(4*32,    5*32),          //受击范围，使用时要乘缩放系数spine 32pi 一个格子

	small_skill_spec    : false,      //????? //true 小技能攻击，由下面的Hero_xxx提供，一定要实现下面的smallSkillAttack, false,则用AttackProcess的公共处理
	big_skill_spec      : false,      //?????  //true 大技能攻击，由下面的Hero_xxx提供，一定要实现下面的bigSkillAttack, false,则用AttackProcess的公共处理
}
/////////////////////////////英雄可配置参数 end//////////////////////////////////////////////////

var Hero_equan = HeroSpine.extend({

	_param: {},

	ctor:function(spineName, isLeft){
		this._super(spineName, SpineConfig_equan, isLeft);	

		this._param = {};

		return true;
	},

	smallSkillSpecAttack:function(attHero, defHero, att, def, runToPos, roundEndCallback){
		cc.assert(false, "Hero_equan smallSkill xiao guai no skill !!!");  
	},

	bigSkillSpecAttack:function(attHero, defHeroAry, att, defAry, runToPos, roundEndCallback){

		cc.assert(false, "Hero_equan bigSkill  xiao guai no skill !!!"); 
	},
});
