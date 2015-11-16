<?php
/*
		需要用到的属性
		hid   		英雄id
		level  		英雄等级
		quality 	品质
		tianfu   	天赋，如：baoji gedang
		tianfu_m  	天赋系数，小怪 boss 配置 1
		blood   
		parmor_m   
		marmor_m   
		attack_t   
		attack   
		cross_m
		tianfu_gong    天赋系数，小怪 boss 配置 1
		tianfu_shou	天赋系数，小怪 boss 配置 1
		 */
function tower_up()
{
	$arr = array( 'error' => 0, 'tower_list' => array() );
    $uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	//$uid = 10001;

	$obj  = new Tower();
	$list = $obj->getUserTowerList( $uid );
	if ( empty( $list ) )
	{
		$list = array();
		array_push( $list, array( 's1' => 1001, 's2' => 1002, 's3' => 1003, 's4' => 1004, 's5' => 1005, 's6' => 1006, 'level' => 1, 'w' => 0 ) );
	}
	else
	{
		$list = json_decode( $list, true );
		//把下一关的内容展示出来
		$len = count( $list );
		if ( !empty( $list[$len - 1]['w'] ) )
		{
		    array_push( $list, array( 's1' => 1001, 's2' => 1002, 's3' => 1003, 's4' => 1004, 's5' => 1005, 's6' => 1006, 'level' => $len + 1, 'w' => 0 ) );
		}
	}

    $t = mktime( 0, 0, 0, date( 'n' ), date( 'j' ) + 1, date( 'Y' ) );
	$obj->setUserTowerList( $uid, $list, $t );
    
	foreach ( $list as $v )
	{
		$temp = array();
		if ( isset( $v['reward'] ) && !empty( $v['reward'] ) )
		{
			foreach ( $v['reward'] as $v1 )
			{
				list( $id, $num, $type ) = explode( '_', $v1 );
				array_push( $temp, array( 'id' => $id, 'num' => $num, 'type' => $type ) );
			}

			$v['reward'] = $temp;
		}

		array_push( $arr['tower_list'], $v );
	}
	return json_encode( $arr );
}

function tower_battle()
{
	$arr = array( 'error' => 0, 'add_tower' => array(), 'update_tower' => array(), 'battle' => array() );
    $uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$tid = isset( $_POST['tid'] ) ? intval( $_POST['tid'] ) : 0;
	if ( ( $tid < 1 ) || ( $tid > 100 ) )
	{
		$arr['error'] = NO_TOWER_ID;
		return json_encode( $arr );
	}

/*
	$uid = 10001;
	$tid = 1;
*/
	$obj  = new Tower();
	$list = $obj->getUserTowerList( $uid );
	if ( empty( $list ) )
	{
		$arr['error'] = NO_TOWER_INFO;
		return json_encode( $arr );
	}

	$list = json_decode( $list, true );
	$len  = count( $list );
	if ( $tid != $len )
	{
		$arr['error'] = NO_TOWER_ID;
		return json_encode( $arr );
	}

	if ( $list[$len - 1]['w'] > 0 )
	{
		$arr['error'] = TOWER_PASS;
		return json_encode( $arr );
	}

    /*----------------------------*/
    $monsterlist = array();
	$mobj        = new IMap();
	$c = $mobj->getMonsterInfo( 1001 );
	$monsterlist['seat1'] = $c;
	$c = $mobj->getMonsterInfo( 1002 );
	$monsterlist['seat2'] = $c;
	$c = $mobj->getMonsterInfo( 1003 );
	$monsterlist['seat3'] = $c;
	$c = $mobj->getMonsterInfo( 1004 );
	$monsterlist['seat4'] = $c;
	$c = $mobj->getMonsterInfo( 1005 );
	$monsterlist['seat5'] = $c;
	$c = $mobj->getMonsterInfo( 1006 );
	$monsterlist['seat6'] = $c;
	/*----------------------------*/
	$obj1 = new UserHeroList( $uid );
    $h1   = $obj1->getAliveHeroDetail();
	$fight = new IFightNew();
	$fight->initDuiwu( $h1, $monsterlist );
	$fight->testFight();
	$battle = $fight->buildFight();
	if ( $battle['battle']['win']['status'] != 1 )
	{
		return json_encode( $arr );
	}

	$arr['battle'] = $battle['battle'];

	$list[$len - 1]['w'] = 1;
	$next = array( 's1' => 1001, 's2' => 1002, 's3' => 1003, 's4' => 1004, 's5' => 1005, 's6' => 1006, 'level' => $len + 1, 'w' => 0 );
	array_push( $list, $next );
	$t = mktime( 0, 0, 0, date( 'n' ), date( 'j' ) + 1, date( 'Y' ) );
	$obj->setUserTowerList( $uid, $list, $t );
	$arr['update_tower'] = $list[$len - 1];
    $arr['add_tower']    = $next;
	return json_encode( $arr );
}

