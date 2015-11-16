<?php
require_once( '../inc/config.inc.php' );
/*
$login = new Login();
$uid = $login->getLogin();
if ( empty( $uid ) )
{
	exit( 0 );
}
*/

$gate = isset( $_REQUEST['gate'] ) ? htmlspecialchars( $_REQUEST['gate'] ) : '';
if ( empty( $gate ) )
{
	exit( 'gate is null' );
}

list( $mod, $act ) = explode( '_', $gate );

$fileName = DOCUMENT_ROOT.'module/'.$mod.'.php';
if ( is_file( $fileName ) )
{
	include_once $fileName;
}
else
{
	exit( $fileName.' is not a file' );
}

$func = $mod.'_'.$act;
if ( !function_exists( $func ) )
{
	exit( $func.' is not a function' );
}

$response = $func();

if ( isset( $_REQUEST['cb'] ) )
{
	$cb = $_REQUEST['cb'];
	printf( '%s(%s);', $cb, $response );
}
else
{
	echo $response;
}
?>