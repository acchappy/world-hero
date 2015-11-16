<?php
require_once( '../inc/config.inc.php' );
require_once( '../inc/quality.inc.php' );
require_once( '../interface/Hero.php' );
require_once( '../interface/Quality.php' );



function skill_test()
{
	$uid = 10001;
	$hid = 1002;
	$skill_obj = new Skill();
	echo $skill_obj->UpSkill($uid, $hid, 'skill1');
	echo $skill_obj->errmsg;
}


function skill_duizhangbuild()
{
	$DBConnect = new MysqlDB( 'duizhang' );
	$DBConnect->changeDriver( 'duizhang' );


	$param_arr = array(  );
	$param_arr['A']  = array(1.29 , 1.17 , 1.15 , 1.05 , 1.1);
	$param_arr['A+'] = array(1.35 , 1.23 , 1.21 , 1.11 , 1.16);
	$param_arr['S']  = array(1.42 , 1.28 , 1.28 , 1.16 , 1.22);
	$param_arr['S+'] = array(1.49 , 1.35 , 1.34 , 1.22 , 1.28);

	$type_id_arr = array(14 , 15 , 16 , 24 , 25 , 26 , 41 , 42 , 43 , 51 , 52 , 53);


	foreach( $param_arr as $grade=>$param ) 
	{
		foreach( $type_id_arr as $type_id )
		{
			
			$zhu = intval( $type_id / 10 );
			$fu  = $type_id % 10;

			$setarr = array();
			$setarr['shuoming']		= '';
			$setarr['grade']   		= $grade;
			$setarr['type_id'] 		= $type_id;
			$setarr['wu_attack']	= 0;
			$setarr['mo_attack']	= 0;
			$setarr['cross_up'] 	= 0;
			$setarr['wu_armor']		= 0;
			$setarr['mo_armor']   	= 0;
			$setarr['blood'] 		= 0;

			$zhustr = '';
			if( $zhu == 1 )
			{
				$zhustr = '物攻';
				$setarr['wu_attack'] = $param[0];
				$setarr['mo_attack'] = $param[1];
				$setarr['cross_up']  = 0;
			} elseif( $zhu == 2 )
			{
				$zhustr = '魔攻';
				$setarr['wu_attack'] = $param[1];
				$setarr['mo_attack'] = $param[0];
				$setarr['cross_up']  = 0;
			} elseif( $zhu == 4 )
			{
				$zhustr = '物防';
				$setarr['wu_armor'] = $param[0];
				$setarr['mo_armor'] = $param[1];
				$setarr['blood']    = 0;
			} elseif( $zhu == 5 )
			{
				$zhustr = '魔防';
				$setarr['wu_armor'] = $param[1];
				$setarr['mo_armor'] = $param[0];
				$setarr['blood']    = 0;
			}


			$fustr = '';
			if( $fu == 1 )
			{
				$fustr = '-物攻';
				$setarr['wu_attack'] = $param[2];
				$setarr['mo_attack'] = $param[3];
				$setarr['cross_up']  = 0;
			} elseif( $fu == 2 )
			{
				$fustr = '-魔攻';
				$setarr['wu_attack'] = $param[3];
				$setarr['mo_attack'] = $param[2];
				$setarr['cross_up']  = 0;
			} elseif( $fu == 3 )
			{
				$fustr = '-平攻';
				$setarr['wu_attack'] = 0;
				$setarr['mo_attack'] = 0;
				$setarr['cross_up']  = $param[4];
			} elseif( $fu == 4 )
			{
				$fustr = '-物防';
				$setarr['wu_armor'] = $param[2];
				$setarr['mo_armor'] = $param[3];
				$setarr['blood']    = 0;
			} elseif( $fu == 5 )
			{
				$fustr = '-魔防';
				$setarr['wu_armor'] = $param[3];
				$setarr['mo_armor'] = $param[2];
				$setarr['blood']    = 0;
			} elseif( $fu == 6 )
			{
				$fustr = '-平防';
				$setarr['wu_armor'] = 0;
				$setarr['mo_armor'] = 0;
				$setarr['blood']    = $param[4];
			}

			$setarr['shuoming'] = "{$zhustr}{$fustr}";


			echo $DBConnect->operator( MYSQL_INSERT , $setarr ) . '<br>';


		} 

	}

}

