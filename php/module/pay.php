<?php
function pay_apple()
{
    $receipt   = isset( $_POST['receipt'] ) ? $_POST['receipt'] : '';
	if ( empty( $receipt ) )
	{
		die( 'receipt is null' );
	}
    $isSandbox = true;

	/*
	$ascii = '';
	try
	{
		$hex = $receipt;
		$temp = preg_replace( "/[^0-9a-fA-F]/", "", $hex );
		for ( $i = 0, $len = strlen($temp); $i < $len; $i = $i + 2 )
		{
			$ascii .= chr(hexdec(substr($temp, $i, 2)));
		}
		//以上是对corona提交的数据进行解密
		$info = getReceiptData($ascii, true);
        //验证购买有效
	}
	catch ( Exception $ex )
	{
		//验证购买无效
		echo($ex);
	}
	*/

	$obj = new PayMent();
	$arr = $obj->getAppleReceiptData( $receipt, $isSandbox );
	return json_encode( $arr );
}
?>