<?php
function fight_process()
{
	$arr = array( 'error' => 0 );
	$uid = Login::getLogin();
	// $uid = 10001;
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$fuid = isset( $_POST['fuid'] ) ? intval( $_POST['fuid'] ) : 0;
	// $fuid = 10001;
	if ( $fuid < 10001 )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$obj = new IFightNew();
	$obj->initUser( $uid, $fuid );
	$obj->testFight();
    $arr = $obj->buildFight();
	if ( is_array( $arr ) )
	{
	    return json_encode( $arr );
	}
	else
	{
		return $arr;
	}
}

function fight_test()
{
	$uid = intval( $_GET['uid'] );
	$fuid = intval( $_GET['fuid'] );

	$obj = new IFightNew();
	$obj->initUser( $uid, $fuid );
	$obj->testFight();
    $arr = $obj->buildFight();
	return json_encode( $arr );
}

function fight_checkfight()
{
	$obj = new IFightNew();
	$obj->initUser( 10001 , 10001 );
	$obj->testFight();
	pr($obj->process);
}
?>