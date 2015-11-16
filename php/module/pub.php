<?php
function pub_reward()
{
	$arr = array( 'error' => 0 );
    $uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$number = isset( $_POST['number'] ) ? intval( $_POST['number'] ) : 0;
	if ( ( $number != 1 ) && ( $number != 10 ) )
	{
		$arr['error'] = PUB_NUMBER_ERROR;
		return json_encode( $arr );
	}

	$currency = isset( $_POST['c'] ) ? intval( $_POST['c'] ) : 0;
	if ( ( $currency != 1 ) && ( $currency != 2 ) )
	{
		$arr['error'] = PUB_CURRENCY_ERROR;
		return json_encode( $arr );
	}

    $coin    = 0;
	$diamond = 0;
	$mbj   = new IMoney();
	$money = $mbj->getMoney( $uid );

    $obj = new Package();
	if ( $currency == 1 )
	{
		if ( $number == 1 )
		{
			$coin = 3000;
		}
		else
		{
			$coin = 27000;
		}
		if ( $money[0]['coin'] < $coin )
		{
			$arr['error'] = PUB_NOT_ENOUGH_COIN;
		    return json_encode( $arr );
		}

		$conf = array(
			array( 'id' => 10001, 'num' => 1, 't' => 1 ),
			array( 'id' => 10001, 'num' => 2, 't' => 1 ),
			array( 'id' => 10004, 'num' => 1, 't' => 1 ),
			array( 'id' => 10003, 'num' => 8, 't' => 1 ),
			array( 'id' => 10002, 'num' => 1, 't' => 1 ),
			array( 'id' => 10002, 'num' => 3, 't' => 1 ),
			array( 'id' => 30011, 'num' => 1, 't' => 3 ),
			array( 'id' => 30012, 'num' => 9, 't' => 3 ),
			array( 'id' => 30014, 'num' => 1, 't' => 3 ),
			array( 'id' => 10002, 'num' => 100, 't' => 1 ),
			array( 'id' => 10001, 'num' => 50, 't' => 1 ),
			array( 'id' => 30032, 'num' => 10, 't' => 3 ),
			array( 'id' => 30053, 'num' => 1, 't' => 3 ),
			array( 'id' => 30054, 'num' => 1, 't' => 3 ),
			array( 'id' => 30021, 'num' => 3, 't' => 3 ),
			array( 'id' => 30024, 'num' => 1, 't' => 3 ),
			array( 'id' => 30013, 'num' => 4, 't' => 3 ),
			array( 'id' => 30042, 'num' => 1, 't' => 3 ),
			array( 'id' => 30033, 'num' => 7, 't' => 3 ),
			array( 'id' => 30031, 'num' => 1, 't' => 3 )
		);
	}
	else
	{
		if ( $number == 1 )
		{
			$diamond = 300;
		}
		else
		{
			$diamond = 2700;
		}
		if ( $money[0]['diamond'] < $diamond )
		{
			$arr['error'] = PUB_NOT_ENOUGH_DIAMOND;
		    return json_encode( $arr );
		}

		$conf = array(
			array( 'id' => 10001, 'num' => 100, 't' => 1 ),
			array( 'id' => 10001, 'num' => 200, 't' => 1 ),
			array( 'id' => 10004, 'num' => 100, 't' => 1 ),
			array( 'id' => 10003, 'num' => 80, 't' => 1 ),
			array( 'id' => 10002, 'num' => 10, 't' => 1 ),
			array( 'id' => 10002, 'num' => 30, 't' => 1 ),
			array( 'id' => 30011, 'num' => 1, 't' => 3 ),
			array( 'id' => 30012, 'num' => 9, 't' => 3 ),
			array( 'id' => 30014, 'num' => 1, 't' => 3 ),
			array( 'id' => 1001,  'num' => 5, 't' => 100 ),
			array( 'id' => 1002,  'num' => 5, 't' => 100 ),
			array( 'id' => 1003,  'num' => 5, 't' => 100 ),
			array( 'id' => 1004,  'num' => 5, 't' => 100 ),
			array( 'id' => 1005,  'num' => 10, 't' => 100 ),
			array( 'id' => 1006,  'num' => 5, 't' => 100 ),
			array( 'id' => 1001,  'num' => 4, 't' => 100 ),
			array( 'id' => 1002,  'num' => 3, 't' => 100 ),
			array( 'id' => 1003,  'num' => 6, 't' => 100 ),
			array( 'id' => 1004,  'num' => 3, 't' => 100 ),
			array( 'id' => 1005,  'num' => 2, 't' => 100 ),
			array( 'id' => 1006,  'num' => 2, 't' => 100 ),
			array( 'id' => 1001,  'num' => 8, 't' => 100 ),
			array( 'id' => 1002,  'num' => 5, 't' => 100 ),
			array( 'id' => 1003,  'num' => 3, 't' => 100 ),
			array( 'id' => 1004,  'num' => 4, 't' => 100 ),
			array( 'id' => 1005,  'num' => 3, 't' => 100 ),
			array( 'id' => 1006,  'num' => 1, 't' => 100 )
		);
	}

	$package = array();
	$ret = $obj->pubLottery( $conf, $number, $package );

	//扣钱
	if ( $coin )
	{
		$r = $mbj->subCoin( $uid, $coin );
	}
	else
	{
		$r = $mbj->subDiamond( $uid, $diamond );
	}
	if ( empty( $r ) )
	{
		$arr['error'] = PUB_MONEY_ERROR;
		return json_encode( $arr );
	}

	$arr['pub'] = $ret;
	$arr['player']         = array( 'coin' => $money[0]['coin'] - $coin, 'diamond' => $money[0]['diamond'] - $diamond );
	$arr['add_package']    = array();
	$arr['update_package'] = array();
	//发奖励
	foreach ( $package as $k => $v )
	{
		$r = $obj->getPackage( $uid, $k );
		if ( empty( $r ) )
		{
			$obj->insertPackage( $uid, $k, $v['num'], $v['t'] );
			array_push( $arr['add_package'], array( 'id' => $k, 'num' => $v['num'], 'type' => $v['t'] ) );
		}
		else
		{
			$obj->addPackage( $uid, $k, $v['num'] );
			array_push( $arr['update_package'], array( 'id' => $k, 'num' => $v['num'] + $r[0]['num'], 'type' => $v['t'] ) );
		}
	}

	return json_encode( $arr );
}
?>