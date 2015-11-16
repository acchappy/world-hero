<?php
function hero_add()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$need = array();
	$eq   = array();
	$eq['hid']       = isset( $_POST['hid'] ) ? intval( $_POST['hid'] ) : 0;
	$need['hid']     = $eq['hid'];
	$need['name_zh'] = isset( $_POST['name_zh'] ) ? $_POST['name_zh'] : '';
	$need['name_tw'] = isset( $_POST['name_tw'] ) ? $_POST['name_tw'] : '';
	$need['name_en'] = isset( $_POST['name_en'] ) ? $_POST['name_en'] : '';
	$need['name_th'] = isset( $_POST['name_th'] ) ? $_POST['name_th'] : '';
	$need['name_id'] = isset( $_POST['name_id'] ) ? $_POST['name_id'] : '';
	$need['name_vn'] = isset( $_POST['name_vn'] ) ? $_POST['name_vn'] : '';
	$need['init_blood']    = isset( $_POST['init_blood'] ) ? $_POST['init_blood'] : 0;
	$need['init_parmor_m'] = isset( $_POST['init_parmor_m'] ) ? $_POST['init_parmor_m'] : 0;
	$need['init_marmor_m'] = isset( $_POST['init_marmor_m'] ) ? $_POST['init_marmor_m'] : 0;
	$need['init_attack']   = isset( $_POST['init_attack'] ) ? $_POST['init_attack'] : 0;
	$need['init_cross']    = isset( $_POST['init_cross'] ) ? $_POST['init_cross'] : 0;
	$need['grade']         = isset( $_POST['grade'] )   ? $_POST['grade'] : 'B';
	$need['fragment']      = isset( $_POST['fragment'] )   ? intval( $_POST['fragment'] ) : 10;
	$need['attack_t']      = isset( $_POST['attack_t'] )  ? intval( $_POST['attack_t'] ) : 1;
	$need['spe_skill']     = isset( $_POST['spe_skill'] ) ? intval( $_POST['spe_skill'] ) : 1;
	$need['status']        = isset( $_POST['status'] ) ? intval( $_POST['status'] ) : 0;

	$db = new AdminMysqlDB();
	$db->changeDriver( 'hero_info' );
	$r = $db->operator( MYSQL_GET, null, $eq );
	if ( empty( $r ) )
	{
	    $ret = $db->operator( MYSQL_INSERT, $need );
		$msg = '添加成功';
	}
	else
	{
		unset( $need['hid'] );
		$ret = $db->operator( MYSQL_UPDATE, $need, $eq );
		$msg = '更新成功';
	}

	if ( $ret )
	{
		$arr['message'] = $msg;
	}

	return json_encode( $arr );
}

function hero_list()
{
	$db = new AdminMysqlDB();
	$db->changeDriver( 'hero_info' );
	$eq = array();
	$hid = isset( $_REQUEST['hid'] ) ? intval( $_REQUEST['hid'] ) : 0;
	if ( $hid )
	{
		$eq['hid'] = $hid;
	}
	$arr = $db->operator( MYSQL_GET, null, $eq );
	
    return json_encode( $arr );
}

function hero_del()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$hid = isset( $_REQUEST['hid'] ) ? intval( $_REQUEST['hid'] ) : 0;
	$db = new AdminMysqlDB();
	$db->changeDriver( 'hero_info' );
	$ret = $db->operator( MYSQL_DELETE, null, array( 'hid' => $hid ) );

	if ( $ret )
	{
		$arr['message'] = '删除成功';
	}
	else
	{
		$arr['message'] = '删除失败';
	}
	
	return json_encode( $arr );
}

