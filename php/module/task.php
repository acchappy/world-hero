<?php
require_once( '../inc/config.inc.php' );
require_once( '../inc/aoyi.inc.php' );
require_once( '../interface/Hero.php' );
require_once( '../interface/Quality.php' );


function task_addnum()
{
	echo 'recv';
	HttpRequest::ResponseNow();

	$retarr = array();

	$uid = @intval( $_POST['uid'] );
	$task_id = @intval( $_POST['task_id'] );
	$key = @$_POST['key'];

	if( $uid <= 0 || $task_id <= 0 || $key != Task::$Key ) {
		echo "param error [$uid] [$task_id] [$key]";
		return;
	}

	$task_obj = new Task();
	$one_task = $task_obj->getOneTask($uid, $task_id);
	if( count($one_task) <= 0 || $one_task['complete'] == 1 ) {
		echo "status error";
		return;
	}

	$old_num = $one_task['now_num'];
	$new_num = $old_num + 1;

	$task_obj->setOneField($uid, $task_id, 'now_num', $new_num, $old_num);
}



/*
 [0] => Array
        (
            [uid] => 10001--
            [task_id] => 3010010--任务id
            [complete] => 0--是否完成，0-未完成，1-完成
            [reward] => 0--是否领奖，0-未领奖，1-已经领奖
            [now_num] => 178--现在达到次数
            [need_num] => 10000--需要达到的数次才能完成
            [type] => 301--任务类型
            [level] => 1--需要战队等级
            [complete_num] => 1
            [add_exp] => 100--完成后奖励的经验
            [add_money] => 100--完成后奖励的金币
            [add_wupin1] => 10001--完成后奖励的物品1
            [add_num1] => 10--完成后奖励的物品1数量
            [add_wupin2] => 10002--完成后奖励的物品2
            [add_num2] => 5--完成后奖励的物品2数量
            [shuoming] => guan ka 1-1--说明描述
        )
 */
function task_getlist()
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

	$task_obj = new Task();
	$task_list = $task_obj->GetNotRewardTaskList($uid);

	$retarr['error'] = 0;
	$retarr['errmsg'] = '';
	$retarr['task_list'] = $task_list;
	// pr($task_list);
	echo json_encode($retarr);
}

function task_reward()
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

	$task_id = @intval( $_REQUEST['task_id'] );
	// $task_id = 3010010;
	if( $task_id <=0 ) {
		$retarr['error'] = 901;
		$retarr['errmsg'] = "param error [$uid] [$task_id]";
		echo json_encode($retarr);
		return;
	}

	$task_obj = new Task();
	$ret = $task_obj->Reward($uid, $task_id);
	if( $ret != true ) {
		$retarr['error'] = $task_obj->errno;
		$retarr['errmsg'] = $task_obj->errmsg;
		echo json_encode($retarr);
		return;
	}

	$retarr['error'] = 0;
	$retarr['errmsg'] = '';
	echo json_encode($retarr);
}
?>