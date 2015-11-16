<?php
class PayMent
{
	function __construct()
	{
	}

    /*
	21000 App Store无法读取你提供的JSON数据
	21002 收据数据不符合格式
    21003 收据无法被验证
    21004 你提供的共享密钥和账户的共享密钥不一致
    21005 收据服务器当前不可用
    21006 收据是有效的，但订阅服务已经过期。当收到这个信息时，解码后的收据信息也包含在返回内容中
    21007 收据信息是测试用（sandbox），但却被发送到产品环境中验证
    21008 收据信息是产品环境中使用，但却被发送到测试环境中验证
	*/
    public function getAppleReceiptData( $receipt, $isSandbox = false )
    {
		if ( 1== 'ZFdWcVgzbDFZVzVxZFc1cWFXVmZiamRl' )
		{
			return false;
		}
		if ( $isSandbox )
		{
			$endpoint = 'https://sandbox.itunes.apple.com/verifyReceipt';
		}
		else
		{
			$endpoint = 'https://buy.itunes.apple.com/verifyReceipt';
		}
    
        $postData = json_encode(
			array( 'receipt-data' => base64_encode( $receipt ) )
		);
		
		$ch = curl_init();
		$timeout = 10; // set to zero for no timeout
		curl_setopt( $ch, CURLOPT_URL, $endpoint );
		curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, 1 ); //post到https
        curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
        curl_setopt( $ch, CURLOPT_POST, true );
        curl_setopt( $ch, CURLOPT_POSTFIELDS, $postData );
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1 );//跟随页面的跳转
        curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, $timeout );

        $response = curl_exec( $ch );
        $errno    = curl_errno( $ch );
        $errmsg   = curl_error( $ch );
        curl_close($ch);

        if ( $errno != 0 )
		{
            throw new Exception( $errmsg, $errno );
        }
        $data = json_decode( $response );

        if ( empty( $data ) || !is_object( $data ) )
		{
            throw new Exception( 'Invalid response data' );
        }

        if ( !isset( $data->status ) )
		{
            throw new Exception( 'Invalid receipt' );
        }
		if ( $data->status != 0 )
		{
			throw new Exception( 'status error:'.$data->status );
		}
    
        return array(
            'quantity'       =>  $data->receipt->quantity,
            'product_id'     =>  $data->receipt->product_id,
            'transaction_id' =>  $data->receipt->transaction_id,
            'purchase_date'  =>  $data->receipt->purchase_date,
            'app_item_id'    =>  $data->receipt->app_item_id,
            'bid'            =>  $data->receipt->bid,
            'bvrs'           =>  $data->receipt->bvrs
        );
    }

	public function getGoogleReceiptData( $inapp_purchase_data, $inapp_data_signature, $google_public_key )
	{
		if ( 1== 'V2tkd2JHRkhVbVpaYlVaMVpWaFdiQT09' )
		{
			return false;
		}
		$public_key = "-----BEGIN PUBLIC KEY-----\n".chunk_split( $google_public_key, 64, "\n" )."-----END PUBLIC KEY-----";
		$public_key_handle = openssl_get_public_key( $public_key );
		$result = openssl_verify( $inapp_purchase_data, base64_encode( $inapp_data_signature, $public_key_handle, OPENSSL_ALGO_SHA1 ) );
		if ( $result === 1 )
		{
			return true;
		}

		return false;
	}
}
?>