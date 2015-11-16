<?php
define('ATTACK_TYPE_PHYSICS', 1 );
define('ATTACK_TYPE_MAGIC',   2 );
define('ATTACK_TYPE_CURE',    3 );

define('MAX_STAR' , 6);
define('STAR_DIS' , 0.85);

define('SPE_SKILL_ZHILIAO'			, 'zhiliao' );      //治疗
define('SPE_SKILL_MISS'				, 'miss' );         //1表示闪避
define('SPE_SKILL_GEDANG'			, 'gedang' );       //2表示格挡
define('SPE_SKILL_JIANREN'			, 'jianren' );      //3表示坚韧
define('SPE_SKILL_HUIXUE'			, 'huixue' );       //4表示回血
define('SPE_SKILL_CHONGSHENG'		, 'chongsheng' );   //5表示重生
define('SPE_SKILL_BAOJI'			, 'baoji' );        //1表示暴击 2倍伤害
define('SPE_SKILL_BISHA'			, 'bisha' );        //2表示必杀 3倍伤害
define('SPE_SKILL_JIASHEN'			, 'jiashen' );      //3表示加深 增加百分比伤害
define('SPE_SKILL_SHENGJIAN'		, 'shengjian' );    //4便是圣剑 4倍伤害
define('SPE_SKILL_ZHONGJI'			, 'zhongji' );      //5表示重击 50%概率

require_once( DOCUMENT_ROOT.'inc/hero.inc.php' );

define('BLOOD_GROW'		, 1.03);
define('ARMOR_GROW'		, 1.015);
define('ATTACK_GROW'	, 1.03);
define('CROSS_GROW'		, 1.015);

//-----------------------------------------------
//
//

class Hero
{
	public static function getHeroBlood( $level , $init_blood )
	{
		$blood = $init_blood * pow( BLOOD_GROW, $level - 1 );
		return intval( $blood );
	}

	//护甲系数
	public static function getHeroParmorM( $level, $init_parmor_m )
	{
		$parmor_m = pow( ARMOR_GROW, $level - 1 ) * $init_parmor_m;
		return number_format($parmor_m , 5) ;
	}

	//护甲值
	public static function getHeroParmor( $parmor_m )
	{
		$parmor = ($parmor_m - 1) * 50;
		if( $parmor <= 1 ) {
			$parmor = 1;
		}
		return intval($parmor);
	}

	//魔抗系数
	public static function getHeroMarmorM( $level, $init_marmor_m )
	{
		$marmor_m = pow( ARMOR_GROW, $level - 1 ) * $init_marmor_m;
		return number_format($marmor_m , 5) ;
	}

	//魔抗值
	public static function getHeroMarmor($marmor_m)
	{
		$marmor = ($marmor_m - 1) * 50;
		if( $marmor <= 1 ) {
			$marmor = 1;
		}
		return intval($marmor);
	}

	//攻击
	public static function getHeroAttack($level, $init_attack)
	{
		$attack = $init_attack * pow( ATTACK_GROW, $level - 1 );
		return intval( $attack );
	}

	//攻击穿透
	function getHeroCrossM($level, $init_cross_m)
	{
		$cross = pow( CROSS_GROW, $level - 1 ) * $init_cross_m;
		return number_format($cross , 5) ;
	}

	//攻击穿透显示
	function getHeroCrossDisplay($cross)
	{
		$cross_dis = ($cross-1) * 25;
		if( $cross_dis <= 1 ) {
			$cross_dis = 1;
		}
		return intval($cross_dis);
	}
}




class Tools
{
	public static function BuDayu($max , $v)
	{
		if( $v > $max ) 
		{
			return $max;
		}
		return $v;
	}

	public static function BuXiaoyu($min , $v)
	{
		if( $v < $min )
		{
			return $min;
		}
		return $v;
	}
}


?>