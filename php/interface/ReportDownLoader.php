<?php
define('ROOT_PATH', dirname(__FILE__));
define('GOOGLE_PLAY_COOKIE_FILE', 'google_play_cookie.txt');

class ReportDownLoader
{
	private $username;
	private $password;
	private $dev_acc;
	
	/* init
	 * @param String $username google play account
	 * @param String $password google play password
	 * @param String $dev_acc google play dev account
	 */
	public function __construct( $username='', $password='', $dev_acc='' )
	{
		$this->username = $username;
		$this->password = $password;
		$this->dev_acc = $dev_acc;
	}
	
	/*
	* @param String $appname
	* @param String $sd      开始日期
	* @param String $ed      结束日期
	* @param String $downloadFile 保存的zip名称
	*/

	public function run( $appname = '', $sd = '', $ed = '', $downloadFile='' )
	{
		$package = $appname;
		$dim = 'overall,country,language,os_version,device,app_version,carrier';
		//$met = 'daily_device_installs,active_device_installs,daily_user_installs,total_user_installs,active_user_installs,daily_device_uninstalls,daily_user_uninstalls,daily_device_upgrades';
		$met = "daily_device_installs,current_device_installs,daily_user_installs,total_user_installs,current_user_installs,daily_device_uninstalls,daily_user_uninstalls,daily_device_upgrades"; // google modify 2013-08-06
		// login google play
		$this->loginAuth( $this->username, $this->password );
		// download report zip
		return $this->downloadReport( $package, $sd, $ed, $dim, $met, $this->dev_acc, $downloadFile );
	}
	
	/* login google play,create cookies
	 * @param String $username
	 * @param String $password 
	 * @return boolean
	 */

	private function loginAuth( $username, $password )
	{
		// step1
		$mainUrl = "https://play.google.com/apps/publish/";
		
		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_URL, $mainUrl );
		curl_setopt( $ch, CURLOPT_COOKIEJAR, GOOGLE_PLAY_COOKIE_FILE );
		curl_setopt( $ch, CURLOPT_COOKIEFILE, GOOGLE_PLAY_COOKIE_FILE ); 
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		curl_exec( $ch );
		curl_close( $ch );
		
		// step 2
		$serviceLoginUrl = "https://accounts.google.com/ServiceLogin?hl=en&continue=".$mainUrl;
		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_URL, $serviceLoginUrl );
		curl_setopt( $ch, CURLOPT_COOKIEJAR, GOOGLE_PLAY_COOKIE_FILE );
		curl_setopt( $ch, CURLOPT_COOKIEFILE, GOOGLE_PLAY_COOKIE_FILE ); 
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		$serviceLoginRespHtml = curl_exec( $ch );
		curl_close($ch);
		
		preg_match('/name="dsh"\s*id="dsh"\s*value="(.*?)"\s*/i', $serviceLoginRespHtml, $matches); // get dsh
		$dsh = $matches[1];
		
		preg_match('/name="GALX"\s*value="(.*?)"\s*/i', $serviceLoginRespHtml, $matches); // get GALX
		$galx = $matches[1];
		
		// step 3
		$loginGoogleUrl = "https://accounts.google.com/ServiceLoginAuth";
		$postFields = "Referer=".$serviceLoginUrl;
		$postFields .= "&AllowAutoRedirect=false";
		$postFields .= "&continue=".$mainUrl;
		$postFields .= "&dsh=".$dsh;
		$postFields .= "&h1=en";
		$postFields .= "&GALX=".$galx;
		$postFields .= "&Email=".$username;
		$postFields .= "&Passwd=".$password;
		$postFields .= "&signIn=Sign+in";
		$postFields .= "&PersistentCookie=yes";
		
		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_URL, $loginGoogleUrl );
		curl_setopt( $ch, CURLOPT_POST, 1 );
		curl_setopt( $ch, CURLOPT_POSTFIELDS, $postFields );
		curl_setopt( $ch, CURLOPT_COOKIEJAR, GOOGLE_PLAY_COOKIE_FILE );
		curl_setopt( $ch, CURLOPT_COOKIEFILE, GOOGLE_PLAY_COOKIE_FILE ); 
		curl_setopt( $ch, CURLOPT_HEADER, true ); 
		curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true ); 
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		curl_exec( $ch );
		curl_close( $ch );
		
		// login cookies create success
		return true;
	}
	
	// download Report zip file
	private function downloadReport( $package, $sd, $ed, $dim, $met, $dev_acc, $downloadFile )
	{
		$url = "https://play.google.com/apps/publish/statistics/download?package={$package}&sd={$sd}&ed={$ed}&dim={$dim}&met={$met}&dev_acc={$dev_acc}";    
		$fp = fopen( $downloadFile, "w" );
		
		$ch = curl_init();
		curl_setopt( $ch, CURLOPT_URL, $url );
		curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
		curl_setopt( $ch, CURLOPT_FILE, $fp );
		curl_setopt( $ch, CURLOPT_COOKIEFILE, GOOGLE_PLAY_COOKIE_FILE );
		curl_exec( $ch );
		curl_close( $ch );
		fclose( $fp );
		
		if ( file_exists( $downloadFile ) )
		{
			return true;
		}
		return false;
	}
	
	/* unzip report
	 * @param String $path     解压的路径
	 * @param String $downloadFile zip file
	 */
	public function unzipReport( $path, $downloadFile )
	{
		$exec = "unzip ".$downloadFile. " -d ".$path;
		shell_exec($exec);
		unlink( $downloadFile ); // delete zip file
	}
}

/*
// demo
$username = 'testdev@gmail.com';
$password = 'abcd1234';
$dev_acc = '12345678901234567890';
 
$appname = 'com.testdev';
$sd = '20130417';
$ed = '20130417';
$downloadFile = 'testdev.zip';
$unzipPath = ROOT_PATH.'/testdev/';
 
$obj = new AndroidReportDownLoader($username, $password, $dev_acc);
if($obj->run($appname, $sd, $ed, $downloadFile)){
  $obj->unzipReport($unzipPath, $downloadFile);
}
*/
?>