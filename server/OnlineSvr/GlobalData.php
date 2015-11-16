<?php

class CMD
{
	public static $Login = 1001;

	public static $otherlogin = 102;

}

class ErrCode
{
	public static $system 	= 100;
	public static $param 	= 101;
	public static $notlogin = 102;
	public static $mtkey	= 103;
}

class UserData
{
	public static $UserData = array();//uid=>array

	public static function InitUser($uid)
	{
		UserData::$UserData[$uid] = array();
	}

	public static function ClearUser($uid)
	{
		unset( UserData::$UserData[$uid] );
	}
}

?>