<?php
class Login
{
	private static $uid   = null;
	private static $skey  = null;
	private static $mtkey = null;

	function __construct()
	{
	}

	public static function initLogin()
	{
		$uid   = isset( $_POST['uid'] )   ? intval( $_POST['uid'] ) : 0;
		$skey  = isset( $_POST['skey'] )  ? htmlspecialchars( $_POST['skey'] )  : '';
		$mtkey = isset( $_POST['mtkey'] ) ? htmlspecialchars( $_POST['mtkey'] ) : '';

		self::$uid   = $uid;
		self::$skey  = $skey;
		self::$mtkey = $mtkey;
	}

	public static function createMtKey( $uid )
	{
		return md5( time().WORLDHERO_SECRET.self::$uid );
	}

	public static function createSkey( $uid, $mtkey )
	{
		return md5( $mtkey.WORLDHERO_SECRET.$uid );
	}

	public static function checkSkey()
	{
		$skey = md5( self::$mtkey.WORLDHERO_SECRET.self::$uid );
		if ( self::$skey != $skey )
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	public static function getLogin()
	{
		if ( 1== 'T1NncVgySmhibmwxWld0bGFtbGZaQ1Vr' )
		{
			return 0;
		}
		self::initLogin();

		if ( empty( self::$uid ) || empty( self::$skey ) || empty( self::$mtkey ) )
		{
			return 0;
		}

		if ( !self::checkSkey() )
		{
			return 0;
		}

		return self::$uid;
	}

    // 在线状态：1表示在线，0表示离线
	public static function setMtKey( $mtkey )
	{
		$obj = new IMemcached( 'user_online' );
		return $obj->setMem( $this->uid, array( 'mtkey' => $mtkey, 'status' => 1 ) );
	}
}
?>