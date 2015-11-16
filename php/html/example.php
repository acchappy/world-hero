<?php
require_once( '../inc/config.inc.php' );
/*
$obj = new MemcachedDB( 'account' );
$now = time();
$need = array( 'crc' => crc32( $now ),
    	'siteuid' => 0,
    	'uid'     => 0,
    	'plat'    => 0,
    	'time'    => $now
);
$obj->operator( MYSQL_INSERT, $now, false, $need );
echo '  hello world';
*/

$obj = new MysqlDB( 'account' );
$now = time();
$crc = crc32( $now );
$need = array( 'crc' => $crc,
    	'siteuid' => 0,
    	'uid'     => 0,
    	'plat'    => 0,
    	'time'    => $now
);


$obj->operator( MYSQL_INSERT, $need );
$array = $obj->operator( MYSQL_GET, array( 'siteuid' => 0, 'plat' => 0 ), array( 'siteuid' => 'afsdfa' ) );
var_dump( $array );
echo "---------------------after get-------------<br/>";

/*
$obj->operator( MYSQL_DELETE, null, array( 'crc' => 1369891341 ) );
$array = $obj->operator( MYSQL_GET );
var_dump( $array );
echo "---------------------after delete-------------<br/>";

$obj->operator( MYSQL_UPDATE, array( 'siteuid' => 'afsdfa', 'uid' => array( 'sub' => 1000 ) ), array( 'crc' => 1435350493 ) );
$array = $obj->operator( MYSQL_GET );
var_dump( $array );
echo "---------------------after update-------------<br/>";
*/
?>