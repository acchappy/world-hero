<?php
date_default_timezone_set('Asia/Shanghai');
define('WORK_VERSION' , '1.0');
class MyConfig{
	public static $ServerConfig = array();
}


MyConfig::$ServerConfig['worker_num'] = 4;
MyConfig::$ServerConfig['max_request'] = 0;
MyConfig::$ServerConfig['daemonize'] = 1;
MyConfig::$ServerConfig['log_file'] = './log/system.log';
MyConfig::$ServerConfig['backlog'] = 128;
MyConfig::$ServerConfig['heartbeat_check_interval'] = 60;//遍历周期
MyConfig::$ServerConfig['heartbeat_idle_time'] = 600;//超时时间


?>