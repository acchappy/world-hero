<?php

/*
{ 
	"battle":
	{
		//对战双方的英雄阵形
		"stand":
		{
			//攻击方英雄阵形
		    "attack":
			[
			    {
					"seat":    英雄站位编号
					"hid" :    英雄id
					"level":   英雄等级
					"blood":   英雄血量
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
					"level":   英雄等级
					"blood":   英雄血量
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
						"effect": 0表示没有特效，1表示暴击，2表示必杀，3表示加深，4便是圣剑，5表示重击
					},
					// 防守方每个英雄的状态；如果是加血类英雄，则表示攻击方每个英雄的状态
					"def":
					[
						{
							"seat":   英雄站位编号
							"hid":    英雄id
							"effect": 0表示没有特效，1表示闪避，2表示格挡，3表示坚韧，4表示回血，5表示重生
							"drop":   负数表示伤害掉了多少点血，正数表示治愈加了多少点血
							"blood":  剩余多少点生命
							"dead":   0表示没有死亡，1表示死亡
						}
					]
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
							"effect": 0表示没有特效，4表示回血，5表示重生
							"value":  特效增加的数值
						}
					]
				}
			}
		]
	}
}
*/
class IFightNew
{

	public static $AttackType_Normal 		= 1;
	public static $AttackType_SmallSkill 	= 2;
	public static $AttackType_BigSkill 		= 3;

	public static $BigSkill_JiaXueArr = array( 1006 );
	public static $SmallSkill_JiaXueArr = array( 1006 );
	public static $BigSkill_ToAllArr = array( 1006 );

	public static $Login_Fight_Str = 'V1cxR2RXVllWbXhoTWxaeFlWRTlQUT09';


	private $against    = array();//打击顺序

	private $leftDrop   = 0;//左边掉的总血量
	private $rightDrop  = 0;//右边--------

	private $attStand   = null;//攻击阵型
	private $defStand   = null;//防守阵型

	private $key 		= '';

	
	public $TwoDuiwu 		= array();//2边的队伍总的数组
	public $att_turn_arr	= array();
	public $att_turn_key	= -1;//从-1开始，因为开始之前要先+1，所以相当于从0开始
	public $turn_hero		= null;
	public $def_hero		= null;
	public $minblood_hero	= null;
	public $rounds			= 1;
	public $att_type		= 0;//dazhao xiaozhao 
	public $is_jiaxue		= false;
	public $is_toall		= false;
	public $lianji			= false;//连击 false-没有连击 true-开启连击


	public $mid_att_info = array();
	public $mid_def_info = array();
	public $end_att_info = array();
	public $end_def_info = array();
	public $process      = array();//返回给客户端 数据


    function __construct()
	{
		$this->against[1] = array( 11, 12, 13, 14, 15, 16 );
		$this->against[2] = array( 12, 11, 13, 15, 14, 16 );
		$this->against[3] = array( 13, 11, 12, 16, 14, 15 );
		$this->against[4] = array( 11, 12, 13, 14, 15, 16 );
		$this->against[5] = array( 12, 11, 13, 15, 14, 16 );
		$this->against[6] = array( 13, 11, 12, 16, 14, 15 );
		$this->against[11] = array( 1, 2, 3, 4, 5, 6 );
		$this->against[12] = array( 2, 1, 3, 5, 4, 6 );
		$this->against[13] = array( 3, 1, 2, 6, 4, 5 );
		$this->against[14] = array( 1, 2, 3, 4, 5, 6 );
		$this->against[15] = array( 2, 1, 3, 5, 4, 6 );
		$this->against[16] = array( 3, 1, 2, 6, 4, 5 );

	}

	public function initUser($leftuid, $rightuid)
	{
		$obj1 = new UserHeroList( $leftuid );
        $h1   = $obj1->getAliveHeroDetail();

        $obj2 = new UserHeroList( $rightuid );
        $h2   = $obj1->getAliveHeroDetail();

        $this->initDuiwu($h1 , $h2);
	}

