<?php
class User
{
	private $db = null;
	private $heroExpLen = 0;
	private $userExpLen = 0;

	private $userExpInfo = array(
	0,      0,     25,     50,     80,    110,    140,    190,    270,    370,    500,
		  630,    760,    890,   1020,   1150,   1280,   1410,   1540,   1670,   1800,
		 1930,   2080,   2240,   2420,   2610,   2810,   3050,   3330,   3630,   3980,
		 4380,   4830,   5330,   5940,   6660,   7490,   8590,   9790,  10990,  12490,
		13990,  15690,  17390,  19090,  20890,  22890,  24890,  27090,  29290,  31590,
		33890,  36190,  38690,  41390,  44090,  46890,  49890,  53090,  56390,  59690,
        62990,  66490,  69990,  73690,  77490,  81490,  85690,  89990,  94490,  99190,
	   103890, 108590, 113290, 117990, 122690, 127390, 132090, 136790, 141590, 147590,
	   155590, 165590, 177590, 191590, 207590, 225590, 245590, 267590, 291590, 317590
	);
    /*
    四星=三星*1.2
    五星=三星*1.5
    六星=三星*2
    */
	private $heroExpInfo = array(
	0,       0,      30,      70,     130,     210,     310,     440,     590,     770,     950,
          1160,    1380,    1600,    1830,    2070,    2340,    2620,    2910,    3200,    3500,
		  3810,    4130,    4460,    4800,    5150,    5510,    5880,    6260,    6650,    7050,
		  7580,    8260,    9090,   10070,   11170,   12570,   14270,   16270,   18570,   21170,
		 24170,   27470,   31170,   35270,   39770,   44770,   50170,   56070,   62470,   69470,
		 76970,   85070,   93770,  103070,  113070,  124070,  135070,  147070,  160070,  174070,
		189070,  204070,  220070,  237070,  255070,  275070,  296070,  318070,  341070,  365070,
		391070,  418070,  446070,  476070,  507070,  540070,  575070,  611070,  649070,  689070,
		731070,  775070,  821070,  869070,  920070,  973070, 1028070, 1085070, 1144070, 1205070
	);

	public function __construct()
	{
		$this->db = new MysqlDB();
		$this->heroExpLen = count( $this->heroExpInfo );
		$this->userExpLen = count( $this->userExpInfo );
	}

	public function getHeroNextExpAndLevel( $exp )
	{
		$arr = array(
			'level'   => 0,
			'nextexp' => 0,
			'diff'    => 0,
			'cur'     => 0
		);
		for ( $i = 1; $i < $this->heroExpLen; $i++ )
		{
			if ( $exp < $this->heroExpInfo[$i] )
			{
				$arr['level'] = $i - 1;
				$arr['nextexp'] = $this->heroExpInfo[$i];
				$arr['diff']    = $this->heroExpInfo[$i] - $this->heroExpInfo[$i - 1];
				$arr['cur']     = $this->heroExpInfo[$i - 1];
				$arr['exp']     = $exp;
				return $arr;
			}
		}

        $arr['level']   = $this->heroExpLen - 1;
		$arr['nextexp'] = $this->heroExpInfo[$this->heroExpLen - 1];
		$arr['diff']    = $this->heroExpInfo[$this->heroExpLen - 1] - $this->heroExpInfo[$this->heroExpLen - 2];
		$arr['cur']     = $this->heroExpInfo[$this->heroExpLen - 2];
		$arr['exp']     = $arr['nextexp'];
		return $arr;
	}

	public function getHeroTopExp()
	{
		return $this->heroExpInfo[$this->heroExpLen - 1];
	}

	public function getUserNextExp( $exp )
	{
		$arr = array(
			'level'   => 0,
			'nextexp' => 0,
			'diff'    => 0,
			'cur'     => 0
		);
		for ( $i = 1; $i < $this->userExpLen; $i++ )
		{
			if ( $exp < $this->userExpInfo[$i] )
			{
				$arr['level'] = $i - 1;
				$arr['nextexp'] = $this->userExpInfo[$i];
				$arr['diff']    = $this->userExpInfo[$i] - $this->userExpInfo[$i - 1];
				$arr['cur']     = $this->userExpInfo[$i - 1];
				$arr['exp']     = $exp;
				return $arr;
			}
		}

		$arr['level']   = $this->userExpLen - 1;
		$arr['nextexp'] = $this->userExpInfo[$this->userExpLen - 1];
		$arr['diff']    = $this->userExpInfo[$this->userExpLen - 1] - $this->userExpInfo[$this->userExpLen - 2];
		$arr['cur']     = $this->userExpInfo[$this->userExpLen - 2];
		$arr['exp']     = $arr['nextexp'];
		return $arr;
	}

