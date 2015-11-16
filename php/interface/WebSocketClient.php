<?php
class WebSocketClient
{
    private $socket = null;
	private $partialMessage = '';
	private $partialBuffer  = '';

    function __construct( $host, $port )
	{
		if ( ( $this->socket = socket_create( AF_INET, SOCK_STREAM, SOL_TCP ) ) == false )
        {
			throw new Exception( sprintf( "Unable to create a socket: %s", socket_strerror( socket_last_error() ) ) );
		}

		socket_set_option( $this->socket, SOL_SOCKET, SO_SNDTIMEO, array( 'sec' => 3, 'usec' => 3000 ) ); 
        if ( !socket_connect( $this->socket, $host, $port ) )
        {
			throw new Exception( sprintf( "Unable to connect to server %s: %s", $host, socket_strerror( socket_last_error() ) ) );
		}
	}

	protected function dohandshake()
	{
		/*
		$buf  = substr( $buffer, strpos( $buffer, 'Sec-WebSocket-Key:' ) + 18 );
		$key  = trim( substr( $buf, 0, strpos( $buf, "\r\n" ) ) );
		$new_key = base64_encode( sha1 ( $key."258EAFA5-E914-47DA-95CA-C5AB0DC85B11", true ) );
		$new_message  = "HTTP/1.1 101 Switching Protocols\r\n";
		$new_message .= "Upgrade: websocket\r\n";
		$new_message .= "Sec-WebSocket-Version: 13\r\n";
		$new_message .= "Connection: Upgrade\r\n";
		$new_message .= "Sec-WebSocket-Accept: ".$new_key."\r\n\r\n";
		socket_write( $this->users[$k]['socket'], $new_message, strlen( $new_message ) );
		$this->users[$k]['hand'] = true;
		return true;
		*/
        $header = "Accept-Encoding:gzip, deflate, sdch\r\nAccept-Language:zh-CN,zh;q=0.8\r\nCache-Control:no-cache\r\nConnection:Upgrade\r\nHost:192.168.0.199:8888\r\nSec-WebSocket-Extensions:permessage-deflate; client_max_window_bits\r\nSec-WebSocket-Key:waepqZZSe2ULwSV4b30V2Q==\r\n
Sec-WebSocket-Version:13
Upgrade:websocket
User-Agent:Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36"
	}

	protected function extractHeaders( $message )
	{
		$header = array( 'fin' => $message[0] & chr(128),
            'rsv1'    => $message[0] & chr(64),
            'rsv2'    => $message[0] & chr(32),
            'rsv3'    => $message[0] & chr(16),
            'opcode'  => ord($message[0]) & 15,
            'hasmask' => $message[1] & chr(128),
            'length'  => 0,
            'mask'    => "");
		$header['length'] = ( ord( $message[1] ) >= 128 ) ? ord( $message[1] ) - 128 : ord( $message[1] );
		if ( $header['length'] == 126 )
		{
			if ( $header['hasmask'] != 0 )
			{
				$header['mask'] = $message[4].$message[5].$message[6].$message[7];
			}
			$header['length'] = ord( $message[2] ) * 256 + ord( $message[3] );
		}
		elseif ( $header['length'] == 127 )
		{
			if ( $header['hasmask'] != 0 )
			{
				$header['mask'] = $message[10].$message[11].$message[12].$message[13];
			}
			$header['length'] = ord($message[2]) * 65536 * 65536 * 65536 * 256 
                + ord($message[3]) * 65536 * 65536 * 65536
                + ord($message[4]) * 65536 * 65536 * 256
                + ord($message[5]) * 65536 * 65536
                + ord($message[6]) * 65536 * 256
                + ord($message[7]) * 65536 
                + ord($message[8]) * 256
                + ord($message[9]);
		}
		elseif ( $header['hasmask'] != 0 )
		{
			$header['mask'] = $message[2].$message[3].$message[4].$message[5];
		}
		return $header;
	}

	protected function checkRSVBits( $headers )
	{
		if ( ord($headers['rsv1'] ) + ord( $headers['rsv2'] ) + ord( $headers['rsv3'] ) > 0 )
		{
			return true;
		}
		return false;
	}

	protected function extractPayload( $message, $headers )
	{
		$offset = 2;
		if ( $headers['hasmask'] != 0 )
		{
			$offset += 4;
		}
		
		if ( $headers['length'] > 65535 )
		{
			$offset += 8;
		}
		elseif ( $headers['length'] > 125 )
		{
			$offset += 2;
		}
		return substr($message,$offset);
	}

