<?php
function map_getMapList()
{
	$arr = array( 'error' => 0 );
	$uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

    $arr['simple'] = array();
	$arr['elite']  = array();
	$obj  = new IMap();
    $a    = $obj->getUserSimpleMap( $uid );
	if ( !empty( $a ) )
	{
		foreach ( $a as $v )
		{
			$mapid = intval( $v['mapid'] );
			$chapter = intval( $mapid / 100 );
			$section = $mapid % 100;
			$star    = intval( $v['star'] );

			array_push( $arr['simple'], array( 'chapter' => $chapter, 'section' => $section, 'star' => $star ) );
		}
	}

	$a = $obj->getUserEliteMap( $uid );
	if ( !empty( $a ) )
	{
		foreach ( $a as $v )
		{
			$mapid   = intval( $v['mapid'] );
			$chapter = intval( $mapid / 100 );
			$section = $mapid % 100;
			$star    = intval( $v['star'] );

			array_push( $arr['elite'], array( 'chapter' => $chapter, 'section' => $section, 'star' => $star ) );
		}
	}

	return json_encode( $arr );
}

function map_challenge()
{
	$arr = array( 'error' => 0, 'battle' => array() );
	$uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

    //1表示挑战，2表示扫荡一次，3表示扫荡10次
	$sweep = isset( $_POST['sweep'] ) ? intval( $_POST['sweep'] ) : 0;

	$chapter = isset( $_POST['c'] ) ? intval( $_POST['c'] ) : 0;
	if ( $chapter < 1 )
	{
		$arr['error'] = NO_CHAPTER;
		return json_encode( $arr );
	}

	$section = isset( $_POST['s'] ) ? intval( $_POST['s'] ) : 0;
	if ( $section < 1 )
	{
		$arr['error'] = NO_SECTION;
		return json_encode( $arr );
	}

	//1表示是挑战旧图，2表示挑战新图
	$new = isset( $_POST['n'] ) ? intval( $_POST['n'] ) : 1;
    /*
	$uid = 10001;
    $sweep = 1;
    $chapter = 2;
    $section = 2;
    $new = 1;
	$t   = 1;
	*/
	//1表示普通关卡，2表示精英关卡
	$t = isset( $_POST['t'] ) ? intval( $_POST['t'] ) : 1;
	if ( $t == 1 )
	{
		$type = 'simple';
		$coinReward = 10000;
		$manualPay  = 6;
	}
	else
	{
		$type = 'elite';
		$coinReward = 100000;
		$manualPay  = 12;
    }


    //判断配置是否存在
	$mapid = $chapter * 100 + $section;
	$obj   = new IMap();
	$mapInfo = $obj->getMapInfo( $type, $mapid );
	if ( empty( $mapInfo ) )
	{
		$arr['error'] = NO_MAP_CONF;
		return json_encode( $arr );
	}

	//判断用户等级能不能挑战
	//--------------------------------------

    //挑战旧图判断用户有没有记录
	if ( $new == 1 )
	{
		$id = $mapid;
	}
	else
	{
		$id = $mapInfo['preMapid'];
	}
	$mapArr = $obj->getUserMap( $type, $uid, $id );
	if ( empty( $mapArr ) )
	{
		$arr['error'] = NO_CHALLENGE;
		return json_encode( $arr );
	}
	//没有三星不能扫荡
	if ( ( $sweep > 1 ) && ( intval( $mapArr[0]['star'] ) != 3 ) )
	{
		$arr['error'] = NO_SWEEP_MAP;
		return json_encode( $arr );
	}

    //扫荡才需要模拟战斗
    if ( $sweep == 1 )
	{
	    $monsterlist = array();
	    for ( $i = 1; $i <= 6; $i++ )
	    {
		    $s = 's'.$i;
		    $mid = $mapInfo[$s];
		    if ( empty( $mid ) )
		    {
			    continue;
		    }

		    $c = $obj->getMonsterInfo( $mid );
		    if ( empty( $c ) )
		    {
			    continue;
		    }

		    $monsterlist['seat'.$i] = $c;
	    }

		$obj1 = new UserHeroList( $uid );
        $h1   = $obj1->getAliveHeroDetail();
	    $fight = new IFightNew();
        $fight->initDuiwu( $h1, $monsterlist );
		$fight->testFight();
	    $battle = $fight->buildFight();
	    $arr['battle'] = $battle['battle'];
		if ( $battle['battle']['win']['status'] != 1 )
	    {
		    return json_encode( $arr );
	    }

		//更新星星
		if ( $new == 1 )
		{
		    if ( $battle['battle']['win']['star'] > $mapArr[0]['star'] )
		    {
			    $obj->updateUserMap( $type, $uid, $mapid, $mapArr[0]['star'] );
		    }
		}
		else
		{
			$obj->setUserMap( $type, $uid, $mapid, $mapArr[0]['star'] );
		}
	}
	else
	{
		$arr['battle']['win'] = array();
		$arr['battle']['win']['status'] = 1;
		$arr['battle']['win']['star']   = 3;
		$arr['battle']['win']['prize']  = array();
	}
	
	//发奖励
	if ( $sweep < 3 )
	{
		$total = 1;
	}
	else
	{
		$total = 10;
	}
	$package = array();
	$star = $arr['battle']['win']['star'];
	$temp = explode( ',', $mapInfo['reward'] );
	for ( $i = 1; $i <= $total; $i++ )
	{
		$prize = array();
	    foreach ( $temp as $v )
	    {
		    list( $id, $num, $type ) = explode( '_', $v );
		    $num = intval( $num ) * $star;
		    array_push( $prize, array( 'id' => $id, 'num' => $num, 'type' => $type ) );

			if ( !isset( $package[$id] ) )
			{
				$package[$id] = array(
					'num'  => $num,
					'type' => $type
				);
			}
			else
			{
				$package[$id]['num'] += $num;
			}
		}

		array_push( $arr['battle']['win']['prize'], $prize );
	}

	$packageObj = new Package();
	$arr['add_package']    = array();
	$arr['update_package'] = array();
    foreach ( $package as $id => $v )
	{
		$r = $packageObj->getPackage( $uid, $id );
		if ( empty( $r ) )
		{
			$packageObj->insertPackage( $uid, $id, $v['num'], $v['type'] );
			array_push( $arr['add_package'], array( 'id' => $id, 'num' => $v['num'], 'type' => $v['type'] ) );
		}
		else
		{
			$packageObj->addPackage( $uid, $id, $v['num'] );
			array_push( $arr['update_package'], array( 'id' => $id, 'num' => $v['num'] + $r[0]['num'], 'type' => $v['type'] ) );
		}
	}

	$arr['battle']['coin'] = $coinReward * $total;
	$money = new IMoney();
	$ret = $money->getMoney( $uid );
	$money->addCoin( $uid, $arr['battle']['coin'] );
	$money->subManual( $uid, $manualPay * $total );
	$arr['update_player'] = array( 'coin' => $ret[0]['coin'] + $arr['battle']['coin'], 'manual' => $ret[0]['manual'] - $manualPay * $total );
	return json_encode( $arr );
}
?>