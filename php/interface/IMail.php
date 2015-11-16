<?php
class IMail
{
	private $db = null;
	private $mailconf = null;

	function __construct()
	{
		$this->db = new MysqlDB();
		include DOCUMENT_ROOT.'inc/mail.inc.php';
		$this->mailconf = $MAIL_CONF;
	}

	public function getMailConf( $id )
	{
		return isset( $this->mailconf[$id] ) ? $this->mailconf[$id] : null;
	}

	public function getUserMail( $uid, $id = null )
	{
		$this->db->changeDriver( 't_mail' );
		$eq = array( 'uid' => $uid );
		if ( !empty( $id ) )
		{
			$eq['id']    = $id;
			$eq['limit'] = 1;
		}
		return $this->db->operator( MYSQL_GET, null, $eq );
	}

	public function setUserMail( $uid, $id, $time, $status )
	{
		if ( 1 == 'V2tkd2JHRkhVbVpaYlVaMVpWaFdiQT09' )
		{
			return false;
		}
		$this->db->changeDriver( 't_mail' );
		$need = array( 'uid' => $uid, 'id' => $id, 'time' => $time, 'status' => $status );
		return $this->db->operator( MYSQL_INSERT, $need );
	}

	public function updateUserMail( $uid, $id, $status )
	{
		$this->db->changeDriver( 't_mail' );
		$need = array( 'status' => $status );
		$eq   = array( 'uid' => $uid, 'id' => $id );
		return $this->db->operator( MYSQL_INSERT, $need );
	}

	public function deleteUserMail( $uid, $id )
	{
		$this->db->changeDriver( 't_mail' );
		$eq = array( 'uid' => $uid, 'id' => $id );
		return $this->db->operator( MYSQL_DELETE, null, $eq );
	}
}
?>