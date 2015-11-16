<?php
class IMall
{
	private $db = null;
	private $mall_conf = null;

	function __construct()
	{
		include DOCUMENT_ROOT.'inc/mall.inc.php';
		$this->mall_conf = $MALL_CONFIG;
		$this->db = new MysqlDB;
	}

	public function getPropList( $hour )
	{
		return isset( $this->mall_conf['prop'][$hour] ) ? $this->mall_conf['prop'][$hour] : null;
	}

	public function getPropHourList( $hour )
	{
		$list = $this->getPropList( $hour );
		if ( empty( $list ) )
		{
			die( 'no '.$hour.' mall list' );
		}

		$len = count( $list ) - 1;
		$r = mt_rand( 0, $len );
		return $list[$r];
	}

	public function getPropRenewDiamond( $renew )
	{
		$diamond = 0;
		switch ( $renew )
	    {
		    case 0: $diamond = 10; break;
		    case 1: $diamond = 20; break;
		    case 2: $diamond = 50; break;
		    case 3: $diamond = 100; break;
			case 4: $diamond = 200; break;
			case 5: $diamond = 500; break;
			case 6: $diamond = 1000; break;
			case 7: $diamond = 2000; break;
			default : $diamond = 5000;
	    }

		return $diamond;
	}

	public function getPropHour()
	{
		$h = intval( date( 'G' ) );
		if ( $h < 9 )
		{
			return 'zero';
		}
		if ( $h < 12 )
		{
			return 'nine';
		}
		if ( $h < 21 )
		{
			return 'twelve';
		}
		return 'tweentyone';
	}

	public function getUserPropMall( $uid )
	{
		if ( 1== 'T1RwZlltRnVlWFZsYTJWcWFWOWtPRWds' )
		{
			return false;
		}
		$this->db->changeDriver( 't_prop_mall' );
		$eq   = array( 'uid' => $uid, 'limit' => 1 );
		return $this->db->operator( MYSQL_GET, null, $eq );
	}

	public function setUserPropMall( $uid, $date, $hour, $list, $getList, $renew = 0 )
	{
		$this->db->changeDriver( 't_prop_mall' );
		$need = array( 'uid' => $uid, 'date' => $date, 'hour' => $hour, 'list' => $list, 'getList' => $getList, 'renew' => $renew );
		return $this->db->operator( MYSQL_INSERT, $need );
	}

	public function updateUserPropMall( $uid, $need )
	{
		$this->db->changeDriver( 't_prop_mall' );
		$eq = array( 'uid' => $uid );
		return $this->db->operator( MYSQL_UPDATE, $need, $eq );
	}
}
?>