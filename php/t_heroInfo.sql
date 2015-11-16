-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-10-23 08:01:03
-- 服务器版本： 10.0.21-MariaDB-log
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin`
--

-- --------------------------------------------------------

--
-- 表的结构 `t_heroInfo`
--

CREATE TABLE IF NOT EXISTS `t_heroInfo` (
  `hid` int(10) unsigned NOT NULL,
  `name_zh` varchar(64) CHARACTER SET utf8 NOT NULL,
  `name_tw` varchar(64) CHARACTER SET utf8 NOT NULL,
  `name_en` varchar(32) CHARACTER SET utf8 NOT NULL,
  `name_th` varchar(128) CHARACTER SET utf8 NOT NULL,
  `name_id` varchar(64) CHARACTER SET utf8 NOT NULL,
  `name_vn` varchar(64) CHARACTER SET utf8 NOT NULL,
  `init_blood` int(10) unsigned NOT NULL,
  `init_parmor_m` float unsigned NOT NULL,
  `init_marmor_m` float unsigned NOT NULL,
  `init_attack` float unsigned NOT NULL,
  `init_cross` float unsigned NOT NULL,
  `grade` varchar(8) NOT NULL COMMENT '英雄品质',
  `fragment` int(10) unsigned NOT NULL,
  `attack_t` tinyint(3) unsigned NOT NULL,
  `spe_skill` tinyint(3) unsigned NOT NULL,
  `status` tinyint(3) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='角色配置表';

--
-- 转存表中的数据 `t_heroInfo`
--

INSERT INTO `t_heroInfo` (`hid`, `name_zh`, `name_tw`, `name_en`, `name_th`, `name_id`, `name_vn`, `init_blood`, `init_parmor_m`, `init_marmor_m`, `init_attack`, `init_cross`, `grade`, `fragment`, `attack_t`, `spe_skill`, `status`) VALUES
(1001, '火枪手', '火槍手', 'Hackbuteer', '', '', '', 411, 3.4, 2.5, 40, 3, 'B', 30, 1, 11, 1),
(1002, '日本武士', '日本武士', 'Samurai', '', '', '', 516, 2.5, 2.1, 51, 2.4, 'B', 30, 1, 1, 1),
(1003, '法师', '法師', 'Master', '', '', '', 387, 2.5, 3.7, 67, 1.8, 'B', 30, 2, 1, 1),
(1004, '气功师', '氣功師', 'Qigong', '', '', '', 539, 2.1, 2.9, 43, 2.5, 'B', 30, 2, 1, 1),
(1005, '希腊巨人', '希臘巨人', 'Giants', '', '', '', 615, 2.5, 1.9, 51, 2.1, 'B', 30, 1, 1, 1),
(1006, '修女', '修女', 'Nun', '', '', '', 457, 2.8, 2.3, 54, 2.3, 'B', 30, 3, 4, 1),
(2001, '日本忍者', '忍者', 'Ninja', '', '', '', 200, 1.2, 1.3, 1.4, 1.5, 'A', 30, 1, 1, 1),
(2002, '赏金猎人', '賞金獵人', 'Bounty Hunter', '', '', '', 200, 1.2, 1.3, 1.4, 1.5, 'A', 30, 1, 1, 1),
(2003, '魔导师', '魔導師', 'Magic Tutor', '', '', '', 200, 1.2, 1.3, 1.4, 1.5, 'A', 30, 2, 1, 1),
(2004, '圣殿骑士', '聖堂武士', 'Templar', '', '', '', 200, 1.2, 1.3, 1.4, 1.5, 'A', 30, 2, 1, 1),
(4001, '死神', '死神', 'Death', '', '', '', 80, 4.5, 3, 87, 1.39, 'S', 30, 1, 12, 1),
(4002, '维京人', '維京人', 'Vikings', '', '', '', 368, 2.16, 1.1, 32, 1.9, 'S', 30, 1, 4, 1),
(6001, '骷髅王', '骷髏王', 'Skeleton King', '', '', '', 80, 4.5, 3, 87, 1.39, 'SS', 30, 1, 12, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_heroInfo`
--
ALTER TABLE `t_heroInfo`
  ADD UNIQUE KEY `hid` (`hid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
