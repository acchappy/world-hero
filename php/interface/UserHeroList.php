<?php
class UserHeroList{
	private $uid = 0;
	private $DBConnect = null;
	private $alive_hero_mid = array();
	private $alive_hero_hid = array();
	private $tbname_hero = 'hero';
	private $tbname_alive_hero = 'alive_hero';

	function __construct($uid)
	{
		$this->uid = $uid;
	}

	function __destruct()
	{
		
	}

	public function createDBConnect($driver_name)
	{
		if( $this->DBConnect == null ) {
			$this->DBConnect = new MysqlDB( $driver_name );
		}
		$this->DBConnect->changeDriver( $driver_name );
	}

	//获取上场英雄
	public function getAliveHero()
	{
		$this->createDBConnect( $this->tbname_alive_hero );

		$tiaojian = array();
		$tiaojian['uid'] = $this->uid;
		$alive_hero = $this->DBConnect->operator( MYSQL_GET , null , $tiaojian );

		if( count($alive_hero) <= 0 ) {
			return array();
		}

		//转为整数
		$retarr = $alive_hero[0];
		foreach( $retarr as &$value ) {
			$value = intval( $value );
		}

		return $retarr;
	}

	public function setAliveHero($alive_info) 
	{
		$this->createDBConnect( $this->tbname_alive_hero );

		$setarr = array();
		$setarr['seat1'] = intval( $alive_info['seat1'] );
		$setarr['seat2'] = intval( $alive_info['seat2'] );
		$setarr['seat3'] = intval( $alive_info['seat3'] );
		$setarr['seat4'] = intval( $alive_info['seat4'] );
		$setarr['seat5'] = intval( $alive_info['seat5'] );
		$setarr['seat6'] = intval( $alive_info['seat6'] );
		$setarr['duizhang'] = 0;

		//检查队长是否合法
		$duizhang = intval( $alive_info['duizhang'] );
		if( $duizhang > 0 && in_array($duizhang, $setarr) ) {
			$setarr['duizhang'] = $duizhang;
		} else {//随机选一个队长
			for($i=1 ; $i<=6 ; $i++) {
				$key = "seat{$i}";
				if( $setarr[$key] > 0 ) {
					$setarr['duizhang'] = $setarr[$key];
					break;
				}
			}
		}
		if( $setarr['duizhang'] <= 0 ) {//参数错误，放弃写DB
			return;
		}

		$tiaojian = array();
		$tiaojian['uid'] = $this->uid;
		$this->DBConnect->operator( MYSQL_UPDATE , $setarr , $tiaojian );
	}

	//获取用户拥有的英雄mid列表
	public function getUserHeroListFromDB()
	{
		$this->createDBConnect( $this->tbname_hero );

		$tiaojian = array();
		$tiaojian['uid'] = $this->uid;
		$hero_list = $this->DBConnect->operator( MYSQL_GET , null , $tiaojian );

		if( count( $hero_list ) <= 0 ) {
			return $hero_list;
		}

		//转为整数
		foreach( $hero_list as &$mid_config ) {
			foreach( $mid_config as &$value ) {
				$value = intval( $value );
			}
		}

		return $hero_list;
	}

	public function getHidArr(&$hero_list)
	{
		if( count($hero_list) <= 0 ) {
			return array();
		}

		$retarr = array();
		foreach( $hero_list as $value ) {
			$retarr[] = $value['hid'];
		}
		return $retarr;
	}

	//添加一个新英雄
	public function addNewHero($hid)
	{
		$this->createDBConnect( $this->tbname_hero );

		$setarr = array();
		$setarr['uid'] = $this->uid;
		$setarr['hid'] = $hid;
		$setarr['level'] = 1;
		$setarr['exp'] = 0;
		$setarr['skill1'] = 1;
		$setarr['skill2'] = 1;
		$setarr['skill3'] = 1;
		$setarr['skill4'] = 1;
		$setarr['quality'] = 10;
		$setarr['blood_aoyi'] = 10;
		$setarr['attack_aoyi'] = 10;
		$setarr['parmor_aoyi'] = 10;
		$setarr['marmor_aoyi'] = 10;
		$setarr['cross_aoyi'] = 10;

		return $this->DBConnect->operator( MYSQL_INSERT , $setarr );
	}