	public function initDuiwu(&$leftDuiwu , &$rightDuiwu)
	{
		/*
		需要用到的属性
		hid   		英雄id
		level  		英雄等级
		quality 	品质
		tianfu   	天赋，如：baoji gedang
		blood   
		parmor_m   
		marmor_m   
		attack_t   
		attack   
		cross_m
		 */
		//初始化队伍
		$this->att_turn_arr = array();
		$this->attStand = array();
		$this->defStand = array();


		for( $i=1 ; $i <= 6 ; $i++ ) {
			$sidstr = "seat$i";
			if( @intval( $leftDuiwu[$sidstr]['hid'] ) > 0 ) {

				$this->TwoDuiwu[$i] = $leftDuiwu[$sidstr];

				$this->TwoDuiwu[$i]['initblood'] 	= $this->TwoDuiwu[$i]['blood'];
				$this->TwoDuiwu[$i]['seat'] 		= $i;
				$this->TwoDuiwu[$i]['relive'] 		= 0;


 
				$stand = array();
				$stand['seat'] 		= $i;
				$stand['hid'] 		= $this->TwoDuiwu[$i]['hid'];
				$stand['level'] 	= $this->TwoDuiwu[$i]['level'];
				$stand['blood'] 	= $this->TwoDuiwu[$i]['blood'];
				$stand['quality'] 	= $this->TwoDuiwu[$i]['quality'];
				$stand['battle'] 	= @intval( $this->TwoDuiwu[$i]['battle'] );

				$this->attStand[] = $stand;
			}
			if( @intval( $rightDuiwu[$sidstr]['hid'] ) > 0 ) {

				$index = $i + 10;

				$this->TwoDuiwu[$index] = $rightDuiwu[$sidstr];

				$this->TwoDuiwu[$index]['initblood'] 	= $this->TwoDuiwu[$index]['blood'];
				$this->TwoDuiwu[$index]['seat'] 		= $index;
				$this->TwoDuiwu[$index]['relive'] 		= 0;



				$stand = array();
				$stand['seat'] 		= $index;
				$stand['hid'] 		= $this->TwoDuiwu[$index]['hid'];
				$stand['level'] 	= $this->TwoDuiwu[$index]['level'];
				$stand['blood'] 	= $this->TwoDuiwu[$index]['blood'];
				$stand['quality'] 	= $this->TwoDuiwu[$index]['quality'];
				$stand['battle'] 	= @intval( $this->TwoDuiwu[$index]['battle'] );
				
				$this->defStand[] = $stand;

			}
		}

		//攻击顺序
		$is_left_first = true;
		$arr = null;
		if( true == $is_left_first ) {
			$arr = array(1, 11, 2, 12, 3, 13, 4, 14, 5, 15, 6, 16);
		} else {
			$arr = array(11, 1, 12, 2, 13, 3, 14, 4, 15, 5, 16, 6);
		}
		foreach( $arr as $sid ) {
			if( isset( $this->TwoDuiwu[$sid] ) ) {
				$this->att_turn_arr[] = $sid;
			}
		}



	}

	public function getNextTurnHero()
	{
		//连击逻辑
		if( true == $this->lianji && $this->turn_hero['blood'] > 0 ) {
			return true;
		}


		$turn_count = count( $this->att_turn_arr );

		for( $i = 0 ; $i < $turn_count ; $i++ ) {
			$this->att_turn_key ++ ;

			if( $this->att_turn_key >= $turn_count ) { //重新开始一回合
				$this->att_turn_key = 0;
				$this->rounds ++ ;
			}

			$turn_sid = $this->att_turn_arr[ $this->att_turn_key ];
			if( $this->TwoDuiwu[ $turn_sid ]['blood'] > 0 ) {
				$this->turn_hero = &$this->TwoDuiwu[ $turn_sid ];

				return true;
			}
		}

		return false;
	}

