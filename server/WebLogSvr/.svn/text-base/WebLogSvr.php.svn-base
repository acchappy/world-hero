<?php
require_once('MyConfig.php');
require_once('Process.php');

class FdData
{
	public static $MainSvr = null;
	public static $Nowfd = 0;
	public static $NowClientIP = '';
	public static $Data = array();
	public static function InitData($fd)
	{
		self::$Data[ $fd ] = array();
		self::$Data[ $fd ]['Recvbuf'] = '';
	}
	public static function ClearData($fd)
	{
		unset( self::$Data[ $fd ] );
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

//task进程 或者 work进程--------------------------------------------
function onWorkerStart(swoole_server $server, $worker_id)
{
	if( $server->taskworker ) {
		//task进程
		ChangeProcessName('Task');
		return;
	} 
	//work进程
	ChangeProcessName('Worker');


	FdData::$MainSvr = $server;
	echo "Worker Init Start Success!\n";

}

//work进程---------------------------------------------------------

function onOpen(swoole_websocket_server $server, swoole_http_request $request)
{
	$client_ip = $request->server['remote_addr'];

	FdData::InitData($request->fd);
}

function onClose(swoole_server $server, $fd, $from_id)
{
	$conninfo = $server->connection_info($fd, $from_id);
	$client_ip = $conninfo['remote_ip'];

	FdData::ClearData($fd);
}

function onMessage(swoole_server $server, swoole_websocket_frame $frame)
{
	$conninfo = $server->connection_info($frame->fd);
	FdData::$NowClientIP = $conninfo['remote_ip'];

	if( $frame->opcode != WEBSOCKET_OPCODE_TEXT ) {
		//不是文本格式数据，直接关闭连接
		FdData::$MainSvr->close($frame->fd);
		return;
	}

	FdData::$Data[$frame->fd]['Recvbuf'] .= $frame->data;

	if( !$frame->finish ) { //包不完整
		return;
	}
	//包完整，可能是几次接收之后才完整
	$reqstr = FdData::$Data[$frame->fd]['Recvbuf'];
	FdData::$Data[$frame->fd]['Recvbuf'] = '';

	FdData::$Nowfd = $frame->fd;

	//处理业务逻辑
	Process::DealReq($reqstr);
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


$MainSvr->on('start', 'onStart');
$MainSvr->on('ManagerStart', 'onManagerStart');
$MainSvr->on('WorkerStart', 'onWorkerStart');

$MainSvr->on('open', 'onOpen');
$MainSvr->on('message', 'onMessage');
$MainSvr->on('close', 'onClose');

$MainSvr->start();
?>