function hero_build()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$json = array();

	$db = new AdminMysqlDB();
	$db->changeDriver( 'hero_info' );
	$ret = $db->operator( MYSQLI_GET );
	if ( empty( $ret ) )
	{
		$arr['message'] = '查询数据库没有结果';
	}
	else
	{
		$fieldType = $db->getFieldType();
		$handle = fopen( DOCUMENT_ROOT.'inc/hero.inc.php', "w" );
		$data = '<?php'.sprintf( "\n%s\n", '$HERO_CONFIG = array();' );
		foreach ( $ret as $v )
		{
			$hid = $v['hid'];
			unset( $v['hid'] );
			$data .= sprintf( "%s%d%s\n", '$HERO_CONFIG[', $hid, "]=array(" );
			foreach ( $v as $k1 => $v1 )
			{
				switch ( $fieldType[$k1] )
				{
					case 1:
					case 2:
					case 3: 
					case 8: $data .= sprintf( "\"%s\"=>%d,\n", $k1, $v1 ); break;
					case 4:
					case 5: $data .= sprintf( "\"%s\"=>%f,\n", $k1, $v1 ); break;
					default: $data .= sprintf( "\"%s\"=>\"%s\",\n", $k1, $v1 ); break;
				}
			}
			$data .= ");\n";
			if ( !array_key_exists( $hid, $json ) )
			{
				$json[$hid] = array( 'hid' => $hid, 'name' => $v['name_zh'] );
			}
		}

		$data .= '?>';
		fwrite( $handle, $data );
		fclose( $handle );

		$handle = fopen( DOCUMENT_ROOT.'inc/hero.json', "w" );
		fwrite( $handle, json_encode( $json ) );
		fclose( $handle );

		$arr['message'] = '成功生成配置文件';
	}

	return json_encode( $arr );
}

function hero_buildAoyi()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$db = new AdminMysqlDB();
	$db->changeDriver( 'aoyi_info' );
	$ret = $db->operator( MYSQL_GET );
	if ( empty( $ret ) )
	{
		$arr['message'] = '查询数据库没有结果';
	}
	else
	{
		$aoyi = array();
		$handle = fopen( DOCUMENT_ROOT.'inc/aoyi.inc.php', "w" );
		$data = '<?php'.sprintf( "\n%s\n", '$AOYI_CONFIG = array();' );
		foreach ( $ret as $v )
		{
			if ( !array_key_exists( $v['grade'], $aoyi ) )
			{
				$aoyi[$v['grade']] = array();
			}

			if ( !array_key_exists( $v['aoyi_type'], $aoyi[$v['grade']] ) )
			{
				$aoyi[$v['grade']][$v['aoyi_type']] = array();
			}

			if ( !array_key_exists( $v['old_aoyi_qua'], $aoyi[$v['grade']][$v['aoyi_type']] ) )
			{
				$aoyi[$v['grade']][$v['aoyi_type']][$v['old_aoyi_qua']] = array(
					'new_aoyi_qua'=> $v['new_aoyi_qua'],
					'cailiao_id'  => $v['cailiao_id'],
					'cailiao_num' => $v['cailiao_num'],
					'suipian_num' => $v['suipian_num']
				);
			}
		}

		foreach ( $aoyi as $grade => $v1 )
		{
			$data .= sprintf( "%s%s%s\n", '$AOYI_CONFIG["', $grade, "\"]=array();" );
			foreach ( $v1 as $aoyi_type => $v2 )
			{
				$data .= sprintf( "%s%s%s%s%s\n", '$AOYI_CONFIG["', $grade, '"]["', $aoyi_type, "\"]=array();" );
				foreach ( $v2 as $old_aoyi_qua => $v3 )
				{
					$q = intval( $old_aoyi_qua );
					$data .= sprintf( "%s%s%s%s%s%d%s\n", '$AOYI_CONFIG["', $grade, '"]["', $aoyi_type,'"][', $q, "]=array(" );
					$data .= sprintf( "%s%d,\n", '"new_aoyi_qua"=>',  intval( $v3['new_aoyi_qua'] ) );
					$data .= sprintf( "%s%d,\n", '"cailiao_id"=>',    intval( $v3['cailiao_id'] ) );
					$data .= sprintf( "%s%d,\n", '"cailiao_num"=>',   intval( $v3['cailiao_num'] ) );
			        $data .= sprintf( "%s%d);\n", '"suipian_num"=>',  intval( $v3['suipian_num'] ) );
				}
			}
		}
		$data .= '?>';
		fwrite( $handle, $data );
		fclose( $handle );

		$handle = fopen( DOCUMENT_ROOT.'inc/aoyi.json', "w" );
		fwrite( $handle, json_encode( $aoyi ) );
		fclose( $handle );

		$arr['message'] = '成功生成配置文件';
	}

	return json_encode( $arr );
}

