<?php
class Skill{
	public $update_hero = null;
	public $update_package = null;

	public $errno = 0;
	public $errmsg = '';

	public $skill_config = array();

	function __construct()
	{
		//需要的碎片数量
		$this->skill_config['skill1'] = array();//队长技能
		$this->skill_config['skill1'][1] = 30;
		$this->skill_config['skill1'][2] = 50;
		$this->skill_config['skill1'][3] = 70;
		$this->skill_config['skill1'][4] = 100;

		$this->skill_config['skill2'] = array();//天赋技能
		$this->skill_config['skill2'][1] = 30;
		$this->skill_config['skill2'][2] = 50;
		$this->skill_config['skill2'][3] = 100;
		$this->skill_config['skill2'][4] = 150;
	}

	function __destruct()
	{
		
	}


	public function UpSkill($uid, $hid, $skill_type)
	{
		$this->update_hero = array();
		$this->update_package = array();

		if( $skill_type != 'skill1' && $skill_type != 'skill2' && $skill_type != 'skill3' && $skill_type != 'skill4' ) {
			$this->errno = 801;
			$this->errmsg = "skill type error [$skill_type] ";
			return false;
		}

		//当前英雄技能
		$userherolistobj = new UserHeroList($uid);
		$hero_info = $userherolistobj->getOneHeroSimple($hid);
		if( !isset( $hero_info[ $skill_type ] ) ) {
			$this->errno = 801;
			$this->errmsg = "get hero info error [$uid] [$hid]";
			return false;
		}
		$old_level = intval( $hero_info[ $skill_type ] );

		//背包物品
		$packobj = new Package();
		$packinfo = $packobj->getPackage( $uid );//返回数组
		//转换格式
		$cailiao_info = array();
		foreach( $packinfo as $value ) {
			$cailiao_info[ $value['id'] ] = $value['num'];
		}

		//升级一般技能
		if( $skill_type != 'skill1' && $skill_type != 'skill2' ) {
			//小技能和大招暂时不开放升级
			$this->errno = 802;
			$this->errmsg = "cannot up [$skill_type]";
			return false;

			//英雄等级
			$hero_level = intval( $hero_info[ 'level' ] );
			if( $hero_level <= $old_level ) {
				$this->errno = 803;
				$this->errmsg = "hero_level <= old_level [$uid] [$hid] [$skill_type] [$hero_level] [$old_level]";
				return false;
			}

			//下一级
			$next_level = $old_level + 1;

			//更改
			$ret = $userherolistobj->setOneField($hid, $skill_type, $next_level, $old_level);
			if( !$ret ) {
				$this->errno = 800;
				$this->errmsg = "setOneField error [$uid] [$hid] [$skill_type] [$next_level] [$old_level]";
				return false;
			}

			$this->update_hero[] = $userherolistobj->getOneHeroDetail($hid);

			return true;
		}


		//升级 队长 或者 天赋 技能
		if( $old_level >= 5 ) {
			$this->errno = 802;
			$this->errmsg = "already best [$uid] [$hid] [$skill_type] [$old_level]";
			return false;
		}

		//需要的材料id 材料数量
		$cailiao_id = $hid;
		if( !isset($this->skill_config[$skill_type][$old_level]) ) {
			$this->errno = 801;
			$this->errmsg = "param error [$uid] [$hid] [$skill_type] [$old_level]";
			return false;
		}
		$cailiao_neednum = $this->skill_config[$skill_type][$old_level];

		//拥有材料数量
		$cailiao_havenum = @intval( $cailiao_info[$cailiao_id] );
		if( $cailiao_havenum < $cailiao_neednum ) {
			$this->errno = 804;
			$this->errmsg = "cailiao_havenum < cailiao_neednum [$cailiao_id] [$cailiao_havenum] [$cailiao_neednum]";
			return false;
		}

		//扣除对应的物品
		$new_value = $cailiao_havenum - $cailiao_neednum;
		$old_value = $cailiao_havenum;
		$ret = $packobj->updatePackage( $uid, $cailiao_id, $new_value, $old_value );
		if( !$ret ) {
			$this->errno = 800;
			$this->errmsg = "updatePackage cailiao error [$uid] [$cailiao_id] [$new_value] [$old_value]";
			return false;
		}

		$tmparr = array();
		$tmparr['id'] = $cailiao_id;
		$tmparr['num'] = $new_value;
		$this->update_package[] = $tmparr;
		
		//下一级
		$next_level = $old_level + 1;

		//更改
		$ret = $userherolistobj->setOneField($hid, $skill_type, $next_level, $old_level);
		if( !$ret ) {
			$this->errno = 800;
			$this->errmsg = "setOneField error [$uid] [$hid] [$skill_type] [$next_level] [$old_level]";
			return false;
		}

		$this->update_hero[] = $userherolistobj->getOneHeroDetail($hid);

		return true;
	}

