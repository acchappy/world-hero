<?php
require_once( '../inc/config.inc.php' );
require_once( '../inc/aoyi.inc.php' );
require_once( '../interface/Hero.php' );
require_once( '../interface/Quality.php' );


function aoyi_build()
{
	global $QUA_CONFIG;

	$DBConnect = new MysqlDB( 'aoyi_info' );
	$DBConnect->changeDriver( 'aoyi_info' );

	$aoyi_type_arr = array();
	$aoyi_type_arr[] = array(10, AOYI_BLOOD_TYPENAME);
	$aoyi_type_arr[] = array(20, AOYI_ATTACK_TYPENAME);
	$aoyi_type_arr[] = array(30, AOYI_HUJIA_TYPENAME);
	$aoyi_type_arr[] = array(40, AOYI_MOKANG_TYPENAME);
	$aoyi_type_arr[] = array(50, AOYI_SPEED_TYPENAME);

	$grade_arr = array();
	$grade_arr[] = array('A'	, 5);
	$grade_arr[] = array('A+'	, 6);
	$grade_arr[] = array('S'	, 8);
	$grade_arr[] = array('S+'	, 10);

	foreach( $aoyi_type_arr as $aoyi_type ) {
		foreach( $grade_arr as $grade ) {
			foreach( $QUA_CONFIG as $key=>$config ) {
				if( !isset( $QUA_CONFIG[$key + 1] ) ) {
					continue;
				}
				$setarr = array();
				$setarr['grade'] = $grade[0];
				$setarr['aoyi_type'] = $aoyi_type[1];
				$setarr['old_aoyi_qua'] = $config['code'];
				$setarr['new_aoyi_qua'] = $QUA_CONFIG[$key + 1]['code'];
				$setarr['cailiao_id'] = 30000 + $aoyi_type[0] + intval($setarr['new_aoyi_qua'] / 10 - 1);
				$setarr['cailiao_num'] = $grade[1] * ($setarr['new_aoyi_qua'] % 10 + 1);
				$setarr['suipian_num'] = 0;

				$DBConnect->operator( MYSQL_INSERT , $setarr );
			}
		}
	}
}

function aoyi_test()
{
	$uid = 10001;
	$hid = 1001;
	$aoyi_obj = new Aoyi($uid, $hid);
	echo $aoyi_obj->UpAoyi(AOYI_BLOOD_TYPENAME);
}

function aoyi_up()
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
	$aoyi_type = @$_REQUEST['aoyi_type'];
	// $hid = 1001;
	// $aoyi_type = 'blood_aoyi';
	
	if( $hid <=0 || $aoyi_type == '' ) {
		$retarr['error'] = 501;
		$retarr['errmsg'] = "param error [$uid] [$hid] [$aoyi_type]";
		echo json_encode($retarr);
		return;
	}

	$aoyi_obj = new Aoyi($uid, $hid);
	$ret = $aoyi_obj->UpAoyi(AOYI_BLOOD_TYPENAME);
	if( !$ret ) {
		$retarr['error'] = $aoyi_obj->errno;
		$retarr['errmsg'] = $aoyi_obj->errmsg;
		echo json_encode($retarr);
		return;
	}

	$retarr['error'] = 0;
	$retarr['errmsg'] = '';
	$retarr['update_package'] = $aoyi_obj->update_package;
	$retarr['update_hero'] = $aoyi_obj->update_hero;
	echo json_encode($retarr);
}
?>