function hero_buildQuality()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$db = new AdminMysqlDB();
	$db->changeDriver( 'hero_quality' );
	$ret = $db->operator( MYSQLI_GET );
	if ( empty( $ret ) )
	{
		$arr['message'] = '查询数据库没有结果';
	}
	else
	{
		$quality = array();
		$handle = fopen( DOCUMENT_ROOT.'inc/quality.inc.php', "w" );
		$data = '<?php'.sprintf( "\n%s\n", '$HERO_QUALITY_CONFIG = array();' );
		foreach ( $ret as $v )
		{
			$hid = $v['hid'];
			if ( !array_key_exists( $hid, $quality ) )
			{
				$quality[$hid] = array();
			}

			$old_qua = $v['old_qua'];
			if ( !array_key_exists( $old_qua, $quality[$hid] ) )
			{
				unset( $v['hid'] );
				unset( $v['old_qua'] );
				$quality[$hid][$old_qua] = $v;
			}
		}

		$fieldType = $db->getFieldType();

		foreach ( $quality as $hid => $v1 )
		{
			$data .= sprintf( "%s%d%s\n", '$HERO_QUALITY_CONFIG[', $hid, "]=array();" );
			foreach ( $v1 as $old_qua => $v2 )
			{
				$q = intval( $old_qua );
				$data .= sprintf( "%s%d%s%d%s\n", '$HERO_QUALITY_CONFIG[', $hid, '][', $q, "]=array(" );
				foreach ( $v2 as $k => $v )
				{
					switch ( $fieldType[$k] )
					{
						case 1:
						case 2:
						case 3: 
						case 8: $data .= sprintf( "\"%s\"=>%d,\n", $k, $v ); break;
						case 4:
						case 5: $data .= sprintf( "\"%s\"=>%f,\n", $k, $v ); break;
						default: $data .= sprintf( "\"%s\"=>\"%s\",\n", $k, $v ); break;
					}
				}
				$data.= ");\n";
			}
		}
		$data .= '?>';
		fwrite( $handle, $data );
		fclose( $handle );

		$handle = fopen( DOCUMENT_ROOT.'inc/quality.json', "w" );
		fwrite( $handle, json_encode( $quality ) );
		fclose( $handle );

		$arr['message'] = '成功生成配置文件';
	}

	return json_encode( $arr );
}

