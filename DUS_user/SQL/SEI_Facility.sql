-- phpMyAdmin SQL Dump
-- version 4.0.10.17
-- https://www.phpmyadmin.net
--
-- 主机: mysql.dur.ac.uk
-- 生成日期: 2019-05-08 17:12:06
-- 服务器版本: 10.1.19-MariaDB
-- PHP 版本: 5.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `Xvfjs52_...`
--

-- --------------------------------------------------------

--
-- 表的结构 `SEI_Facility`
--

CREATE TABLE IF NOT EXISTS `SEI_Facility` (
  `F_ID` int(11) NOT NULL,
  `name` text COLLATE utf8_bin NOT NULL,
  `capability` smallint(6) DEFAULT NULL,
  `open` time NOT NULL,
  `close` time NOT NULL,
  `price` int(11) DEFAULT NULL,
  `img` text COLLATE utf8_bin NOT NULL,
  `info` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`F_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