	public function GetBigSkillparam( $s_level , $hero_grade , $fanwei)
	{

		$retarr = array();

		if( $s_level <= 0 )
		{//白色品质没有大招
			$retarr['gailv']  = 0;
			$retarr['beishu'] = 1;
			$retarr['xishu']  = 1;
			return $retarr;
		}

		$s_level = Tools::BuDayu(11 , $s_level);
		$s_level -= 1;


		//先按照单体计算，方便计算系数
		$beishu_config = array();
		$beishu_config['A']  = 3;
		$beishu_config['A+'] = 3.5;
		$beishu_config['S']  = 4;
		$beishu_config['S+'] = 4.5;

		$retarr['gailv']  = 0.1 + 0.01 * $s_level;
		$retarr['beishu'] = $beishu_config[$hero_grade] + 0.1 * $s_level;
		$retarr['xishu']  = $retarr['gailv'] * ( $retarr['beishu'] - 1 ) + 1;

		if( $fanwei != 1 )
		{//全体
			$beishu_config['A']  = 2.5;
			$beishu_config['A+'] = 3;
			$beishu_config['S']  = 3.5;
			$beishu_config['S+'] = 4;

			$retarr['gailv']  = 0.05 + 0.005 * $s_level;
			$retarr['beishu'] = $beishu_config[$hero_grade] + 0.1 * $s_level;

		}

		return $retarr;

		
	}


	public function GetSmallSkillParam($s_level , $hero_grade)
	{
		$s_level = Tools::BuXiaoyu(1 , $s_level);
		$s_level = Tools::BuDayu(51 , $s_level);

		$beishu_config = array();
		$beishu_config['A']  = 1.5;
		$beishu_config['A+'] = 1.6;
		$beishu_config['S']  = 1.7;
		$beishu_config['S+'] = 1.8;

		$s_level -= 1;
		$retarr = array();

		//前面10级加概率，10级之后加伤害

		if( $s_level <= 10 ) 
		{
			$retarr['gailv']  = 0.2 + 0.01 * $s_level;
			$retarr['beishu'] = $beishu_config[ $hero_grade ];
		} else
		{
			$retarr['gailv']  = 0.3;
			$retarr['beishu'] = $beishu_config[ $hero_grade ] + 0.01 * ( $s_level - 10 );
		}

		$retarr['xishu']  = $retarr['gailv'] * ( $retarr['beishu'] - 1 ) + 1;

		
		return $retarr;
	}


	public function GetTianfuParam($tf_name , $tf_level , $hero_grade)
	{
		$tf_level = Tools::BuXiaoyu(1 , $tf_level);
		$tf_level = Tools::BuDayu(51 , $tf_level);

		$funcname = "GetTianfu_{$tf_name}";

		if( method_exists($this , $funcname) ) 
		{
			return $this->$funcname($tf_level , $hero_grade);
		}

		return array();

	}

