-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3306
-- 生成日期： 2019-05-17 11:35:16
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
-- 数据库： `XSEI`
--
CREATE DATABASE IF NOT EXISTS `XSEI` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `XSEI`;

-- --------------------------------------------------------

--
-- 表的结构 `sei_booking`
--

DROP TABLE IF EXISTS `sei_booking`;
CREATE TABLE IF NOT EXISTS `sei_booking` (
  `B_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `U_ID` int(11) NOT NULL,
  `F_ID` int(11) NOT NULL,
  `E_ID` int(11) DEFAULT NULL,
  `C_ID` int(11) DEFAULT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `count` int(11) NOT NULL,
  `Avb` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`B_ID`),
  KEY `F_ID` (`F_ID`),
  KEY `C_ID` (`C_ID`),
  KEY `E_ID` (`E_ID`),
  KEY `sei_booking_ibfk_4` (`U_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `sei_booking`
--

INSERT INTO `sei_booking` (`B_ID`, `U_ID`, `F_ID`, `E_ID`, `C_ID`, `start`, `end`, `count`, `Avb`) VALUES
(1, 101, 1123, 4231, 1, '2019-05-13 09:00:00', '2018-05-15 18:00:00', 1, 'yes'),
(2, 102, 1124, 4232, NULL, '2019-05-14 09:00:00', '2018-05-16 18:00:00', 1, 'yes'),
(3, 102342, 1125, 4233, NULL, '2019-05-15 09:00:00', '2018-05-18 12:00:00', 1, 'yes'),
(4, 103, 1123, 4231, NULL, '2019-05-13 10:00:00', '2018-05-13 13:00:00', 1, 'yes'),
(5, 102, 1124, 4232, NULL, '2019-05-14 09:00:00', '2018-05-17 14:00:00', 1, 'yes'),
(6, 102342, 1126, 4233, NULL, '2019-05-13 09:00:00', '2018-05-14 11:00:00', 1, 'yes'),
(7, 102342, 1125, NULL, 1, '2019-05-10 09:00:00', '2018-05-18 11:00:00', 1, 'yes');

-- --------------------------------------------------------

--
-- 表的结构 `sei_course`
--

DROP TABLE IF EXISTS `sei_course`;
CREATE TABLE IF NOT EXISTS `sei_course` (
  `C_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_bin NOT NULL,
  `time` text COLLATE utf8_bin NOT NULL,
  `weeks` int(11) NOT NULL,
  `start` date NOT NULL,
  PRIMARY KEY (`C_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `sei_course`
--

INSERT INTO `sei_course` (`C_ID`, `name`, `time`, `weeks`, `start`) VALUES
(1, 'Tennis Course', '09:00:00\r\n18:00:00', 6, '2019-03-01');

-- --------------------------------------------------------

--
-- 表的结构 `sei_event`
--

DROP TABLE IF EXISTS `sei_event`;
CREATE TABLE IF NOT EXISTS `sei_event` (
  `E_ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` text COLLATE utf8_bin NOT NULL,
  `url` text COLLATE utf8_bin NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `scale` int(11) NOT NULL,
  PRIMARY KEY (`E_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4234 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `sei_event`
--

INSERT INTO `sei_event` (`E_ID`, `title`, `url`, `start`, `end`, `scale`) VALUES
(4231, 'Game1', '', '2018-05-12 09:00:00', '2018-05-14 18:00:00', 15),
(4232, 'Game2', '', '2018-05-13 09:00:00', '2018-05-15 18:00:00', 20),
(4233, 'Game3', '', '2018-05-14 09:00:00', '2018-05-18 18:00:00', 25);

-- --------------------------------------------------------

--
-- 表的结构 `sei_facility`
--

DROP TABLE IF EXISTS `sei_facility`;
CREATE TABLE IF NOT EXISTS `sei_facility` (
  `F_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8_bin NOT NULL,
  `capability` smallint(6) DEFAULT NULL,
  `open` time NOT NULL,
  `close` time NOT NULL,
  `price` int(11) DEFAULT NULL,
  `img` text COLLATE utf8_bin NOT NULL,
  `info` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`F_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1127 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `sei_facility`
--

INSERT INTO `sei_facility` (`F_ID`, `name`, `capability`, `open`, `close`, `price`, `img`, `info`) VALUES
(1123, 'Squash Courts', 1, '09:00:00', '18:00:00', 18, '', ''),
(1124, 'Aerobics Room', 1, '09:00:00', '18:00:00', 10, '', ''),
(1125, 'Tennis', 1, '09:00:00', '18:00:00', 15, '', ''),
(1126, 'Athletics Track', 20, '09:00:00', '18:00:00', 15, '', '');

-- --------------------------------------------------------

--
-- 表的结构 `sei_news`
--

DROP TABLE IF EXISTS `sei_news`;
CREATE TABLE IF NOT EXISTS `sei_news` (
  `N_ID` int(11) NOT NULL AUTO_INCREMENT,
  `U_ID` int(11) NOT NULL,
  `title` text COLLATE utf8_bin NOT NULL,
  `time` datetime NOT NULL,
  `content` text COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`N_ID`),
  KEY `U_ID` (`U_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- 表的结构 `sei_user`
--

DROP TABLE IF EXISTS `sei_user`;
CREATE TABLE `SEI_User` (
  `U_ID` int(11) NOT NULL,
  `name` text COLLATE utf8_bin NOT NULL,
  `email` text COLLATE utf8_bin NOT NULL,
  `password` text COLLATE utf8_bin NOT NULL,
  `isEmailConfirmed` tinyint(4) NOT NULL,
  `token` varchar(10) COLLATE utf8_bin NOT NULL,
  `tokenExpire` datetime NOT NULL,
  `tel` text COLLATE utf8_bin NOT NULL,
  `role` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `SEI_User`
--

INSERT INTO `SEI_User` (`U_ID`, `name`, `email`, `password`, `isEmailConfirmed`, `token`, `tokenExpire`, `tel`, `role`) VALUES
(9, 'xiaowei cheng', 'chang.chen@durham.ac.uk', '$2y$10$2WF9MQwiTYQXX1FVAW16YOPMYDikGFKCpU.xMDbmN3QbyLDMM8w2O', 0, '8DlUK@7h3H', '0000-00-00 00:00:00', '1616914985', ''),
(8888, 'emma', '873467017@qq.com', '$2y$10$Ae9wV.9PsT4dvt1vD7BnL.eqnxTbiVCF4ye45UWMcqLopuVVlVdVm', 1, '', '2019-05-14 00:23:22', '7482377563', '');

--
-- 转储表的索引
--

--
-- 表的索引 `SEI_User`
--
ALTER TABLE `SEI_User`
  ADD PRIMARY KEY (`U_ID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `SEI_User`
--
ALTER TABLE `SEI_User`
  MODIFY `U_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;



--
-- 限制表 `sei_booking`
--
ALTER TABLE `sei_booking`
  ADD CONSTRAINT `sei_booking_ibfk_1` FOREIGN KEY (`F_ID`) REFERENCES `sei_facility` (`F_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sei_booking_ibfk_2` FOREIGN KEY (`C_ID`) REFERENCES `sei_course` (`C_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sei_booking_ibfk_3` FOREIGN KEY (`E_ID`) REFERENCES `sei_event` (`E_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sei_booking_ibfk_4` FOREIGN KEY (`U_ID`) REFERENCES `sei_user` (`U_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- 限制表 `sei_news`
--
ALTER TABLE `sei_news`
  ADD CONSTRAINT `sei_news_ibfk_1` FOREIGN KEY (`U_ID`) REFERENCES `sei_user` (`U_ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
