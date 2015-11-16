<?php
require_once( '../inc/config.inc.php' );
require_once( '../inc/quality.inc.php' );
require_once( '../interface/Hero.php' );
require_once( '../interface/Quality.php' );


function heroquality_build()
{
	global $QUA_CONFIG;
	global $HERO_CONFIG;

	$DBConnect = new MysqlDB( 'hero_quality' );
	$DBConnect->changeDriver( 'hero_quality' );

	$tiaojian = array();
	$tiaojian['hid'] = 1001;
	$list = $DBConnect->operator( MYSQL_GET , null , $tiaojian );

	foreach( $HERO_CONFIG as $hid=>$value )
	{
		if( $hid == 1001 ) continue;
		
		foreach( $list as $value ) {
			$value['hid'] = $hid;
			echo $DBConnect->operator( MYSQL_INSERT , $value );
		}
	}
		
}

function heroquality_check()
{
	global $HERO_QUALITY_CONFIG;

	foreach( $HERO_QUALITY_CONFIG as $hid=>$config ) {
		$attack_up = 1;
		$cross_up = 1;
		$blood_up = 1;
		$hujia_up = 1;
		$mokang_up = 1;
		foreach($config as $value) {
			if( $value['attack_up'] > 0 ) {
				$attack_up *= $value['attack_up'];
			}
			if( $value['cross_up'] > 0 ) {
				$cross_up *= $value['cross_up'];
			}
			if( $value['blood_up'] > 0 ) {
				$blood_up *= $value['blood_up'];
			}
			if( $value['hujia_up'] > 0 ) {
				$hujia_up *= $value['hujia_up'];
			}
			if( $value['mokang_up'] > 0 ) {
				$mokang_up *= $value['mokang_up'];
			}
		}
		$gong_up = $attack_up * $cross_up;
		$fang_up = $blood_up * ( $hujia_up + $mokang_up ) / 2;
		$total_up = $gong_up * $fang_up;

		$gong_up = number_format($gong_up, 5);
		$fang_up = number_format($fang_up, 5);
		$total_up = number_format($total_up, 5);
		echo "$hid : $gong_up , $fang_up , $total_up <br>";
	}
}

function heroquality_test()
{
	$uid = 10001;
	$hid = 1002;
	$quality_obj = new HeroQuality();
	echo $quality_obj->UpQuality($uid, $hid);
	echo $quality_obj->errmsg;
}

function heroquality_up()
{
	$retarr = array();

	$uid = Login::getLogin();
	// $uid = 10001;
	if( $uid <=0 ) {
		$retarr['error'] = 100;
		$retarr['errmsg'] = "not login [$uid]";
		echo json_encode($retarr);
		return;
	}

	$hid = @intval( $_REQUEST['hid'] );
	// $hid = 1001;
	
	if( $hid <=0 ) {
		$retarr['error'] = 601;
		$retarr['errmsg'] = "param error [$uid] [$hid]";
		echo json_encode($retarr);
		return;
	}

	$quality_obj = new HeroQuality();
	$ret = $quality_obj->UpQuality($uid, $hid);
	if( !$ret ) {
		$retarr['error'] = $quality_obj->errno;
		$retarr['errmsg'] = $quality_obj->errmsg;
		echo json_encode($retarr);
		return;
	}

	$retarr['error'] = 0;
	$retarr['errmsg'] = '';
	$retarr['update_package'] = $quality_obj->update_package;
	$retarr['update_hero'] = $quality_obj->update_hero;
	echo json_encode($retarr);
}
?>