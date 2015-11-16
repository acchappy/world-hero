<?php
class OnlineData{
	public static $Memcached = null;

	public static function Init()
	{
		OnlineData::$Memcached = new Memcached();
		OnlineData::$Memcached->addServer(MyConfig::$online_mem_ip, MyConfig::$online_mem_port);
		return OnlineData::$Memcached->set('0', '0');
	}

	public static function SetOnline($uid, $code)
	{
		$online_str = OnlineData::$Memcached->get("$uid");
		if( false == $online_str ) {
			return;
		}

		$online_info = json_decode($online_str , true);
		$online_info['online'] = $code;

		OnlineData::$Memcached->set( "$uid", json_encode($online_info) );
	}

	public static function UserOnline($uid)
	{
		OnlineData::SetOnline($uid, 1);
	}

	public static function UserOffline($uid)
	{
		OnlineData::SetOnline($uid, 0);
	}
}
?>