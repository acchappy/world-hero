<?php

define('QUA_WHITE' 		, 10);
define('QUA_GREEN0' 	, 20);
define('QUA_GREEN1' 	, 21);
define('QUA_GREEN2' 	, 22);
define('QUA_GREEN3' 	, 23);
define('QUA_GREEN4' 	, 24);
define('QUA_GREEN5' 	, 25);
define('QUA_BLUE0' 		, 30);
define('QUA_BLUE1' 		, 31);
define('QUA_BLUE2' 		, 32);
define('QUA_BLUE3' 		, 33);
define('QUA_BLUE4' 		, 34);
define('QUA_BLUE5' 		, 35);
define('QUA_PURPLE0' 	, 40);
define('QUA_PURPLE1' 	, 41);
define('QUA_PURPLE2' 	, 42);
define('QUA_PURPLE3' 	, 43);
define('QUA_PURPLE4' 	, 44);
define('QUA_PURPLE5' 	, 45);
define('QUA_YELLOW0' 	, 50);


$QUA_CONFIG = array();
//
$QUA_CONFIG[] = array(
	'code' => QUA_WHITE,//
	'speGrow' => 1,//特殊力量，火之力
);


//--------------------------
$QUA_CONFIG[] = array(
	'code' => QUA_GREEN0,//
	'speGrow' => 1.06,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_GREEN1,//
	'speGrow' => 1.06,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_GREEN2,//
	'speGrow' => 1.06,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_GREEN3,//
	'speGrow' => 1.06,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_GREEN4,//
	'speGrow' => 1.06,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_GREEN5,//
	'speGrow' => 1.06,//特殊力量，火之力
);


$QUA_CONFIG[] = array(
	'code' => QUA_BLUE0,//
	'speGrow' => 1.08,//特殊力量，火之力
);
//---------------------------
$QUA_CONFIG[] = array(
	'code' => QUA_BLUE1,//
	'speGrow' => 1.08,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_BLUE2,//
	'speGrow' => 1.08,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_BLUE3,//
	'speGrow' => 1.08,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_BLUE4,//
	'speGrow' => 1.08,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_BLUE5,//
	'speGrow' => 1.08,//特殊力量，火之力
);



$QUA_CONFIG[] = array(
	'code' => QUA_PURPLE0,//
	'speGrow' => 1.1,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_PURPLE1,//
	'speGrow' => 1.1,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_PURPLE2,//
	'speGrow' => 1.1,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_PURPLE3,//
	'speGrow' => 1.1,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_PURPLE4,//
	'speGrow' => 1.1,//特殊力量，火之力
);
$QUA_CONFIG[] = array(
	'code' => QUA_PURPLE5,//
	'speGrow' => 1.1,//特殊力量，火之力
);



$QUA_CONFIG[] = array(
	'code' => QUA_YELLOW0,//
	'speGrow' => 1.12,//特殊力量，火之力
);



function pr($arr)
{
	echo '<pre>';
	print_r($arr);
	echo '</pre>';
}


function getSpeGrow($qua)
{
	global $QUA_CONFIG;

	$ret = 1;
	foreach( $QUA_CONFIG as $conf ) {
		if( $qua < $conf['code'] ) {
			continue;
		}
		$ret *= $conf['speGrow'];
	}
	$ret 	= number_format($ret , 5) ;

	return $ret;
}

function Qua_getOtherQuaValue($now_qua, $opt)
{
	global $QUA_CONFIG;

	$key = -10;
	$len = count($QUA_CONFIG);
	for( $i=0 ; $i<$len ; $i++ ) {
		if( $now_qua == $QUA_CONFIG[$i]['code'] ) {
			$key = $i;
			break;
		}
	}
	$new_key = $opt == 1 ? $key - 1 : $key + 1;
	if( isset( $QUA_CONFIG[$new_key] ) ) {
		return $QUA_CONFIG[$new_key]['code'];
	} else {
		return $now_qua;
	}
}

function Qua_getPreQuaValue($now_qua)
{
	return Qua_getOtherQuaValue($now_qua, 1);
}

function Qua_getNextQuaValue($now_qua)
{
	return Qua_getOtherQuaValue($now_qua, 2);
}


?>