<?php
//登录和金钱接口错误码
define( 'NOT_LOGIN',           100 );
define( 'NOT_ENOUGH_COIN',     -101 );
define( 'NOT_ENOUGH_DIAMOND',  -102 );
define( 'NOT_ENOUGH_MANUAL',   -103 );
define( 'NO_USER_MONEY',       -104 );

//背包消耗品接口错误码
define( 'NO_MEDICINE_ID',      200 );
define( 'NO_MEDICINE_NUM',     201 );
define( 'NOT_HID_FORMAT',      202 );
define( 'EMPTY_PACKAGE',       203 );
define( 'NOT_ENOUGH_MEDICINE', 204 );
define( 'SUB_MEDICINE_ERROR',  205 );
define( 'ADD_EXP_ERROR',       206 );
define( 'HERO_TOP_EXP',        207 );

//背包英雄碎片接口错误
define( 'HERO_FRAGMENT_HID_ERROR', 301 );
define( 'HERO_EXISTED',            302 );
define( 'NO_HERO_FRAGMENT',        303 );
define( 'NO_HERO_CONF',            304 );
define( 'NOT_ENOUGH_FRAGMENT',     305 );
define( 'SUB_FRAGMENT_ERROR',      306 );
define( 'SUMMON_HERO_ERROR',       307 );

//酒馆接口错误
define( 'PUB_NUMBER_ERROR',        401 );
define( 'PUB_CURRENCY_ERROR',      402 );
define( 'PUB_NOT_ENOUGH_COIN',     403 );
define( 'PUB_NOT_ENOUGH_DIAMOND',  404 );
define( 'PUB_MONEY_ERROR',         405 );

//上阵英雄接口错误
define( 'NO_ALIVE_HERO',           600 );
define( 'ALIVE_HID_ERROR',         601 );

//推图接口错误
define( 'NO_CHAPTER',              700 );
define( 'NO_SECTION',              701 );
define( 'NO_MAP_CONF',             702 );
define( 'NO_CHALLENGE',            703 );
define( 'NO_SWEEP_MAP',            704 );

//邮箱接口错误
define( 'NO_MAIL_ID',              800 );
define( 'NO_MAIL_CONF',            801 );
define( 'NO_MAIL_EXISTSED',        802 );
define( 'MAIL_HASBEEN_READ',       803 );
define( 'DEL_MAIL_ERROR',          804 );
define( 'MAIL_REWARD_ERROR',       805 );

//商城接口错误
define( 'NO_MALL_ID',              900 );
define( 'NO_MALL_LIST',            901 );
define( 'NO_MALL_ID_EXISTSED',     902 );
define( 'ID_HASBEEN_PAID',         903 );
define( 'MALL_MONEY_ERROR',        904 );
define( 'UNKNOW_PAY_TYPE',         905 );

//爬塔接口错误
define( 'NO_TOWER_ID',            1000 );
define( 'NO_TOWER_INFO',          1001 );
define( 'TOWER_PASS',             1002 );
define( 'TOWER_NOT_PASS',         1003 );
?>