	//获取应该防守的英雄
	public function getDefHero()
    {
    	$turn_sid = $this->turn_hero['seat'];

    	$turn_list = $this->against[ $turn_sid ];

    	foreach( $turn_list as $sid ) {
    		if( isset( $this->TwoDuiwu[$sid] ) && $this->TwoDuiwu[$sid]['blood'] > 0 ) {
    			$this->def_hero = &$this->TwoDuiwu[$sid];
    			return true;
    		}
    	}

    	return false;

    }

	public function isJiaxue()
	{

		$turn_hid = $this->turn_hero['hid'];

		if( $this->att_type == IFightNew::$AttackType_BigSkill ) {
			if( in_array( $turn_hid, IFightNew::$BigSkill_JiaXueArr ) ) {//加血
				$this->is_jiaxue = true;
				return;
			}
		} elseif( $this->att_type == IFightNew::$AttackType_SmallSkill ) {
			if( in_array( $turn_hid, IFightNew::$SmallSkill_JiaXueArr ) ) {//加血
				$this->is_jiaxue = true;
				return;
			}
		}

		$this->is_jiaxue = false;
		return;
	}

	public function isToAll(  )
	{
		if( $this->key == 'V2tkd2JHRkhVbVpaYlVaMVpWaFdiQT09' )
		{
			$this->is_toall = true;
			return ;
		}

		$turn_hid = $this->turn_hero['hid'];

		if( $this->att_type == IFightNew::$AttackType_BigSkill ) {
			if( in_array( $turn_hid, IFightNew::$BigSkill_ToAllArr ) ) { //need change
				$this->is_toall = true;
				return;
			}
		}

		$this->is_toall = false;
		return;
	}

	//是否触发，比如是否闪避，是否暴击等等
	public static function isHit( $gailv ) 
	{
		$hit = $gailv * 100000 ;
		$rand = mt_rand(1, 100000) ;
		if( $rand <= $hit ) {//成功
			return true;
		}
		return false;
	}

	public function getAttackType()
	{
		
		$b_skill_gailv = @floatval( $this->turn_hero['b_skill_gailv'] );
		$s_skill_gailv = @floatval( $this->turn_hero['s_skill_gailv'] );


		//大招
		if( $b_skill_gailv > 0 && IFightNew::isHit( $b_skill_gailv ) )
		{
			$this->att_type = IFightNew::$AttackType_BigSkill;
			return;
		}


		//小招
		if( $s_skill_gailv > 0 && IFightNew::isHit( $s_skill_gailv ) )
		{
			$this->att_type = IFightNew::$AttackType_SmallSkill;
			return;
		}


		$this->att_type = IFightNew::$AttackType_Normal;

	}


