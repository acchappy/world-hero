<?php


class IFight
{
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
	public static $AttackType_Normal 		= 0;
	public static $AttackType_SmallSkill 	= 1;
	public static $AttackType_BigSkill 		= 2;

	public static $BigSkill_JiaXueArr = array( 1006 );
	public static $SmallSkill_JiaXueArr = array( 1006 );

    private $left       = null;//左边英雄列表 1-6
	private $right      = null;//右边------- 11-16
	private $against    = array();//打击顺序
	private $rounds     = 0;//回合数 从1开始
	private $leftBattle = 0;//左边上阵英雄人数
	private $rightBattle= 0;//右边----------
	private $leftAlive  = 0;//左边活着英雄人数
	private $rightAlive = 0;//右边----------
	private $leftDrop   = 0;//左边掉的总血量
	private $rightDrop  = 0;//右边--------
	private $leftAttackBegin  = 0;//左边每回合首个攻击 sid
	private $rightAttackBegin = 0;//右边----------------
	private $attStand   = null;//攻击阵型
	private $defStand   = null;//防守阵型
	public  $process    = null;//返回给客户端 数据

	private $battle = null;

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

		$this->battle = new Battle();
	}

	public function initHero( $uid , $side )
	{
		$this->process  = array();
		$this->rounds   = 1;

		$heros 		= null;
		$attStand 	= null;
		$alive    	= null;
		$battle 	= null;

		if( $side == 'left' ) {
			$this->leftDrop   = 0;
			$this->leftAttackBegin  = 1;

			$heros 		= &$this->left;
			$attStand 	= &$this->attStand;
			$alive   	= &$this->leftAlive;
			$battle 	= &$this->leftBattle;
		} else {
			$this->rightDrop  = 0;
			$this->rightAttackBegin = 11;

			$heros 		= &$this->right;
			$attStand 	= &$this->defStand;
			$alive   	= &$this->rightAlive;
			$battle 	= &$this->rightBattle;
		}
		

		$attStand = array();
		$alive 	  = array();

		if ( !empty( $heros ) )
		{
			unset( $heros );
		}
		$heros = array();

		$obj = new UserHeroList( $uid );
        $h   = $obj->getAliveHeroDetail();

		for ( $k = 1; $k <= 6; $k++ )
		{
			$j = 'seat'.$k;

			$i = $k;
			if( $side != 'left' ) {
				$i = $k + 10;
			}

			if ( !empty( $h[$j] ) && ( $h[$j]['blood'] > 0 ) )
			{
				$heros[$i] = $h[$j];
				$heros[$i]['seat'] = $i;
				$heros[$i]['name'] = $side . '边英雄'.$i;
				$heros[$i]['initblood'] = $h[$j]['blood'];

				array_push( $attStand, array(
					                         'seat'  => $i,
					                         'hid'   => $heros[$i]['hid'],
					                         'level' => $heros[$i]['level'],
					                         'blood' => $heros[$i]['blood'],
					                         'quality' => $heros[$i]['quality'],
					                         'battle' =>  $heros[$i]['battle']
				) );
				$battle++;
			}
		}
		$alive = $battle;
	}

	//初始化上阵英雄，从DB拉取数据
	public function initUser( $leftUid, $rightUid )
	{
		$this->initHero( $leftUid , 'left' );
		$this->initHero( $rightUid , 'right' );

		$this->testFight();
	}

	//初始化推图怪物
	public function initMapUserAndMonster( $uid, $monsterList )
	{
		$this->attStand = array();
		$this->defStand = array();
		$this->process  = array();

        $this->rounds     = 1;
		$this->leftAlive  = 0;
		$this->rightAlive = 0;
		$this->leftDrop   = 0;
		$this->rightDrop  = 0;
		$this->leftAttackBegin  = 1;
        $this->rightAttackBegin = 11;

		if ( !empty( $this->left ) )
		{
			unset( $this->left );
		}
		$this->left = array();

		if ( !empty( $this->right ) )
		{
			unset( $this->right );
		}
		$this->right = array();

		$obj = new UserHeroList( $leftUid );
        $h   = $obj->getAliveHeroDetail();

		for ( $i = 1; $i <= 6; $i++ )
		{
			$j = 'seat'.$i;
			if ( !empty( $h[$j] ) && ( $h[$j]['blood'] > 0 ) )
			{
				$this->left[$i] = $h[$j];
				$this->left[$i]['seat'] = $i;
				$this->left[$i]['name'] = '左边英雄'.$i;

				array_push( $this->attStand, array(
					                         'seat'  => $i,
					                         'hid'   => $this->left[$i]['hid'],
					                         'level' => $this->left[$i]['level'],
					                         'blood' => $this->left[$i]['blood'],
					                         'quality' => $this->left[$i]['quality'],
					                         'battle' =>  $this->left[$i]['battle']
				) );
				$this->leftBattle++;
			}
		}
		$this->leftAlive = $this->leftBattle;

		for ( $k = 1; $k <= 6; $k++ )
		{
			$j = 'seat'.$i;
			if ( !empty( $monsterList[$j] ) && ( $monsterList[$j]['blood'] > 0 ) )
			{
				$i = $k + 10;
				$this->right[$i] = array();
				$this->right[$i]['seat']     = $i;
			    $this->right[$i]['hid']      = $monsterList[$j]['hid'];
			    $this->right[$i]['name']     = '右边英雄'.$i;
			    $this->right[$i]['level']    = $monsterList[$j]['level'];
			    $this->right[$i]['skill1']   = $monsterList[$j]['skill1'];
			    $this->right[$i]['skill2']   = $monsterList[$j]['skill2'];
			    $this->right[$i]['skill3']   = $monsterList[$j]['skill3'];
			    $this->right[$i]['skill4']   = $monsterList[$j]['skill4'];
			    $this->right[$i]['quality']  = $monsterList[$j]['quality'];
			    $this->right[$i]['blood']    = $monsterList[$j]['blood'];
			    $this->right[$i]['health']   = $monsterList[$j]['blood'];
			    $this->right[$i]['parmor_m'] = $monsterList[$j]['parmor_m'];
			    $this->right[$i]['marmor_m'] = $monsterList[$j]['marmor_m'];
			    $this->right[$i]['attack_t'] = $monsterList[$j]['attack_t'];
			    $this->right[$i]['attack']   = $monsterList[$j]['attack'];
			    $this->right[$i]['cross_m']  = $monsterList[$j]['cross_m'];
			    $this->right[$i]['miss']     = isset( $monsterList[$j]['miss'] )    ? $monsterList[$j]['miss']    : 0;
			    $this->right[$i]['gedang']   = isset( $monsterList[$j]['gedang'] )  ? $monsterList[$j]['gedang']  : 0;
			    $this->right[$i]['jianren']  = isset( $monsterList[$j]['jianren'] ) ? $monsterList[$j]['jianren'] : 0;
			    $this->right[$i]['huixue']   = isset( $monsterList[$j]['huixue'] )  ? $monsterList[$j]['huixue']  : 0;
			    $this->right[$i]['chongsheng'] = isset( $monsterList[$j]['chongsheng'] ) ? $monsterList[$j]['chongsheng'] : 0;
			    $this->right[$i]['baoji']    = isset( $monsterList[$j]['baoji'] )   ? $monsterList[$j]['baoji'] : 0;
			    $this->right[$i]['bisha']    = isset( $monsterList[$j]['bisha'] )   ? $monsterList[$j]['bisha'] : 0;
			    $this->right[$i]['jiashen']  = isset( $monsterList[$j]['jiashen'] ) ? $monsterList[$j]['jiashen'] : 0;
			    $this->right[$i]['shengjian']= isset( $monsterList[$j]['shengjian'] ) ? $monsterList[$j]['shengjian'] : 0;
			    $this->right[$i]['zhongji']  = isset( $monsterList[$j]['zhongji'] ) ? $monsterList[$j]['zhongji'] : 0;
			    $this->right[$i]['battle']   = isset( $monsterList[$j]['battle'] )  ? $monsterList[$j]['battle'] : 0;
				array_push( $this->defStand, array(
					                         'seat'  => $i,
					                         'hid'   => $this->right[$i]['hid'],
					                         'level' => $this->right[$i]['level'],
					                         'blood' => $this->right[$i]['blood'],
					                         'quality' => $this->right[$i]['quality'],
					                         'battle' =>  $this->right[$i]['battle']
				) );
				$this->rightBattle++;
			}
		}
		$this->rightAlive = $this->rightBattle;

		$this->testFight();
	}

	//计算每回合左边谁打
	public function attackBeginLeft()
    {
        if ( $this->leftAttackBegin > 6 )
        {
            $this->leftAttackBegin = 1;
            $this->rounds++;
        }
        
        $i = 0;
        if ( isset( $this->left[$this->leftAttackBegin] ) && ( $this->left[$this->leftAttackBegin]['blood'] > 0 ) )
        {
            $i = $this->leftAttackBegin;
        }
        $this->leftAttackBegin++;

        return $i;
    }

    //计算每回合右边谁打
	public function attackBeginRight()
    {
        if ( $this->rightAttackBegin > 16 )
        {
            $this->rightAttackBegin = 11;
        }

        $i = 0;
        if ( isset( $this->right[$this->rightAttackBegin] ) && ( $this->right[$this->rightAttackBegin]['blood'] > 0 ) )
        {
            $i = $this->rightAttackBegin;
        }
        $this->rightAttackBegin++;

        return $i;
    }

    //计算攻击次序
	public function attackAgainst( &$arr, $index )
    {
        for ( $j = 0; $j < 6; $j++ )
        {
			$i = $this->against[$index][$j];
            if ( isset( $arr[$i] ) && ( $arr[$i]['blood'] > 0 ) )
            {
                return $i;
            }
        }
        return 0;
    }

    //取存活英雄列表
	public function getAliveHero( &$hero )
	{
		$array = array();
		for ( $i = 0, $len = count( $hero ); $i < $len; $i++ )
		{
			if ( !empty( $hero[$i]['hid'] ) )
			{
				array_push( $array, $hero[$i] );
			}
		}

		return $array;
	}

	//根据hid返回英雄
	public function searchHeroByHid( &$hero, $hid )
	{
		foreach ( $hero as $k => $v )
		{
			if ( $v['hid'] == $hid )
			{
				return $k;
			}
		}

		return 0;
	}

	public function getAttackType( &$gong_info )
	{
		$gailv = 0.5;
		if( $this->isHit( $gailv ) ) {
			return IFight::$AttackType_BigSkill;
		}

		$gailv = 0.3;
		if( $this->isHit( $gailv ) ) {
			return IFight::$AttackType_SmallSkill;
		}

		return IFight::$AttackType_Normal;
	}

	//每回合打斗模拟
	public function fightRound( &$attackArr, $begin, &$attackedArr, $attacked, &$drop, &$alive )
	{
		$gong_info = $attackArr[$begin];
		$hid  = intval($gong_info['hid']);
		$attack_type = $this->getAttackType( $gong_info );

		$aliveHero = null;
		$hurt      = null;
		$is_jiaxue = false;

		if( $attack_type == IFight::$AttackType_BigSkill ) {
			if( in_array( $hid, IFight::$BigSkill_JiaXueArr ) ) {//加血
				$is_jiaxue = true;
			}
		} elseif( $attack_type == IFight::$AttackType_SmallSkill ) {
			if( in_array( $hid, IFight::$SmallSkill_JiaXueArr ) ) {//加血
				$is_jiaxue = true;
			}
		}

		if( false == $is_jiaxue ) {//伤害
			$aliveHero = $this->getAliveHero( $attackedArr );
		} else {//加血
			$aliveHero = $this->getAliveHero( $attackArr );
		}
		$hurt = $this->getHurtInfo( $gong_info, $attackedArr[$attacked], $aliveHero, 
									$attack_type, $is_jiaxue );
		

		$hurtinfo  = $hurt['hurtinfo'];
		$midDef = array();
		$endDef = array();
		$attEffect = 0;
		$defEffect = 0;
		$attType   = 1;
		
		if ( $hurt['gong_spe'] > 0 )
		{
			switch( $hurt['gong_spe_type'] )
			{
				case SPE_SKILL_BAOJI	: $attEffect = 1; break;
				case SPE_SKILL_BISHA	: $attEffect = 2; break;
				case SPE_SKILL_JIASHEN	: $attEffect = 3; break;
				case SPE_SKILL_SHENGJIAN: $attEffect = 4; break;
				case SPE_SKILL_ZHONGJI	: $attEffect = 5; break;
				case SPE_SKILL_ZHILIAO 	: $attEffect = 6; break;
			}
		}

		//如果是治愈英雄
		if ( $attEffect == 6 )
		{
			$attEffect = 0;
			$attType   = 2;

            //全体加血
			if ( $hurt['gong_fanwei'] == 20 )
			{
			    foreach ( $attackArr as $k => $v )
			    {
				    if ( $v['blood'] <= 0 )
				    {
					    continue;
				    }

				    // 这里先hardcode，后面改为接口返回
				    $attackArr[$k]['blood'] += 1000;
				    array_push( $midDef, array(
					                     'seat' => $v['seat'],
					                     'hid'  => $v['hid'],
					                     'effect' => $attEffect,
					                     'drop'   => 1000,
					                     'blood'  => $attackArr[$k]['blood'],
					                     'dead'   => 0
					                 )
				    );
			    }
		    }
			else
			{
				//找出我方血最少加上
				$min = PHP_INT_MAX;
				$index = 0;
				foreach ( $attackArr as $k => $v )
			    {
				    if ( ( $v['blood'] > 0 ) && ( $v['blood'] < $min ) )
				    {
					    $min = $v['blood'];
						$index = $k;
				    }
			    }

				// 这里先hardcode，后面改为接口返回
				$attackArr[$index]['blood'] += 1000;
				array_push( $midDef, array(
					                     'seat' => $attackArr[$index]['seat'],
					                     'hid'  => $attackArr[$index]['hid'],
					                     'effect' => $attEffect,
					                     'drop'   => 1000,
					                     'blood'  => $attackArr[$index]['blood'],
					                     'dead'   => 0
					                 )
				);
			}
		}
		else
		{
            for ( $i = 0, $len = count( $hurtinfo ); $i < $len; $i++ )
		    {
			    $blood = $hurtinfo[$i]['hurt'];
			    $index = $this->searchHeroByHid( $attackedArr, $hurtinfo[$i]['hid'] );
			    if ( $attackedArr[$index]['blood'] <= 0 )
			    {
				    continue;
			    }

			    $attackedArr[$index]['blood'] -= $blood;
				$drop -= $blood;
			    $afterAttackBlood = $attackedArr[$index]['blood'];
			
			    if ( $hurtinfo[$i]['shou_spe'] > 0 )
			    {
				    switch( $hurtinfo[$i]['shou_spe_type'] )
				    {
					    case 'miss':    $defEffect = 1; break;
					    case 'gedang':  $defEffect = 2; break;
					    case 'jianren': $defEffect = 3; break;
					    case 'huixue':  if ( $attackedArr[$index]['blood'] > 0 )
						                {
							                $defEffect = 4; 
											$attackedArr[$index]['blood'] += $hurtinfo[$i]['shou_spe_num'];
										}
										break;
						case 'chongsheng': if ( $attackedArr[$index]['blood'] <= 0 )
							            {
							                $defEffect = 5;
									        $attackedArr[$index]['blood'] = $hurtinfo[$i]['shou_spe_num'];
									    }
										break;
					}
				}
				
				if ( $attackedArr[$index]['blood'] <= 0 )
				{
					$this->rightAlive--;
				}
				
				array_push( $midDef, array(
						'seat'  => $attackedArr[$index]['seat'],
						'hid'   => $attackedArr[$index]['hid'],
						'effect'=> $defEffect,
						'drop'  => 0 - $blood,
						'blood' => ( $afterAttackBlood > 0 ) ? $afterAttackBlood : 0,
						'dead'  => ( $attackedArr[$index]['blood'] > 0 ) ? 0 : 1
						)
				);

				array_push( $endDef, array(
						'seat' => $attackedArr[$index]['seat'],
						'hid'  => $attackedArr[$index]['hid'],
						'effect' => ( $defEffect == 4 || $defEffect == 5 ) ? $defEffect : 0,
						'value' => ( $defEffect == 4 || $defEffect == 5 ) ? $hurtinfo[$i]['shou_spe_num'] : 0
						)
				);
			}
		}

		array_push( $this->process, array(
				                            'mid' => array(
				                                'att' => array(
				                                    'seat' => $attackArr[$begin]['seat'],
					                                'hid'  => $attackArr[$begin]['hid'],
					                                'type' => $attType,
				                                    'skill' => $hurt['gong_type'],
					                                'range' => ( $hurt['gong_fanwei'] == 20 ) ? 100 : $attackedArr[$index]['seat'],
					                                'effect' => $attEffect
				                                ),
					                            'def' => $midDef
				                            ),
				                            'end' => array(
					                            'att' => array(
						                            'seat' => $attackArr[$begin]['seat'],
					                                 'hid' => $attackArr[$begin]['hid'],
						                             'effect' => 0,
						                             'value' => 0
					                             ),
					                             'def' => $endDef
				                            )
				                        ) 
		);
	}

	//每回合打斗模拟
	public function testFight()
	{
		do{
			if ( ( $this->leftAlive <= 0 ) || ( $this->rightAlive <= 0 ) )
			{
				break;
			}
			$begin = $this->attackBeginLeft();
			if ( $begin > 0 )
			{
				$attacked = $this->attackAgainst( $this->right, $begin );
				if ( $attacked <= 0 )
                {
			        break;
                }

				$this->fightRound( $this->left, $begin, $this->right, $attacked, $this->rightDrop, $this->rightAlive );
			}

			$begin = $this->attackBeginRight();
			if ( $begin > 0 )
			{
				$attacked = $this->attackAgainst( $this->left, $begin );
				if ( $attacked <= 0 )
                {
			        break;
                }

				$this->fightRound( $this->right, $begin, $this->left, $attacked, $this->leftDrop, $this->leftAlive );
			}

			if ( $this->rounds >= 20 )
			{
				break;
			}
		} while( true );
	}

	//每回合打完的星星数量
    public function getStar( $battle, $alive )
	{
		if ( $alive <= 0 )
		{
			return 0;
		}
		else if ( $battle == $alive )
		{
			return 3;
		}
		else if ( $battle - $alive == 1 )
		{
			return 2;
		}
		else
		{
			return 1;
		}
	}

	//build数据给客户端
	public function buildFight()
	{
		if ( ( $this->leftAlive > 0 ) && ( $this->rightAlive > 0 ) )
		{
			if ( $this->rightDrop > $this->leftDrop )
			{
				$status = 1;
			}
			else
			{
				$status = 0;
			}
		}
		else
		{
			$status = ( $this->leftAlive <= 0 ) ? 0 : 1;
		}

		$result = array(
			'battle' => array(
			    'stand' => array(
			        'attack' => $this->attStand,
			        'def'    => $this->defStand
			    ),
			    'huihe' => $this->process,
			    'win' => array(
			        'status' => $status,
			        'star'   => $this->getStar( $this->leftBattle, $this->leftAlive ),
			        'prize'  => array()
			    )
			)
		);

		return $result;
	}

	//是否触发，比如是否闪避，是否暴击等等
	public function isHit( $gailv ) 
	{
		$hit = $gailv * RANDOM_JISHU ;
		$rand = mt_rand(1, RANDOM_JISHU) ;
		if( $rand <= $hit ) {//成功
			return true;
		}
		return false;
	}


	public function getSingleHurtInfo(&$gong_info , &$shou_info, $attack_type, $is_jiaxue)
	{
		global $SKILL_CONF;

		$gong_hid		= intval($gong_info['hid']);
		$gong_level 	= intval($gong_info['level']);
		$gong_skill2 	= intval($gong_info['skill2']);
		$gong_attack_t 	= intval($gong_info['attack_t']);
		$gong_attack 	= intval($gong_info['attack']);
		$gong_cross_m 	= $gong_info['cross_m'];

		$shou_hid		= intval($shou_info['hid']);
		$shou_level 	= intval($shou_info['level']);
		$shou_skill2 	= intval($shou_info['skill2']);
		$shou_parmor_m 	= $shou_info['parmor_m'];
		$shou_marmor_m 	= $shou_info['marmor_m'];

		$skill_obj = new Skill();

		//攻击和防守的天赋1
		$gong_tianfu1 = $SKILL_CONF[$gong_hid]['tianfu1'];
		$shou_tianfu1 = $SKILL_CONF[$shou_hid]['tianfu1'];
		//攻击的特效系数
		$gong_xishu_info = $skill_obj->GetTianfu1XiShu($gong_skill2, $gong_tianfu1);
		$gong_gong_m = $gong_xishu_info['gong'];
		$gong_spe_m = $gong_xishu_info['gong_spe'];
		//防守的特技系数
		$shou_xishu_info = $skill_obj->GetTianfu1XiShu($shou_skill2, $shou_tianfu1);
		$shou_shou_m = $shou_xishu_info['shou'];
		$shou_spe_m = $shou_xishu_info['shou_spe'];

		$hurtinfo = array();
		$hurtinfo['hid'] = $shou_hid;//最终伤害
		$hurtinfo['gong_type'] = IFight::$AttackType_Normal;
		$hurtinfo['hurt'] = 0;//最终伤害
		$hurtinfo['gong_spe'] = 0;//攻击方是否触发特技
		$hurtinfo['gong_spe_type'] = '';
		$hurtinfo['shou_spe'] = 0;//防守方是否触发特技
		$hurtinfo['shou_spe_type'] = '';
		$hurtinfo['shou_spe_num'] = 0;//主要针对回血和重生

		$hurt = $gong_attack * $gong_cross_m * $gong_gong_m / $shou_shou_m;
		//计算防御之后的具体伤害
		//基础护甲
		if( $gong_attack_t == ATTACK_TYPE_PHYSICS ) {
			$hurt /= $shou_parmor_m;
		} else {
			$hurt /= $shou_marmor_m;
		}
		//不带任何技能的基础伤害计算end

		//先判断是否大招，大招除了重生，其他特技都不会触发
		if( $attack_type == IFight::$AttackType_BigSkill ) {
			$hurtinfo['gong_type'] = IFight::$AttackType_BigSkill;
			$hurt = intval( $hurt * $gong_spe_m * 4 );

			if( $shou_tianfu1 == SPE_SKILL_CHONGSHENG ) {//重生
				$blood = intval( $shou_info['blood'] );
				$chongsheng = ($shou_spe_m - 1) * $blood;
				$hurtinfo['shou_spe'] = 1;
				$hurtinfo['shou_spe_type'] = SPE_SKILL_CHONGSHENG;
				$hurtinfo['shou_spe_num'] = $chongsheng;
			} else {
				$hurt /= $shou_spe_m;
			}
			
			$hurtinfo['hurt'] = intval( $hurt );

			return $hurtinfo;
		}

		//是否小技能
		if( $attack_type == IFight::$AttackType_SmallSkill ) {
			$hurtinfo['gong_type'] = IFight::$AttackType_SmallSkill;
			$hurt *= 1.5;
		}


		//首先计算闪避的情况，一旦闪避其他都不用计算了
		if( $shou_spe_m > 1 && $shou_tianfu1 == SPE_SKILL_MISS ) {
			//闪避概率 闪避太厉害，要削弱一点
			$miss = 1 - 1 / $shou_spe_m ;
			if( $this->isHit( $miss ) ) {
				$hurtinfo['shou_spe'] = 1;
				$hurtinfo['shou_spe_type'] = SPE_SKILL_MISS;

				return $hurtinfo;
			}
		}
		
		
		if( $gong_spe_m <= 1 ) {
			//do nothing
		}
		else if( $gong_tianfu1 == SPE_SKILL_BAOJI ) {//暴击
			$beishu = 3;
			$baoji = ( $gong_spe_m - 1 ) / ( $beishu - 1 );
			if( $this->isHit( $baoji ) ) {
				$hurt *= $beishu;

				$hurtinfo['gong_spe'] = 1;
				$hurtinfo['gong_spe_type'] = SPE_SKILL_BAOJI;
			}
		}
		else if( $gong_tianfu1 == SPE_SKILL_BISHA ) {//必杀
			$beishu = 4;
			$bisha = ($gong_spe_m - 1) / ( $beishu - 1 );
			if( $this->isHit( $bisha ) ) {
				$hurt *= $beishu;

				$hurtinfo['gong_spe'] = 1;
				$hurtinfo['gong_spe_type'] = SPE_SKILL_BISHA;
			}
		}
		else if( $gong_tianfu1 == SPE_SKILL_SHENGJIAN ) {//圣剑
			$beishu = 5;
			$shengjian = ($gong_spe_m - 1) / ( $beishu - 1 );
			if( $this->isHit( $shengjian ) ) {
				$hurt *= $beishu;

				$hurtinfo['gong_spe'] = 1;
				$hurtinfo['gong_spe_type'] = SPE_SKILL_SHENGJIAN;
			}
		}
		else if( $gong_tianfu1 == SPE_SKILL_JIASHEN ) {//加深
			$hurt *= $gong_spe_m;
		}
		else if( $gong_tianfu1 == SPE_SKILL_ZHONGJI ) {//重击
			$zhongji = 0.5;
			if( $this->isHit( $zhongji ) ) {
				$hurt_m = ($gong_spe_m - 1) / 0.5 + 1;
				$hurt *= $hurt_m;

				$hurtinfo['gong_spe'] = 1;
				$hurtinfo['gong_spe_type'] = SPE_SKILL_ZHONGJI;
			}
		}
		
		//技能效果
		if( $shou_spe_m <= 1 ) {
			//do nothing
		}
		else if( $shou_tianfu1 == SPE_SKILL_GEDANG ) {//格挡
			if( $shou_spe_m > 1 && $this->isHit( 0.5 ) ) {
				$hurt = ( 2 / $shou_spe_m - 1 ) * $hurt;

				$hurtinfo['shou_spe'] = 1;
				$hurtinfo['shou_spe_type'] = SPE_SKILL_GEDANG;
			}
		}
		else if( $shou_tianfu1 == SPE_SKILL_JIANREN ) {//坚韧
			$hurt = $hurt / $shou_spe_m ;
		}
		else if( $shou_tianfu1 == SPE_SKILL_HUIXUE ) {//回血
			$huixue = (1 - 1/$shou_spe_m) * $hurt;
			$hurtinfo['shou_spe'] = 1;
			$hurtinfo['shou_spe_type'] = SPE_SKILL_HUIXUE;
			$hurtinfo['shou_spe_num'] = $huixue;
		}
		else if( $shou_tianfu1 == SPE_SKILL_CHONGSHENG ) {//重生
			$blood = intval( $shou_info['blood'] );
			$chongsheng = ($shou_spe_m - 1) * $blood;
			$hurtinfo['shou_spe'] = 1;
			$hurtinfo['shou_spe_type'] = SPE_SKILL_CHONGSHENG;
			$hurtinfo['shou_spe_num'] = $chongsheng;
			
		}

		$hurt = max( $hurt, 1 );
		$hurtinfo['hurt'] = intval( $hurt );//最终伤害
		$hurtinfo['shou_spe_num'] = intval( $hurtinfo['shou_spe_num'] );//主要针对回血和重生

		return $hurtinfo;
	}


	//根据攻防计算出伤害
	public function getHurtInfo(&$gong_info , &$shou_info, &$shou_all_alive_info, 
								$attack_type, $is_jiaxue)
	{
		$retarr = array();

		$retarr['gong_fanwei'] = ATTACK_FANWEI_1;

		//先判断是否大招，大招除了重生，其他特技都不会触发
		if( $attack_type == IFight::$AttackType_BigSkill ) {

			$isAllAttack = false;

			if( $isAllAttack ) {//全体伤害
				$retarr['gong_fanwei'] = ATTACK_FANWEI_2;
				foreach( $shou_all_alive_info as &$value ) {
					$blood = intval( $value['blood'] );
					if( $blood <= 0 ) {
						continue;
					}
					
					$hurtinfo = $this->getSingleHurtInfo($gong_info, $value, $attack_type, $is_jiaxue);

					$this->dealRetHurt($retarr, $hurtinfo);
				}

				return $retarr;
			} 
			
		}
		//全体攻击end
		
		//单体攻击
		$hurtinfo = $this->getSingleHurtInfo($gong_info, $shou_info, $attack_type, $is_jiaxue);

		$this->dealRetHurt($retarr, $hurtinfo);
		return $retarr;
	}

	public function dealRetHurt(&$retarr, &$hurtinfo)
	{
		$retarr['gong_type'] = $hurtinfo['gong_type'];
		$retarr['gong_spe'] = $hurtinfo['gong_spe'];
		$retarr['gong_spe_type'] = $hurtinfo['gong_spe_type'];
		unset( $hurtinfo['gong_type'] );
		unset( $hurtinfo['gong_spe'] );
		unset( $hurtinfo['gong_spe_type'] );

		$retarr['hurtinfo'][] = $hurtinfo;
	}
}
?>