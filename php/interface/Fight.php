<?php
class Fight
{
	private $leftHero  = array();
	private $rightHero = array();
	private $heroLen   = 12;
	private $sideLen   = 6;
	private $aliveHeroLen = 0;
	private $leftAlive = 0;
	private $rightAlive = 0;

	private $leftAttackBegin = 0;
	private $rightAttackBegin = 0;
	private $leftAttacked = 0;
	private $rightAttacked = 0;

	private $against = array( 0, '7_8_9_10_11_12', '8_7_9_11_10_12', '9_7_8_12_10_11', '7_8_9_10_11_12', '8_7_9_11_10_12', '9_7_8_12_10_11', 
		                         '1_2_3_4_5_6', '2_1_3_5_4_6', '3_1_2_6_4_5', '1_2_3_4_5_6', '2_1_3_5_4_6', '3_1_2_6_4_5' );

    private $static_armor = 1000.0;
    private $static_miss  = 1000.0;
    private $static_crit  = 1000;
    private $huihe = 0;

	private $aliveHero = null;
	private $left      = null;
	private $right     = null;

	private $attStand = null;
	private $defStand = null;
	private $process  = null;
	private $battle   = null;

	private $debug = false;
	private $desc  = null;

    function __construct()
    {
        for ( $i = 0; $i <= $this->heroLen; $i++ )
        {
            $this->leftHero[$i]  = array();
			$this->leftHero[$i]['hid']      = 0;
			$this->leftHero[$i]['name']     = '';
			$this->leftHero[$i]['level']    = 0;
			$this->leftHero[$i]['skill1']   = 0;
			$this->leftHero[$i]['skill2']   = 0;
			$this->leftHero[$i]['skill3']   = 0;
			$this->leftHero[$i]['skill4']   = 0;
			$this->leftHero[$i]['quality']  = 0;
			$this->leftHero[$i]['blood']    = 0;
			$this->leftHero[$i]['health']   = 0;
			$this->leftHero[$i]['parmor_m'] = 0;
			$this->leftHero[$i]['marmor_m'] = 0;
			$this->leftHero[$i]['attack_t'] = 0;
			$this->leftHero[$i]['attack']   = 0;
			$this->leftHero[$i]['cross_m']  = 0;
			$this->leftHero[$i]['miss']     = 0;
			$this->leftHero[$i]['gedang']   = 0;
			$this->leftHero[$i]['jianren']  = 0;
			$this->leftHero[$i]['huixue']   = 0;
			$this->leftHero[$i]['chongsheng'] = 0;
			$this->leftHero[$i]['baoji']    = 0;
			$this->leftHero[$i]['bisha']    = 0;
			$this->leftHero[$i]['jiashen']  = 0;
			$this->leftHero[$i]['shengjian']= 0;
			$this->leftHero[$i]['zhongji']  = 0;
			$this->leftHero[$i]['battle']   = 0;
			$this->leftHero[$i]['duizhang'] = 0;

            $this->rightHero[$i] = array();
			$this->rightHero[$i]['hid']      = 0;
			$this->rightHero[$i]['name']     = '';
			$this->rightHero[$i]['level']    = 0;
			$this->rightHero[$i]['skill1']   = 0;
			$this->rightHero[$i]['skill2']   = 0;
			$this->rightHero[$i]['skill3']   = 0;
			$this->rightHero[$i]['skill4']   = 0;
			$this->rightHero[$i]['quality']  = 0;
			$this->rightHero[$i]['blood']    = 0;
			$this->rightHero[$i]['health']   = 0;
			$this->rightHero[$i]['parmor_m'] = 0;
			$this->rightHero[$i]['marmor_m'] = 0;
			$this->rightHero[$i]['attack_t'] = 0;
			$this->rightHero[$i]['attack']   = 0;
			$this->rightHero[$i]['cross_m']  = 0;
			$this->rightHero[$i]['miss']     = 0;
			$this->rightHero[$i]['gedang']   = 0;
			$this->rightHero[$i]['jianren']  = 0;
			$this->rightHero[$i]['huixue']   = 0;
			$this->rightHero[$i]['chongsheng'] = 0;
			$this->rightHero[$i]['baoji']    = 0;
			$this->rightHero[$i]['bisha']    = 0;
			$this->rightHero[$i]['jiashen']  = 0;
			$this->rightHero[$i]['shengjian']= 0;
			$this->rightHero[$i]['zhongji']  = 0;
			$this->rightHero[$i]['battle']   = 0;
			$this->rightHero[$i]['duizhang'] = 0;
        }

        $this->leftAttackBegin  = 1;
        $this->rightAttackBegin = 7;
        $this->huihe = 1;
		$this->aliveHeroLen = 0;
		$this->battle = new Battle();
    }