	public function levelUpByMedicine( $uid, $num, $id, $hid )
	{
		$arr = array(
			'error' => 0
		);

		$exp         = 0;
		$medicineExp = 0;
		$level       = 0;
		$nextExp     = 0;
		$diffExp     = 0;
		$curExp      = 0;
		$this->db->changeDriver( 't_package' );
		$eq   = array( 'uid' => $uid, 'id' => $id );

		$result = $this->db->operator( MYSQL_GET, null, $eq );
		if ( !$result )
		{
			$arr['error'] = EMPTY_PACKAGE;
			return $arr;
		}

        $userMedicineNum = $result[0]['num'];
		if ( $userMedicineNum < $num )
		{
			$arr['error'] = NOT_ENOUGH_MEDICINE;
			return $arr;
		}

        $topExp = $this->getHeroTopExp();
        $userherolistobj = new UserHeroList( $uid );
		$levelinfo = $userherolistobj->getHeroLevelAndExp( $hid );
		if ( ( $levelinfo['level'] >= ( $this->heroExpLen - 1 ) ) || ( $levelinfo['exp'] >= $topExp ) )
		{
			$arr['error'] = HERO_TOP_EXP;
			return $arr;
		}

		switch ( $id )
		{
			case T_MEDICINE: $medicineExp =   60; break;
			case M_MEDICINE: $medicineExp =  300; break;
			case B_MEDICINE: $medicineExp = 1500; break;
			case S_MEDICINE: $medicineExp = 7500; break;
			default: $arr['error'] = NO_MEDICINE_ID; return $arr;
		}

        if ( $num > 0 )
		{
		    $exp   = $medicineExp * $num + $levelinfo['exp'];
			$info  = $this->getHeroNextExpAndLevel( $exp );
			$level = $info['level'];
			$nextExp = $info['nextexp'];
			$diffExp = $info['diff'];
			$exp     = $info['exp'];
			$curExp  = $exp - $info['cur'];
		}
		else
		{
			$maxExp = $userMedicineNum * $medicineExp;
			if ( $maxExp >= $topExp )
			{
				$exp   = $topExp;
			    $num   = ceil( ( $topExp - $levelinfo['exp'] ) / $medicineExp );
			    $level = $this->heroExpLen - 1;
				$nextExp = $topExp;
				$diffExp = $topExp - $this->heroExpInfo[$this->heroExpLen - 2];
				$curExp  = $diffExp;
			}
			else
			{
				$exp = $maxExp;
				$num = $userMedicineNum;
				$info  = $this->getHeroNextExpAndLevel( $exp );
			    $level = $info['level'];
				$nextExp = $info['nextexp'];
				$diffExp = $info['diff'];
				$exp     = $info['exp'];
				$curExp  = $exp - $info['cur'];
			}
		}

		$need = array( 'num' => array( 'sub' => $num ) );
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( !$ret )
		{
			$arr['error'] = SUB_MEDICINE_ERROR;
			return $arr;
		}
		
        $ret = $userherolistobj->setHeroLevelAndExp( $hid, $level, $exp, $levelinfo['level'], $levelinfo['exp'] );
		if ( !$ret )
		{
			$arr['error'] = SUB_MEDICINE_ERROR;
			return $arr;
		}

		$arr['update_package'] = array();
		$arr['update_hero']    = array();

		array_push( $arr['update_package'], array( 'id'  => $id, 'num' => $userMedicineNum - $num ) );

		$hero = $userherolistobj->getOneHeroDetail( $hid );
		$hero['nextexp'] = $nextExp;
		$hero['diff']    = $diffExp;
		$hero['cur']     = $curExp;
		array_push( $arr['update_hero'], $hero );

		return $arr;
	}

	public function initAccount( $crc, $siteuid, $uid, $plat, $time )
	{
	}

	public function initUserInfo( $array )
	{
	}

	public function getPackage( $eq )
	{
		$this->db->changeDriver( 't_package' );
		return $this->db->operator( MYSQL_GET, null, $eq );
	}

	public function getHeroInfo( $hid )
	{
		global $HERO_CONFIG;
		return isset( $HERO_CONFIG[$hid] ) ? $HERO_CONFIG[$hid] : null;
	}

	public function mergeHero( $uid, $hid )
	{
		$arr = array(
			'error' => 0
		);

		//判断这个英雄在不在配置表里
		$info = $this->getHeroInfo( $hid );
		if ( empty( $info ) )
		{
			$arr['error'] = NO_HERO_CONF;
			return $arr;
		}

		//首先判断用户是否已经有该英雄
		$userherolistobj = new UserHeroList( $uid );
		$h = $userherolistobj->getOneHeroDetail( $hid );
		if ( !empty( $h ) )
		{
			$arr['error'] = HERO_EXISTED;
			return $arr;
		}

		//查看用户背包里面的英雄碎片数量
		$eq = array( 'uid' => $uid, 'id' => $hid );
		$array = $this->getPackage( $eq );
		if ( empty( $array ) )
		{
			$arr['error'] = NO_HERO_FRAGMENT;
			return $arr;
		}

		$fragment = $array[0]['num'];
		if ( $fragment < $info['fragment'] )
		{
			$arr['error'] = NOT_ENOUGH_FRAGMENT;
			return $arr;
		}

		$need = array( 'num' => array( 'sub' => $info['fragment'] ) );
		$eq['num'] = $fragment;
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( !$ret )
		{
			$arr['error'] = SUB_FRAGMENT_ERROR;
			return $arr;
		}

		//合成英雄
		$ret = $userherolistobj->addNewHero( $hid );
		if ( empty( $ret ) )
		{
			$need = array( 'num' => array( 'add' => $info['fragment'] ) );
			unset( $eq['num'] );
			$this->db->operator( MYSQL_UPDATE, $need, $eq );

			$arr['error'] = SUMMON_HERO_ERROR;
			return $arr;
		}

		$arr['update_package'] = array();
		$arr['add_hero']    = array();

		array_push( $arr['update_package'], array( 'id'  => $hid, 'num' => $fragment - $info['fragment'] ) );

		$hero = $userherolistobj->getOneHeroDetail( $hid );
		$hero['nextexp'] = $this->heroExpInfo[2];
		$hero['diff']    = $hero['nextexp'];
		$hero['cur']     = 0;
		array_push( $arr['add_hero'], $hero );

		return $arr;
	}
}
?>