	public function GetTianfu_baoji($level , $hero_grade)
	{
		$beishu_config = array();
		$beishu_config['A']  = 2;
		$beishu_config['A+'] = 2.2;
		$beishu_config['S']  = 2.4;
		$beishu_config['S+'] = 2.6;

		$level -= 1;

		$retarr = array();
		$retarr['gailv']  = 0.2 + 0.01 * $level;
		$retarr['beishu'] = $beishu_config[ $hero_grade ];
		$retarr['xishu']  = $retarr['gailv'] * ( $retarr['beishu'] - 1 ) + 1;
		return $retarr;
	}

	public function GetTianfu_bisha($level , $hero_grade)
	{//现在修改成连击了
		$beishu_config = array();
		$beishu_config['A']  = 0.2;
		$beishu_config['A+'] = 0.27;
		$beishu_config['S']  = 0.35;
		$beishu_config['S+'] = 0.4;

		$level -= 1;

		$retarr = array();
		$retarr['gailv']  = $beishu_config[ $hero_grade ] + 0.01 * $level;
		$retarr['beishu'] = 2;
		$retarr['xishu']  = $retarr['gailv'] + 1;
		return $retarr;
	}

	public function GetTianfu_shengjian($level , $hero_grade)
	{//现在实际是 忽略防御，其实和加深伤害效果是一样的,提示语不一样，提示为：忽略防御 1/系数 百分比
		$beishu_config = array();
		$beishu_config['A']  = array(1.2  , 0.01);
		$beishu_config['A+'] = array(1.27 , 0.01);
		$beishu_config['S']  = array(1.35 , 0.01);
		$beishu_config['S+'] = array(1.4  , 0.01);

		$level -= 1;

		$init = $beishu_config[ $hero_grade ][0];
		$per  = $beishu_config[ $hero_grade ][1];

		$retarr = array();
		$retarr['gailv']  = 1;
		$retarr['beishu'] = $init + $per * $level;
		$retarr['xishu']  = $retarr['beishu'];
		return $retarr;
	}

	public function GetTianfu_zhongji($level , $hero_grade)
	{
		$beishu_config = array();
		$beishu_config['A']  = array(1.4  , 0.02);
		$beishu_config['A+'] = array(1.55 , 0.02);
		$beishu_config['S']  = array(1.7  , 0.02);
		$beishu_config['S+'] = array(1.8  , 0.02);

		$level -= 1;

		$init = $beishu_config[ $hero_grade ][0];
		$per  = $beishu_config[ $hero_grade ][1];

		$retarr = array();
		$retarr['gailv']  = 0.5;
		$retarr['beishu'] = $init + $per * $level;
		$retarr['xishu']  = 0.5 * ( $retarr['beishu'] - 1 ) + 1;
		return $retarr;
	}

	public function GetTianfu_jiashen($level , $hero_grade)
	{
		$beishu_config = array();
		$beishu_config['A']  = array(1.2  , 0.01);
		$beishu_config['A+'] = array(1.27 , 0.01);
		$beishu_config['S']  = array(1.35 , 0.01);
		$beishu_config['S+'] = array(1.4  , 0.01);

		$level -= 1;

		$init = $beishu_config[ $hero_grade ][0];
		$per  = $beishu_config[ $hero_grade ][1];

		$retarr = array();
		$retarr['gailv']  = 1;
		$retarr['beishu'] = $init + $per * $level;
		$retarr['xishu']  = $retarr['beishu'] ;
		return $retarr;
	}

	public function GetTianfu_zhiliao($level , $hero_grade)
	{
		$beishu_config = array();
		$beishu_config['A']  = array(1.2  , 0.01);
		$beishu_config['A+'] = array(1.27 , 0.01);
		$beishu_config['S']  = array(1.35 , 0.01);
		$beishu_config['S+'] = array(1.4  , 0.01);

		$level -= 1;

		$init = $beishu_config[ $hero_grade ][0];
		$per  = $beishu_config[ $hero_grade ][1];

		$retarr = array();
		$retarr['gailv']  = 1;
		$retarr['beishu'] = $init + $per * $level;
		$retarr['xishu']  = $retarr['beishu'] ;
		return $retarr;
	}