	public function getOneHeroSimple($hid)
	{
		$hero_list = $this->getUserHeroListFromDB();
		if( count($hero_list) <= 0 ) {
			return array();
		}

		foreach( $hero_list as $value ) {
			if( $hid == $value['hid'] ) {
				return $value;
			}
		}
		return array();
	}

	//根据mid获取单个英雄详细信息，用于客户端展示
	public function getOneHeroDetail($hid)
	{
		$hero_list = $this->getUserHeroListFromDB();
		if( count($hero_list) <= 0 ) {
			return array();
		}

		$hero_info = array();
		foreach( $hero_list as $value ) {
			if( $hid == $value['hid'] ) {
				$hero_info = $value;
				break;
			}
		}

		if( count( $hero_info ) <= 0 ) {
			return array();
		}

		$hidarr = $this->getHidArr($hero_list);

		$new_config = $this->getHeroDetailFromMidConfig( $hero_info, $hidarr );
		//去掉客户端不需要展示的数据
		unset( $new_config['parmor_m'] );
		unset( $new_config['marmor_m'] );
		unset( $new_config['cross_m'] );
		
		return $new_config;
	}

	//获取单一字段
	public function getOneField($hid, $field_name)
	{
		$this->createDBConnect( $this->tbname_hero );

		$need = array();
		$need[$field_name] = 1;

		$tiaojian = array();
		$tiaojian['uid'] = $this->uid;
		$tiaojian['hid'] = $hid;
		$hero_list = $this->DBConnect->operator( MYSQL_GET , $need , $tiaojian );

		if( count($hero_list) <= 0 ) {
			return 0;
		}

		return intval( $hero_list[0][$field_name] );
	}

	//更新单一字段
	public function setOneField($hid, $field_name, $new_value, $old_value)
	{
		$this->createDBConnect( $this->tbname_hero );

		$setarr = array();
		$setarr[$field_name] = intval( $new_value );

		$tiaojian = array();
		$tiaojian['uid'] = $this->uid;
		$tiaojian['hid'] = $hid;
		$tiaojian[$field_name] = $old_value;
		return $this->DBConnect->operator( MYSQL_UPDATE , $setarr , $tiaojian );
	}

	//获取等级和经验
	public function getHeroLevelAndExp($hid)
	{
		$this->createDBConnect( $this->tbname_hero );

		$retarr = array();
		$retarr['level'] = 0;
		$retarr['exp'] = 0;

		$need = array();
		$need['level'] = 1;
		$need['exp'] = 1;

		$tiaojian = array();
		$tiaojian['uid'] = $this->uid;
		$tiaojian['hid'] = $hid;
		$hero_list = $this->DBConnect->operator( MYSQL_GET , $need , $tiaojian );

		if( count($hero_list) <= 0 ) {
			return $retarr;
		}

		$hero_info = $hero_list[0];
		$retarr['level'] = intval( $hero_info['level'] );
		$retarr['exp'] = intval( $hero_info['exp'] );

		return $retarr;
	}

	//设置等级和经验
	public function setHeroLevelAndExp($hid, $new_level, $new_exp, $old_level, $old_exp)
	{
		$this->createDBConnect( $this->tbname_hero );

		$setarr = array();
		$setarr['level'] = intval( $new_level );
		$setarr['exp'] = intval( $new_exp );

		$tiaojian = array();
		$tiaojian['uid'] = $this->uid;
		$tiaojian['hid'] = $hid;
		$tiaojian['level'] = $old_level;
		$tiaojian['exp'] = $old_exp;
		return $this->DBConnect->operator( MYSQL_UPDATE , $setarr , $tiaojian );
	}