function hero_buildSimpleMap()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$db = new AdminMysqlDB();
	$db->changeDriver( 't_simple_mapInfo' );
	$ret = $db->operator( MYSQL_GET );

	$map  = array();
	$json = array();
	if ( empty( $ret ) )
	{
		$arr['message'] = '查询数据库没有结果';
	}
	else
	{
		$handle = fopen( DOCUMENT_ROOT.'inc/simpleMap.inc.php', "w" );
		$data = '<?php'.sprintf( "\n%s\n", '$SIMPLEMAP_INFO_CONFIG = array();' );
		foreach ( $ret as $v )
		{
			$mapid = intval( $v['mapid'] );
			$chapter = intval( $mapid / 100 );
			$section = $mapid % 100;

			if ( !array_key_exists( $chapter, $json ) )
			{
				$json[$chapter] = array();
			}

			if ( !array_key_exists( $section, $json[$chapter] ) )
			{
				$t1 = explode( ',', $v['reward'] );
				$temp = array();
				foreach ( $t1 as $v1 )
				{
					list( $id, $num, $type ) = explode( '_', $v1 );
					array_push( $temp, $id );
				}
				$json[$chapter][$section] = array(
					's1' => $v['s1'],
					's2' => $v['s2'],
					's3' => $v['s3'],
					's4' => $v['s4'],
					's5' => $v['s5'],
					's6' => $v['s6'],
					'reward' => implode( ',', $temp ),
					'level'  => intval( $v['level'] )
				);
			}

			if ( !array_key_exists( $mapid, $map ) )
			{
				$map[$mapid] =  array(
					's1' => $v['s1'],
					's2' => $v['s2'],
					's3' => $v['s3'],
					's4' => $v['s4'],
					's5' => $v['s5'],
					's6' => $v['s6'],
					'reward' => $v['reward'],
					'level'  => $v['level']
				);
			}
		}

		ksort( $map, SORT_NUMERIC );

		$preMapid = 0;
		foreach ( $map as $id => $v )
		{
			$data .= sprintf( "%s%d%s\n", '$SIMPLEMAP_INFO_CONFIG[', $id, ']=array(' );
			$data .= sprintf( "%s\"%s\",\n", '"s1"=>', $v['s1'] );
			$data .= sprintf( "%s\"%s\",\n", '"s2"=>', $v['s2'] );
			$data .= sprintf( "%s\"%s\",\n", '"s3"=>', $v['s3'] );
			$data .= sprintf( "%s\"%s\",\n", '"s4"=>', $v['s4'] );
			$data .= sprintf( "%s\"%s\",\n", '"s5"=>', $v['s5'] );
			$data .= sprintf( "%s\"%s\",\n", '"s6"=>', $v['s6'] );
			$data .= sprintf( "%s\"%s\",\n", '"reward"=>', $v['reward'] );
			$data .= sprintf( "%s%d,\n",  '"preMapid"=>',  $preMapid );
			$data .= sprintf( "%s%d);\n", '"level"=>',  $v['level'] );

			$preMapid = $id;
		}
		$data .= '?>';
		fwrite( $handle, $data );
		fclose( $handle );

		$handle = fopen( DOCUMENT_ROOT.'inc/simple_map.json', "w" );
		fwrite( $handle, json_encode( $json ) );
		fclose( $handle );

		$arr['message'] = '成功生成配置文件';
	}

	return json_encode( $arr );
}

