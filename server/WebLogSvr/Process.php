<?php
class CMD
{
	public static $WriteLog = 1001;
}

class Process
{

	public static function DealReq($reqstr)
	{
		$reqarr = json_decode($reqstr, true);

		$cmd = @intval( $reqarr['cmd'] );
		if( $cmd == CMD::$WriteLog ) {
			self::DealWriteLog($reqarr);
		} 
	}

	public static function DealWriteLog($reqarr)
	{
		//先返回成功
		$retarr = array();
		$retarr['cmd'] = $reqarr['cmd'];
		$retarr['retcode'] = 0;
		FdData::$MainSvr->push( FdData::$Nowfd, json_encode($retarr) );

		//写日志
		$file = $reqarr['file'];
		$msg  = $reqarr['msg']."\n";
		error_log( $msg, 3, $file );
	}
}
?>