# ************************************************************
# Sequel Pro SQL dump
# Version 5425
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.24)
# Database: BOOKSTORE
# Generation Time: 2019-04-13 13:22:03 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table device_list
# ------------------------------------------------------------

CREATE TABLE `device_list` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL COMMENT '店铺Id',
  `client_id` int(11) DEFAULT NULL COMMENT '设备Id',
  `comment` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '名称',
  `status` int(11) DEFAULT NULL,
  `connected` int(11) DEFAULT NULL COMMENT '0：初始化设备，1：连接已建立，2：端口确认完成，未建立连接',
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gmt_modify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` int(11) NOT NULL DEFAULT '0' COMMENT '0:瀑布，1，展台，地图2，pad',
  `delete` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `device_list_unique_one` (`client_id`,`store_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='设备表';



# Dump of table enterprises
# ------------------------------------------------------------

CREATE TABLE `enterprises` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `deleted` tinyint(3) unsigned DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table heart_connect
# ------------------------------------------------------------

CREATE TABLE `heart_connect` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `name` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `version` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mac_address` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='设备心跳记录表';



# Dump of table image_upload
# ------------------------------------------------------------

CREATE TABLE `image_upload` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comment` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '说明',
  `task_id` int(11) DEFAULT NULL,
  `image_url` varchar(4096) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gmt_modify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='设备管理-图片上传表';



# Dump of table stores
# ------------------------------------------------------------

CREATE TABLE `stores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `store_code` varchar(20) NOT NULL,
  `config` json DEFAULT NULL,
  `enterprise` int(10) unsigned NOT NULL,
  `addr` varchar(45) DEFAULT NULL,
  `last_modifier` int(10) unsigned DEFAULT NULL,
  `deleted` tinyint(3) unsigned DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `enterprises_idx` (`enterprise`),
  CONSTRAINT `enterprises` FOREIGN KEY (`enterprise`) REFERENCES `enterprises` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table task
# ------------------------------------------------------------

CREATE TABLE `task` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `action` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `heart_beat_time` int(11) DEFAULT NULL COMMENT '心跳时间，默认60s，可配置改变',
  `package_name` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '需要卸载应用的包名',
  `auto_shutdown_time` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `app_url` varchar(1024) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '说明',
  `gmt_modify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='任务下发表';



# Dump of table terminal_types
# ------------------------------------------------------------

CREATE TABLE `terminal_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `deleted` tinyint(3) unsigned DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table terminals
# ------------------------------------------------------------

CREATE TABLE `terminals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `config` JSON,
  `type` int(10) unsigned DEFAULT NULL,
  `store` int(10) unsigned DEFAULT NULL,
  `view_config` int(10) unsigned DEFAULT NULL,
  `last_modifier` int(10) unsigned DEFAULT NULL,
  `deleted` tinyint(3) unsigned DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `store_idx` (`store`),
  KEY `type_idx` (`type`),
  KEY `view_config` (`view_config`),
  CONSTRAINT `store` FOREIGN KEY (`store`) REFERENCES `stores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `type` FOREIGN KEY (`type`) REFERENCES `terminal_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `view_config` FOREIGN KEY (`view_config`) REFERENCES `view_configs` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_permissions
# ------------------------------------------------------------

CREATE TABLE `user_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `deleted` tinyint(3) unsigned DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table users
# ------------------------------------------------------------

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `enterprise` int(10) unsigned DEFAULT NULL,
  `store` int(10) unsigned DEFAULT NULL,
  `deleted` tinyint(3) unsigned DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `salt` varchar(10) DEFAULT NULL,
  `is_admin` tinyint(4) NOT NULL DEFAULT '0',
  `permission` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`username`),
  KEY `permission_idx` (`permission`),
  KEY `enterprise` (`enterprise`),
  KEY `user_store` (`store`),
  CONSTRAINT `enterprise` FOREIGN KEY (`enterprise`) REFERENCES `enterprises` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `permission` FOREIGN KEY (`permission`) REFERENCES `user_permissions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_store` FOREIGN KEY (`store`) REFERENCES `stores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table view_configs
# ------------------------------------------------------------

CREATE TABLE `view_configs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` int(10) unsigned DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `note` varchar(45) DEFAULT NULL,
  `store` int(10) unsigned DEFAULT NULL,
  `content` json DEFAULT NULL,
  `deleted` tinyint(3) unsigned DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `view_type` (`type`),
  KEY `view_store` (`store`),
  CONSTRAINT `view_store` FOREIGN KEY (`store`) REFERENCES `stores` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `view_type` FOREIGN KEY (`type`) REFERENCES `terminal_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


# Dump of table tracker
CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`tracker` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `act` ENUM('click', 'pv', 'expo', 'uv'),
  `value` INT UNSIGNED NULL, 
  `biz_type` ENUM('search', 'map', 'book_detail', 'normal'),
  `biz_data` VARCHAR(255) NULL,
  `terminal` INT UNSIGNED NULL,
  `date` DATE NULL,
  `deleted` TINYINT UNSIGNED NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `tracker_terminal`
    FOREIGN KEY (`terminal`)
    REFERENCES `BOOKSTORE`.`terminals` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `BOOKSTORE`.`ads` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `enterprises` int(11) unsigned DEFAULT NULL COMMENT '企业Id',
  `store` int(11) DEFAULT NULL COMMENT '店铺Id，默认为空，店铺单独创建才有',
  `store_list` varchar(4096) DEFAULT NULL COMMENT '不支持的店铺列表，默认全部支持',
  `gmt_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `gmt_modify` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `type` int(11) DEFAULT NULL COMMENT '设备类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