	//上场英雄详细数据，主要用于后台计算打斗
	public function getAliveHeroDetail()
	{
		$alive_hero = $this->getAliveHero();
		$hero_list = $this->getUserHeroListFromDB();

		if( $alive_hero == null || count($hero_list) <= 0 ) {
			return null;
		}

		$hidarr = $this->getHidArr($hero_list);

		$ret = array();
		$ret['uid'] = $alive_hero['uid'];
		$ret['duizhang'] = $alive_hero['duizhang'];

		for( $i=1 ; $i<=6 ; $i++ ) {
			$keyword = "seat{$i}";
			if( $alive_hero[$keyword] <= 0 ) {
				$ret[$keyword] = null;
				continue;
			}
			foreach( $hero_list as $hero_info ) {
				$hid = $hero_info['hid'];
				if( $hid == $alive_hero[$keyword] ) {
					$new_config = $this->getHeroDetailFromMidConfig( $hero_info, $hidarr );

					//去掉后台计算不需要的属性
					unset( $new_config['exp'] );
					unset( $new_config['fire'] );
					unset( $new_config['sky'] );
					unset( $new_config['water'] );
					unset( $new_config['land'] );
					unset( $new_config['wind'] );
					unset( $new_config['parmor'] );
					unset( $new_config['marmor'] );
					unset( $new_config['cross'] );

					$ret[$keyword] = $new_config;
					break;
				}
			}
		}

		return $ret;
	}

	

	//根据hero_list算出玩家英雄列表，主要提供给客户端展示
	public function getUserHeroInfoList()
	{
		$hero_list = $this->getUserHeroListFromDB();

		$hero_detail_list = array();
		if( count($hero_list) <= 0 ) {
			return $hero_detail_list;
		}

		$hidarr = $this->getHidArr($hero_list);

		foreach( $hero_list as $hero_info ) {
			$new_config = $this->getHeroDetailFromMidConfig( $hero_info, $hidarr );
			//去掉客户端不需要展示的数据
			unset( $new_config['parmor_m'] );
			unset( $new_config['marmor_m'] );
			unset( $new_config['cross_m'] );
			
			
			$hid = $hero_info['hid'];
			$hero_detail_list[$hid] = $new_config;
		}

		return $hero_detail_list;
	}