function hero_buildEliteMap()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$db = new AdminMysqlDB();
	$db->changeDriver( 't_elite_mapInfo' );
	$ret = $db->operator( MYSQL_GET );

	$map  = array();
	$json = array();
	if ( empty( $ret ) )
	{
		$arr['message'] = '查询数据库没有结果';
	}
	else
	{
		$handle = fopen( DOCUMENT_ROOT.'inc/eliteMap.inc.php', "w" );
		$data = '<?php'.sprintf( "\n%s\n", '$ELITEMAP_INFO_CONFIG = array();' );
		foreach ( $ret as $v )
		{
			$mapid = intval( $v['mapid'] );
			$chapter = intval( $mapid / 100 );
			$section = $mapid % 100;

			if ( !array_key_exists( $chapter, $json ) )
			{
				$json[$chapter] = array();
			}

			if ( !array_key_exists( $section, $json[$chapter] ) )
			{
				$t1 = explode( ',', $v['reward'] );
				$temp = array();
				foreach ( $t1 as $v1 )
				{
					list( $id, $num, $type ) = explode( '_', $v1 );
					array_push( $temp, $id );
				}
				$json[$chapter][$section] = array(
					's1' => $v['s1'],
					's2' => $v['s2'],
					's3' => $v['s3'],
					's4' => $v['s4'],
					's5' => $v['s5'],
					's6' => $v['s6'],
					'reward' => implode( ',', $temp ),
					'level'  => intval( $v['level'] )
				);
			}

			if ( !array_key_exists( $mapid, $map ) )
			{
				$map[$mapid] =  array(
					's1' => $v['s1'],
					's2' => $v['s2'],
					's3' => $v['s3'],
					's4' => $v['s4'],
					's5' => $v['s5'],
					's6' => $v['s6'],
					'reward' => $v['reward'],
					'level'  => $v['level']
				);
			}
		}

		ksort( $map, SORT_NUMERIC );

		$preMapid = 0;
		foreach ( $map as $id => $v )
		{
			$data .= sprintf( "%s%d%s\n", '$ELITEMAP_INFO_CONFIG[', $id, ']=array(' );
			$data .= sprintf( "%s\"%s\",\n", '"s1"=>', $v['s1'] );
			$data .= sprintf( "%s\"%s\",\n", '"s2"=>', $v['s2'] );
			$data .= sprintf( "%s\"%s\",\n", '"s3"=>', $v['s3'] );
			$data .= sprintf( "%s\"%s\",\n", '"s4"=>', $v['s4'] );
			$data .= sprintf( "%s\"%s\",\n", '"s5"=>', $v['s5'] );
			$data .= sprintf( "%s\"%s\",\n", '"s6"=>', $v['s6'] );
			$data .= sprintf( "%s\"%s\",\n", '"reward"=>', $v['reward'] );
			$data .= sprintf( "%s%d,\n",  '"preMapid"=>',  $preMapid );
			$data .= sprintf( "%s%d);\n", '"level"=>',  $v['level'] );

			$preMapid = $id;
		}
		$data .= '?>';
		fwrite( $handle, $data );
		fclose( $handle );

		$handle = fopen( DOCUMENT_ROOT.'inc/elite_map.json', "w" );
		fwrite( $handle, json_encode( $json ) );
		fclose( $handle );

		$arr['message'] = '成功生成配置文件';
	}

	return json_encode( $arr );
}

function hero_buildMonster()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$db = new AdminMysqlDB();
	$db->changeDriver( 't_monsterInfo' );
	$ret = $db->operator( MYSQL_GET );
	if ( empty( $ret ) )
	{
		$arr['message'] = '查询数据库没有结果';
	}
	else
	{
		$monster = array();
		$json    = array();
		$handle = fopen( DOCUMENT_ROOT.'inc/monster.inc.php', "w" );
		$data = '<?php'.sprintf( "\n%s\n", '$MONSTER_INFO_CONFIG = array();' );
		foreach ( $ret as $v )
		{
			if ( !array_key_exists( $v['mid'], $monster ) )
			{
				$monster[$v['mid']] = array(
					'name_zh'  => $v['name_zh'],
					'name_en'  => $v['name_en'],
					'blood'    => $v['blood'],
					'quality'  => $v['quality'],
					'parmor_m' => $v['parmor_m'],
					'marmor_m' => $v['marmor_m'],
					'level'    => $v['level'],
					'attack'   => $v['attack'],
					'attack_t' => $v['attack_t'],
					'spe_skill' => $v['spe_skill']
				);

				$json[$v['mid']] = array(
					'name_zh' => $v['name_zh'],
					'name_en' => $v['name_en'],
					'grade'   => $v['grade'],
					'level'   => $v['level'],
					'quality' => $v['quality'],
					'spine'   => $v['spine']
				);
			}
		}

		foreach ( $monster as $mid => $v1 )
		{
			$data .= sprintf( "%s%s%s\n", '$MONSTER_INFO_CONFIG["', $mid, '"]=array(' );
			$data .= sprintf( "%s\"%s\",\n", '"name_zh"=>', $v1['name_zh'] );
			$data .= sprintf( "%s\"%s\",\n", '"name_en"=>', $v1['name_en'] );
			$data .= sprintf( "%s%d,\n", '"hid"=>',       intval( $mid ) );
			$data .= sprintf( "%s%d,\n", '"quality"=>',   intval( $v1['quality'] ) );
			$data .= sprintf( "%s%d,\n", '"blood"=>',     intval( $v1['blood'] ) );
			$data .= sprintf( "%s%.3f,\n", '"parmor_m"=>',  $v1['parmor_m'] );
			$data .= sprintf( "%s%.3f,\n", '"marmor_m"=>',  $v1['marmor_m'] );
			$data .= sprintf( "%s%d,\n", '"cross_m"=>',   0 );
			$data .= sprintf( "%s%d,\n", '"skill1"=>',    0 );
			$data .= sprintf( "%s%d,\n", '"skill2"=>',    0 );
			$data .= sprintf( "%s%d,\n", '"skill3"=>',    0 );
			$data .= sprintf( "%s%d,\n", '"skill4"=>',    0 );
			$data .= sprintf( "%s%s,\n", '"tianfu"=>',    '""' );
			$data .= sprintf( "%s%d,\n", '"tianfu_m"=>',  1 );
			$data .= sprintf( "%s%d,\n", '"level"=>',     intval( $v1['level'] ) );
			$data .= sprintf( "%s%d,\n", '"attack"=>',    intval( $v1['attack'] ) );
			$data .= sprintf( "%s%d,\n", '"attack_t"=>',  intval( $v1['attack_t'] ) );
			$data .= sprintf( "%s%d,\n", '"battle"=>',    300 );
			$data .= sprintf( "%s\"%s\");\n", '"spe_skill"=>',  $v1['spe_skill'] );
		}
		$data .= '?>';
		fwrite( $handle, $data );
		fclose( $handle );

		$handle = fopen( DOCUMENT_ROOT.'inc/monster.json', "w" );
		fwrite( $handle, json_encode( $json ) );
		fclose( $handle );

		$arr['message'] = '成功生成配置文件';
	}

	return json_encode( $arr );
}