	public function setDebug( $stat )
	{
		$this->debug = $stat;
	}

	public function initUser( $leftUid, $rightUid )
	{
		$this->left  = array();
		$this->right = array();

		$this->attStand = array();
		$this->defStand = array();

		$this->process = array();

		$this->leftAlive = 0;
		$this->rightAlive = 0;

		$obj1  = new UserHeroList( $leftUid );
        $hero1 = $obj1->getAliveHeroDetail();

		for ( $i = 1; $i <= $this->sideLen; $i++ )
		{
			$j = 'seat'.$i;
			if ( !empty( $hero1[$j] ) )
			{
				$hero1[$j]['seat'] = $i;
				array_push( $this->left, $hero1[$j] );
				array_push( $this->attStand, array(
					                         'seat'  => $i,
					                         'hid'   => $hero1[$j]['hid'],
					                         'level' => $hero1[$j]['level'],
					                         'blood' => $hero1[$j]['blood'],
					                         'quality' => $hero1[$j]['quality'],
					                         'battle' => $hero1[$j]['battle']
					) );
			}
		}

		$obj2  = new UserHeroList( $rightUid );
        $hero2 = $obj2->getAliveHeroDetail();
		for ( $i = 1; $i <= $this->sideLen; $i++ )
		{
			$j = 'seat'.$i;
			if ( !empty( $hero2[$j] ) )
			{
				$hero2[$j]['seat'] = $i;
				array_push( $this->right, $hero2[$j] );
				array_push( $this->defStand, array(
					                         'seat'  => $i + 10,
					                         'hid'   => $hero2[$j]['hid'],
					                         'level' => $hero2[$j]['level'],
					                         'blood' => $hero2[$j]['blood'],
					                         'quality' => $hero2[$j]['quality'],
					                         'battle' => $hero2[$j]['battle']
					) );
			}
		}

		$this->initHero( $this->left, $this->right );
		$this->testFight();
	}

	public function initMapUserAndMonster( $uid, $monsterList )
	{
		$this->left  = array();
		$this->right = array();

		$this->attStand = array();
		$this->defStand = array();

		$this->process = array();

		$obj  = new UserHeroList( $uid );
        $hero = $obj->getAliveHeroDetail();

		for ( $i = 1; $i <= $this->sideLen; $i++ )
		{
			$j = 'seat'.$i;
			if ( !empty( $hero[$j] ) )
			{
				$hero[$j]['seat'] = $i;
				array_push( $this->left, $hero[$j] );
				array_push( $this->attStand, array(
					                         'seat'  => $i,
					                         'hid'   => $hero[$j]['hid'],
					                         'level' => $hero[$j]['level'],
					                         'blood' => $hero[$j]['blood'],
					                         'quality' => $hero[$j]['quality'],
					                         'battle' => $hero[$j]['battle']
					) );
			}
		}

		for ( $i = 1; $i <= $this->sideLen; $i++ )
		{
			$j = 'seat'.$i;
			if ( !empty( $monsterList[$j] ) )
			{
				$monsterList[$j]['seat'] = $i;
				array_push( $this->right, $monsterList[$j] );
				array_push( $this->defStand, array(
					                         'seat'  => $i + 10,
					                         'hid'   => $monsterList[$j]['hid'],
					                         'level' => $monsterList[$j]['level'],
					                         'blood' => $monsterList[$j]['blood'],
					                         'quality' => $monsterList[$j]['quality'],
					                         'battle' => $monsterList[$j]['battle']
					) );
			}
		}

		$this->initHero( $this->left, $this->right );
		$this->testFight();
	}

