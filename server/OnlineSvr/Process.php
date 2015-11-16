<?php
class Process
{
	public static function OverTimeCheck()
	{
		$fd_arr = FdData::$MainSvr->heartbeat(false);
		if( false == $fd_arr ) {
			return;
		}
		//处理超时的fd
		foreach($fd_arr as $fd) {
			FdData::$Data[$fd]['status'] = 0;
			FdData::$MainSvr->close($fd);
		}
	}

	public static function GetLoginUid($fd)
	{
		$uid = @intval( FdData::$Data[$fd]['uid'] );
		if( $uid > 0 && isset( UserData::$UserData[$uid] ) && UserData::$UserData[$uid]['fd'] == $fd ) {
			return $uid;
		}
		return 0;
	}

	public static function UserLogout($fd, $status)
	{
		$uid = Process::GetLoginUid($fd);
		if( $uid > 0 ) {
			if( $status == 1 ) { //正常状态，主动关闭连接
				Logger::Info("user logout [uid=$uid] [fd=$fd]");
			} else {
				Logger::Info("overtime [uid=$uid] [fd=$fd]");//超时关闭连接
			}

			OnlineData::UserOffline($uid);
			UserData::ClearUser($uid);
		}
	}

	public static function ProcessCmd($reqstr)
	{
		$nowfd = FdData::$Nowfd;
		$clientip = FdData::$NowClientIP;
		echo "receive from $nowfd:[$clientip] [{$reqstr}]\n";

		$reqarr = json_decode($reqstr, true);

		$cmd = @intval( $reqarr['cmd'] );
		if( $cmd == CMD::$Login ) {
			Process::DealLogin($reqarr);
		} 
	}

	public static function DealLogin($cmdarr)
	{
		$nowfd = FdData::$Nowfd;
		$loginuid = Process::GetLoginUid($nowfd);
		if( $loginuid > 0 ) {
			Logger::Error("already login [uid=$loginuid] [fd=$nowfd]");
			return;
		}

		//连接第一次登录，进行登录验证

		$retarr = array();
		$retarr['cmd'] = $cmdarr['cmd'];

		$uid = @intval( $cmdarr['uid'] );
		$mtkey = @$cmdarr['mtkey'];
		if( $uid <= 0 || $mtkey == '' ) {//参数错误
			$retarr['error'] = ErrCode::$param;
			FdData::$MainSvr->push( FdData::$Nowfd, json_encode($retarr) );
			FdData::$MainSvr->close( FdData::$Nowfd );

			Logger::Error( "param error [uid=$uid] [mtkey=$mtkey]" );
			return;
		}

		// OnlineData::$Memcached->set("$uid", $cmdarr);

		//验证在线表 mtkey
		$online_str = OnlineData::$Memcached->get("$uid");
		if( false == $online_str ) {
			$retarr['error'] = ErrCode::$notlogin;
			FdData::$MainSvr->push( FdData::$Nowfd, json_encode($retarr) );
			FdData::$MainSvr->close( FdData::$Nowfd );

			Logger::Error( "no data in memcache [uid=$uid]" );
			return;
		}

		$online_info = json_decode($online_str , true);

		$mtkey_mem = @$online_info['mtkey'];
		if( $mtkey != $mtkey_mem ) {
			$retarr['error'] = ErrCode::$mtkey;
			FdData::$MainSvr->push( FdData::$Nowfd, json_encode($retarr) );
			FdData::$MainSvr->close( FdData::$Nowfd );

			Logger::Error( "mtkey error [mtkey_mem = $mtkey_mem] [mtkey = $mtkey]" );
			return;
		}

		//验证成功，开始登录

		if( isset( UserData::$UserData[$uid] ) ) {
			//玩家已经登录了，踢掉之前的
			$userdata = &UserData::$UserData[$uid];
			$fd = $userdata['fd'];
			$ip = $userdata['ip'];
			$pusharr = array();
			$pusharr['cmd'] = CMD::$otherlogin;
			FdData::$MainSvr->push( $fd, json_encode($pusharr) );
			FdData::$MainSvr->close($fd);//close会删除UserData和FdData

			Logger::Info( "relogin [uid=$uid] [newfd=$nowfd] [oldfd=$fd] [oldip=$ip]" );
		} else {
			//正常登录
			Logger::Info( "user login [uid=$uid] [fd=$nowfd]" );
		}

		UserData::InitUser($uid);
		OnlineData::UserOnline($uid);

		$userdata = &UserData::$UserData[$uid];
		$userdata['fd'] = FdData::$Nowfd;
		$userdata['ip'] = FdData::$NowClientIP;

		FdData::$Data[FdData::$Nowfd]['uid'] = $uid;

		$retarr['error'] = 0;
		FdData::$MainSvr->push( FdData::$Nowfd, json_encode($retarr) );

		
	}
}
?>