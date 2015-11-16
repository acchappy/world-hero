<?php
class Tower
{
	private $listMem = null;
	private $rankMem = null;

	function __construct()
	{
		$this->listMem = new IMemcached( 'towerList' );
		$this->rankMem = new IMemcached( 'towerRank' );
	}

	public function getUserTowerList( $uid )
	{
		return $this->listMem->getMem( $uid );
	}

	public function setUserTowerList( $uid, $list, $expire = 0 )
	{
		return $this->listMem->setMem( $uid, $list, $expire );
	}

	public function getUserTowerRank( $uid )
	{
		return $this->rankMem->getMem( $uid );
	}

	public function setUserTowerRank( $uid, $rank, $expire = 0 )
	{
		return $this->rankMem->setMem( $uid, $rank, $expire );
	}
}
?>