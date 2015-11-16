<?php

/*
任务类型：
100-每日任务
200-活动任务
300-主线任务
301-普通关卡
302-精英关卡
303-战队等级
304-英雄等级
305-英雄数量
306-英雄品质
307-新系统玩家引导
308-好友数量
 */

class Task{
	public static $Key = '374%$JGdie(&^3nfi)93_:<kd;';

	private $DBConnect = null;

	private $tbname_task = 't_task';

	public $errno = 0;
	public $errmsg = '';

	function __construct()
	{
	}

	function __destruct()
	{
		
	}

	public function createDBConnect($driver_name)
	{
		if( $this->DBConnect == null ) {
			$this->DBConnect = new MysqlDB( $driver_name );
		}
		$this->DBConnect->changeDriver( $driver_name );
	}

	//获取英雄任务列表
	public function getUserTaskList($uid)
	{
		$this->createDBConnect( $this->tbname_task );

		$tiaojian = array();
		$tiaojian['uid'] = $uid;
		$task_list = $this->DBConnect->operator( MYSQL_GET , null , $tiaojian );

		if( count($task_list) <= 0 ) {
			return array();
		}

		//转为整数
		foreach( $task_list as &$mid_config ) {
			foreach( $mid_config as &$value ) {
				$value = intval( $value );
			}
		}

		return $task_list;
	}

	//添加一个新英雄
	public function addNewTask($uid, $task_config)
	{
		$this->createDBConnect( $this->tbname_task );

		$setarr = array();
		$setarr['uid'] = $uid;
		$setarr['task_id'] = $task_config['task_id'];
		$setarr['complete'] = 0;
		$setarr['reward'] = 0;
		$setarr['now_num'] = 0;
		$setarr['need_num'] = $task_config['complete_num'];

		return $this->DBConnect->operator( MYSQL_INSERT , $setarr );
	}

	//更新单一字段
	public function setOneField($uid, $task_id, $field_name, $new_value, $old_value)
	{
		$this->createDBConnect( $this->tbname_task );

		$setarr = array();
		$setarr[$field_name] = intval( $new_value );

		$tiaojian = array();
		$tiaojian['uid'] = $uid;
		$tiaojian['task_id'] = $task_id;
		$tiaojian[$field_name] = $old_value;
		return $this->DBConnect->operator( MYSQL_UPDATE , $setarr , $tiaojian );
	}

	public function getOneTask($uid, $task_id)
	{
		$this->createDBConnect( $this->tbname_task );

		$tiaojian = array();
		$tiaojian['uid'] = $uid;
		$tiaojian['task_id'] = $task_id;
		$task_list = $this->DBConnect->operator( MYSQL_GET , null , $tiaojian );

		if( count($task_list) <= 0 ) {
			return array();
		}

		//转为整数
		$retarr = $task_list[0];
		foreach( $retarr as &$value ) {
			$value = intval( $value );
		}

		return $retarr;
	}


	public static function ReportDoTask($uid, $task_id)
	{
		$postarr = array();
		$postarr['gate'] = 'task_addnum';
		$postarr['uid'] = $uid;
		$postarr['task_id'] = $task_id;
		$postarr['key'] = self::$Key;
		HttpRequest::SendPost('192.168.0.199', 80, 'www.acchappy.com', $postarr);
	}

	public function GetNotRewardTaskList($uid)
	{
		$task_list = $this->getUserTaskList($uid);
		if( count($task_list) <= 0 ) {
			return array();
		}

		$retarr = array();
		foreach( $task_list as $value ) {
			if( $value['reward'] == 0 ) {
				$retarr[] = $value;
			}
		}

		return $retarr;
	}

	public function GetNotRewardTaskListDetail($uid)
	{
		global $TASK_ID_CONFIG;

		$task_list = $this->GetNotRewardTaskList($uid);
		if( count($task_list) <= 0 ) {
			return array();
		}

		foreach( $task_list as &$value ) {
			$task_id = $value['task_id'];
			if( isset( $TASK_ID_CONFIG[$task_id] ) ) {
				$value = array_merge($value, $TASK_ID_CONFIG[$task_id]);
			}
		}

		return $task_list;
	}

	public function Reward($uid, $task_id)
	{
		global $TASK_ID_CONFIG;

		$taskinfo = $this->getOneTask($uid, $task_id);
		if( count($taskinfo) <= 0 ) {
			$this->errno = 902;
			$this->errmsg = "no task [$uid] [$task_id]";
			return false;
		}

		if( $taskinfo['complete'] != 1 ) {
			$this->errno = 903;
			$this->errmsg = "task not complete [$uid] [$task_id]";
			return false;
		}

		if( $taskinfo['reward'] == 1 ) {
			$this->errno = 904;
			$this->errmsg = "already reward [$uid] [$task_id]";
			return false;
		}

		if( !isset( $TASK_ID_CONFIG[$task_id] ) ) {
			$this->errno = 900;
			$this->errmsg = "not find task config [$uid] [$task_id]";
			return false;
		}

		//设置领奖成功
		$ret = $this->setOneField($uid, $task_id, 'reward', 1, 0);
		if( !$ret ) {
			$this->errno = 900;
			$this->errmsg = "set reward error [$uid] [$task_id]";
			return false;
		}

		//发放奖励
		$money_obj = new IMoney();

		//加经验 加金币
		$addexp = intval( $TASK_ID_CONFIG[$task_id]['add_exp'] );
		$addmoney = intval( $TASK_ID_CONFIG[$task_id]['add_money'] );
		$addarr = array();
		if( $addexp > 0 ) {
			$addarr['rankexp'] = $addexp;
		}
		if( $addmoney > 0 ) {
			$addarr['coin'] = $addmoney;
		}
		if( count($addarr) > 0 ) {
			$ret = $money_obj->addMutil( $uid, $addarr );
			if( $ret != true ) { 
				$this->errno = 900;
				$this->errmsg = "add money and Rankexp error [$uid] [$task_id] [$addmoney] [$addexp]";
			}
		}
		
		//加物品
		$packObj = new Package();

		$wupin1 = intval( $TASK_ID_CONFIG[$task_id]['add_wupin1'] );
		$num1   = intval( $TASK_ID_CONFIG[$task_id]['add_num1'] );
		if( $wupin1 > 0 && $num1 > 0 ) {
			$ret = $packObj->addPackage( $uid, $wupin1, $num1 );
			if( $ret != true ) { 
				$this->errno = 900;
				$this->errmsg = "add wupin error [$uid] [$task_id] [$wupin1] [$num1]";
			}
		}

		$wupin2 = intval( $TASK_ID_CONFIG[$task_id]['add_wupin2'] );
		$num2   = intval( $TASK_ID_CONFIG[$task_id]['add_num2'] );
		if( $wupin2 > 0 && $num2 > 0 ) {
			$ret = $packObj->addPackage( $uid, $wupin2, $num2 );
			if( $ret != true ) { 
				$this->errno = 900;
				$this->errmsg = "add wupin error [$uid] [$task_id] [$wupin2] [$num2]";
			}
		}

		return true;
	}

}
?>