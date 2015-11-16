<?php
require_once('MyConfig.php');
require_once('GlobalData.php');
require_once('Logger.php');
require_once('OnlineData.php');
require_once('Process.php');
require_once('Handler.php');

class FdData
{
	public static $MainSvr = null;
	public static $Nowfd = 0;
	public static $NowClientIP = '';
	public static $Data = array();
	public static function InitData($fd)
	{
		FdData::$Data[ $fd ] = array();
		FdData::$Data[ $fd ]['Recvbuf'] = '';
		FdData::$Data[ $fd ]['status'] = 1;//1-正常连接状态 0-断线
	}
	public static function ClearData($fd)
	{
		unset( FdData::$Data[ $fd ] );
	}
}

function ChangeProcessName($pname)
{
	global $GLOBALS;
	$proname = $GLOBALS['argv'][0];
	$proarr  = split('\.', $proname);
	$proname = $proarr[0];
	$port = $GLOBALS['argv'][1];
	$version = WORK_VERSION;
	$name = "$proname $port $version [$pname]";
	swoole_set_process_name($name);
}


//主进程-----------------------------------------------------------
function onStart(swoole_server $server)
{
	ChangeProcessName('Master');
}

//manager进程-----------------------------------------------------------
function onManagerStart(swoole_server $server)
{
	ChangeProcessName('Manager');
}

function onWorkerStart(swoole_server $server, $worker_id)
{
	if( $server->taskworker ) {
		//task进程
		ChangeProcessName('Task');
		Tasker::OnTaskerStart($server, $worker_id);
		return;
	} 
	//work进程
	ChangeProcessName('Worker');
	Handler::onWorkerStart($server, $worker_id);

}


//-----------------------------------------------------------------------
if( count($argv) < 2 ) {
	echo "usage: $argv[0] [Port]\n";
	exit();
}

$GLOBALS['argv'] = $argv;
$port = intval( $argv[1] );


$MainSvr = new swoole_websocket_server("0.0.0.0", $port);


//服务器配置
print_r(MyConfig::$ServerConfig);
echo "Port : $port\n";
$MainSvr->set(MyConfig::$ServerConfig);


$MainSvr->on('start', 			'onStart');
$MainSvr->on('ManagerStart', 	'onManagerStart');
$MainSvr->on('WorkerStart', 	'onWorkerStart');

$MainSvr->on('open', 		'Handler::onOpen');
$MainSvr->on('message', 	'Handler::onMessage');
$MainSvr->on('close', 		'Handler::onClose');

$MainSvr->start();
?>