<?php
class MemcachedDB{
	private $mem     = null;
	private $memId   = null;
	private $memHost = null;
	private $memPort = null;

	private $db = null;
	private $dbHost = null;
	private $dbConn = null;
	private $dbTimeout = 3;
	private $dbName = null;

    public $config  = null;
	private $driver = null;

    /* 建立memcached链接的id，跟driver配置的主键一致 */
	function __construct( $id = null )
	{
		$this->config = new Config();
		$this->memId = $id;
	}

	function __destruct()
	{
	}

	public function freeMem()
	{
		if ( $this->mem )
		{
		    $this->mem->quit();
		    $this->mem = null;
		}
	}

	public function freeDB()
	{
		if ( $this->db )
		{
		    $this->db->close();
		    $this->db = null;
		}
	}

	public function setMemId( $id )
	{
		$this->memId = $id;
	}

    /*
    根据host和port进行memcache连接，如果host为空，则根据memId的driver信息读取
    */
	public function connectMem( $host = '', $port = 0, $memId = null )
	{
		if ( $this->mem )
		{
			return true;
		}

		if ( empty( $host ) )
		{
			
			if ( empty( $this->driver ) )
			{
				die( 'mem host or config is null' );
			}

		    $this->memHost = $this->driver['memHost'];
		    $this->memPort = $this->driver['memPort'];
		}
		else
		{
		    $this->memId   = $memId;
		    $this->memHost = $host;
		    $this->memPort = $port;
		}

        $this->mem = new Memcached( $this->memId );
		$servers = $this->mem->getServerList(); 
        if ( is_array( $servers ) )
        { 
            foreach ( $servers as $k )
            {
                if ( ( $k['host'] == $this->memHost ) and ( $k['port'] == $this->memPort ) )
                {
                    return true; 
                }
            }
        }
        return $this->mem->addServer( $this->memHost , $this->memPort ); 
	}

	public function getMemResultCode()
	{
		return $this->mem->getResultCode();
	}

	public function getMem( $key )
	{
		return $this->mem->get( $key );
	}

	public function getMemMulti( $arrayKeys )
	{
		return $this->mem->getMulti( $arrayKeys, $null, Memcached::GET_PRESERVE_ORDER );
	}

	public function setMem( $key, $value, $expire = 0 )
	{
		if ( is_array( $value ) )
		{
			$json  = json_encode( $value );
			$value = $json;
		}
		$cas = null;
        $ips = $this->mem->get( $key, null, $cas );
        if ( $this->mem->getResultCode() == Memcached::RES_NOTFOUND )
        {
            $this->mem->add( $key, $value, $expire );
        }
        else
        {
            $this->mem->cas( $cas, $value, $expire );
        }
	}

	public function setMemMulti( $items, $expire = 0 )
	{
		return $this->mem->setMulti( $items, $expire );
	}

	public function deleteMem( $arrayKeys, $expire = 0 )
	{
		return $this->mem->deleteMulti( $arrayKeys, $expire );
	}

	public function connectDB( $info = null )
	{
		if ( $this->db )
		{
			return true;
		}
        
		if ( empty( $info ) )
		{
		    $info = $this->driver;
		    if ( empty( $info ) )
		    {
			    die( 'mysql config null' );
		    }
		}

		$this->db = mysqli_init();
		if ( !$this->db )
		{
            die('mysqli_init failed');
            //return false;
		}

		if ( !$this->db->options(MYSQLI_INIT_COMMAND, 'SET AUTOCOMMIT = 0') )
		{
    		die('Setting MYSQLI_INIT_COMMAND failed');
    		//return false;
		}

		if ( !$this->db->options(MYSQLI_OPT_CONNECT_TIMEOUT, $this->dbTimeout ) )
		{
    		die('Setting MYSQLI_OPT_CONNECT_TIMEOUT failed');
    		//return false;
		}

		if ( !$this->db->real_connect( $info['dbHost'], $info['user'], $info['passwd'], '', $info['dbPort'] ) ) 
		{
    		die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
    		//return false;
		}

		return true;
	}

	public function getInsertId()
	{
		return $this->db->insert_id;
	}

	public function selectDB( $dbName )
	{
		return $this->db->select_db( $dbName );
	}

	public function querySql( $sql )
	{
		$result = $this->db->query( $sql );
		if ( !$result )
		{
			die( 'query sql error '.$this->db->error );
		}
		return $result;
	}

