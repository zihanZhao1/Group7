-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2019-05-17 13:49:20
-- 服务器版本： 10.1.39-MariaDB
-- PHP 版本： 7.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `SE`
--

-- --------------------------------------------------------

--
-- 表的结构 `SEI_User`
--

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
(13, 'emma', '873467017@qq.com', '$2y$10$Ae9wV.9PsT4dvt1vD7BnL.eqnxTbiVCF4ye45UWMcqLopuVVlVdVm', 1, '', '2019-05-14 00:23:22', '7482377563', '');

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

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
