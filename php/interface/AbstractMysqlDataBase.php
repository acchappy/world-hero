<?php
abstract class AbstractMysqlDataBase
{
	protected static $db     = null;
	protected static $config = null;

	protected $dbTimeout = 3;
	protected $errorMessage = '';

    /* 建立memcached链接的id，跟driver配置的主键一致 */
	function __construct()
	{
		if ( empty( self::$config ) )
		{
			self::$config = new Config();
		}
	}

	abstract public function freeDB();

	abstract public function changeDriver( $driverKey );

	public static function connectDB( $host, $user, $passwd, $dbName, $port )
	{
		self::$db = new mysqli( $host, $user, $passwd, $dbName, $port );

        /* check connection */
        if ( self::$db->connect_errno )
	    {
			$this->errorMessage = 'Connect failed: '.self::$db->connect_error;
            die( 'Connect failed: '.self::$db->connect_error );
		}

		self::$db->set_charset("utf8");
	}

	public function getInsertId()
	{
		return self::$db->insert_id;
	}

	public function selectDB( $dbName )
	{
		return self::$db->select_db( $dbName );
	}
}
?>