	public function initHero( &$left, &$right )
	{
		for ( $i = 0, $len = count( $left ); $i < $len; $i++ )
		{
			$stand = $left[$i]['seat'];
			$this->leftHero[$stand]['seat']     = $left[$i]['seat'];
			$this->leftHero[$stand]['hid']      = $left[$i]['hid'];
			$this->leftHero[$stand]['name']     = '左边英雄'.$left[$i]['seat'];
			$this->leftHero[$stand]['level']    = $left[$i]['level'];
			$this->leftHero[$stand]['skill1']   = $left[$i]['skill1'];
			$this->leftHero[$stand]['skill2']   = $left[$i]['skill2'];
			$this->leftHero[$stand]['skill3']   = $left[$i]['skill3'];
			$this->leftHero[$stand]['skill4']   = $left[$i]['skill4'];
			$this->leftHero[$stand]['quality']  = $left[$i]['quality'];
			$this->leftHero[$stand]['blood']    = $left[$i]['blood'];
			$this->leftHero[$stand]['health']   = $left[$i]['blood'];
			$this->leftHero[$stand]['parmor_m'] = $left[$i]['parmor_m'];
			$this->leftHero[$stand]['marmor_m'] = $left[$i]['marmor_m'];
			$this->leftHero[$stand]['attack_t'] = $left[$i]['attack_t'];
			$this->leftHero[$stand]['attack']   = $left[$i]['attack'];
			$this->leftHero[$stand]['cross_m']  = $left[$i]['cross_m'];
			$this->leftHero[$stand]['miss']     = isset( $left[$i]['miss'] )    ? $left[$i]['miss']    : 0;
			$this->leftHero[$stand]['gedang']   = isset( $left[$i]['gedang'] )  ? $left[$i]['gedang']  : 0;
			$this->leftHero[$stand]['jianren']  = isset( $left[$i]['jianren'] ) ? $left[$i]['jianren'] : 0;
			$this->leftHero[$stand]['huixue']   = isset( $left[$i]['huixue'] )  ? $left[$i]['huixue']  : 0;
			$this->leftHero[$stand]['chongsheng'] = isset( $left[$i]['chongsheng'] ) ? $left[$i]['chongsheng'] : 0;
			$this->leftHero[$stand]['baoji']    = isset( $left[$i]['baoji'] )   ? $left[$i]['baoji'] : 0;
			$this->leftHero[$stand]['bisha']    = isset( $left[$i]['bisha'] )   ? $left[$i]['bisha'] : 0;
			$this->leftHero[$stand]['jiashen']  = isset( $left[$i]['jiashen'] ) ? $left[$i]['jiashen'] : 0;
			$this->leftHero[$stand]['shengjian']= isset( $left[$i]['shengjian'] ) ? $left[$i]['shengjian'] : 0;
			$this->leftHero[$stand]['zhongji']  = isset( $left[$i]['zhongji'] ) ? $left[$i]['zhongji'] : 0;
			$this->leftHero[$stand]['battle']   = isset( $left[$i]['battle'] )  ? $left[$i]['battle'] : 0;

            if ( $left[$i]['blood'] > 0 )
			{
			    $this->leftAlive++;
				$this->aliveHeroLen++;
			}
		}

		for ( $i = 0, $len = count( $right ); $i < $len; $i++ )
		{
			$stand = $right[$i]['seat'] + $this->sideLen;
			$this->rightHero[$stand]['seat']     = $right[$i]['seat'] + 10;
			$this->rightHero[$stand]['hid']      = $right[$i]['hid'];
			$this->rightHero[$stand]['name']     = '右边英雄'.$right[$i]['seat'];
			$this->rightHero[$stand]['level']    = $right[$i]['level'];
			$this->rightHero[$stand]['skill1']   = $right[$i]['skill1'];
			$this->rightHero[$stand]['skill2']   = $right[$i]['skill2'];
			$this->rightHero[$stand]['skill3']   = $right[$i]['skill3'];
			$this->rightHero[$stand]['skill4']   = $right[$i]['skill4'];
			$this->rightHero[$stand]['quality']  = $right[$i]['quality'];
			$this->rightHero[$stand]['blood']    = $right[$i]['blood'];
			$this->rightHero[$stand]['health']   = $right[$i]['blood'];
			$this->rightHero[$stand]['parmor_m'] = $right[$i]['parmor_m'];
			$this->rightHero[$stand]['marmor_m'] = $right[$i]['marmor_m'];
			$this->rightHero[$stand]['attack_t'] = $right[$i]['attack_t'];
			$this->rightHero[$stand]['attack']   = $right[$i]['attack'];
			$this->rightHero[$stand]['cross_m']  = $right[$i]['cross_m'];
			$this->rightHero[$stand]['miss']     = isset( $right[$i]['miss'] )    ? $right[$i]['miss']    : 0;
			$this->rightHero[$stand]['gedang']   = isset( $right[$i]['gedang'] )  ? $right[$i]['gedang']  : 0;
			$this->rightHero[$stand]['jianren']  = isset( $right[$i]['jianren'] ) ? $right[$i]['jianren'] : 0;
			$this->rightHero[$stand]['huixue']   = isset( $right[$i]['huixue'] )  ? $right[$i]['huixue']  : 0;
			$this->rightHero[$stand]['chongsheng'] = isset( $right[$i]['chongsheng'] ) ? $right[$i]['chongsheng'] : 0;
			$this->rightHero[$stand]['baoji']    = isset( $right[$i]['baoji'] )   ? $right[$i]['baoji'] : 0;
			$this->rightHero[$stand]['bisha']    = isset( $right[$i]['bisha'] )   ? $right[$i]['bisha'] : 0;
			$this->rightHero[$stand]['jiashen']  = isset( $right[$i]['jiashen'] ) ? $right[$i]['jiashen'] : 0;
			$this->rightHero[$stand]['shengjian']= isset( $right[$i]['shengjian'] ) ? $right[$i]['shengjian'] : 0;
			$this->rightHero[$stand]['zhongji']  = isset( $right[$i]['zhongji'] ) ? $right[$i]['zhongji'] : 0;
			$this->rightHero[$stand]['battle']   = isset( $right[$i]['battle'] )  ? $right[$i]['battle'] : 0;

            if ( $right[$i]['blood'] > 0 )
			{
			    $this->rightAlive++;
			}
		}
	}

