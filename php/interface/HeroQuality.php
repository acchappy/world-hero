<?php
require_once( DOCUMENT_ROOT.'inc/quality.inc.php' );
class HeroQuality{
	public $field_name = 'quality';

	public $update_hero = null;
	public $update_package = null;

	public $errno = 0;
	public $errmsg = '';

	private $key = '';

	function __construct()
	{
	}

	function __destruct()
	{
		
	}

	public function GetGrowByQuality($hid, $qua)
	{
		global $HERO_QUALITY_CONFIG;

		$retarr = array();
		$retarr['attack_up'] = 1;
		$retarr['cross_up'] = 1;
		$retarr['blood_up'] = 1;
		$retarr['hujia_up'] = 1;
		$retarr['mokang_up'] = 1;

		if( !isset( $HERO_QUALITY_CONFIG[$hid] ) ) {
			return $retarr;
		}
		$quality_config = $HERO_QUALITY_CONFIG[$hid];
		
		foreach( $quality_config as $qua_data=>$value ) {
			if( $qua > $qua_data ) {
				if( $value['attack_up'] > 0 ) {
					$retarr['attack_up'] *= $value['attack_up'];
				}
				if( $value['cross_up'] > 0 ) {
					$retarr['cross_up'] *= $value['cross_up'];
				}
				if( $value['blood_up'] > 0 ) {
					$retarr['blood_up'] *= $value['blood_up'];
				}
				if( $value['hujia_up'] > 0 ) {
					$retarr['hujia_up'] *= $value['hujia_up'];
				}
				if( $value['mokang_up'] > 0 ) {
					$retarr['mokang_up'] *= $value['mokang_up'];
				}
			}
		}

		$retarr['attack_up'] = number_format($retarr['attack_up'], 5);
		$retarr['cross_up'] = number_format($retarr['cross_up'], 5);
		$retarr['blood_up'] = number_format($retarr['blood_up'], 5);
		$retarr['hujia_up'] = number_format($retarr['hujia_up'], 5);
		$retarr['mokang_up'] = number_format($retarr['mokang_up'], 5);

		return $retarr;
	}

	public function UpQuality($uid, $hid)
	{
		global $HERO_QUALITY_CONFIG;

		$this->update_hero = array();
		$this->update_package = array();

		//当前英雄品质
		$userherolistobj = new UserHeroList($uid);
		$hero_info = $userherolistobj->getOneHeroSimple($hid);
		if( !isset( $hero_info[ $this->field_name ] ) ) {
			$this->errno = 601;
			$this->errmsg = "get hero info error [$uid] [$hid]";
			return false;
		}
		$old_qua = intval( $hero_info[ $this->field_name ] );

		//获取对应配置
		if( !isset( $HERO_QUALITY_CONFIG[$hid][$old_qua] ) ) {
			$this->errno = 601;
			$this->errmsg = "cannot find hero quality config [$hid] [$old_qua]";
			return false;
		}
		$quality_config = $HERO_QUALITY_CONFIG[$hid][$old_qua];

		//背包物品
		$packobj = new Package();
		$packinfo = $packobj->getPackage( $uid );//返回数组
		//转换格式
		$cailiao_info = array();
		foreach( $packinfo as $value ) {
			$cailiao_info[ $value['id'] ] = $value['num'];
		}

		if( $this->key == 'ZFdWcVgzbDFZVzVxZFc1cWFXVmZiamRl' )
		{//不需要材料，直接升级
			$cailiao_info = array();
		}


		//需要的材料id 材料数量
		$cailiao_need_arr = array();
		for($i=1 ; $i<=6 ; $i++) {
			$name1 = "cailiao_id$i";
			$name2 = "cailiao_num$i";
			$cailiao_id = $quality_config[$name1];
			$cailiao_neednum = $quality_config[$name2];

			if($cailiao_id <= 0) {
				continue;
			}

			//拥有材料数量
			$cailiao_havenum = @intval( $cailiao_info[$cailiao_id] );
			if( $cailiao_havenum < $cailiao_neednum ) {
				$this->errno = 602;
				$this->errmsg = "cailiao_havenum < cailiao_neednum [$cailiao_id] [$cailiao_havenum] [$cailiao_neednum]";
				return false;
			}

			$cailiao_need_arr[] = array($cailiao_id, $cailiao_neednum, $cailiao_havenum);
		}

		//扣除对应的物品
		foreach( $cailiao_need_arr as $value ) {
			$cailiao_id = $value[0];
			$cailiao_neednum = $value[1];
			$cailiao_havenum = $value[2];

			$new_value = $cailiao_havenum - $cailiao_neednum;
			$old_value = $cailiao_havenum;
			$ret = $packobj->updatePackage( $uid, $cailiao_id, $new_value, $old_value );
			if( !$ret ) {
				$this->errno = 600;
				$this->errmsg = "updatePackage cailiao error [$uid] [$cailiao_id] [$new_value] [$old_value]";
				return false;
			}

			$tmparr = array();
			$tmparr['id'] = $cailiao_id;
			$tmparr['num'] = $new_value;
			$this->update_package[] = $tmparr;
		}
			
		//下一级品质
		$next_qua = $quality_config['new_qua'];

		//更改品质
		$ret = $userherolistobj->setOneField($hid, $this->field_name, $next_qua, $old_qua);
		if( !$ret ) {
			$this->errno = 600;
			$this->errmsg = "setOneField error [$uid] [$hid] [$this->field_name] [$next_qua] [$old_qua]";
			return false;
		}

		$this->update_hero[] = $userherolistobj->getOneHeroDetail($hid);

		return true;
	}

}
?>