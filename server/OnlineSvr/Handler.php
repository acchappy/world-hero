<?php
class Handler
{
	public static function onWorkerStart(swoole_server $server, $worker_id)
	{
		//在线表
		if( !OnlineData::Init() ) {
			echo "!!!OnlineData::Init error\n";
			return;
		}
		echo "OnlineData::Init success\n";

		echo "error file : " . Logger::$errorfile . "\n";

		//初始化成功
		FdData::$MainSvr = $server;
		echo "-------------------------------------Worker Init Start Success!\n";

		//开启定时器
		swoole_timer_tick(1000, 'Process::OverTimeCheck');

	}

	public static function onOpen(swoole_websocket_server $server, swoole_http_request $request)
	{
		$client_ip = $request->server['remote_addr'];
		echo "open client success fd [$request->fd] [$client_ip]\n";

		FdData::InitData($request->fd);
	}

	public static function onClose(swoole_server $server, $fd, $from_id)
	{
		$conninfo = $server->connection_info($fd, $from_id);
		$client_ip = $conninfo['remote_ip'];
		echo "socket close [$fd] [$from_id] [$client_ip]\n";

		//清理user
		$status = FdData::$Data[$fd]['status'];
		Process::UserLogout($fd, $status);

		FdData::ClearData($fd);
	}

	public static function onMessage(swoole_server $server, swoole_websocket_frame $frame)
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
		Process::ProcessCmd($reqstr);
	}
}
?>