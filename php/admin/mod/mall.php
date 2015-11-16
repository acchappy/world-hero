<?php
function getRandProp( &$array )
{
	$prop = array();
	$len  = count( $array ) - 1;
	for ( $i = 0; $i < 30; $i++ )
	{
		$temp = array();
		$j    = 0;
		$row  = array();
		while ( true )
		{
			$r  = mt_rand( 0, $len );
			$id = $array[$r]['id'];
			if ( in_array( $id, $temp ) )
			{
				continue;
			}
			array_push( $temp, $id );
			$coin    = intval( $array[$r]['coin'] );
			$diamond = intval( $array[$r]['diamond'] );
			if ( ( $coin <= 0 ) && ( $diamond > 0 ) )
			{
				$pay = 'd#'.$diamond;
			}
			else if ( ( $coin > 0 ) && ( $diamond <= 0 ) )
			{
				$pay = 'c#'.$coin;
			}
			else if ( ( $coin > 0 ) && ( $diamond > 0 ) )
			{
				$r1 = mt_rand( 0, 1 );
				if ( $r1 == 0 )
				{
					$pay = 'c#'.$coin;
				}
				else
				{
					$pay = 'd#'.$diamond;
				}
			}
			else
			{
				continue;
			}

			$s = sprintf( '%s_%s_%s_%s', $array[$r]['id'], $array[$r]['num'], $array[$r]['type'], $pay );
			array_push( $row, $s );

			$j++;
			if ( $j >= 12 )
			{
				break;
			}
		}

		$s = sprintf( '"%s"', implode( ',', $row ) );
		array_push( $prop, $s );
	}

	return $prop;
}

function mall_build()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$json = array();

	$db = new AdminMysqlDB();
	$db->changeDriver( 'prop_mall' );
	$ret = $db->operator( MYSQL_GET );
	if ( empty( $ret ) )
	{
		$arr['message'] = '查询数据库没有结果';
		return json_encode( $arr );
	}

	$handle = fopen( DOCUMENT_ROOT.'inc/mall.inc.php', "w" );
	$data = '<?php'.sprintf( "\n%s\n", '$MALL_CONFIG = array();' );
	$data .= sprintf( "%s\n", '$MALL_CONFIG["prop"] = array();' );
	$zero = getRandProp( $ret );
	$data .= sprintf( "%s%s%s\n", '$MALL_CONFIG["prop"]["zero"] = array( ', implode( ',', $zero ), ' );' );
	$nine = getRandProp( $ret );
	$data .= sprintf( "%s%s%s\n", '$MALL_CONFIG["prop"]["nine"] = array( ', implode( ',', $nine ), ' );' );
	$twelve = getRandProp( $ret );
	$data .= sprintf( "%s%s%s\n", '$MALL_CONFIG["prop"]["twelve"] = array( ', implode( ',', $twelve ), ' );' );
	$tweentyone = getRandProp( $ret );
	$data .= sprintf( "%s%s%s\n", '$MALL_CONFIG["prop"]["tweentyone"] = array( ', implode( ',', $tweentyone ), ' );' );

	$data .= '?>';
	fwrite( $handle, $data );
	fclose( $handle );

	$arr['message'] = '成功生成配置文件';

	return json_encode( $arr );
}
?>