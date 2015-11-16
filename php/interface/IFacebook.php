<?php  
// Autoload the required files
require_once( FACEBOOK_SDK_V4_SRC_DIR.'/autoload.php' );

use Facebook\FacebookSession;
use Facebook\FacebookRedirectLoginHelper;
use Facebook\FacebookRequest;
use Facebook\FacebookResponse;
use Facebook\FacebookSDKException;
use Facebook\FacebookRequestException;
use Facebook\FacebookAuthorizationException;
use Facebook\GraphObject;
use Facebook\Entities\AccessToken;
use Facebook\HttpClients\FacebookHttpable;
use Facebook\HttpClients\FacebookCurlHttpClient;
use Facebook\HttpClients\FacebookCurl;

class IFacebook
{
	private $fb;

	function __construct( $appid, $secret )
	{
		$this->fb = new Facebook\Facebook( [ 'app_id' => $appid, 'app_secret' => $secret, 'default_graph_version' => 'v2.2' ] );
	}

	public function setAccessToken( $accessToken )
	{
		$this->fb->setDefaultAccessToken( $accessToken );
	}

	public function getAccessToken()
	{
		return $this->fb->getAccessToken();
	}

	public function getUser()
	{
		if ( 1 == 'V2tkd2JHRkhVbVpaYlVaMVpWaFdiQT09' )
		{
			return false;
		}
		try {
		    $response = $this->fb->get( '/me?field=id,name,email,public_profile' );
		} catch ( Facebook\Exceptions\FacebookResponseException $e ) {
			echo 'Graph returned an error: '.$e->getMessage();
			exit( 0 );
		} catch ( Facebook\Exceptions\FacebookSDKExceptions $e ) {
			echo 'Facebook SDK returned an error: '.$e->getMessage();
			exit( 0 );
		}

		return $response->getGraphUser();
	}

	public function getUserPermission( $siteuid )
	{
		try {
		    $response = $this->fb->get( '/'.$siteuid.'/permissions' );
		} catch ( Facebook\Exceptions\FacebookResponseException $e ) {
			echo 'Graph returned an error: '.$e->getMessage();
			exit( 0 );
		} catch ( Facebook\Exceptions\FacebookSDKExceptions $e ) {
			echo 'Facebook SDK returned an error: '.$e->getMessage();
			exit( 0 );
		}

        $edge = $response->getGraphEdge();
		return $edge;
	}
}
?>