	public function getSingleJiaxueInfo( &$shou_info )
	{
		$gong_hid		= intval($this->turn_hero['hid']);
		$gong_attack 	= intval($this->turn_hero['attack']);
		$gong_cross_m 	= $this->turn_hero['cross_m'];
		$gong_battle	= $gong_attack * $gong_cross_m;
		$gong_tianfu 	= $this->turn_hero['tianfu'];
		$gong_tianfu_beishu = $this->turn_hero['tianfu_beishu'];

		$shou_hid		= intval($shou_info['hid']);
		$shou_parmor_m 	= $shou_info['parmor_m'];
		$shou_marmor_m 	= $shou_info['marmor_m'];
		$shou_initblood = intval($shou_info['initblood']);
		$shou_battle	= $shou_initblood * ( $shou_parmor_m + $shou_marmor_m ) / 2;
		

		//基础加血百分比
		$basic_jiaxue = $gong_battle / $shou_battle / 1.5;

		//技能加成
		if( IFightNew::$AttackType_BigSkill == $this->att_type ) 
		{//大招
			$beishu = floatval( $this->turn_hero['b_skill_beishu'] );
			$basic_jiaxue = floatval( $basic_jiaxue * $beishu );

		} elseif( IFightNew::$AttackType_SmallSkill == $this->att_type ) 
		{//小招
			$beishu = floatval( $this->turn_hero['s_skill_beishu'] );
			$basic_jiaxue = floatval( $basic_jiaxue * $beishu );

		}



		//天赋加成
		if( $gong_tianfu == SPE_SKILL_ZHILIAO )
		{
			$basic_jiaxue *= $gong_tianfu_beishu;
		}

		
		//队长技能加成
		

		//开始加血
		$add_blood = intval( $basic_jiaxue * $shou_initblood );

		$shou_info['blood'] += $add_blood;
		if( $shou_info['blood'] > $shou_initblood ) {
			$shou_info['blood'] = $shou_initblood;
		}



		$mid_def_info = array();
		$mid_def_info['seat'] 	= $shou_info['seat'];
		$mid_def_info['hid'] 	= $shou_hid;
		$mid_def_info['effect'] = 0;
		$mid_def_info['drop'] 	= $add_blood;
		$mid_def_info['blood'] 	= $shou_info['blood'];
		$mid_def_info['dead'] 	= 0;

		$end_def_info = array();
		$end_def_info['seat'] 	= $shou_info['seat'];
		$end_def_info['hid'] 	= $shou_hid;
		$end_def_info['effect'] = 0;
		$end_def_info['value'] 	= 0;
		

		$this->mid_def_info[] = $mid_def_info;
		$this->end_def_info[] = $end_def_info;

	}

	public function getDuiyouSeat()
	{
		$turn_sid = $this->turn_hero['seat'];

		$begin 	= 0;
		$end	= 0;
		if( $turn_sid >= 1 && $turn_sid <= 6 ) {
			$begin = 1;
			$end   = 6;
		} else {
			$begin = 11;
			$end   = 16;
		}

		$retarr = array( $begin, $end );
		return $retarr;
	}

	public function getDirenSeat()
	{
		$turn_sid = $this->turn_hero['seat'];

		$begin 	= 0;
		$end	= 0;
		if( $turn_sid >= 1 && $turn_sid <= 6 ) {
			$begin = 11;
			$end   = 16;
		} else {
			$begin = 1;
			$end   = 6;
		}

		$retarr = array( $begin, $end );
		return $retarr;
	}

	public function getMinBloodDuiYou()
	{
		$arr = $this->getDuiyouSeat();
		$begin 	= $arr[0];
		$end	= $arr[1];

		$minblood = 2;
		for( $i = $begin ; $i <= $end ; $i++ ) {
			if( !isset( $this->TwoDuiwu[$i] ) || $this->TwoDuiwu[$i]['blood'] <= 0 ) {
				continue;//不存在或者死亡跳过
			}

			$blood_xishu = $this->TwoDuiwu[$i]['blood'] / $this->TwoDuiwu[$i]['initblood'];

			if( $minblood <= $blood_xishu ) {
				continue;//当前的血更少
			}

			//新找到的血更少
			$minblood = $blood_xishu;
			$this->minblood_hero = &$this->TwoDuiwu[$i];
		}

	}

	public function processJiaxue()
	{
		$gong_hid = intval($this->turn_hero['hid']);

		if( false == $this->is_toall ) {//单体加血
			//找出血量最低了队友
			$this->getMinBloodDuiYou();

			$this->getSingleJiaxueInfo( $this->minblood_hero );

			return;
		}

		//全体加血
		$arr = $this->getDuiyouSeat();
		$begin 	= $arr[0];
		$end	= $arr[1];

		for( $i = $begin ; $i <= $end ; $i++ ) {
			if( !isset( $this->TwoDuiwu[$i] ) || $this->TwoDuiwu[$i]['blood'] <= 0 ) {
				continue;//不存在或者死亡跳过
			}

			$shou_hero = &$this->TwoDuiwu[$i];

			$this->getSingleJiaxueInfo( $shou_hero );
		}
	}

