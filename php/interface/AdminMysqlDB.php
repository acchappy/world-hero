<?php
/*
$mysqli_type[0] = "decimal";
$mysqli_type[1] = "tinyint";
$mysqli_type[2] = "smallint";
$mysqli_type[3] = "int";
$mysqli_type[4] = "float";
$mysqli_type[5] = "double";
$mysqli_type[7] = "timestamp";
$mysqli_type[8] = "bigint";
$mysqli_type[9] = "mediumint";
$mysqli_type[10] = "date";
$mysqli_type[11] = "time";
$mysqli_type[12] = "datetime";
$mysqli_type[13] = "year";
$mysqli_type[252] = "blob"; // text, blob, tinyblob,mediumblob, etc...
$mysqli_type[253] = "string"; // varchar and char
$mysqli_type[254] = "enum";
*/
//require_once( 'AbstractMysqlDataBase.php' );
class AdminMysqlDB extends AbstractMysqlDataBase
{
	private $dbKey  = null;
	private $driver = null;
	private $fieldType = null;
    /* 建立memcached链接的id，跟driver配置的主键一致 */
	function __construct( $driverKey = null )
	{
		parent::__construct();
	}

	function __destruct()
	{
	}

	public function freeDB()
	{
		if ( self::$db )
		{
		    self::$db->close();
		    self::$db = null;
		}
	}