    public function attackBeginLeft()
    {
        if ( $this->leftAttackBegin > $this->sideLen )
        {
            $this->leftAttackBegin = 1;
            $this->huihe++;
        }
        
        $i = 0;
        if ( $this->leftHero[$this->leftAttackBegin]['blood'] > 0 )
        {
            $i = $this->leftAttackBegin;
        }
        $this->leftAttackBegin++;

        return $i;
    }

    public function attackBeginRight()
    {
        if ( $this->rightAttackBegin > $this->heroLen )
        {
            $this->rightAttackBegin = 7;
        }

        $i = 0;
        if ( $this->rightHero[$this->rightAttackBegin]['blood'] > 0 )
        {
            $i = $this->rightAttackBegin;
        }
        $this->rightAttackBegin++;

        return $i;
    }

    public function attackAgainst( $arr, $index )
    {
        $str = $this->against[$index];
		$list = explode( '_', $str );

        for ( $j = 0, $len = count( $list ); $j < $len; $j++ )
        {
			$i = $list[$j];
            if ( $arr[$i]['blood'] > 0 )
            {
                return $i;
            }
        }
        return 0;
    }

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

	public function searchHeroByHid( &$hero, $hid )
	{
		for ( $i = 0, $len = count( $hero ); $i < $len; $i++ )
		{
			if ( $hero[$i]['hid'] == $hid )
			{
				return $i;
			}
		}

		return 0;
	}

