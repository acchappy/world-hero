<?php
class Assist
{
	private $db = null;

	function __construct()
	{
		$this->db = new MysqlDB();
	}

	public function setLoginReward( $uid )
	{
	}

	public function getUserSign( $uid )
	{
		$this->db->changeDriver( 't_user_sign' );
		$need = array( 'date' => 0, 'sign' => '' );
		$eq   = array( 'uid' => $uid, 'limit' => 1 );

		return $this->db->operator( MYSQL_GET, $need, $eq );
	}

	public function initUserSign( $uid )
	{
		$days  = date( 't' );
		$today = date( 'j' );
		$date  = date( 'Ym' );
		$arr   = $this->getUserSign( $uid );
		$sign  = array();
		if ( empty( $arr ) )
		{
			for ( $i = 1; $i < 31; $i++ )
			{
				if ( $i == 1 )
				{
					$g = 2;
				}
				else if ( $i == 2 )
				{
					$g = 1;
				}
				else
				{
					$g = 0;
				}

				if ( $i % 7 == 0 )
				{
					$d = 1;
				}
				else
				{
					$d = 0;
				}
				$sign[$i] = array( 'id' => 10001, 'num' => 1, 'type' => 1, 'd' => $d, 'g' => $g );
			}
			$this->db->operator( MYSQL_INSERT, array( 'uid' => $uid, 'date' => $date, 'sign' => json_encode( $sign ) ) );
		}
		else
		{
			if ( $arr[0]['date'] != $date )
			{
				for ( $i = 1; $i < 31; $i++ )
				{
					if ( $i == 1 )
					{
						$g = 2;
					}
					else if ( $i == 2 )
					{
						$g = 1;
					}
					else
					{
						$g = 0;
					}

					if ( $i % 7 == 0 )
					{
						$d = 1;
					}
					else
					{
						$d = 0;
					}
					$sign[$i] = array( 'id' => 10001, 'num' => 1, 'type' => 1, 'd' => $d, 'g' => $g );
				}

				$this->db->operator( MYSQL_UPDATE, array( 'date' => $date, 'sign' => json_encode( $sign ) ), array( 'uid' => $uid ) );
			}
			else
			{
				$sign = json_decode( $arr[0]['sign'], true );
			}
		}

		return $sign;
	}

	public function updateSign( $uid, $sign )
	{
		$this->db->operator( MYSQL_UPDATE, array( 'sign' => json_encode( $sign ) ), array( 'uid' => $uid ) );
		return true;
	}

	public function getUserFriend( $uid )
	{
		$this->db->changeDriver( 'user_friend' );
		$need = array( 'friend' => '' );
		$eq   = array( 'uid' => $uid );

		return $this->db->operator( MYSQL_GET, $need, $eq );

	}

    // 用户在线时间和昵称用memcached存储
	public function addUserFriend( $uid, $fuid )
	{
		$f = null;
		$arr = $this->getUserFriend( $uid );
		if ( empty( $arr ) )
		{
			$f = $fuid;
		}
		else
		{
			if ( in_array( $uid, explode( ',', $arr[0]['friend'] ) ) )
			{
				return;
			}
			$f = $arr[0]['friend'].','.$fuid;
		}

		return $this->db->operator( MYSQL_UPDATE, array( 'friend' => $f ), array( 'uid' => $uid ) );
	}

	public function getUserFriendList( $uid )
	{
		$arr = $this->getUserFriend( $uid );
		if ( empty( $arr ) )
		{
			return null;
		}

		$obj = new IMemcached( 'user_friend' );
		$f   = explode( ',', $arr[0]['friend'] );

		$data = $obj->getMemMulti( $f );
		if ( empty( $data ) )
		{
			return null;
		}

        $list = array();
		foreach ( $f as $v )
		{
			if ( isset( $data[$v] ) )
			{
				array_push( $list, array( 'uid' => $v, 'name' => $data['name'], 't' => $data['t'] ) );
			}
		}

		return $list;
	}

	//登录奖励
	public function loginReward( $uid )
	{
		$obj = new IMemcached( 'user_reward' );
		$arr = $obj->getMem( $uid );
		if ( empty( $arr ) )
		{
			die( 'loginReward is null' );
		}

        $today = date( 'Y-m-d' );
		if ( $arr['d'] == $today )
		{
			return;
		}

		$arr['d'] = $today;
		//发奖励
		return $obj->setMem( $uid, $arr );
	}

    /*
	查询用户设置
	*/
	public function getUserSetting( $uid )
	{
		$this->db->changeDriver( 'user_setting' );
		$need = array( 'language' => 0, 'music' => 0, 'sound' => 0 );
		$eq   = array( 'uid' => $uid );

		return $this->db->operator( MYSQL_GET, $need, $eq );
	}

    /*
	设置用户设置
	*/
	public function setUserSetting( $uid, $arr )
	{
		$this->db->changeDriver( 'user_setting' );
		$eq   = array( 'uid' => $uid );

		return $this->db->operator( MYSQL_UPDATE, $arr, $eq );
	}
}
?>