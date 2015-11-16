<?php
class HeroTogether{

	function __construct()
	{

	}

	function __destruct()
	{
		
	}

	public function CheckInfo()
	{
		global $HERO_TOGETHER_ARR;
		foreach( $HERO_TOGETHER_ARR as $hid=>$value ) {
			$num = count($value);
			echo "$hid : $num <br>";
		}
	}

	public function GetUp($hid, $hidarr)
	{
		global $HERO_TOGETHER_ARR;

		$retarr = array();
		$retarr['blood']  = 1;
		$retarr['attack'] = 1;
		$retarr['idstr'] = '';
		
		if( !isset( $HERO_TOGETHER_ARR[$hid] ) ) {
			return $retarr;
		}

		$idarr = array();
		foreach( $HERO_TOGETHER_ARR[$hid] as $value ) {
			$hid_list = $value['hid_list'];
			$isok = true;
			foreach( $hid_list as $need_hid ) {
				if( !in_array($need_hid, $hidarr) ) {//如果需要的人不在我的英雄列表里，那么这个加成失败
					$isok = false;
					break;
				}
			}
			if( $isok ) {
				$idarr[] = $value['id'];
				$retarr['blood']  = $retarr['blood'] * ( 1 + $value['blood_up'] / 100 ) ;
				$retarr['attack'] = $retarr['attack'] * ( 1 + $value['attack_up'] / 100 ) ;
			}
		}

		$retarr['idstr'] = implode('|', $idarr);
		return $retarr;
	}
}
?>