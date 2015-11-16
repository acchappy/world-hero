<?php
date_default_timezone_set('Asia/Shanghai');
define('WORK_VERSION' , '1.0');
class MyConfig{
	public static $online_mem_ip = '127.0.0.1';
	public static $online_mem_port = 11213;

	public static $ServerConfig = array();
}


MyConfig::$ServerConfig['worker_num'] = 1;
MyConfig::$ServerConfig['max_request'] = 0;
MyConfig::$ServerConfig['daemonize'] = 1;
MyConfig::$ServerConfig['log_file'] = './log/system.log';
MyConfig::$ServerConfig['backlog'] = 128;
// MyConfig::$ServerConfig['heartbeat_check_interval'] = 1;//遍历周期
MyConfig::$ServerConfig['heartbeat_idle_time'] = 200;//超时时间


?>