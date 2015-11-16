<?php

require_once( '../inc/config.inc.php' );
require_once( '../interface/Hero.php' );
require_once( '../interface/Quality.php' );



function microtime_float()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}


$uid = 10001;


$userherolistobj = new UserHeroList($uid);
$herolist = $userherolistobj->getUserHeroInfoList();
pr($herolist);


// $h1   = $userherolistobj->getAliveHeroDetail();
// $fight_new_obj = new IFightNew();



// $alive_hero = $userherolistobj->getAliveHeroDetail();
// $time1 = microtime_float();
// for( $i=1 ; $i<=2000 ; $i++ ) {
// 	$userherolistobj = new UserHeroList($uid);
// 	$alive_hero = $userherolistobj->getAliveHeroDetail();
// 	$userlist = $userherolistobj->getUserHeroInfoList();
// 	$userherolistobj->setOneField(1001, 'parmor_aoyi', 10, 10);
// }
// for( $i=1 ; $i<=30000 ; $i++ ) {
// 	$fight_new_obj->initDuiwu($h1  , $h1 );
// 	$fight_new_obj->testFight();
// }
// $time2 = microtime_float();
// echo $time2-$time1."<br>";

$hero = $userherolistobj->getOneHeroDetail(1001);
// pr($hero);

// $time1 = microtime_float();
$alive_hero = $userherolistobj->getAliveHeroDetail();
// pr( $alive_hero );
// $time2 = microtime_float();
// echo $time2-$time1."<br>";


$levelinfo = $userherolistobj->getHeroLevelAndExp(1001);
// pr($levelinfo);
// echo $userherolistobj->setHeroLevelAndExp(301, 1, 200, 1, 100);

$info = $userherolistobj->getOneField(1001, 'quality');
// pr($info);
// echo $userherolistobj->setOneField(301, 'quality', 20, 10);

$packobj = new Package();
$packinfo = $packobj->getPackage( 10001 );//返回数组
// pr( $packinfo );

// echo $userherolistobj->addNewHero(1003);

$simple_info = $userherolistobj->getOneHeroSimple(1004);
// pr($simple_info);

$hero_together_obj = new HeroTogether();
// $hero_together_obj -> CheckInfo();

$task_obj = new Task();
$task_list = $task_obj->getUserTaskList($uid);
// pr($task_list);
$one_task = $task_obj->getOneTask($uid, 3010010);
// pr($one_task);
$task_config = array();
$task_config['task_id'] = 3010020;
$task_config['complete_num'] = 1000;
// echo $task_obj->addNewTask($uid, $task_config);
// echo $task_obj->setOneField($uid, 3010010, 'now_num', 1, 0);
Task::ReportDoTask($uid, 3010010);

// for( $i=1 ; $i<=20000000000 ; $i++ ) {
// 	$fp = fsockopen("tcp://127.0.0.1", 8888, $errno, $errstr, 2);
// }

$fight_new_obj = new IFightNew();
$fight_new_obj->initUser(10001 , 10001);
// pr( $fight_new_obj->TwoDuiwu[1] );
$fight_new_obj->testFight();
// pr($fight_new_obj->rounds);
// pr($fight_new_obj->process);
$result = $fight_new_obj->buildFight();
// pr($result);

$skill_obj = new Skill();
$ret = $skill_obj->GetTianfuParam('chongsheng' , 51 , 'S+');
pr($ret);



?>