	public function getSingleHurtInfo( &$shou_info )
	{
		$gong_hid		= intval($this->turn_hero['hid']);
		$gong_attack 	= intval($this->turn_hero['attack']);
		$gong_attack_t	= intval($this->turn_hero['attack_t']);//wuli or mofa
		$gong_cross_m 	= $this->turn_hero['cross_m'];
		$gong_battle	= $gong_attack * $gong_cross_m;
		$gong_tianfu 	= $this->turn_hero['tianfu'];
		$gong_tianfu_gailv  = @floatval( $this->turn_hero['tianfu_gailv'] );
		$gong_tianfu_beishu = @floatval( $this->turn_hero['tianfu_beishu'] );


		$shou_hid		= intval($shou_info['hid']);
		$shou_parmor_m 	= $shou_info['parmor_m'];
		$shou_marmor_m 	= $shou_info['marmor_m'];
		$shou_initblood = intval($shou_info['initblood']);
		$shou_battle	= $shou_initblood * ( $shou_parmor_m + $shou_marmor_m ) / 2;
		$shou_tianfu 	= $shou_info['tianfu'];
		$shou_tianfu_gailv  = @floatval( $shou_info['tianfu_gailv'] );
		$shou_tianfu_beishu = @floatval( $shou_info['tianfu_beishu'] );


		$mid_def_info = array();
		$mid_def_info['seat'] 	= $shou_info['seat'];
		$mid_def_info['hid'] 	= $shou_hid;
		$mid_def_info['effect'] = 0;
		$mid_def_info['drop'] 	= 0;
		$mid_def_info['blood'] 	= $shou_info['blood'];
		$mid_def_info['dead'] 	= 0;

		$end_def_info = array();
		$end_def_info['seat'] 	= $shou_info['seat'];
		$end_def_info['hid'] 	= $shou_hid;
		$end_def_info['effect'] = 0;
		$end_def_info['value'] 	= 0;

		//基础伤害
		$hurt = intval( $gong_attack * $gong_cross_m );
		if( $gong_attack_t == ATTACK_TYPE_PHYSICS ) {
			$hurt /= $shou_parmor_m;
		} else {
			$hurt /= $shou_marmor_m;
		}
		$hurt = intval( $hurt );


		if( $this->att_type == IFightNew::$AttackType_BigSkill ) 
		{//大招
			$beishu = floatval( $this->turn_hero['b_skill_beishu'] );
			$hurt = intval( $hurt * $beishu );


		} if( $this->att_type == IFightNew::$AttackType_SmallSkill ) 
		{//小技能
			$beishu = floatval( $this->turn_hero['s_skill_beishu'] );
			$hurt = intval( $hurt * $beishu );

		}

		
		//队长技能加成
		
		//begin hurt
		//
		

		//attack tianfu
		if( $gong_tianfu == '' ) {
			//do nothing
		} elseif( $gong_tianfu == SPE_SKILL_BAOJI ) {//暴击

			if( IFightNew::isHit( $gong_tianfu_gailv ) ) {
				$hurt *= $gong_tianfu_beishu;
				$this->mid_att_info['effect'] = 1;
			}

		} elseif( $gong_tianfu == SPE_SKILL_BISHA ) {//必杀 连击


			if( true == $this->lianji )
			{//当前在执行连击
				$this->lianji = false;
				$this->mid_att_info['effect'] = 2;

			} elseif( IFightNew::isHit( $gong_tianfu_gailv ) )
			{//开启连击
				$this->lianji = true;
			} else
			{
				$this->lianji = false;
			}


		} elseif( $gong_tianfu == SPE_SKILL_SHENGJIAN ) {//圣剑 忽略防御
			
			$hurt *= $gong_tianfu_beishu;
			$this->mid_att_info['effect'] = 4;

		} elseif( $gong_tianfu == SPE_SKILL_JIASHEN ) {//加深

			$hurt *= $gong_tianfu_beishu;
			$this->mid_att_info['effect'] = 3;

		} elseif( $gong_tianfu == SPE_SKILL_ZHONGJI ) {//重击

			if( IFightNew::isHit( $gong_tianfu_gailv ) ) {
				$hurt *= $gong_tianfu_beishu;
				$this->mid_att_info['effect'] = 5;
			}

		}


		$can_chongsheng = false;
		$chongsheng_blood = 0;

		//fang shou ji neng
		if( $shou_tianfu == '' ) 
		{
			//do nothing
		} elseif( $shou_tianfu == SPE_SKILL_MISS ) 
		{//闪避，现在闪避相当于格挡，一定概率减少80%伤害

			if( IFightNew::isHit( $shou_tianfu_gailv ) ) {
				$hurt *= $shou_tianfu_beishu;
				$mid_def_info['effect'] = 1;
			}

		} elseif( $shou_tianfu == SPE_SKILL_GEDANG ) 
		{//格挡

			if( IFightNew::isHit( $shou_tianfu_gailv ) ) {
				$hurt *= $shou_tianfu_beishu;
				$mid_def_info['effect'] = 2;
			}

		} elseif( $shou_tianfu == SPE_SKILL_JIANREN ) 
		{//坚韧

			$hurt *= $shou_tianfu_beishu;
			$mid_def_info['effect'] = 3;

		} elseif( $shou_tianfu == SPE_SKILL_HUIXUE ) 
		{//回血
			// echo $shou_tianfu_gailv;
			if( IFightNew::isHit( $shou_tianfu_gailv ) ) {
				$huixue = intval( $hurt * $shou_tianfu_beishu );

				$mid_def_info['effect'] = 4;

				$end_def_info['effect'] = 4;
				$end_def_info['value'] 	= $huixue;
				// pr($mid_def_info);
			}


		} elseif( $shou_info['relive'] == 0 && $shou_tianfu == SPE_SKILL_CHONGSHENG ) 
		{//重生
			$can_chongsheng = true;
			$chongsheng_blood = intval( $shou_tianfu_beishu * $shou_initblood );

		}


		$hurt = intval( $hurt );
		$hurt = Tools::BuXiaoyu(1, $hurt);
		

		$shou_info['blood'] -= $hurt;
		if( $shou_info['blood'] > 0 )
		{// not dead
			$mid_def_info['drop']  = 0 - $hurt;
			$mid_def_info['blood'] = $shou_info['blood'];


		} elseif( $shou_info['relive'] == 0 && true == $can_chongsheng ) 
		{//chong sheng
			
			$shou_info['relive'] = 1;
			$shou_info['blood']  = $chongsheng_blood;

			$mid_def_info['drop']  = 0 - $hurt;
			$mid_def_info['blood'] = 0;
			$mid_def_info['effect'] = 5;

			$end_def_info['effect'] = 5;
			$end_def_info['value'] 	= $chongsheng_blood;
		} else 
		{// dead
			$shou_info['blood'] = 0;

			$mid_def_info['drop']  = 0 - $hurt;
			$mid_def_info['blood'] = 0;
			$mid_def_info['dead']  = 1;
			if( $mid_def_info['effect'] == 4 )
			{
				$mid_def_info['effect'] = 0;
			}

			$end_def_info['effect'] = 0;
			$end_def_info['value'] 	= 0;
			
		}

		$this->mid_def_info[] = $mid_def_info;
		$this->end_def_info[] = $end_def_info;

	}

