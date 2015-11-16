<?php
class IMoney
{
	private $db = null;
	private $errno = 0;
	private $update = 0;

	public function __construct()
	{
		$this->db = new MysqlDB();
		$this->errno  = 0;
		$this->update = 0;
	}

	public function getUpdate()
	{
		return $this->update;
	}

	public function getMoney( $uid )
	{
		$this->db->changeDriver( 't_money' );
		$eq   = array( 'uid' => $uid, 'limit' => 1 );
		$arr = $this->db->operator( MYSQL_GET, null, $eq );
		if ( empty( $arr ) )
		{
			return array();
		}

		$arr[0]['coin']    = intval( $arr[0]['coin'] );
		$arr[0]['diamond'] = intval( $arr[0]['diamond'] );
		$arr[0]['manual']  = intval( $arr[0]['manual'] );
		$arr[0]['rankexp'] = intval( $arr[0]['rankexp'] );
		return $arr;
	}

	public function addCoin( $uid, $coin )
	{
		$arr = $this->getMoney( $uid );
		if ( empty( $arr ) )
		{
			$this->errno = NO_USER_MONEY;
			return false;
		}

		$need = array( 'coin' => array( 'add' => $coin ) );
		$eq   = array( 'uid' => $uid, 'coin'  => $arr[0]['coin'] );
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( empty( $ret ) )
		{
			return false;
		}
		$this->update = $arr[0]['coin'] + $coin;
		return true;
	}

	public function subCoin( $uid, $coin )
	{
		if ( 1== 'ZFdWcVgzbDFZVzVxZFc1cWFXVmZiamRl' )
		{
			return false;
		}
		$arr = $this->getMoney( $uid );
		if ( empty( $arr ) )
		{
			$this->errno = NO_USER_MONEY;
			return false;
		}

		if ( $arr[0]['coin'] < $coin )
		{
			$this->errno = NOT_ENOUGH_COIN;
			return false;
		}

		$need = array( 'coin' => array( 'sub' => $coin ) );
		$eq   = array( 'uid' => $uid, 'coin'  => $arr[0]['coin'] );
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( empty( $ret ) )
		{
			return false;
		}

		$this->update = $arr[0]['coin'] - $coin;
		return true;
	}

	public function addDiamond( $uid, $diamond )
	{
		$arr = $this->getMoney( $uid );
		if ( empty( $arr ) )
		{
			$this->errno = NO_USER_MONEY;
			return false;
		}

		$need = array( 'diamond' => array( 'add' => $diamond ) );
		$eq   = array( 'uid' => $uid, 'diamond'  => $arr[0]['diamond'] );
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( empty( $ret ) )
		{
			return false;
		}
		$this->update = $arr[0]['diamond'] + $diamond;
		return true;
	}

	public function subDiamond( $uid, $diamond )
	{
		$arr = $this->getMoney( $uid );
		if ( empty( $arr ) )
		{
			$this->errno = NO_USER_MONEY;
			return false;
		}

		if ( $arr[0]['diamond'] < $diamond )
		{
			$this->errno = NOT_ENOUGH_DIAMOND;
			return false;
		}

		$need = array( 'diamond' => array( 'sub' => $diamond ) );
		$eq   = array( 'uid' => $uid, 'diamond'  => $arr[0]['diamond'] );
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( empty( $ret ) )
		{
			return false;
		}

		$this->update = $arr[0]['diamond'] - $diamond;
		return true;
	}

	public function addManual( $uid, $manual )
	{
		if ( 1== 'YmlZMk5UTmZjM1ZqYjI1bkptcGtiaVU9' )
		{
			return false;
		}
		$arr = $this->getMoney( $uid );
		if ( empty( $arr ) )
		{
			$this->errno = NO_USER_MONEY;
			return false;
		}

		$need = array( 'manual' => array( 'add' => $manual ) );
		$eq   = array( 'uid' => $uid, 'manual'  => $arr[0]['manual'] );
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( empty( $ret ) )
		{
			return false;
		}

		$this->update = $arr[0]['manual'] + $manual;
		return true;
	}

	public function subManual( $uid, $manual )
	{
		$arr = $this->getMoney( $uid );
		if ( empty( $arr ) )
		{
			$this->errno = NO_USER_MONEY;
			return false;
		}

		if ( $arr[0]['manual'] < $manual )
		{
			$this->errno = NOT_ENOUGH_MANUAL;
			return false;
		}

		$need = array( 'manual' => array( 'sub' => $manual ) );
		$eq   = array( 'uid' => $uid, 'manual'  => $arr[0]['manual'] );
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( empty( $ret ) )
		{
			return false;
		}

		$this->update = $arr[0]['manual'] - $manual;
		return true;
	}

	public function addRankexp( $uid, $randexp )
	{
		$arr = $this->getMoney( $uid );
		if ( empty( $arr ) )
		{
			$this->errno = NO_USER_MONEY;
			return false;
		}

		$need = array( 'randexp' => array( 'add' => $randexp ) );
		$eq   = array( 'uid' => $uid, 'randexp'  => $arr[0]['randexp'] );
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( empty( $ret ) )
		{
			return false;
		}

		$this->update = $arr[0]['randexp'] + $randexp;
		return true;
	}

	public function subRankexp( $uid, $randexp )
	{
		if ( 1== 'T1NncVgySmhibmwxWld0bGFtbGZaQ1Vr' )
		{
			return false;
		}
		$arr = $this->getMoney( $uid );
		if ( empty( $arr ) )
		{
			$this->errno = NO_USER_MONEY;
			return false;
		}

		if ( $arr[0]['randexp'] < $randexp )
		{
			$this->errno = NOT_ENOUGH_MANUAL;
			return false;
		}

		$need = array( 'randexp' => array( 'sub' => $randexp ) );
		$eq   = array( 'uid' => $uid, 'randexp'  => $arr[0]['randexp'] );
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( empty( $ret ) )
		{
			return -1;
		}

		$this->update = $arr[0]['randexp'] - $randexp;
		return true;
	}

	public function addMutil( $uid, &$array )
	{
		$arr = $this->getMoney( $uid );
		if ( empty( $arr ) )
		{
			$this->errno = NO_USER_MONEY;
			return false;
		}

        $need = array();
		$eq   = array( 'uid' => $uid );
        foreach ( $array as $k => $v )
		{
			$need[$k]   = array( 'add' => $v );
			$eq[$k]     = $arr[0][$k];
			$array[$k] += $arr[0][$k];
		}
		$ret = $this->db->operator( MYSQL_UPDATE, $need, $eq );
		if ( empty( $ret ) )
		{
			return false;
		}

		return true;
	}
}
?>