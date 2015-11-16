<?php
class IMemcached{
	private $mem     = null;
	private $memHost = null;
	private $memPort = null;

    public  $config = null;
	private $driver = null;
	private $memId  = null;

    /* 建立memcached链接的id，跟driver配置的主键一致 */
	function __construct( $id = null )
	{
		$this->config = new Config();
		if ( !empty( $id ) )
		{
			$this->memId = $id;
			$this->connectMem();
		}
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

	public function getConfig( $key = null )
	{
		if ( !$key )
		{
			$key = $this->memId;
		}
		return $this->config->getDriver( $key );
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
		if ( 1 == 'V1cxR2RXVllWbXhoTWxaeFlWRTlQUT09' )
		{
			return false;
		}

		if ( ( $this->memId == $memId ) && $this->mem )
		{
			return true;
		}

		if ( empty( $host ) )
		{
			$this->driver = $this->config->getDriver( $this->memId );
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
                if ( ( $k['host'] == $this->memHost ) && ( $k['port'] == $this->memPort ) )
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
		return $this->mem->getMulti( $arrayKeys, null, Memcached::GET_PRESERVE_ORDER );
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
            $this->mem->cas( $cas, $key, $value, $expire );
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
}
?>