function hero_buildSkill()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$db = new AdminMysqlDB();
	$db->changeDriver( 'skill' );
	$ret = $db->operator( MYSQL_GET );
	if ( empty( $ret ) )
	{
		$arr['message'] = '查询数据库没有结果';
	}
	else
	{
		$skill = array();
		$handle = fopen( DOCUMENT_ROOT.'inc/skill.inc.php', "w" );
		$data = '<?php'.sprintf( "\n%s\n", '$SKILL_CONF = array();' );
		foreach ( $ret as $v )
		{
			if ( !array_key_exists( $v['hid'], $skill ) )
			{
				$skill[$v['hid']] = array(
					'duizhang1' => $v['duizhang1'],
					'duizhang2' => $v['duizhang2'],
					'tianfu1'   => $v['tianfu1'],
					'tianfu2'   => $v['tianfu2']
				);
			}
		}

		foreach ( $skill as $hid => $v )
		{
			$data .= sprintf( "%s%d%s\n", '$SKILL_CONF[', $hid, ']=array(' );
			$data .= sprintf( "%s\"%s\",\n", '"duizhang1"=>', $v['duizhang1'] );
			$data .= sprintf( "%s\"%s\",\n", '"duizhang2"=>', $v['duizhang2'] );
			$data .= sprintf( "%s\"%s\",\n", '"tianfu1"=>',   $v['tianfu1'] );
			$data .= sprintf( "%s\"%s\");\n", '"tianfu2"=>',  $v['tianfu2'] );
		}
		$data .= '?>';
		fwrite( $handle, $data );
		fclose( $handle );

		$arr['message'] = '成功生成配置文件';
	}

	return json_encode( $arr );
}

