<?php
function mall_Proplist()
{
	$arr = array( 'error' => 0, 'Proplist' => array(), 'renew' => 0 );
	$uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$mallObj = new IMall();
	$ret  = $mallObj->getUserPropMall( $uid );
	$date = intval( date( 'Ymd' ) );
	$hour = $mallObj->getPropHour();
	$getList = array();
	if ( empty( $ret ) )
	{
		$list = $mallObj->getPropHourList( $hour );
		$mallObj->setUserPropMall( $uid, $date, $hour, $list, '' );
	}
	else
	{
		if ( ( $date != intval( $ret[0]['date'] ) ) || ( $hour != $ret[0]['hour'] ) )
		{
			$list = $mallObj->getPropHourList( $hour );
			$mallObj->updateUserPropMall( $uid, array( 'date' => $date, 'hour' => $hour, 'list' => $list, 'getList' => '', 'renew' => 0 ) );
		}
		else
		{
		    $list = $ret[0]['list'];
			if ( !empty( $ret[0]['getList'] ) )
			{
		        $getList = explode( ',', $ret[0]['getList'] );
			}
		}
	}

	$listArr = explode( ',', $list );
	foreach ( $listArr as $v )
	{
		list( $id, $num, $type, $s ) = explode( '_', $v );
		$get = 0;
		if ( in_array( $id, $getList ) )
		{
			$get = 1;
		}

		list( $pay, $val ) = explode( '#', $s );

		array_push( $arr['Proplist'], array( 'id' => $id, 'num' => $num, 'type' => $type, 'pay' => $pay, 'val' => $val, 'get' => $get ) );
	}

    $arr['renew'] = intval( $ret[0]['renew'] );
	return json_encode( $arr );
}

function mall_payProp()
{
	$arr = array( 'error' => 0, 'player' => array(), 'add_package' => array(), 'update_package' => array() );
	$uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$id = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
	if ( empty( $id ) )
	{
		$arr['error'] = NO_MALL_ID;
		return json_encode( $arr );
	}
/*
	$uid = 10001;
	$id = 20042;
*/
    //判断道具表有没有记录
	$mallObj = new IMall();
	$ret  = $mallObj->getUserPropMall( $uid );
	if ( empty( $ret ) )
	{
		$arr['error'] = NO_MALL_LIST;
		return json_encode( $arr );
	}

    //判断购买的道具在不在用户的道具列表里
    $flag = false;
	$temp = explode( ',', $ret[0]['list'] );
	foreach ( $temp as $v )
	{
		list( $_id, $num, $type, $pay ) = explode( '_', $v );
		if ( $id == $_id )
		{
			$flag = true;
			break;
		}
	}
	if ( empty( $flag ) )
	{
		$arr['error'] = NO_MALL_ID_EXISTSED;
		return json_encode( $arr );
	}

    //判断道具用户是否已经买过
    $getList = array();
	if ( !empty( $ret[0]['getList'] ) )
	{
		$getList = explode( ',', $ret[0]['getList'] );
		if ( in_array( $id, $getList ) )
		{
			$arr['error'] = ID_HASBEEN_PAID;
		    return json_encode( $arr );
		}
	}

	//判断用户金钱够不够
	$mbj   = new IMoney();
	$money = $mbj->getMoney( $uid );
	if ( empty( $money ) )
	{
		$arr['error'] = MALL_MONEY_ERROR;
		return json_encode( $arr );
	}
	list( $payType, $payNum ) = explode( '#', $pay );
	$payNum = intval( $payNum );

	if ( $payType == 'c' )
	{
		if ( $money[0]['coin'] < $payNum )
		{
			$arr['error'] = NOT_ENOUGH_COIN;
		    return json_encode( $arr );
		}

		$r = $mbj->subCoin( $uid, $payNum );
		if ( empty( $r ) )
		{
			$arr['error'] = MALL_MONEY_ERROR;
		    return json_encode( $arr );
		}

		$arr['player']['coin'] = $mbj->getUpdate();
	}
	else if ( $payType == 'd' )
	{
		if ( $money[0]['diamond'] < $payNum )
		{
			$arr['error'] = PUB_NOT_ENOUGH_DIAMOND;
		    return json_encode( $arr );
		}

		$r = $mbj->subDiamond( $uid, $payNum );
		if ( empty( $r ) )
		{
			$arr['error'] = MALL_MONEY_ERROR;
		    return json_encode( $arr );
		}

		$arr['player']['diamond'] = $mbj->getUpdate();
	}
	else
	{
		$arr['error'] = UNKNOW_PAY_TYPE;
		return json_encode( $arr );
	}

	//插入道具购买列表
	array_push( $getList, $id );
	$mallObj->updateUserPropMall( $uid, array( 'getList' => implode( ',', $getList ) ) );

	//发货
	$packObj = new Package();
	$p = $packObj->getPackage( $uid, $id );
	if ( empty( $p ) )
	{
		$packObj->insertPackage( $uid, $id, $num, $type );
		array_push( $arr['add_package'], array( 'id' => $id, 'num' => $num, 'type' => $type ) );
	}
	else
	{
		$packObj->addPackage( $uid, $id, $num );
		array_push( $arr['update_package'], array( 'id' => $id, 'num' => $num + $p[0]['num'], 'type' => $type ) );
	}

	return json_encode( $arr );
}

function mall_renewProp()
{
	$arr = array( 'error' => 0, 'Proplist' => array(), 'player' => array(), 'renew' => 0 );
	$uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$mallObj = new IMall();
	$ret  = $mallObj->getUserPropMall( $uid );
	if ( empty( $ret ) )
	{
		$arr['error'] = NO_MALL_LIST;
		return json_encode( $arr );
	}

	//重新取道具列表
	$list = $mallObj->getPropHourList( $ret[0]['hour'] );
	if ( empty( $list ) )
	{
		$arr['error'] = NO_MALL_LIST;
		return json_encode( $arr );
	}

	$renew = intval( $ret[0]['renew'] );
	$diamond = $mallObj->getPropRenewDiamond( $renew );

	//差用户钱够不够
	$mbj   = new IMoney();
	$money = $mbj->getMoney( $uid );
	if ( empty( $money ) )
	{
		$arr['error'] = MALL_MONEY_ERROR;
		return json_encode( $arr );
	}
	if ( $money[0]['diamond'] < $diamond )
	{
		$arr['error'] = PUB_NOT_ENOUGH_DIAMOND;
		return json_encode( $arr );
	}
	$r = $mbj->subDiamond( $uid, $diamond );
	if ( empty( $r ) )
	{
		$arr['error'] = MALL_MONEY_ERROR;
		return json_encode( $arr );
	}

	$arr['player']['diamond'] = $mbj->getUpdate();

	//更新renew
	$mallObj->updateUserPropMall( $uid, array( 'list' => $list, 'getList' => '', 'renew' => $renew + 1 ) );

	$listArr = explode( ',', $list );
	foreach ( $listArr as $v )
	{
		list( $id, $num, $type, $s ) = explode( '_', $v );
		list( $pay, $val ) = explode( '#', $s );
		array_push( $arr['Proplist'], array( 'id' => $id, 'num' => $num, 'type' => $type, 'pay' => $pay, 'val' => $val, 'get' => 0 ) );
	}

    $arr['renew'] = $renew + 1;
	return json_encode( $arr );
}
?>