function tower_reward()
{
	$arr = array( 'error' => 0, 'update_tower' => array(), 'add_package' => array(), 'update_package' => array() );
    $uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$tid = isset( $_POST['tid'] ) ? intval( $_POST['tid'] ) : 0;
	if ( ( $tid < 1 ) || ( $tid > 100 ) )
	{
		$arr['error'] = NO_TOWER_ID;
		return json_encode();
	}

/*
	$uid = 10001;
	$tid = 1;
*/
	$obj  = new Tower();
	$list = $obj->getUserTowerList( $uid );
	if ( empty( $list ) )
	{
		$arr['error'] = NO_TOWER_INFO;
		return json_encode( $arr );
	}

	$list = json_decode( $list, true );
	$len  = count( $list );
	if ( $tid >= $len )
	{
		$arr['error'] = NO_TOWER_ID;
		return json_encode( $arr );
	}

	if ( $list[$tid - 1]['w'] != 1 )
	{
		$arr['error'] = TOWER_NOT_PASS;
		return json_encode( $arr );
	}

/*-----------------------------------*/
    $reward = array( '10001_10_1', '10002_3_1', '10004_5_1' );
/*----------------------------------*/
	$list[$tid - 1]['w'] = 2;
	$arr['update_tower'] = $list[$tid - 1];
	$arr['update_tower']['reward'] = array();
	$list[$tid - 1]['reward'] = $reward;
	$t = mktime( 0, 0, 0, date( 'n' ), date( 'j' ) + 1, date( 'Y' ) );
	$obj->setUserTowerList( $uid, $list, $t );

	$obj = new Package();
	foreach ( $reward as $v )
	{
		list( $id, $num, $type ) = explode( '_', $v );
		array_push( $arr['update_tower']['reward'], array( 'id' => $id, 'num' => $num, 'type' => $type ) );
		$r = $obj->getPackage( $uid, $id );
		if ( empty( $r ) )
		{
			$obj->insertPackage( $uid, $id, $num, $type );
			array_push( $arr['add_package'], array( 'id' => $id, 'num' => $num, 'type' => $type ) );
		}
		else
		{
			$obj->addPackage( $uid, $id, $num );
			array_push( $arr['update_package'], array( 'id' => $id, 'num' => $num + $r[0]['num'], 'type' => $type ) );
		}
	}

	return json_encode( $arr );
}

function tower_getRank()
{
	$arr = array( 'error' => 0, 'tower_hero' => array( 'alive' => array(), 'dead' => array() ) );
    $uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$obj = new Tower();
	$json = $obj->getUserTowerRank( $uid );
	if ( empty( $json ) )
	{
		return json_encode( $arr );
	}

    $rank = json_decode( $json, true );
	$arr['tower_hero']['alive'] = $rank['alive'];
	$arr['tower_hero']['dead']  = $rank['dead'];

	return json_encode( $arr );
}

function tower_setRank()
{
	$arr = array( 'error' => 0 );
    $uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

    $dead = array();
    $obj = new Tower();
	$json = $obj->getUserTowerRank( $uid );
	if ( empty( $json ) )
	{
		$rank = array( 'alive' => array(), 'dead' => array() );
	}
	else
	{
		$rank = json_decode( $json, true );
		if ( !empty( $rank['dead'] ) )
		{
		    $dead = explode( ',', $rank['dead'] );
		}
	}
	$s1 = isset( $_POST['s1'] ) ? intval( $_POST['s1'] ) : 0;
	$s2 = isset( $_POST['s2'] ) ? intval( $_POST['s2'] ) : 0;
	$s3 = isset( $_POST['s3'] ) ? intval( $_POST['s3'] ) : 0;
	$s4 = isset( $_POST['s4'] ) ? intval( $_POST['s4'] ) : 0;
	$s5 = isset( $_POST['s5'] ) ? intval( $_POST['s5'] ) : 0;
	$s6 = isset( $_POST['s6'] ) ? intval( $_POST['s6'] ) : 0;

	for ( $i = 1; $i <= 6; $i++ )
	{
		$a = 's'.$i;
		$s = $$a;
		if ( empty( $s ) )
		{
			$rank['alive'][$a] = 0;
			continue;
		}
	    if ( ( $s < MIN_HID ) || ( $s > MAX_HID ) )
	    {
		    $arr['error'] = ALIVE_HID_ERROR;
		    return json_encode( $arr );
	    }

		if ( !in_array( $s, $dead ) )
		{
			$rank['alive'][$a] = $s;
		}
	}

	$t = mktime( 0, 0, 0, date( 'n' ), date( 'j' ) + 1, date( 'Y' ) );
	$obj->setUserTowerRank( $uid, $rank, $t );

	return json_encode( $arr );
}
?>