<?php
function user_heroList()
{
	$arr = array( 'error' => 0 );
	$uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$obj  = new UserHeroList( $uid );
	$list = array( 'hero' => array() );
    $arr  = $obj->getUserHeroInfoList();

	$level = new User();
	foreach ( $arr as $k => $v )
	{
		$info = $level->getHeroNextExpAndLevel( $v['exp'] );
		$v['nextexp'] = $info['nextexp'];
		$v['diff']    = $info['diff'];
		$v['cur']     = $v['exp'] - $info['cur'];
		array_push( $list['hero'], $v );
	}

	return json_encode( $list );
}

function user_useMedicine()
{
	$arr = array( 'error' => 0 );
	$uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$id = isset( $_POST['id'] ) ? $_POST['id'] : 0;
	if ( empty( $id ) )
	{
		$arr['error'] = NO_MEDICINE_ID;
		return json_encode( $arr );
	}

	$num = isset( $_POST['num'] ) ? intval( $_POST['num'] ) : 0;
	if ( ( $num <= -2 ) || ( $num == 0 ) )
	{
		$arr['error'] = NO_MEDICINE_NUM;
		return json_encode( $arr );
	}

	$hid = isset( $_POST['hid'] ) ? intval( $_POST['hid'] ) : 0;
	if ( $hid <= 0 )
	{
		$arr['error'] = NOT_HID_FORMAT;
		return json_encode( $arr );
	}

	$obj = new User();
	$ret = $obj->levelUpByMedicine( $uid, $num, $id, $hid );
	
	return json_encode( $ret );
}

function user_getPackage()
{
	$arr = array( 'error' => 0 );
	$uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$obj = new User();
    $arr = $obj->getPackage( array( 'uid' => $uid ) );
    $array = array( 'package' => array() );
    if ( !empty( $arr ) )
    {
		foreach ( $arr as $v )
		{
	        array_push( $array['package'], $v );
		}
    }

	return json_encode( $array );
}

function user_mergeHero()
{
	$arr = array( 'error' => 0 );
    $uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$hid = isset( $_POST['hid'] ) ? intval( $_POST['hid'] ) : 0;
	if ( ( $hid > MAX_HID ) || ( $hid < MIN_HID ) )
	{
		$arr['error'] = HERO_FRAGMENT_HID_ERROR;
		return json_encode( $arr );
	}
	$obj = new User();
	$ret = $obj->mergeHero( $uid, $hid );
	return json_encode( $ret );
}

function user_setAliveHero()
{
	$arr = array( 'error' => 0 );
    $uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$s1 = isset( $_POST['s1'] ) ? intval( $_POST['s1'] ) : 0;
	$s2 = isset( $_POST['s2'] ) ? intval( $_POST['s2'] ) : 0;
	$s3 = isset( $_POST['s3'] ) ? intval( $_POST['s3'] ) : 0;
	$s4 = isset( $_POST['s4'] ) ? intval( $_POST['s4'] ) : 0;
	$s5 = isset( $_POST['s5'] ) ? intval( $_POST['s5'] ) : 0;
	$s6 = isset( $_POST['s6'] ) ? intval( $_POST['s6'] ) : 0;
	$s7 = isset( $_POST['s7'] ) ? intval( $_POST['s7'] ) : 0;

    $alive_info   = array();
	$arr['alive'] = array();
	$obj = new UserHeroList( $uid );
	// 查询用户有没有这个英雄
	for ( $i = 1; $i <= 7; $i++ )
	{
		$a = 's'.$i;
		$s = $$a;
		if ( empty( $s ) )
		{
			continue;
		}
	    if ( ( $s < MIN_HID ) || ( $s > MAX_HID ) )
	    {
		    $arr['error'] = ALIVE_HID_ERROR;
		    return json_encode( $arr );
	    }
	    
		$hero = $obj->getOneHeroDetail( $s );
	    if ( empty( $hero ) )
	    {
		    $arr['error'] = NO_ALIVE_HERO;
		    return json_encode( $arr );
	    }

        if ( $i == 7 )
		{
			$alive_info['duizhang'] = $s;
		}
		else
		{
		    $alive_info['seat'.$i] = $s;
		}
	}

	$obj->setAliveHero( $alive_info );
    $hero = $obj->getAliveHeroDetail();
    for ( $i = 1; $i <= 6; $i++ )
    {
        $j = 'seat'.$i;
        if ( !empty( $hero[$j] ) )
        {
            $array = array(
                'seat' => $i,
                'hid'  => $hero[$j]['hid'],
                'level'=> $hero[$j]['level'],
                'quality' => $hero[$j]['quality']
            );
            array_push( $arr['alive'], $array );
        }
    }

	return json_encode( $arr );
}

function user_getSign()
{
	$arr = array( 'error' => 0, 'sign' => array() );
    $uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$obj = new Assist();
	$arr['sign'] = $obj->initUserSign( $uid );

	return json_encode( $arr );
}

function user_sign()
{
	$arr = array( 'error' => 0, 'add_package' => array(), 'update_package' => array() );
    $uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$day = isset( $_POST['day'] ) ? $_POST['day'] : 0;
	if ( empty( $day ) )
	{
		$arr['error'] = -1;
		return json_encode( $arr );
	}

	$obj = new Assist();
	$ret = $obj->getUserSign( $uid );
	if ( empty( $ret ) )
	{
		$arr['error'] = -2;
		return json_encode( $arr );
	}

	$sign = json_decode( $ret[0]['sign'], true );
	if ( isset( $sign[$day] ) && ( $sign[$day]['g'] == 1 ) )
	{
		$sign[$day]['g'] = 2;
		/*
		$next = ''.( intval( $day ) + 1 );
		if ( isset( $sign[$next] ) )
		{
			$sign[$next]['g'] = 1;
		}
		*/

		$update = $obj->updateSign( $uid, $sign );
		if ( empty( $update ) )
		{
			$arr['error'] = -4;
		    return json_encode( $arr );
		}

		$id   = intval( $sign[$day]['id'] );
		$num  = intval( $sign[$day]['num'] );
		$type = intval( $sign[$day]['type'] );

        $pbj = new Package();
		$r = $pbj->getPackage( $uid, $id );
		if ( empty( $r ) )
		{
			$pbj->insertPackage( $uid, $id, $num, $type );
			array_push( $arr['add_package'], array( 'id' => $id, 'num' => $num, 'type' => $type ) );
		}
		else
		{
			$pbj->addPackage( $uid, $id, $num );
			array_push( $arr['update_package'], array( 'id' => $id, 'num' => $num + $r[0]['num'], 'type' => $type ) );
		}
	}
	else
	{
		$arr['error'] = -3;
	}

	return json_encode( $arr );
}
?>