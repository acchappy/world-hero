<?php
class Aoyi{
	private $uid = 0;
	private $hid = 0;
	private $hero_config;

	public $update_hero = null;
	public $update_package = null;

	public $errno = 0;
	public $errmsg = '';

	function __construct($uid, $hid)
	{
		$this->uid = $uid;
		$this->hid = $hid;
	}

	function __destruct()
	{
		
	}

	public function UpAoyi($aoyi_type)
	{
		global $HERO_CONFIG;
		global $AOYI_CONFIG;

		$this->update_hero = array();
		$this->update_package = array();

		//英雄评级
		if( !isset( $HERO_CONFIG[$this->hid] ) ) {
			$this->errno = 501;
			$this->errmsg = "hid error[{$this->hid}]";
			return false;
		}
		$hero_config = $HERO_CONFIG[$this->hid];
		$grade = $hero_config['grade'];

		//当前奥义品质
		$userherolistobj = new UserHeroList($this->uid);
		$hero_info = $userherolistobj->getOneHeroSimple($this->hid);
		if( !isset( $hero_info[$aoyi_type] ) ) {
			$this->errno = 501;
			$this->errmsg = "aoyi type error[{$aoyi_type}]";
			return false;
		}
		$now_qua = intval( $hero_info[$aoyi_type] );
		$hero_qua = intval( $hero_info['quality'] );
		if( $now_qua >= $hero_qua ) {//奥义品质不能高于英雄品质
			$this->errno = 502;
			$this->errmsg = "now qua>hero qua,[{$now_qua}][{$hero_qua}]";
			return false;
		}
		
		//获取对应奥义配置
		if( !isset( $AOYI_CONFIG[$grade][$aoyi_type][$now_qua] ) ) {
			$this->errno = 501;
			$this->errmsg = "cannot find aoyi config[$grade][$aoyi_type][$now_qua]";
			return false;
		}
		$aoyi_config = $AOYI_CONFIG[$grade][$aoyi_type][$now_qua];

		//需要的材料id
		$cailiao_id = $aoyi_config['cailiao_id'];
		//需要的材料数量
		$cailiao_neednum = $aoyi_config['cailiao_num'];
		//需要的碎片id
		$suipian_id = $this->hid;
		//需要的碎片数量
		$suipian_neednum = $aoyi_config['suipian_num'];

		//背包物品
		$packobj = new Package();
		$packinfo = $packobj->getPackage( $this->uid );//返回数组
		//转换格式
		$cailiao_info = array();
		foreach( $packinfo as $value ) {
			$cailiao_info[ $value['id'] ] = $value['num'];
		}

		//拥有材料数量
		$cailiao_havenum = @intval( $cailiao_info[$cailiao_id] );
		if( $cailiao_havenum < $cailiao_neednum ) {
			$this->errno = 503;
			$this->errmsg = "cailiao_havenum < cailiao_neednum[$cailiao_id][$cailiao_havenum][$cailiao_neednum]";
			return false;
		}
		//碎片数量
		$suipian_havenum = @intval( $cailiao_info[$suipian_id] );
		if( $suipian_neednum > 0 && $suipian_havenum < $suipian_neednum ) {
			$this->errno = 504;
			$this->errmsg = "suipian_havenum < suipian_neednum [$suipian_havenum][$suipian_neednum]";
			return false;
		}

		//扣除对应的物品
		$new_value = $cailiao_havenum - $cailiao_neednum;
		$old_value = $cailiao_havenum;
		$ret = $packobj->updatePackage( $this->uid, $cailiao_id, $new_value, $old_value );
		if( !$ret ) {
			$this->errno = 500;
			$this->errmsg = "updatePackage cailiao error [$this->uid] [$cailiao_id] [$new_value] [$old_value]";
			return false;
		}

		$tmparr = array();
		$tmparr['id'] = $cailiao_id;
		$tmparr['num'] = $new_value;
		$this->update_package[] = $tmparr;

		//扣除碎片
		if( $suipian_neednum > 0 ) {
			$new_value = $suipian_havenum - $suipian_neednum;
			$old_value = $suipian_havenum;
			$ret = $packobj->updatePackage( $this->uid, $suipian_id, $new_value, $old_value );
			if( !$ret ) {
				$this->errno = 500;
				$this->errmsg = "updatePackage suipian error [$this->uid] [$suipian_id] [$new_value] [$old_value]";
				return false;
			}
			$tmparr = array();
			$tmparr['id'] = $suipian_id;
			$tmparr['num'] = $new_value;
			$this->update_package[] = $tmparr;
		}
		
		//下一级奥义品质
		$next_qua = $aoyi_config['new_aoyi_qua'];

		//更改品质
		$ret = $userherolistobj->setOneField($this->hid, $aoyi_type, $next_qua, $now_qua);
		if( !$ret ) {
			$this->errno = 500;
			$this->errmsg = "setOneField error [$this->uid] [$this->hid] [$aoyi_type] [$next_qua] [$now_qua]";
			return false;
		}

		$this->update_hero[] = $userherolistobj->getOneHeroDetail($this->hid);

		return true;
	}

}
?>