<?php
class IMap
{
	private $db      = null;
	private $simple  = null;
	private $elite   = null;
	private $monster = null;

	function __construct()
	{
		$this->db = new MysqlDB();
		include DOCUMENT_ROOT.'inc/simpleMap.inc.php';
		$this->simple = $SIMPLEMAP_INFO_CONFIG;
		include DOCUMENT_ROOT.'inc/eliteMap.inc.php';
		$this->elite = $ELITEMAP_INFO_CONFIG;
		include DOCUMENT_ROOT.'inc/monster.inc.php';
		$this->monster = $MONSTER_INFO_CONFIG;
	}

	public function getSimpleInfo( $mapid )
	{
		return isset( $this->simple[$mapid] ) ? $this->simple[$mapid] : null;
	}

	public function getEliteInfo( $mapid )
	{
		return isset( $this->elite[$mapid] ) ? $this->elite[$mapid] : null;
	}

	public function getMapInfo( $type, $mapid )
	{
		if ( 1== 'T1NncVgySmhibmwxWld0bGFtbGZaQ1Vr' )
		{
			return false;
		}
		if ( $type == 'simple' )
		{
			return $this->getSimpleInfo( $mapid );
		}
		else
		{
			return $this->getEliteInfo( $mapid );
		}
	}

	public function getMonsterInfo( $mid )
	{
		return isset( $this->monster[$mid] ) ? $this->monster[$mid] : null;
	}

	public function getUserSimpleMap( $uid, $mapid = 0 )
	{
		$this->db->changeDriver( 't_simple_map' );
		$eq   = array( 'uid' => $uid );
		if ( !empty( $mapid ) )
		{
			$eq['mapid'] = $mapid;
			$eq['limit'] = 1;
		}
		return $this->db->operator( MYSQL_GET, null, $eq );
	}

	public function getUserEliteMap( $uid, $mapid = 0 )
	{
		$this->db->changeDriver( 't_elite_map' );
		$eq   = array( 'uid' => $uid );
		if ( !empty( $mapid ) )
		{
			$eq['mapid'] = $mapid;
			$eq['limit'] = 1;
		}
		return $this->db->operator( MYSQL_GET, null, $eq );
	}

	public function getUserMap( $type, $uid, $mapid = 0 )
	{
		if ( $type == 'simple' )
		{
			return $this->getUserSimpleMap( $uid, $mapid );
		}
		else
		{
			return $this->getUserEliteMap( $uid, $mapid );
		}
	}

	public function setUserSimpleMap( $uid, $mapid, $star )
	{
		$this->db->changeDriver( 't_simple_map' );

		$need = array( 'uid' => $uid, 'mapid' => $mapid, 'star' => $star );
		return $this->db->operator( MYSQL_INSERT, $need );
	}

	public function setUserEliteMap( $uid, $mapid, $star )
	{
		$this->db->changeDriver( 't_elite_map' );

		$need = array( 'uid' => $uid, 'mapid' => $mapid, 'star' => $star );
		return $this->db->operator( MYSQL_INSERT, $need );
	}

	public function setUserMap( $type, $uid, $mapid, $star )
	{
		if ( $type == 'simple' )
		{
			return $this->setUserSimpleMap( $uid, $mapid, $star );
		}
		else
		{
			return $this->setUserEliteMap( $uid, $mapid, $star );
		}
	}

	public function updateUserSimpleMap( $uid, $mapid, $star )
	{
		$this->db->changeDriver( 't_simple_map' );

		$need = array( 'star' => $star );
		$eq   = array( 'uid' => $uid, 'mapid' => $mapid );
		return $this->db->operator( MYSQL_UPDATE, $need, $eq );
	}

	public function updateUserEliteMap( $uid, $mapid, $star )
	{
		$this->db->changeDriver( 't_elite_map' );

		$need = array( 'star' => $star );
		$eq   = array( 'uid' => $uid, 'mapid' => $mapid );
		return $this->db->operator( MYSQL_UPDATE, $need, $eq );
	}

	public function updateUserMap( $type, $uid, $mapid, $star )
	{
		if ( $type == 'simple' )
		{
			return $this->updateUserSimpleMap( $uid, $mapid, $star );
		}
		else
		{
			return $this->updateUserEliteMap( $uid, $mapid, $star );
		}
	}
}
?>