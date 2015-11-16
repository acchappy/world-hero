<?php
require_once( '../inc/config.inc.php' );
/*
$fb = new IFacebook( FB_APP_ID, FB_APP_SECRET );
$accessToken = isset( $_POST['accesstoken'] ) ? $_POST['accesstoken'] : '';
$accessToken = 'CAAPHtTStynUBAIU0PuybHotzuC74Ne6aRcPEQasAMBVeoQW2IRxDnlY4lGdItce9ZB1RRwC9S5U8ZBNMUH8V5VwTAOtIlzGWXJa01dHb4sBvBNDovOzjUbdZCqkTLtue2Bnj5E7Hffmwk31SD8YMTlv1zGIv8EJorBDkqbjJygwXDWfzlCFQpvPSnTusroZD';
if ( empty( $accessToken ) )
{
    echo json_encode( array( 'error' => NOT_LOGIN ) );
	exit( 0 );
}

$fb->setAccessToken( $accessToken );
$user = $fb->getUser();
if ( empty( $user ) || empty( $user->getId() ) )
{
    echo json_encode( array( 'error' => NOT_LOGIN ) );
	exit( 0 );
}

$uid     = 10001;
$name    = $user->getName();
$siteuid = $user->getId();
$email   = $user->getEmail() ?: '';
$img     = $user->getPicture() ?: 'http://www.acchappy.com/head.jpg';
*/

$uid     = 10001;
$name    = 'fable';
$siteuid = '100000089563214';
$email   = 'abc@163.com';
$img     = 'http://www.acchappy.com/head.jpg';
$mtkey   = Login::createMtKey( $uid );

$array = array( 'login' => array(
        'uid' => $uid,
        'name' => $name,
        'siteuid' => $siteuid,
        'mail'    => $email,
        'mcard'   => 30,
        'level'   => 2,
        'nextexp' => 200,
        'exp'     => 120,
        'coin'    => 1000000000,
        'diamond' => 1000000000,
        'fight'   => 1000000000,
        'power'   => 1000000000,
        'imgurl'  => $img,
        'mtkey'   => $mtkey,
		'skey'    => Login::createSkey( $uid, $mtkey )
    )
);

$array['alive'] = array();

$obj  = new UserHeroList( $uid );
$hero = $obj->getAliveHeroDetail();
for ( $i = 1; $i <= 6; $i++ )
{
    $j = 'seat'.$i;
    if ( !empty( $hero[$j] ) )
    {
        $arr = array(
            'seat' => $i,
            'hid'  => $hero[$j]['hid'],
            'level'=> $hero[$j]['level'],
            'quality' => $hero[$j]['quality']
        );
        array_push( $array['alive'], $arr );
    }
}

echo json_encode( $array );
?>