	public function getDB( $sql, &$array )
	{
		$result = $this->db->query( $sql );
        
        if ( $result->num_rows <= 0 )
        {
        	$result->free();
        	return;
        }
		/* associative array */
		while( $row = $result->fetch_array( MYSQLI_ASSOC ) )
		{
			array_push( $array, $row );
		}

		/* free result set */
		$result->free();
	}

    //0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
	public function getDeployDb( $key, $deploy, $dbName )
	{
		$db = $dbName;
		switch ( $deploy )
		{
			case 1: $dbName = $db;
			        break;
			case 2: $dbName = sprintf( '%s%d', intval( $key % 100 / 10 ) );
			        break;
			case 3: $dbName = sprintf( '%s%d', intval( $key % 100 / 10 ) );
			        break;
			default: $dbName = $db;
			        break;
		}

		return $dbName;
	}

	public function getDeployTb( $key, $deploy, $tbName )
	{
		$tb = $tbName;
		switch ( $deploy )
		{
			case 1: $tbName = sprintf( '%s%d', $tb, $key % 10 );
			        break;
			case 2: $tbName = sprintf( '%s', $tb );
			        break;
			case 3: $tbName = sprintf( '%s%d', $tb, $key % 10 );
			        break;
			default:$tbName = $tb;
			        break;
		}

		return $tbName;
	}

	public function MYSQLINSERT( $tbName, $key, $need )
	{
		$temp = array();
		$sp   = new Statement_Parameter();
		foreach ( $need as $k => $v )
		{
			array_push( $temp, '?' );
            $sp->Set_Parameter( $k, $v );
		}

		$sql = sprintf( 'insert into %s values(%s)', $tbName, implode( ',', $temp ) );
		$stmt = $this->db->prepare( $sql );
        $sp->Bind_Params( $stmt ); 

		$stmt->execute();
        printf( "%s %d Row inserted.\n", $sql, $stmt->affected_rows );
		if ( $stmt->affected_rows <= 0 )
		{
			die( 'insert into 0' );
		}

		$result = $this->setMem( $key, json_encode( $need ) );
		if ( !$result )
		{
			die( 'insert mem error '.$this->getMemResultCode() );
		}

		return $result;
	}

	public function MYSQLGET( $tbName, $key, $json, $need, $eq, $lt, $gt )
	{
		$mem = $this->mem->getMem( $key );
		if ( $mem )
		{
			if ( $json )
			{
				return $mem;
			}
			else
			{
				return json_decode( $mem );
			}
		}

		$sql = sprintf( 'select * from %s', $tbName );
		if ( $eq )
		{
			$sql .= ' where '.$eq;
		}

		$result = $this->querySql( $sql );
		if ( $result->num_rows <= 0 )
        {
        	return null;
        }

		/* associative array */
		$array = array();
		while ( $row = $result->fetch_array( MYSQLI_ASSOC ) )
		{
			array_push( $array, $row );
		}

        $mem = json_encode( $array );
		$this->mem->setMem( $key );

		if ( $json )
		{
			return $mem;
		}
		else
		{
			return $array;
		}
	}

	public function MYSQLUPDATE( $tbName, $key, $need, $eq )
	{
		return true;
	}

	public function MYSQLDELETE( $tbName, $key, $eq )
	{
		return true;
	}

	public function operator( $opr, $key, $json = true, $need = null, $eq = null, $lt = null, $gt = null )
	{
		if ( !$this->driver )
		{
			$this->driver = $this->getConfig();
		}
		if ( !$this->mem )
		{
			$this->connectMem();
		}
		if ( !$this->db )
		{
			$this->connectDB();
		}

		$dbName = $this->getDeployDb( $key, $this->driver['deploy'], $this->driver['dbName'] );
		$tbName = $this->getDeployTb( $key, $this->driver['deploy'], $this->driver['tbName'] );
        $this->selectDB( $dbName );

		printf( 'db:%s     ', $dbName );

		switch ( $opr )
		{
			case MYSQL_GET:
				$result = $this->MYSQLGET( $tbName, $key, $need, $eq, $lt, $gt );
				break;
			case MYSQL_INSERT:
				$result = $this->MYSQLINSERT( $tbName, $key, $need );
				break;
			case MYSQL_UPDATE:
				$result = $this->MYSQLUPDATE( $tbName, $key, $need, $eq = null );
				break;
			case MYSQL_DELETE:
				$result = $this->MYSQLDELETE( $tbName, $key, $eq );
				break;
			default:
				die( 'no operator' );
		}

		return $result;
	}

	public function getConfig( $key = null )
	{
		if ( !$key )
		{
			$key = $this->memId;
		}
		return $this->config->getDriver( $key );
	}
}
?>