function hero_buildTogether()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$db = new AdminMysqlDB();
	$db->changeDriver( 'hero_together' );
	$ret = $db->operator( MYSQL_GET );
	if ( empty( $ret ) )
	{
		$arr['message'] = '查询数据库没有结果';
	}
	else
	{
		$heroJson = array();
		$heroArr  = array();
		$handle = fopen( DOCUMENT_ROOT.'inc/heroTogether.inc.php', "w" );
		
		foreach ( $ret as $v )
		{
			$temp = explode( '|', $v['hid_list'] );
			if ( !array_key_exists( $v['id'], $heroJson ) )
			{
				$heroJson[$v['id']] = array( 'hid_list' => $temp, 'attack_up' => $v['attack_up'], 'blood_up' => $v['blood_up'] );
			}

			foreach ( $temp as $v1 )
			{
				if ( !array_key_exists( $v1, $heroArr ) )
				{
					$heroArr[$v1] = array();
				}
				array_push( $heroArr[$v1], array( 'hid_list' => $temp, 'id' => $v['id'], 'attack_up' => $v['attack_up'], 'blood_up' => $v['blood_up'] ) );
			}
		}

        $data = '<?php'.sprintf( "\n%s\n", '$HERO_TOGETHER_JSON = array();' );
		foreach ( $heroJson as $k => $v )
		{
			$data .= sprintf( "%s%d%s\n", '$HERO_TOGETHER_JSON[', $k, ']=array(' );
			$data .= sprintf( "%s%s),\n", '"hid_list"=>array(', implode( ',', $v['hid_list'] ) );
			$data .= sprintf( "%s%d,\n", '"attack_up"=>', $v['attack_up'] );
			$data .= sprintf( "%s%d);\n", '"blood_up"=>', $v['blood_up'] );
		}

		$data .= sprintf( "\n%s\n", '$HERO_TOGETHER_ARR = array();' );
		foreach ( $heroArr as $k => $v )
		{
			$data .= sprintf( "%s%d%s\n", '$HERO_TOGETHER_ARR[', $k, ']=array(' );
			foreach ( $v as $v1 )
			{
				$data .= sprintf( "\t%s\n", 'array(' );
				$data .= sprintf( "\t\t%s%s),\n", '"hid_list"=>array(', implode( ',', $v1['hid_list'] ) );
				$data .= sprintf( "\t\t%s%d,\n", '"id"=>',         $v1['id'] );
				$data .= sprintf( "\t\t%s%d,\n", '"attack_up"=>',  $v1['attack_up'] );
				$data .= sprintf( "\t\t%s%d),\n", '"blood_up"=>',  $v1['blood_up'] );
			}
			$data .= ");\n";
		}
		$data .= '?>';
		fwrite( $handle, $data );
		fclose( $handle );

		$arr['message'] = '成功生成配置文件';
	}

	return json_encode( $arr );
}