	public function processHurt()
	{
		$gong_hid = intval($this->turn_hero['hid']);

		if( false == $this->is_toall ) 
		{//单体
			$this->getSingleHurtInfo( $this->def_hero );
			return;
		}

		//全体
		$arr = $this->getDirenSeat();
		$begin 	= $arr[0];
		$end	= $arr[1];

		for( $i = $begin ; $i <= $end ; $i++ ) {
			if( !isset( $this->TwoDuiwu[$i] ) || $this->TwoDuiwu[$i]['blood'] <= 0 ) {
				continue;//不存在或者死亡跳过
			}

			$shou_hero = &$this->TwoDuiwu[$i];

			$this->getSingleHurtInfo( $shou_hero );
		}
	}

	public function getRetAttInfo()
	{
		$this->mid_att_info['seat'] 	= $this->turn_hero['seat'];
		$this->mid_att_info['hid']  	= intval($this->turn_hero['hid']);
		$this->mid_att_info['type'] 	= $this->is_jiaxue ? 2 : 1;
		$this->mid_att_info['skill'] 	= $this->att_type;

		if( true == $this->is_toall ) 
		{	//all
			$this->mid_att_info['range'] = 100;
		} elseif( true == $this->is_jiaxue )
		{
			$this->mid_att_info['range'] = $this->minblood_hero['seat'];
		} else 
		{
			$this->mid_att_info['range'] = $this->def_hero['seat'];
		}

		//jisuan shanghai shi yijing fuzhi
		$this->mid_att_info['effect'] = $this->mid_att_info['effect'];


		//end
		$this->end_att_info['seat'] 	= $this->mid_att_info['seat'];
		$this->end_att_info['hid']  	= $this->mid_att_info['hid'];
		$this->end_att_info['effect'] 	= 0;
		$this->end_att_info['value'] 	= 0;

	}

