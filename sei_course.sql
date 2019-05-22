-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2019-05-22 22:59:57
-- 服务器版本： 5.7.24
-- PHP 版本： 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `xsei`
--

-- --------------------------------------------------------

--
-- 表的结构 `sei_course`
--

DROP TABLE IF EXISTS `sei_course`;
CREATE TABLE IF NOT EXISTS `sei_course` (
  `C_ID` int(11) NOT NULL AUTO_INCREMENT,
  `F_ID` int(11) NOT NULL,
  `name` text COLLATE utf8_bin NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `week` int(11) NOT NULL,
  PRIMARY KEY (`C_ID`),
  KEY `F_ID` (`F_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 限制导出的表
--

--
-- 限制表 `sei_course`
--
ALTER TABLE `sei_course`
  ADD CONSTRAINT `sei_course_ibfk_1` FOREIGN KEY (`F_ID`) REFERENCES `sei_facility` (`F_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