    public function testFight()
    {
	    $blood = 0.0;
        $begin = 0;

		$desc = '';
	    do{
		    if ( ( $this->leftAlive <= 0 ) || ( $this->rightAlive <= 0 ) )
		    {
			    $desc .= '战斗结束<br>';
			    break;
		    }

			$attEffect = 0;
		    $defEffect = 0;
			

            $begin = $this->attackBeginLeft();
            if ( $begin > 0 )
            {
				$desc .= '第'.$this->huihe.'回合        ';
                $this->rightAttacked = $this->attackAgainst( $this->rightHero, $begin );
                if ( $this->rightAttacked <= 0 )
                {
                    $desc .= '战斗结束<br>';
			        break;
                }

                $left  = $this->leftHero[$begin];
				if ( $this->rightHero[$this->rightAttacked]['hid'] == 101 )
				{
					$hurt = array();
					$hurt['gong_spe'] = 0;
					$hurt['gong_fanwei'] = 10;
					$hurt['gong_type']   = 1;
					$hurt['hurtinfo'] = array( array( 'hid' => 101, 'hurt' => 300, 'shou_spe' => 0 ) );
					$hurtinfo = $hurt['hurtinfo'];
				}
				else
				{
                    $aliveHero = $this->getAliveHero( $this->rightHero );
				    $hurt      = $this->battle->getHurtInfo( $left, $this->rightHero[$this->rightAttacked], $aliveHero );
				    $hurtinfo  = $hurt['hurtinfo'];
				}
				$midDef = array();
				$endDef = array();
				$defEffect = 0;
				$attType   = 1;

				if ( $hurt['gong_spe'] > 0 )
				{
					switch( $hurt['gong_spe_type'] )
					{
						case 'baoji': $attEffect = 1;
						              $desc .= $left['name'].'使出了<b>暴击</b>，';
									  break;
					    case 'bisha': $attEffect = 2;
						              $desc .= $left['name'].'使出了<b>必杀</b>，';
									  break;
						case 'jiashen': $attEffect = 3;
						              $desc .= $left['name'].'使出了<b>加深伤害</b>，';
									  break;
						case 'shengjian': $attEffect = 4;
						              $desc .= $left['name'].'使出了<b>圣剑</b>，';
									  break;
						case 'zhongji': $attEffect = 5;
						              $desc .= $left['name'].'使出了<b>重击</b>，';
									  break;
					}
				}

/*-----------------------------------------------------------*/
				if ( $left['hid'] == 1006 )
				{
					for ( $i = 1; $i <= 6; $i++ )
					{
						if ( $this->leftHero[$i]['blood'] > 0 )
						{
							$this->leftHero[$i]['blood'] += 1000;
						}
						else
						{
							continue;
						}
						array_push( $midDef, array(
						    'seat'  => $this->leftHero[$i]['seat'],
						    'hid'   => $this->leftHero[$i]['hid'],
						    'effect'=> 0,
						    'drop'  => 1000,
						    'blood' => $this->leftHero[$i]['blood'],
						    'dead'  => 0
						    )
					    );
					}

					array_push( $this->process, array(
				                            'mid' => array(
				                                'att' => array(
				                                    'seat' => $this->leftHero[$begin]['seat'],
					                                'hid'  => $this->leftHero[$begin]['hid'],
					                                'type'  => 2,
				                                    'skill' => 3,
					                                'range' => 100,
					                                'effect' => 0
				                                ),
					                            'def' => $midDef
				                            ),
				                            'end' => array(
					                            'att' => array(
						                            'seat' => $this->leftHero[$begin]['seat'],
					                                 'hid' => $this->leftHero[$begin]['hid'],
						                             'effect' => 0,
						                             'value' => 0
					                             ),
					                             'def' => $endDef
				                            )
				                        ) 
			        );
				}
				else
				{
/*------------------------------------------------------------*/
				for ( $i = 0, $len = count( $hurtinfo ); $i < $len; $i++ )
				{
					$blood = $hurtinfo[$i]['hurt'];
					$index = $this->searchHeroByHid( $this->rightHero, $hurtinfo[$i]['hid'] );
					if ( $this->rightHero[$index]['blood'] <= 0 )
					{
						break;
					}
				    
					$this->rightHero[$index]['blood'] -= $blood;
					$afterAttackBlood = $this->rightHero[$index]['blood'];

				    if ( $hurtinfo[$i]['shou_spe'] > 0 )
				    {
					    switch( $hurtinfo[$i]['shou_spe_type'] )
					    {
						    case 'miss': $defEffect = 1;
						              $desc .= $this->rightHero[$index]['name'].'<b>躲避</b>了这次伤害，';
									  break;
					        case 'gedang': $defEffect = 2;
						              $desc .= $this->rightHero[$index]['name'].'<b>格挡</b>了这次伤害，';
									  break;
						    case 'jianren': $defEffect = 3;
						              $desc .= $this->rightHero[$index]['name'].'使出了<b>格挡</b>，';
									  break;
						    case 'huixue':if ( $this->rightHero[$index]['blood'] > 0 )
						              {
							              $defEffect = 4;
						                  $desc .= $this->rightHero[$index]['name'].'<b>回血</b>，';
									      $this->rightHero[$index]['blood'] += $hurtinfo[$i]['shou_spe_num'];
									  }
									  break;
						    case 'chongsheng': if ( $this->rightHero[$index]['blood'] <= 0 )
							          {
								          $defEffect = 5;
						                  $desc .= $this->rightHero[$index]['name'].'<b>重生</b>，';
										  if ( $hurtinfo[$i]['shou_spe_num'] <= 0 )
										  {
											  $hurtinfo[$i]['shou_spe_num'] = 1000;
										  }
									      $this->rightHero[$index]['blood'] = $hurtinfo[$i]['shou_spe_num'];
									      break;
									  }
					    }
				    }

				    if ( $this->rightHero[$index]['blood'] <= 0 )
					{
						$this->rightAlive--;
					}

				    $desc .= $left['name'].'造成了<b>'.$blood.'</b>点伤害，';
				    $desc .= $this->rightHero[$index]['name'].'还剩'.$this->rightHero[$index]['blood'].'生命<br>';

					array_push( $midDef, array(
						'seat'  => $this->rightHero[$index]['seat'],
						'hid'   => $this->rightHero[$index]['hid'],
						'effect'=> $defEffect,
						'drop'  => 0 - $blood,
						'blood' => ( $afterAttackBlood > 0 ) ? $afterAttackBlood : 0,
						'dead'  => ( $this->rightHero[$index]['blood'] > 0 ) ? 0 : 1
						)
					);

					array_push( $endDef, array(
						'seat' => $this->rightHero[$index]['seat'],
						'hid'  => $this->rightHero[$index]['hid'],
						'effect' => ( $defEffect == 4 || $defEffect == 5 ) ? $defEffect : 0,
						'value' => ( $defEffect == 4 || $defEffect == 5 ) ? $hurtinfo[$i]['shou_spe_num'] : 0
						)
					);
				}
				//Array ( [hurt] => 4886 [gong_spe] => 0 [gong_spe_type] => [shou_spe] => 0 [shou_spe_type] => [shou_spe_num] => 0 )
                //攻击特效: 0表示没有特效，1表示暴击，2表示必杀，3表示加深，4便是圣剑，5表示重击
				//防守特效: 0表示没有特效，1表示闪避，2表示格挡，3表示坚韧，4表示回血，5表示重生

				array_push( $this->process, array(
				                            'mid' => array(
				                                'att' => array(
				                                    'seat' => $this->leftHero[$begin]['seat'],
					                                'hid'  => $this->leftHero[$begin]['hid'],
					                                'type' => $attType,
				                                    'skill' => $hurt['gong_type'],
					                                'range' => ( $hurt['gong_fanwei'] == 20 ) ? 100 : $this->rightHero[$index]['seat'],
					                                'effect' => $attEffect
				                                ),
					                            'def' => $midDef
				                            ),
				                            'end' => array(
					                            'att' => array(
						                            'seat' => $this->leftHero[$begin]['seat'],
					                                 'hid' => $this->leftHero[$begin]['hid'],
						                             'effect' => 0,
						                             'value' => 0
					                             ),
					                             'def' => $endDef
				                            )
				                        ) 
			    );
//----------------------------------------------------
				}
            }

            $begin = $this->attackBeginRight();
            if ( $begin > 0 )
            {
				$desc .= '第'.$this->huihe.'回合        ';
                $this->leftAttacked = $this->attackAgainst( $this->leftHero, $begin );
                if ( $this->leftAttacked <= 0 )
                {
                    $desc .= '战斗结束<br>';
                    break;
                }

                $right  = $this->rightHero[$begin];
				if ( $right['hid'] == 101 )
				{
					$hurt = array();
					$hurt['gong_spe'] = 0;
					$hurt['gong_fanwei'] = 10;
					$hurt['gong_type']   = 1;
					$hurt['hurtinfo'] = array( array( 'hid' => $this->leftHero[$this->leftAttacked]['hid'], 'hurt' => 300, 'shou_spe' => 0 ) );
					$hurtinfo = $hurt['hurtinfo'];
				}
				else
				{
                    $aliveHero = $this->getAliveHero( $this->leftHero );
				    $hurt      = $this->battle->getHurtInfo( $right, $this->leftHero[$this->leftAttacked], $aliveHero );
				    $hurtinfo  = $hurt['hurtinfo'];
				}
				$midDef = array();
				$endDef = array();
				$attEffect = 0;
				$defEffect = 0;
				$attType   = 1;

				if ( $hurt['gong_spe'] > 0 )
				{
					switch( $hurt['gong_spe_type'] )
					{
						case 'baoji': $attEffect = 1;
						              $desc .= $right['name'].'使出了<b>暴击</b>，';
									  break;
					    case 'bisha': $attEffect = 2;
						              $desc .= $right['name'].'使出了<b>必杀</b>，';
									  break;
						case 'jiashen': $attEffect = 3;
						              $desc .= $right['name'].'使出了<b>加深伤害</b>，';
									  break;
						case 'shengjian': $attEffect = 4;
						              $desc .= $right['name'].'使出了<b>圣剑</b>，';
									  break;
						case 'zhongji': $attEffect = 5;
						              $desc .= $right['name'].'使出了<b>重击</b>，';
									  break;
					}
				}

				/*-----------------------------------------------------------*/
				if ( $right['hid'] == 1006 )
				{
					$attEffect = 0;
					$attType   = 1;
					$hurt['gong_type'] = 1;
					$hurt['gong_fanwei'] = 10;
				}
/*------------------------------------------------------------*/
				for ( $i = 0, $len = count( $hurtinfo ); $i < $len; $i++ )
				{
					$blood = $hurtinfo[$i]['hurt'];
					$index = $this->searchHeroByHid( $this->leftHero, $hurtinfo[$i]['hid'] );
					if ( $this->leftHero[$index]['blood'] <= 0 )
					{
						break;
					}
				    $this->leftHero[$index]['blood'] -= $blood;
					$afterAttackBlood = $this->leftHero[$index]['blood'];

				    if ( $hurtinfo[$i]['shou_spe'] > 0 )
				    {
					    switch( $hurtinfo[$i]['shou_spe_type'] )
					    {
						    case 'miss': $defEffect = 1;
						              $desc .= $this->leftHero[$index]['name'].'<b>躲避</b>了这次伤害，';
									  break;
					        case 'gedang': $defEffect = 2;
						              $desc .= $this->leftHero[$index]['name'].'<b>格挡</b>了这次伤害，';
									  break;
						    case 'jianren': $defEffect = 3;
						              $desc .= $this->leftHero[$index]['name'].'使出了<b>格挡</b>，';
									  break;
						    case 'huixue':if ( $this->leftHero[$index]['blood'] > 0 )
						              {
							              $defEffect = 4;
						                  $desc .= $this->leftHero[$index]['name'].'<b>回血</b>，';
									      $this->leftHero[$index]['blood'] += $hurtinfo[$i]['shou_spe_num'];
									  }
									  break;
						    case 'chongsheng': if ( $this->leftHero[$index]['blood'] <= 0 )
							          {
								          $defEffect = 5;
						                  $desc .= $this->leftHero[$index]['name'].'<b>重生</b>，';
										  if ( $hurtinfo[$i]['shou_spe_num'] <= 0 )
										  {
											  $hurtinfo[$i]['shou_spe_num'] = 1000;
										  }
									      $this->leftHero[$index]['blood'] = $hurtinfo[$i]['shou_spe_num'];
									  }
									  break;
					    }
				    }

				    if ( $this->leftHero[$index]['blood'] <= 0 )
					{
						$this->leftAlive--;
					}

				    $desc .= $right['name'].'造成了<b>'.$blood.'</b>点伤害，';
				    $desc .= $this->leftHero[$index]['name'].'还剩'.$this->leftHero[$index]['blood'].'生命<br>';

					array_push( $midDef, array(
						'seat'  => $this->leftHero[$index]['seat'],
						'hid'   => $this->leftHero[$index]['hid'],
						'effect'=> $defEffect,
						'drop'  => 0 - $blood,
						'blood' => ( $afterAttackBlood > 0 ) ? $afterAttackBlood : 0,
						'dead'  => ( $this->leftHero[$index]['blood'] > 0 ) ? 0 : 1
						)
					);

					array_push( $endDef, array(
						'seat' => $this->leftHero[$index]['seat'],
						'hid'  => $this->leftHero[$index]['hid'],
						'effect' => ( $defEffect == 4 || $defEffect == 5 ) ? $defEffect : 0,
						'value' => ( $defEffect == 4 || $defEffect == 5 ) ? $hurtinfo[$i]['shou_spe_num'] : 0
						)
					);
				}

				//Array ( [hurt] => 4886 [gong_spe] => 0 [gong_spe_type] => [shou_spe] => 0 [shou_spe_type] => [shou_spe_num] => 0 )
                //攻击特效: 0表示没有特效，1表示暴击，2表示必杀，3表示加深，4便是圣剑，5表示重击
				//防守特效: 0表示没有特效，1表示闪避，2表示格挡，3表示坚韧，4表示回血，5表示重生

				array_push( $this->process, array(
				                            'mid' => array(
				                                'att' => array(
				                                    'seat' => $this->rightHero[$begin]['seat'],
					                                'hid'  => $this->rightHero[$begin]['hid'],
					                                'type' => $attType,
				                                    'skill' => $hurt['gong_type'],
					                                'range' => ( $hurt['gong_fanwei'] == 20 ) ? 100 : $this->leftHero[$index]['seat'],
					                                'effect' => $attEffect
				                                ),
					                            'def' => $midDef
				                            ),
				                            'end' => array(
					                            'att' => array(
						                            'seat' => $this->rightHero[$begin]['seat'],
					                                 'hid' => $this->rightHero[$begin]['hid'],
						                             'effect' => 0,
						                             'value' => 0
					                             ),
					                             'def' => $endDef
				                            )
				                        ) 
			    );
            }

		    if ( $this->huihe > 20 )
		    {
				break;
		    }
	    }while(true);

		$this->desc = $desc;
    }

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
    public function getStar( $aliveHeroLen, $endHeroLen )
	{
		if ( $endHeroLen <= 0 )
		{
			return 0;
		}
		else if ( $aliveHeroLen == $endHeroLen )
		{
			return 3;
		}
		else if ( $aliveHeroLen - $endHeroLen == 1 )
		{
			return 2;
		}
		else
		{
			return 1;
		}
	}

	public function buildFight()
	{
		$result = array(
			'battle' => array(
			    'stand' => array(
			        'attack' => $this->attStand,
			        'def'    => $this->defStand
			    ),
			    'huihe' => $this->process,
			    'win' => array(
			        'status' => ( $this->leftAlive <= 0 ) ? 0 : 1,
			        'star'   => $this->getStar( $this->aliveHeroLen, $this->leftHero[0]['blood'] ),
			        'prize'  => array()
			    )
			)
		);

		if ( $this->debug )
		{
		    return $this->desc;
		}
		else
		{
		    return $result;
		}
	}
}
?>