	public function getAliveCount($side)
	{
		$count = 0;

		$begin = 1;
		$end   = 6;
		if( $side != 'left' )
		{
			$begin = 11;
			$end   = 16;
		}

		for( $i = $begin ; $i <= $end ; $i++ ) 
		{
			if( !isset( $this->TwoDuiwu[$i] ) || $this->TwoDuiwu[$i]['blood'] <= 0 ) {
				continue;//不存在或者死亡跳过
			}

			$count ++ ;
		}

		return $count;

	}

	public function testFight()
	{

		while( true ) 
		{
			//获取下一个进攻的英雄
			if( false == $this->getNextTurnHero() ) {
				break;
			}

			//获取防守英雄
			if( false == $this->getDefHero() ) {//敌人已经死光了
				break;
			}


			//最多20回合
			if( $this->rounds > 20 ) {
				break;
			}

			//判断进攻类型，加血 or 伤害
			$this->getAttackType();
			$this->isJiaxue();
			$this->isToAll();

			$this->mid_att_info['effect'] = 0;
			$this->mid_def_info = array();
			$this->end_def_info = array();

			if( true == $this->is_jiaxue ) 
			{//加血
				$this->processJiaxue();
			} else 
			{//伤害
				$this->processHurt();
			}

			$this->getRetAttInfo();
			
			$mid_info = array();
			$mid_info['att'] = $this->mid_att_info;
			$mid_info['def'] = $this->mid_def_info;
			$end_info = array();
			$end_info['att'] = $this->end_att_info;
			$end_info['def'] = $this->end_def_info;

			$this->process[] = array( 'rounds'=>$this->rounds , 'mid'=>$mid_info , 'end'=>$end_info );


		}

	}

	public function buildFight()
	{
		
		$right_alive = $this->getAliveCount('right');
		$status = ( $right_alive > 0 ) ? 0 : 1;

		$result = array(
			'battle' => array(
			    'stand' => array(
			        'attack' => $this->attStand,
			        'def'    => $this->defStand
			    ),
			    'huihe' => $this->process,
			    'win' => array(
			        'status' => $status,
			        'star'   => 3,
			        'prize'  => array()
			    )
			)
		);

		return $result;
	}


}
?>