	public function GetTianfu_miss($level , $hero_grade)
	{
		//现在实际上不是闪避了，而是一定几率 减伤 80%
		$beishu_config = array();
		$beishu_config['A']  = array(0.2  , 0.006);
		$beishu_config['A+'] = array(0.25 , 0.006);
		$beishu_config['S']  = array(0.3  , 0.006);
		$beishu_config['S+'] = array(0.35 , 0.006);

		$level -= 1;

		$init = $beishu_config[ $hero_grade ][0];
		$per  = $beishu_config[ $hero_grade ][1];

		$retarr = array();
		$retarr['gailv']  = $init + $per * $level;
		$retarr['beishu'] = 0.2;
		$retarr['xishu']  = 1 / ( 1 + $retarr['beishu'] * $retarr['gailv'] - $retarr['gailv'] );
		return $retarr;
	}

	public function GetTianfu_gedang($level , $hero_grade)
	{

		$beishu_config = array();
		$beishu_config['A']  = array(0.7  , 0.008);
		$beishu_config['A+'] = array(0.65 , 0.008);
		$beishu_config['S']  = array(0.6  , 0.008);
		$beishu_config['S+'] = array(0.55 , 0.008);

		$level -= 1;

		$init = $beishu_config[ $hero_grade ][0];
		$per  = $beishu_config[ $hero_grade ][1];

		$retarr = array();
		$retarr['gailv']  = 0.6;
		$retarr['beishu'] = $init - $per * $level;
		$retarr['xishu']  = 1 / ( 1 + $retarr['beishu'] * $retarr['gailv'] - $retarr['gailv'] );
		return $retarr;
	}

	public function GetTianfu_jianren($level , $hero_grade)
	{

		$beishu_config = array();
		$beishu_config['A']  = array(0.8  , 0.004);
		$beishu_config['A+'] = array(0.77 , 0.004);
		$beishu_config['S']  = array(0.73 , 0.004);
		$beishu_config['S+'] = array(0.7  , 0.004);

		$level -= 1;

		$init = $beishu_config[ $hero_grade ][0];
		$per  = $beishu_config[ $hero_grade ][1];

		$retarr = array();
		$retarr['gailv']  = 1;
		$retarr['beishu'] = $init - $per * $level;
		$retarr['xishu']  = 1 / $retarr['beishu'] ;
		return $retarr;
	}

	public function GetTianfu_huixue($level , $hero_grade)
	{

		$beishu_config = array();
		$beishu_config['A']  = array(0.25 , 0.006);
		$beishu_config['A+'] = array(0.3  , 0.006);
		$beishu_config['S']  = array(0.35 , 0.006);
		$beishu_config['S+'] = array(0.4  , 0.006);

		$level -= 1;

		$init = $beishu_config[ $hero_grade ][0];
		$per  = $beishu_config[ $hero_grade ][1];

		$retarr = array();
		$retarr['gailv']  = 0.8;
		$retarr['beishu'] = $init + $per * $level;
		$js_beishu = 1 - $retarr['beishu'];
		$retarr['xishu']  = 1 / ( 1 + $js_beishu * $retarr['gailv'] - $retarr['gailv'] );
		return $retarr;
	}

	public function GetTianfu_chongsheng($level , $hero_grade)
	{

		$beishu_config = array();
		$beishu_config['A']  = array(0.2  , 0.01);
		$beishu_config['A+'] = array(0.27 , 0.01);
		$beishu_config['S']  = array(0.35 , 0.01);
		$beishu_config['S+'] = array(0.4  , 0.01);

		$level -= 1;

		$init = $beishu_config[ $hero_grade ][0];
		$per  = $beishu_config[ $hero_grade ][1];

		$retarr = array();
		$retarr['gailv']  = 1;
		$retarr['beishu'] = $init + $per * $level;
		$retarr['xishu']  = 1 + $retarr['beishu'];
		return $retarr;
	}

}
?>