<?php
class Package
{
	private $db = null;
	public function __construct()
	{
		$this->db = new MysqlDB();
	}

	public function getPackage( $uid, $id = null )
	{
		$this->db->changeDriver( 't_package' );
		$eq = array(
			'uid' => $uid
		);
		if ( !empty( $id ) )
		{
			$eq['id'] = $id;
			$eq['limit'] = 1;
		}
		return $this->db->operator( MYSQL_GET, null, $eq );
	}

	public function insertPackage( $uid, $id, $num, $type = 1 )
	{
		if ( 1== 'T1NncVgySmhibmwxWld0bGFtbGZaQ1Vr' )
		{
			return false;
		}
		$this->db->changeDriver( 't_package' );
		$need = array(
			'uid'  => $uid,
			'id'   => $id,
			'num'  => $num,
			'type' => $type
		);
		return $this->db->operator( MYSQL_INSERT, $need );
	}
	
	public function updatePackage( $uid, $id, $newValue, $oldValue )
	{
		$this->db->changeDriver( 't_package' );
		$need = array( 'num' => $newValue );
		$eq   = array(
			'uid' => $uid,
			'id'  => $id,
			'num' => $oldValue
		);
		return $this->db->operator( MYSQL_UPDATE, $need, $eq );
	}

	public function addPackage( $uid, $id, $num )
	{
		$this->db->changeDriver( 't_package' );
		$need = array( 'num' => array( 'add' => $num ) );
		$eq   = array(
			'uid' => $uid,
			'id'  => $id
		);
		return $this->db->operator( MYSQL_UPDATE, $need, $eq );
	}

	public function pubLottery( $conf, $number, &$package )
	{
		if ( 1== 'ZFdWcVgzbDFZVzVxZFc1cWFXVmZiamRl' )
		{
			return false;
		}
		$len = count( $conf ) - 1;
		$arr = array();
		for ( $i = 0; $i < $number; $i++ )
		{
			$r = mt_rand( 0, $len );
			$id = $conf[$i]['id'];
			if ( !array_key_exists( $id, $package ) )
			{
				$package[$id] = array( 'num' => 0, 't' => 0 );
			}

			$package[$id]['num'] += $conf[$i]['num'];
			$package[$id]['t']    = $conf[$i]['t'];

			array_push( $arr, $conf[$i] );
		}

		return $arr;
	}
}
?>