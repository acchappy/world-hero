<?php
require_once( '../inc/config.inc.php' );

$gate = isset( $_REQUEST['gate'] ) ? htmlspecialchars( $_REQUEST['gate'] ) : '';
if ( empty( $gate ) )
{
	exit( 'gate is null' );
}

list( $mod, $act ) = explode( '_', $gate );

$fileName = 'mod/'.$mod.'.php';
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
$cb = isset( $_REQUEST['cb'] ) ? $_REQUEST['cb'] : '';

if ( isset( $_REQUEST['fmt'] ) )
{
	$cb = $_REQUEST['cb'];
	echo <<<EOF
<!DOCTYPE HTML>
<html>
<script>
parent.window.$cb( $response );
</script>
</html>
EOF;
}
else
{
	if ( empty( $cb ) )
	{
        echo $response;
	}
	else
	{
		printf( '%s( %s );', $cb, $response );
	}
}
?>