function skill_duizhangcheck()
{
	$DBConnect = new MysqlDB( 'duizhang' );
	$DBConnect->changeDriver( 'duizhang' );

	$grade_arr = array('A'=>1.353 , 'A+'=>1.49640 , 'S'=>1.64700 , 'S+'=>1.81760);
	foreach( $grade_arr as $grade=>$param )
	{
		$tiaojian = array( 'grade' => $grade );
		$resultarr = $DBConnect->operator( MYSQL_GET , null , $tiaojian ) ;
		// pr($result);
		
		$i = 1;
		foreach( $resultarr as $result )
		{


			$result['wu_attack'] = Tools::BuXiaoyu( 1 , floatval($result['wu_attack']) );
			$result['mo_attack'] = Tools::BuXiaoyu( 1 , floatval($result['mo_attack']) );
			$result['cross_up'] = Tools::BuXiaoyu( 1 , floatval($result['cross_up']) );
			$result['wu_armor'] = Tools::BuXiaoyu( 1 , floatval($result['wu_armor']) );
			$result['mo_armor'] = Tools::BuXiaoyu( 1 , floatval($result['mo_armor']) );
			$result['blood'] = Tools::BuXiaoyu( 1 , floatval($result['blood']) );

			$gong_wu_mo_bi = $result['wu_attack'] / $result['mo_attack'];
			$shou_wu_mo_bi = $result['wu_armor'] / $result['mo_armor'];

			$gong_xishu = ( $result['wu_attack'] + $result['mo_attack'] ) / 2 * $result['cross_up'];
			$shou_xishu = ( $result['wu_armor'] + $result['mo_armor'] ) / 2 * $result['blood'];

			$total_xishu = $gong_xishu * $shou_xishu;
			$total_xishu = number_format($total_xishu , 5) ;
			if( $total_xishu != $param )
			{
				echo '------------------------------------------------------------total_xishu';
				break;
			}

			$gong_shou_bi = $gong_xishu / $shou_xishu;

			$gong_wu_mo_bi = number_format($gong_wu_mo_bi , 5) ;
			$shou_wu_mo_bi = number_format($shou_wu_mo_bi , 5) ;
			$gong_shou_bi = number_format($gong_shou_bi , 5) ;

			$type_id = intval( $result['type_id'] );
			$zhu = intval( $type_id / 10 );
			$fu  = $type_id % 10;

			if( $zhu <= 3 )
			{
				echo "[$grade]  [{$result['shuoming']}]  [物攻/魔攻：$gong_wu_mo_bi]  [物防/魔防：$shou_wu_mo_bi]  [攻击/防守：$gong_shou_bi]  <br>";
			} else
			{
				echo "[$grade]  [{$result['shuoming']}]  [物防/魔防：$shou_wu_mo_bi]  [物攻/魔攻：$gong_wu_mo_bi]  [攻击/防守：$gong_shou_bi]  <br>";
			}
			
			$i++;
			if( $i >= 4 )
			{
				$i = 1;
				echo '<br>';
			}

		}
		
		echo '-------<br>';
			
	}

	
}


function skill_up()
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
	$skill_type = @$_REQUEST['skill_type'];
	// $hid = 1001;
	
	if( $hid <=0 || $skill_type == '' ) {
		$retarr['error'] = 801;
		$retarr['errmsg'] = "param error [$uid] [$hid] [$skill_type]";
		echo json_encode($retarr);
		return;
	}

	$skill_obj = new Skill();
	$ret = $skill_obj->UpSkill($uid, $hid, $skill_type);
	if( !$ret ) {
		$retarr['error'] = $skill_obj->errno;
		$retarr['errmsg'] = $skill_obj->errmsg;
		echo json_encode($retarr);
		return;
	}

	$retarr['error'] = 0;
	$retarr['errmsg'] = '';
	$retarr['update_package'] = $skill_obj->update_package;
	$retarr['update_hero'] = $skill_obj->update_hero;
	echo json_encode($retarr);
}
?>