	public function changeDriver( $driverKey )
	{
		if ( $this->dbKey == $driverKey )
		{
			return;
		}
		$this->driver = self::$config->getDriver( $driverKey );
		if ( empty( $this->driver ) )
		{
			$this->errorMessage = 'change driver config is null';
			die( 'change driver config is null' );
		}

        $this->dbKey = $driverKey;
		if ( empty( self::$db ) || empty( self::$db->ping() ) )
		{
			self::connectDB( $this->driver['dbHost'], $this->driver['user'], $this->driver['passwd'], '', $this->driver['dbPort'] );
		}
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

	public function getFieldType()
	{
		return $this->fieldType;
	}

	public function MYSQLINSERT( $need )
	{
		$temp = array();
		$sp   = new Statement_Parameter();
		foreach ( $need as $k => $v )
		{
			array_push( $temp, '?' );
            $sp->Set_Parameter( $k, $v );
		}

		$sql = sprintf( 'insert into %s values(%s)', $this->driver['dbName'].'.'.$this->driver['tbName'], implode( ',', $temp ) );
		$stmt = self::$db->prepare( $sql );
        $sp->Bind_Params( $stmt ); 

		$ret = $stmt->execute();
		if ( !$ret )
		{
			$this->errorMessage = self::$db->error;
			die( "sql:$sql\t".self::$db->error );
			return false;
		}

		if ( $stmt->affected_rows <= 0 )
		{
			$this->errorMessage = 'insert into 0';
			return false;
		}
		return true;
	}

	public function MYSQLGET( $need, $eq, $gt, $lt )
	{
		$limit  = 0;
		$sql    = '';
		$select = '';
		if ( empty( $need ) )
		{
			$select = '*';
		}
		else
		{
			$select = implode( ',', array_keys( $need ) );
		}
/*
		if ( empty( $eq ) )
		{
			die( 'no eq' );
		}
*/
        $array  = array();
		$string = '';
		$temp   = array();
        if ( !empty( $eq ) )
		{
			if ( isset( $eq['limit'] ) )
			{
				$limit = $eq['limit'];
				unset( $eq['limit'] );
			}

			foreach ( $eq as $k => $v )
			{
				$str = '';
				if ( is_string( $v ) )
				{
					$str = sprintf( '%s="%s"', $k, $v );
				}
				else
				{
					$str = $k.'='.$v;
				}
				array_push( $temp, $str );
			}
		}

		if ( !empty( $gt ) )
		{
			foreach ( $gt as $k => $v )
			{
				$str = '';
				if ( is_string( $v ) )
				{
					$str = sprintf( '%s>"%s"', $k, $v );
				}
				else
				{
					$str = $k.'>'.$v;
				}
				array_push( $temp, $str );
			}
		}

		if ( !empty( $lt ) )
		{
			foreach ( $lt as $k => $v )
			{
				$str = '';
				if ( is_string( $v ) )
				{
					$str = sprintf( '%s<"%s"', $k, $v );
				}
				else
				{
					$str = $k.'<'.$v;
				}
				array_push( $temp, $str );
			}
		}

		if ( !empty( $temp ) )
		{
			$string = sprintf( ' where %s', implode( ' and ', $temp ) );
		}

		$sql = sprintf( 'select %s from %s %s %s', $select, $this->driver['dbName'].'.'.$this->driver['tbName'], $string, empty( $limit ) ? '' : ' limit '.$limit );

		$result = self::$db->query( $sql );
		if ( !$result )
		{
			$this->errorMessage = self::$db->error;
			die( "sql:$sql\t".self::$db->error );
			return false;
		}

		if ( $result->num_rows <= 0 )
		{
			return array();
		}

		/* associative array */
		
		while ( $row = $result->fetch_array( MYSQLI_ASSOC ) )
		{
			array_push( $array, $row );
		}

        return $array;
	}

	public function stmt_bind_assoc( &$stmt, &$out )
	{
		$data = mysqli_stmt_result_metadata( $stmt );
        $fields = array();
        $out = array();

        $fields[0] = $stmt;
        $count = 1;
		
		while ( $field = mysqli_fetch_field( $data ) )
		{
			$fields[$count] = &$out[$field->name];
			$count++;
		}
		call_user_func_array( $stmt->store_result, $fields);
	}

	public function MYSQLIGET( $need, $eq, $gt, $lt )
	{
		$limit  = 0;
		$sql    = '';
		$select = '';
		if ( empty( $need ) )
		{
			$select = '*';
		}
		else
		{
			$select = implode( ',', array_keys( $need ) );
		}

        $array  = array();
		$string = '';
		$temp   = array();
        if ( !empty( $eq ) )
		{
			if ( isset( $eq['limit'] ) )
			{
				$limit = $eq['limit'];
				unset( $eq['limit'] );
			}

			foreach ( $eq as $k => $v )
			{
				$str = '';
				if ( is_string( $v ) )
				{
					$str = sprintf( '%s="%s"', $k, $v );
				}
				else
				{
					$str = $k.'='.$v;
				}
				array_push( $temp, $str );
			}
		}

		if ( !empty( $gt ) )
		{
			foreach ( $gt as $k => $v )
			{
				$str = '';
				if ( is_string( $v ) )
				{
					$str = sprintf( '%s>"%s"', $k, $v );
				}
				else
				{
					$str = $k.'>'.$v;
				}
				array_push( $temp, $str );
			}
		}

		if ( !empty( $lt ) )
		{
			foreach ( $lt as $k => $v )
			{
				$str = '';
				if ( is_string( $v ) )
				{
					$str = sprintf( '%s<"%s"', $k, $v );
				}
				else
				{
					$str = $k.'<'.$v;
				}
				array_push( $temp, $str );
			}
		}

		if ( !empty( $temp ) )
		{
			$string = sprintf( ' where %s', implode( ' and ', $temp ) );
		}

		$sql = sprintf( 'select %s from %s %s %s', $select, $this->driver['dbName'].'.'.$this->driver['tbName'], $string, empty( $limit ) ? '' : ' limit '.$limit );

		$stmt = self::$db->prepare( $sql );
		$stmt->execute();
		$stmt->store_result();
		if ( $stmt->num_rows <= 0 )
		{
			return array();
		}

        $this->fieldType = array();
        $keyList = array();
		$meta = $stmt->result_metadata();
		while ( $column = $meta->fetch_field() )
		{
			$bindVarsArray[] = &$results[$column->name];
			$keyList[] = array( 'key' => $column->name, 'type' => $column->type );
			$this->fieldType[ $column->name ] = $column->type;
		}
		call_user_func_array( array( $stmt, 'bind_result' ), $bindVarsArray );
		$result = array();
		while ( $stmt->fetch() )
		{
			$list = array();
			for ( $i = 0, $len = count( $bindVarsArray ); $i < $len; $i++ )
			{
				$list[$keyList[$i]['key']] = $bindVarsArray[$i];
			}

			array_push( $result, $list );
		}

		return $result;
	}

	public function MYSQLUPDATE( $need, $eq, $gt )
	{
		if ( empty( $need ) || empty( $eq ) )
		{
			$this->errorMessage = 'update must contain condition';
			return false;
		}

		$key = $this->driver['key'];
		if ( !array_key_exists( $key, $eq ) )
		{
			$this->errorMessage = 'update must contain key';
			return false;
		}
		if ( array_key_exists( $key, $need ) )
		{
			$this->errorMessage = 'update can not contain key';
			return false;
		}

		$temp  = array();
		$sp    = new Statement_Parameter();
		foreach ( $need as $k => $v )
		{
			if ( is_array( $v ) )
			{
				if ( isset( $v['add'] ) )
				{
					$str = sprintf( ' %s=%s+? ', $k, $k );
					$sp->Set_Parameter( $k, $v['add'] );
				}
				else if ( isset( $v['sub'] ) )
				{
					$str = sprintf( ' %s=%s-? ', $k, $k );
					$sp->Set_Parameter( $k, $v['sub'] );
				}
				else
				{
					continue;
				}
			}
			else
			{
			    $str = sprintf( ' %s=? ', $k );
				$sp->Set_Parameter( $k, $v );
			}
			array_push( $temp, $str );
		}

        $_temp = array();
		foreach ( $eq as $k => $v )
		{
			$str = sprintf( ' %s=? ', $k );
			array_push( $_temp, $str );
            $sp->_Set_Parameter( $k, $v );
		}

        /* 金币减时必须加上money>0的条件 */
		if ( !empty( $gt ) )
		{
			foreach ( $gt as $k => $v )
		    {
			    $str = sprintf( ' %s>? ', $k );
			    array_push( $_temp, $str );
                $sp->_Set_Parameter( $k, $v );
		    }
		}

		$sql = sprintf( 'update %s set %s where %s', $this->driver['dbName'].'.'.$this->driver['tbName'], implode( ',', $temp ), implode( ' and ', $_temp ) );
		$stmt = self::$db->prepare( $sql );
        $sp->Bind_Params( $stmt ); 

		$ret = $stmt->execute();
		if ( !$ret )
		{
			$this->errorMessage = self::$db->error;
			die( "sql:$sql\t".self::$db->error );
			return false;
		}

		if ( $stmt->affected_rows <= 0 )
		{
			$this->errorMessage = 'update from 0';
			return false;
		}

		return true;
	}

	public function MYSQLDELETE( $need )
	{
		if ( empty( $need ) )
		{
			$this->errorMessage = 'delete must contain condition';
			return false;
		}

		$key = $this->driver['key'];
		if ( !array_key_exists( $key, $need ) )
		{
			return false;
		}
		$temp = array();
		$sp   = new Statement_Parameter();
		foreach ( $need as $k => $v )
		{
			$str = sprintf( ' %s=? ', $k );
			array_push( $temp, $str );
            $sp->Set_Parameter( $k, $v );
		}

		$sql = sprintf( 'delete from %s where %s', $this->driver['dbName'].'.'.$this->driver['tbName'], implode( ' and ', $temp ) );
		$stmt = self::$db->prepare( $sql );
        $sp->Bind_Params( $stmt ); 

		$ret = $stmt->execute();
		if ( !$ret )
		{
			$this->errorMessage = self::$db->error;
			return false;
		}

		if ( $stmt->affected_rows <= 0 )
		{
			$this->errorMessage = 'delete from 0';
			return false;
		}

		return true;
	}

	public function operator( $opr, $need = null, $eq = null, $gt = null, $lt = null )
	{
		$primaryKey = isset( $this->driver['key'] ) ? $this->driver['key'] : '';
		$temp = array();
		$key  = '';

		if ( !empty( $eq ) && is_array( $eq ) )
		{
			if ( array_key_exists( $primaryKey, $eq ) )
			{
				foreach ( $eq as $k => $v )
				{
					$key = $k;
					break;
				}

				if ( $key != $primaryKey )
				{
				    $temp[$primaryKey] = $eq[$primaryKey];
				    unset( $eq[$primaryKey] );
				    $eq = $temp + $eq;
				}
			}
		}

		if ( !empty( $gt ) )
		{
			if ( array_key_exists( $primaryKey, $gt ) )
			{
				foreach ( $gt as $k => $v )
				{
					$key = $k;
					break;
				}

				if ( $key != $primaryKey )
				{
				    $temp[$primaryKey] = $gt[$primaryKey];
				    unset( $gt[$primaryKey] );
				    $gt = $temp + $gt;
				}
			}
		}

		if ( !empty( $lt ) )
		{
			if ( array_key_exists( $primaryKey, $lt ) )
			{
				foreach ( $lt as $k => $v )
				{
					$key = $k;
					break;
				}

				if ( $key != $primaryKey )
				{
				    $temp[$primaryKey] = $lt[$primaryKey];
				    unset( $lt[$primaryKey] );
				    $lt = $temp + $lt;
				}
			}
		}

		switch ( $opr )
		{
			case MYSQL_GET:
				$result = $this->MYSQLGET( $need, $eq, $gt, $lt );
				break;
			case MYSQLI_GET:
				$result = $this->MYSQLIGET( $need, $eq, $gt, $lt );
				break;
			case MYSQL_INSERT:
				$result = $this->MYSQLINSERT( $need );
				break;
			case MYSQL_UPDATE:
				$result = $this->MYSQLUPDATE( $need, $eq, $gt );
				break;
			case MYSQL_DELETE:
				$result = $this->MYSQLDELETE( $eq );
				break;
			default:
				die( 'no operator' );
		}

		return $result;
	}

	public function Sql_Query( $sql )
	{
		$result = self::$db->query( $sql );
		return $result;
	}

	public function Sql( $opr, $sql )
	{
		switch ( $opr )
		{
			case MYSQL_SQLGET:
				$result = $this->Sql_Query( $sql, true );
				break;
			case MYSQL_SQLINSERT:
			case MYSQL_SQLUPDATE:
			case MYSQL_SQLDELETE:
				$result = $this->Sql_Query( $sql );
				break;
			default:
				die( 'no operator' );
		}

		return $result;
	}

	public function getDriver()
	{
		pr( $this->driver );
	}
}
?>