function hero_buildTask()
{
	$arr = array(
		'ret' => 0,
		'message' => ''
	);

	$db = new AdminMysqlDB();
	$db->changeDriver( 'task_config' );
	$ret = $db->operator( MYSQL_GET );
	if ( empty( $ret ) )
	{
		$arr['message'] = '查询数据库没有结果';
	}
	else
	{
		$type = array();
		$id   = array();
		$handle = fopen( DOCUMENT_ROOT.'inc/task.inc.php', "w" );
		$data = '<?php'.sprintf( "\n%s\n", '$TASK_TYPE_CONFIG = array();' );
		foreach ( $ret as $v )
		{
			if ( !array_key_exists( $v['type'], $type ) )
			{
				$type[$v['type']] = array();
			}

			array_push( $type[$v['type']], array(
				                               'task_id' => $v['task_id'],
				                               'level'   => $v['level'],
				                               'complete_num' => $v['complete_num'],
				                               'add_exp' => $v['add_exp'],
				                               'add_money' => $v['add_money'],
				                               'add_wupin1' => $v['add_wupin1'],
				                               'add_num1'   => $v['add_num1'],
				                               'add_wupin2' => $v['add_wupin2'],
				                               'add_num2'   => $v['add_num2'],
				                               'shuoming'   => $v['shuoming'],
				                               'title'      => $v['title']
				                           )
			);

			if ( !array_key_exists( $v['task_id'], $id ) )
			{
				$id[$v['task_id']] = array(
					'type'         => $v['type'],
					'level'        => $v['level'],
					'complete_num' => $v['complete_num'],
					'add_exp'      => $v['add_exp'],
					'add_money'    => $v['add_money'],
					'add_wupin1'   => $v['add_wupin1'],
					'add_num1'     => $v['add_num1'],
					'add_wupin2'   => $v['add_wupin2'],
					'add_num2'     => $v['add_num2'],
					'shuoming'     => $v['shuoming'],
					'title'        => $v['title']
				);
			}
		}

		foreach ( $type as $k => $v )
		{
			$data .= sprintf( "%s%d%s\n", '$TASK_TYPE_CONFIG[', $k, ']=array(' );
			foreach ( $v as $v1 )
			{
				$data .= sprintf( "\t%s\n", 'array(' );
				$data .= sprintf( "\t\t%s%d,\n", '"task_id"=>',      $v1['task_id'] );
				$data .= sprintf( "\t\t%s%d,\n", '"level"=>',        $v1['level'] );
				$data .= sprintf( "\t\t%s%d,\n", '"complete_num"=>', $v1['complete_num'] );
				$data .= sprintf( "\t\t%s%d,\n", '"add_exp"=>',      $v1['add_exp'] );
				$data .= sprintf( "\t\t%s%d,\n", '"add_money"=>',    $v1['add_money'] );
				$data .= sprintf( "\t\t%s%d,\n", '"add_wupin1"=>',   $v1['add_wupin1'] );
				$data .= sprintf( "\t\t%s%d,\n", '"add_num1"=>',     $v1['add_num1'] );
				$data .= sprintf( "\t\t%s%d,\n", '"add_wupin2"=>',   $v1['add_wupin2'] );
				$data .= sprintf( "\t\t%s%d,\n", '"add_num2"=>',     $v1['add_num2'] );
				$data .= sprintf( "\t\t%s\"%s\",\n", '"shuoming"=>', $v1['shuoming'] );
				$data .= sprintf( "\t\t%s\"%s\"),\n", '"title"=>',   $v1['title'] );
			}
			$data .= ");\n";
		}

        $data .= sprintf( "\n%s\n", '$TASK_ID_CONFIG=array();' );
		foreach ( $id as $task_id => $v )
		{
			$data .= sprintf( "%s%d%s\n", '$TASK_ID_CONFIG[', $task_id, ']=array(' );
			$data .= sprintf( "%s%d,\n", '"type"=>',         $v['type'] );
			$data .= sprintf( "%s%d,\n", '"level"=>',        $v['level'] );
			$data .= sprintf( "%s%d,\n", '"complete_num"=>', $v['complete_num'] );
			$data .= sprintf( "%s%d,\n", '"add_exp"=>',    $v['add_exp'] );
			$data .= sprintf( "%s%d,\n", '"add_money"=>',  $v['add_money'] );
			$data .= sprintf( "%s%d,\n", '"add_wupin1"=>', $v['add_wupin1'] );
			$data .= sprintf( "%s%d,\n", '"add_num1"=>',   $v['add_num1'] );
			$data .= sprintf( "%s%d,\n", '"add_wupin2"=>', $v['add_wupin2'] );
			$data .= sprintf( "%s%d,\n", '"add_num2"=>',  $v['add_num2'] );
			$data .= sprintf( "%s\"%s\",\n", '"shuoming"=>',  $v['shuoming'] );
			$data .= sprintf( "%s\"%s\");\n", '"title"=>',  $v['title'] );
		}
		$data .= '?>';
		fwrite( $handle, $data );
		fclose( $handle );

		$handle = fopen( DOCUMENT_ROOT.'inc/task.json', "w" );
		fwrite( $handle, json_encode( $id ) );
		fclose( $handle );
		$arr['message'] = '成功生成配置文件';
	}

	return json_encode( $arr );
}
?>