	protected function applyMask( $headers, $payload )
	{
		$effectiveMask = "";
		if ( $headers['hasmask'] )
		{
			$mask = $headers['mask'];
		}
		else
		{
			return $payload;
		}

		while ( strlen( $effectiveMask ) < strlen( $payload ) )
		{
			$effectiveMask .= $mask;
		}

		while ( strlen( $effectiveMask ) > strlen( $payload ) )
		{
			$effectiveMask = substr( $effectiveMask, 0, -1 );
		}
		return $effectiveMask ^ $payload;
	}

	public function uncode( $message )
	{
		$headers   = $this->extractHeaders( $message );
		$willClose = false;
		switch ( $headers['opcode'] )
		{
			case 0:
			case 1:
			case 2:
				break;
		    case 8:
				$this->close();
			    return '';
			case 9:
			case 10:
				break;
			default:
			    $willClose = true;
				break;
		}
		if ( $this->checkRSVBits( $headers ) )
		{
			echo "checkRSVBits\n";
			return false;
		}
		if ( $willClose )
		{
			echo "willClose\n";
			return false;
		}

		$payload = $this->extractPayload( $message, $headers );
		//$payload = $this->applyMask( $headers, $payload );
/*
		if ( $headers['length'] > strlen( $payload ) )
		{
			$this->partialBuffer = $message;
			echo "strlen\n";
			return false;
		}
*/
$this->printHeaders( $headers );

		if ( $headers['fin'] )
		{
			return $payload;
		}
		$this->partialMessage = $payload;
		return false;
	}

	public function encode( $fin, $opcode, $data )
	{
		$finbit = 0;
		$mask_bit = 0;

		if ( $fin )
		{
			$finbit = 0x80;
		}

		$frame = pack( "C", $finbit | $opcode );
		$len   = strlen( $data );

		if ( $len < 126 )
		{
			$frame .= pack( "C", $len | $mask_bit );
		}
		else if ( $len < 0xFFFF )
		{
			$frame .= pack( "Cn", 126 | $mask_bit, $len );
		}
		else
		{
			$frame .= pack( "CN", 127 | $mask_bit, $len );
		}

		$frame .= $data;

		$this->send( $frame );
	}

	public function send_text( $data )
	{
        $this->encode( true, 0x1, $data );
	}

    public function send_binary( $data )
	{
        $this->encode( true, 0x2, $data );
	}

    public function send_ping( $data )
	{
        $this->encode( true, 0x9, $data );
	}

	public function send( $data )
	{
		if ( socket_write( $this->socket, $data ) === false )
        {
			throw new Exception( sprintf( "Unable to write to socket: %s", socket_strerror( socket_last_error() ) ) ); 
		}
	}

	public function read()
	{
		$buf = null;
		if ( false !== ( $bytes = socket_recv( $this->socket, $buf, 102400, 0 ) ) )
		{
			echo 'Read '.$bytes." bytes from socket_recv(). Closing socket...\n";
			return $this->uncode( $buf );
		}
		else
		{
			echo "socket_recv() failed; reason: " . socket_strerror(socket_last_error( $this->socket ) ) . "\n";
			exit( 0 );
		}
	}

	protected function strtohex( $str )
	{
		$strout = "";
		for ( $i = 0; $i < strlen( $str ); $i++ )
		{
			$strout .= (ord($str[$i])<16) ? "0" . dechex(ord($str[$i])) : dechex(ord($str[$i]));
			$strout .= " ";
			if ( $i % 32 == 7 )
			{
				$strout .= ": ";
			}
			if ( $i % 32 == 15 )
			{
				$strout .= ": ";
			}
			if ( $i % 32 == 23 )
			{
				$strout .= ": ";
			}
			if ( $i % 32 == 31 )
			{
				$strout .= "\n";
			}
		}
		return $strout . "\n";
	}

    protected function printHeaders( $headers )
	{
		echo "Array\n(\n";
		foreach ( $headers as $key => $value )
		{
			if ( ( $key == 'length' ) || ( $key == 'opcode' ) )
			{
				echo "\t[$key] => $value\n\n";
			}
			else
			{
				echo "\t[$key] => ".$this->strtohex($value)."\n";
			}
		}
		echo ")\n";
	}

	public function close()
	{
		socket_close( $this->socket );
	}
}
?>