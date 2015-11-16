<?php
$driver = array();
$driver['mtkey'] = array(
	'memHost' => '127.0.0.1',
	'memPort' => 11213,
    'dbHost'  => '',
    'dbPort'  => 0,
    'dbName'  => '',
    'tbName'  => '',
	'user'    => '',
	'passwd'  => '',
	'key'     => 'uid',
    'deploy'  => 0
);

$driver['towerList'] = array(
	'memHost' => '127.0.0.1',
	'memPort' => 11214,
    'dbHost'  => '',
    'dbPort'  => 0,
    'dbName'  => '',
    'tbName'  => '',
	'user'    => '',
	'passwd'  => '',
	'key'     => 'uid',
    'deploy'  => 0
);

$driver['towerRank'] = array(
	'memHost' => '127.0.0.1',
	'memPort' => 11215,
    'dbHost'  => '',
    'dbPort'  => 0,
    'dbName'  => '',
    'tbName'  => '',
	'user'    => '',
	'passwd'  => '',
	'key'     => 'uid',
    'deploy'  => 0
);

$driver['account'] = array(
	'memHost' => '127.0.0.1',
	'memPort' => 11211,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'db_common',
    'tbName'  => 't_account',
	'user'    => DB_USER_NAME,
	'passwd'  => DB_PASSWD,
	'key'     => 'crc',
    'deploy'  => 0,      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
    'word'    => array(
    	'crc'     => 0,
    	'siteuid' => 0,
    	'uid'     => 0,
    	'plat'    => 0,
    	'time'    => 0
    )
);

$driver['user_info'] = array(
	'memHost' => '127.0.0.1',
	'memPort' => 11212,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'db_common',
    'tbName'  => 't_userinfo',
	'user'    => DB_USER_NAME,
	'passwd'  => DB_PASSWD,
	'key'     => 'uid',
    'deploy'  => 0,      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
    'word'    => array(
    	'uid'     => 0,
    	'siteuid' => 0,
    	'name'    => '中国人',
    	'updateTime' => 0,
    	'mcard'   => 0,
    	'vip'     => 0,
    	'serverid' => 0,
    	'bimgurl' => '',
    	'mimgurl' => '',
    	'simgurl' => ''
    )
);

//玩家英雄列表
$driver['hero'] = array(
    'memHost' => '127.0.0.1',
    'memPort' => 11212,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'worldHero1',
    'tbName'  => 'hero',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'uid',
    'deploy'  => 0,      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
);

//玩家英雄上场数据
$driver['alive_hero'] = array(
    'memHost' => '127.0.0.1',
    'memPort' => 11212,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'worldHero1',
    'tbName'  => 'alive_hero',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'uid',
    'deploy'  => 0,      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
);

//玩家背包数据
$driver['t_package'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'worldHero1',
    'tbName'  => 't_package',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'uid',
    'deploy'  => 0      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
);

//玩家金钱表
$driver['t_money'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'worldHero1',
    'tbName'  => 't_money',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'uid',
    'deploy'  => 0      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
);

//玩家普通关卡表
$driver['t_simple_map'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'worldHero1',
    'tbName'  => 't_simple_map',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'uid',
    'deploy'  => 0      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
);

//玩家精英关卡表
$driver['t_elite_map'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'worldHero1',
    'tbName'  => 't_elite_map',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'uid',
    'deploy'  => 0      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
);

//玩家邮箱
$driver['t_mail'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'worldHero1',
    'tbName'  => 't_mail',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'uid',
    'deploy'  => 0      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
);

//任务
$driver['t_task'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'worldHero1',
    'tbName'  => 't_task',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'uid',
    'deploy'  => 0      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
);

//玩家道具商城
$driver['t_prop_mall'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'worldHero1',
    'tbName'  => 't_prop_mall',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'uid',
    'deploy'  => 0      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
);

//玩家签到
$driver['t_user_sign'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'worldHero1',
    'tbName'  => 't_user_sign',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'uid',
    'deploy'  => 0      // 0表示不分库不分表，1表示不分库分表，2表示分库不分表，3表示分库分表
);
















//管理后台英雄信息表
$driver['hero_info'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 't_heroInfo',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'hid',
    'deploy'  => 0
);

$driver['aoyi_info'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 't_aoyiinfo',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'grade',
    'deploy'  => 0
);

$driver['skill'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 't_skill',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'hid',
    'deploy'  => 0
);

$driver['duizhang'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 'c_duizhang',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'type_id',
    'deploy'  => 0
);

$driver['task_config'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 't_task_config',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'id',
    'deploy'  => 0
);

$driver['hero_quality'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 't_hero_quality',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'hid',
    'deploy'  => 0
);

$driver['hero_together'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 't_hero_together',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'hid_list',
    'deploy'  => 0
);

$driver['t_monsterInfo'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 't_monsterInfo',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'mid',
    'deploy'  => 0
);

$driver['t_simple_mapInfo'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 't_simple_mapInfo',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'chapter',
    'deploy'  => 0
);

$driver['t_elite_mapInfo'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 't_elite_mapInfo',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'chapter',
    'deploy'  => 0
);

$driver['prop_mall'] = array(
    'memHost' => '',
    'memPort' => 0,
    'dbHost'  => '127.0.0.1',
    'dbPort'  => 3306,
    'dbName'  => 'admin',
    'tbName'  => 'prop_mall',
    'user'    => DB_USER_NAME,
    'passwd'  => DB_PASSWD,
    'key'     => 'id',
    'deploy'  => 0
);
?>