<?php
define( 'LOG_DIR_PATH'	, dirname(__file__) );

class Logger
{
	static $errorfile = LOG_DIR_PATH . '/log/error.log';
	static $infofile  = LOG_DIR_PATH . '/log/info.log';
	static $debugfile = LOG_DIR_PATH . '/log/debug.log';
	static $dayfile   = LOG_DIR_PATH . '/log/daylog.log';

	public static function Write($filename, $msg, $cfile, $cline, $dat)
	{
		$clientip = FdData::$NowClientIP;
		$in = "[$dat][$clientip][$cfile:$cline]$msg\n";
		return error_log( $in, 3, $filename );
	}

	public static function Error($msg)
	{
		$arr = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
		$cfile = @basename( $arr[0]['file'] );
		$cline = @$arr[0]['line'];
		$dat = date('Y-m-d H:i:s');
		
		self::Write(self::$errorfile, $msg, $cfile, $cline, $dat);
	}

	public static function Info($msg)
	{
		$arr = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
		$cfile = @basename( $arr[0]['file'] );
		$cline = @$arr[0]['line'];
		$dat = date('Y-m-d H:i:s');
		
		self::Write(self::$infofile, $msg, $cfile, $cline, $dat);
	}

	public static function Debug($msg)
	{
		$arr = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
		$cfile = @basename( $arr[0]['file'] );
		$cline = @$arr[0]['line'];
		$dat = date('Y-m-d H:i:s');
		
		self::Write(self::$debugfile, $msg, $cfile, $cline, $dat);
	}

	public static function Daylog($msg)
	{
		$now = time();
		$filename = self::$dayfile . '.' . date('Y-m-d', $now);
		$arr = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);
		$cfile = @basename( $arr[0]['file'] );
		$cline = @$arr[0]['line'];
		$dat = date('Y-m-d H:i:s', $now);
		
		self::Write($filename, $msg, $cfile, $cline, $dat);
	}
}
?>