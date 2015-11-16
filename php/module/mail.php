<?php
function mail_list()
{
	$arr = array( 'error' => 0 );
	$uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$name = isset( $_POST['name'] ) ? htmlspecialchars( $_POST['name'] ) : $uid;
	if ( strlen( $name ) > 32 )
	{
		$name = $uid;
	}

    $arr['mail'] = array();
	$mailObj = new IMail();
	$list = $mailObj->getUserMail( $uid );
	if ( empty( $list ) )
	{
		return json_encode( $arr );
	}

	foreach ( $list as $v )
	{
		$temp = $mailObj->getMailConf( $v['id'] );
		if ( empty( $temp ) )
		{
			continue;
		}

		$a = explode( ',', $temp['reward'] );
		$prize = array();
		foreach ( $a as $v1 )
		{
			list( $id, $num, $type ) = explode( '_', $v1 );
			array_push( $prize, array( 'id' => $id, 'num' => $num, 'type' => $type ) );
		}

        list( $id, $num, $type ) = explode( '_', $temp['show'] );
		array_push( $arr['mail'], array( 'id' => $v['id'],
			                             'title' => $temp['title'],
			                             'from'  => $temp['from'],
			                             'time'  => date( 'Y-m-d', $v['time'] ),
			                             'content' => $temp['content'],
			                             'status' => intval( $v['status'] ),
			                             'prize' => $prize,
			                             'show'  => array( 'id' => $id, 'num' => $num, 'type' => $type )
			                           )
		);
	}

	return json_encode( $arr );
}

function mail_read()
{
	$arr = array( 'error' => 0, 'player' => array(), 'add_package' => array(), 'update_package' => array() );
	$uid = Login::getLogin();
	if ( empty( $uid ) )
	{
		$arr['error'] = NOT_LOGIN;
		return json_encode( $arr );
	}

	$id = isset( $_POST['id'] ) ? intval( $_POST['id'] ) : 0;
	if ( empty( $id ) )
	{
		$arr['error'] = NO_MAIL_ID;
		return json_encode( $arr );
	}

	$mailObj = new IMail();
	$conf    = $mailObj->getMailConf( $id );
	if ( empty( $conf ) )
	{
		$arr['error'] = NO_MAIL_CONF;
		return json_encode( $arr );
	}

	$info = $mailObj->getUserMail( $uid, $id );
	if ( empty( $info ) )
	{
		$arr['error'] = NO_MAIL_EXISTSED;
		return json_encode( $arr );
	}
	
	if ( $info[0]['status'] == 2 )
	{
		$arr['error'] = MAIL_HASBEEN_READ;
		return json_encode( $arr );
	}

	//删除邮件
	$ret = $mailObj->deleteUserMail( $uid, $id );
	if ( empty( $ret ) )
	{
		$arr['error'] = DEL_MAIL_ERROR;
		return json_encode( $arr );
	}

	//发放奖励
	$temp = explode( ',', $conf['reward'] );
	$packObj  = new Package();
	$moneyObj = new IMoney();
	foreach ( $temp as $v )
	{
		list( $id, $num, $type ) = explode( '_', $v );
		if ( $id == SHOW_COIN )
		{
			$ret = $moneyObj->addCoin( $uid, intval( $num ) );
			if ( empty( $ret ) )
			{
				$arr['error'] = MAIL_REWARD_ERROR;
				return json_encode( $arr );
			}

			$arr['player']['coin'] = $moneyObj->getUpdate();
		}
		else if ( $id == SHOW_DIAMOND )
		{
			$ret = $moneyObj->addDiamond( $uid, intval( $num ) );
			if ( empty( $ret ) )
			{
				$arr['error'] = MAIL_REWARD_ERROR;
				return json_encode( $arr );
			}

			$arr['player']['diamond'] = $moneyObj->getUpdate();
		}
		else
		{
			$pack = $packObj->getPackage( $uid, $id );
			if ( empty( $pack ) )
		    {
			    $packObj->insertPackage( $uid, $id, $num, $type );
			    array_push( $arr['add_package'], array( 'id' => $id, 'num' => $num, 'type' => $type ) );
		    }
		    else
		    {
			    $packObj->addPackage( $uid, $id, $num );
			    array_push( $arr['update_package'], array( 'id' => $id, 'num' => $num + $pack[0]['num'], 'type' => $type ) );
		    }
		}
	}

	return json_encode( $arr );
}
?>