-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-10-23 04:19:56
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
-- 表的结构 `t_hero_quality`
--

CREATE TABLE IF NOT EXISTS `t_hero_quality` (
  `hid` int(11) NOT NULL,
  `old_qua` int(11) NOT NULL,
  `new_qua` int(11) NOT NULL,
  `shuoming` varchar(64) NOT NULL,
  `blood_up` float NOT NULL,
  `attack_up` float NOT NULL,
  `cross_up` float NOT NULL,
  `hujia_up` float NOT NULL,
  `mokang_up` float NOT NULL,
  `cailiao_id1` int(11) NOT NULL,
  `cailiao_num1` int(11) NOT NULL,
  `cailiao_id2` int(11) NOT NULL,
  `cailiao_num2` int(11) NOT NULL,
  `cailiao_id3` int(11) NOT NULL,
  `cailiao_num3` int(11) NOT NULL,
  `cailiao_id4` int(11) NOT NULL,
  `cailiao_num4` int(11) NOT NULL,
  `cailiao_id5` int(11) NOT NULL,
  `cailiao_num5` int(11) NOT NULL,
  `suipian_id1` int(11) NOT NULL,
  `suipian_num1` int(11) NOT NULL,
  `suipian_id2` int(11) NOT NULL,
  `suipian_num2` int(11) NOT NULL,
  `suipian_id3` int(11) NOT NULL,
  `suipian_num3` int(11) NOT NULL,
  `suipian_id4` int(11) NOT NULL,
  `suipian_num4` int(11) NOT NULL,
  `suipian_id5` int(11) NOT NULL,
  `suipian_num5` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 转存表中的数据 `t_hero_quality`
--

INSERT INTO `t_hero_quality` (`hid`, `old_qua`, `new_qua`, `shuoming`, `blood_up`, `attack_up`, `cross_up`, `hujia_up`, `mokang_up`, `cailiao_id1`, `cailiao_num1`, `cailiao_id2`, `cailiao_num2`, `cailiao_id3`, `cailiao_num3`, `cailiao_id4`, `cailiao_num4`, `cailiao_id5`, `cailiao_num5`, `suipian_id1`, `suipian_num1`, `suipian_id2`, `suipian_num2`, `suipian_id3`, `suipian_num3`, `suipian_id4`, `suipian_num4`, `suipian_id5`, `suipian_num5`) VALUES
(1001, 10, 20, 'huoqiang lv', 1.09, 1.2, 0, 0, 0, 20011, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 20, 21, 'lv+1', 0, 0, 1.15, 0, 1.27, 20011, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 21, 22, 'lv+2', 0, 0, 1.21, 1.15, 0, 20011, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 22, 30, 'lan', 0, 0, 0, 1.5, 1.3, 20012, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 30, 31, 'lan+1', 1.25, 1.12, 0, 0, 0, 20011, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 31, 32, 'lan+2', 0, 1.2, 1.17, 0, 0, 20011, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 32, 33, 'lan+3', 0, 0, 1.2, 0, 1.34, 20011, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 33, 40, 'zi', 1.28, 0, 0, 1.35, 0, 20011, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 40, 41, 'zi+1', 1.2, 1.25, 0, 0, 0, 20011, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 41, 42, 'zi+2', 0, 0, 1.34, 1.25, 0, 20011, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 42, 43, 'zi+3', 0, 1.22, 1.23, 0, 0, 20011, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 43, 44, 'zi+4', 1.25, 0, 0, 0, 1.4, 20011, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(1001, 44, 50, 'jin', 0, 0, 1.34, 1.4, 0, 20011, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_hero_quality`
--
ALTER TABLE `t_hero_quality`
  ADD PRIMARY KEY (`hid`,`old_qua`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