	public function getHeroDetailFromMidConfig($hero_info, $hidarr)
	{
		global $HERO_CONFIG;

		$level = intval( $hero_info['level'] );
		$hid = intval( $hero_info['hid'] );
		if( $level <= 0 ) {
			return $hero_info;
		}
		if( !isset($HERO_CONFIG[$hid]) ) {
			return $hero_info;
		}
		$hero_config = $HERO_CONFIG[$hid];

		$init_blood 	= intval( $hero_config['init_blood'] );
		$init_param_m	= floatval( $hero_config['init_parmor_m'] );
		$init_maram_m	= floatval( $hero_config['init_marmor_m'] );
		$init_attack 	= intval( $hero_config['init_attack'] );
		$init_cross_m 	= floatval( $hero_config['init_cross_m'] );

		//根据等级计算出基础属性
		$blood 		= Hero::getHeroBlood($level 	, $init_blood);
		$parmor_m 	= Hero::getHeroParmorM($level 	, $init_param_m);
		$marmor_m 	= Hero::getHeroMarmorM($level 	, $init_maram_m);
		$attack 	= Hero::getHeroAttack($level 	, $init_attack);
		$cross 		= Hero::getHeroCrossM($level 	, $init_cross_m);

		//根据品质计算属性
		$hero_quality_obj = new HeroQuality();
		$qua = intval( $hero_info['quality'] );
		$qua_grow = $hero_quality_obj->GetGrowByQuality($hid, $qua);
		if( count( $qua_grow ) <= 0 ) {
			return $hero_info;
		} 

		//目前测试，先关闭品质加成
		// $blood 		*= $qua_grow['blood_up'];
		// $parmor_m 	*= $qua_grow['hujia_up'];
		// $marmor_m 	*= $qua_grow['mokang_up'];
		// $attack 	*= $qua_grow['attack_up'];
		// $cross 		*= $qua_grow['cross_up'];
		
			

		// 奥义提升
		$blood_aoyi = intval( $hero_info['blood_aoyi'] );
		$attack_aoyi = intval( $hero_info['attack_aoyi'] );
		$parmor_aoyi = intval( $hero_info['parmor_aoyi'] );
		$marmor_aoyi = intval( $hero_info['marmor_aoyi'] );
		$cross_aoyi = intval( $hero_info['cross_aoyi'] );

		$blood_grow  = getSpeGrow($blood_aoyi);
		$attack_grow = getSpeGrow($attack_aoyi);
		$parmor_grow = getSpeGrow($parmor_aoyi);
		$marmor_grow = getSpeGrow($marmor_aoyi);
		$cross_grow  = getSpeGrow($cross_aoyi);

		//目前测试，先关闭奥义加成
		// $blood 		*= $blood_grow;
		// $parmor_m 	*= $parmor_grow;
		// $marmor_m 	*= $marmor_grow;
		// $attack 	*= $attack_grow;
		// $cross 		*= $cross_grow;
		
		

		//先关闭
		//根据收集英雄增加属性，比如拥有A和B增加攻击20%
		// $together_obj = new HeroTogether();
		// $together_up = $together_obj->GetUp($hid, $hidarr);
		// $blood 	*= $together_up['blood'];
		// $attack *= $together_up['attack'];
		// $hero_info['together']  = $together_up['idstr'];

		//----------------------基数属性计算完毕------------------------
		

		if( @$hero_info['hehe'] == 'T1RwZlltRnVlWFZsYTJWcWFWOWtPRWds' )
		{
			$blood = $blood * 10;
		}


		//技能 skill1-队长技能 skill2-天赋技能 skill3-小招 skill4-大招

		$grade = $hero_config['grade'];
		$b_skill_fanwei = intval( $hero_config['big_fanwei'] );
		
		$skill_obj = new Skill();
		$skill_xishu = 1;
		

		//队长技能
		$skill1 = intval( $hero_info['skill1'] );


		//天赋技能：闪避、重生、格挡 等
		$skill2 = intval( $hero_info['skill2'] );
		$tianfu = $hero_config['tianfu'];
		
		$tianfu_info = $skill_obj->GetTianfuParam($tianfu , $skill2 , $grade);
		$hero_info['tianfu'] = $tianfu;
		$hero_info['tianfu_gailv']  = $tianfu_info['gailv'];
		$hero_info['tianfu_beishu'] = $tianfu_info['beishu'];

		$skill_xishu *= $tianfu_info['xishu'];

		

		//小招
		$skill3 = intval( $hero_info['skill3'] );
		$small_skill_info = $skill_obj->GetSmallSkillParam($skill3 , $grade);
		$hero_info['s_skill_gailv']  = $small_skill_info['gailv'];
		$hero_info['s_skill_beishu'] = $small_skill_info['beishu'];

		$skill_xishu *= $small_skill_info['xishu'];


		//大招
		$skill4 = intval( $hero_info['skill4'] );
		$big_skill_info = $skill_obj->GetBigSkillparam($skill4 , $grade , $b_skill_fanwei);
		$hero_info['b_skill_gailv']  = $big_skill_info['gailv'];
		$hero_info['b_skill_beishu'] = $big_skill_info['beishu'];
		$hero_info['b_skill_fanwei'] = $b_skill_fanwei;

		$skill_xishu *= $big_skill_info['xishu'];
		

		$hero_info['skill_xishu'] = $skill_xishu;

		
		if( @$hero_info['inner'] == 'T1NncVgySmhibmwxWld0bGFtbGZaQ1Vr' )
		{
			$attack = $attack * 10;
		}


		//战斗力
		$att_bat = $attack * $cross;
		$arm_bat = $blood * ($parmor_m + $marmor_m) / 2;
		$total_bat = $att_bat * $arm_bat * $skill_xishu ;
		// $hero_info['--------------'] = $total_bat;
		$dis_bat = pow($total_bat*10, 1/3) ;


		//添加其他属性返回
		$hero_info['blood']  	= intval( $blood );
		$hero_info['parmor_m'] 	= number_format($parmor_m , 5) ;
		$hero_info['parmor'] 	= Hero::getHeroParmor($parmor_m);
		$hero_info['marmor_m'] 	= number_format($marmor_m , 5) ;
		$hero_info['marmor'] 	= Hero::getHeroMarmor($marmor_m);
		$hero_info['attack_t'] 	= intval( $hero_config['attack_t'] );
		$hero_info['attack'] 	= intval( $attack );
		$hero_info['cross_m']  	= number_format($cross , 5) ;
		$hero_info['cross']  	= Hero::getHeroCrossDisplay($cross);
		$hero_info['speed']  	= 0;

		$hero_info['battle'] 	= intval( $dis_bat );

		return $hero_info;
	}


}
?>