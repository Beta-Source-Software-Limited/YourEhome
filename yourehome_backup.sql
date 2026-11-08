-- MySQL dump 10.13  Distrib 8.4.13, for Linux (aarch64)
--
-- Host: localhost    Database: yourehome
-- ------------------------------------------------------
-- Server version	8.4.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add agent',7,'add_agent'),(26,'Can change agent',7,'change_agent'),(27,'Can delete agent',7,'delete_agent'),(28,'Can view agent',7,'view_agent'),(29,'Can add property',8,'add_property'),(30,'Can change property',8,'change_property'),(31,'Can delete property',8,'delete_property'),(32,'Can view property',8,'view_property'),(33,'Can add inquiry',9,'add_inquiry'),(34,'Can change inquiry',9,'change_inquiry'),(35,'Can delete inquiry',9,'delete_inquiry'),(36,'Can view inquiry',9,'view_inquiry');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1000000$WW3fqCCm3mMglN01sdJQKf$sYESI+6mjoD3WGssQkPyeFWHUroRGtGjjVbJCh2a4Xk=','2026-11-08 18:24:24.056543',1,'sagar','','','engr.sagarroy@gmail.com',1,1,'2026-11-08 18:24:04.501547');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(7,'realestate','agent'),(9,'realestate','inquiry'),(8,'realestate','property'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-11-08 18:20:42.774512'),(2,'auth','0001_initial','2026-11-08 18:20:42.881949'),(3,'admin','0001_initial','2026-11-08 18:20:42.910503'),(4,'admin','0002_logentry_remove_auto_add','2026-11-08 18:20:42.920026'),(5,'admin','0003_logentry_add_action_flag_choices','2026-11-08 18:20:42.922460'),(6,'contenttypes','0002_remove_content_type_name','2026-11-08 18:20:42.946015'),(7,'auth','0002_alter_permission_name_max_length','2026-11-08 18:20:42.969591'),(8,'auth','0003_alter_user_email_max_length','2026-11-08 18:20:42.979805'),(9,'auth','0004_alter_user_username_opts','2026-11-08 18:20:42.986799'),(10,'auth','0005_alter_user_last_login_null','2026-11-08 18:20:43.015293'),(11,'auth','0006_require_contenttypes_0002','2026-11-08 18:20:43.016061'),(12,'auth','0007_alter_validators_add_error_messages','2026-11-08 18:20:43.019768'),(13,'auth','0008_alter_user_username_max_length','2026-11-08 18:20:43.041514'),(14,'auth','0009_alter_user_last_name_max_length','2026-11-08 18:20:43.058699'),(15,'auth','0010_alter_group_name_max_length','2026-11-08 18:20:43.063564'),(16,'auth','0011_update_proxy_permissions','2026-11-08 18:20:43.065881'),(17,'auth','0012_alter_user_first_name_max_length','2026-11-08 18:20:43.077030'),(18,'realestate','0001_initial','2026-11-08 18:20:43.127825'),(19,'sessions','0001_initial','2026-11-08 18:20:43.135524');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('2ndeenrmuyxp07rtqc2a8zb1kjyi3qgm','.eJxVjDkOwjAUBe_iGlmOY_84lPScIfqbSQDZUpYKcXeIlALaNzPvZQbc1nHYFp2HSczZNOb0uxHyQ8sO5I7lVi3Xss4T2V2xB13stYo-L4f7dzDiMn7rln3rsWMBkJhQckYBgtArp8ZRFHKRWvAMniil4CRg5r6L2jnNAcz7AwFBOJI:1xQ7Z2:q_Qel9luMllSOMN-3Kva68oMqyNaO9QsYdnLoZx9gy8','2026-11-22 18:24:24.058006');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_agent`
--

DROP TABLE IF EXISTS `realestate_agent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_agent` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `title` varchar(120) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(40) NOT NULL,
  `photo_url` varchar(800) NOT NULL,
  `years_experience` smallint unsigned NOT NULL,
  `biography` longtext NOT NULL,
  `display_order` smallint unsigned NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `realestate_agent_chk_1` CHECK ((`years_experience` >= 0)),
  CONSTRAINT `realestate_agent_chk_2` CHECK ((`display_order` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_agent`
--

LOCK TABLES `realestate_agent` WRITE;
/*!40000 ALTER TABLE `realestate_agent` DISABLE KEYS */;
INSERT INTO `realestate_agent` VALUES (1,'Michael Carter','Senior Real Estate Advisor','','','https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=85',10,'Michael Carter helps buyers and sellers navigate the property market with confidence.',0,1),(2,'Emma Brooks','Luxury Property Specialist','','','https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=85',8,'Emma Brooks helps buyers and sellers navigate the property market with confidence.',1,1),(3,'Daniel Reed','Investment Advisor','','','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=85',12,'Daniel Reed helps buyers and sellers navigate the property market with confidence.',2,1),(4,'Sophia Nguyen','Residential Specialist','','','https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=85',7,'Sophia Nguyen helps buyers and sellers navigate the property market with confidence.',3,1);
/*!40000 ALTER TABLE `realestate_agent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_inquiry`
--

DROP TABLE IF EXISTS `realestate_inquiry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_inquiry` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(20) NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(40) NOT NULL,
  `message` longtext NOT NULL,
  `preferred_date` date DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_resolved` tinyint(1) NOT NULL,
  `property_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `realestate_inquiry_property_id_dee64173_fk_realestat` (`property_id`),
  CONSTRAINT `realestate_inquiry_property_id_dee64173_fk_realestat` FOREIGN KEY (`property_id`) REFERENCES `realestate_property` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_inquiry`
--

LOCK TABLES `realestate_inquiry` WRITE;
/*!40000 ALTER TABLE `realestate_inquiry` DISABLE KEYS */;
/*!40000 ALTER TABLE `realestate_inquiry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realestate_property`
--

DROP TABLE IF EXISTS `realestate_property`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realestate_property` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(180) NOT NULL,
  `slug` varchar(220) NOT NULL,
  `description` longtext NOT NULL,
  `status` varchar(10) NOT NULL,
  `property_type` varchar(15) NOT NULL,
  `price` decimal(14,2) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `postal_code` varchar(30) NOT NULL,
  `bedrooms` smallint unsigned NOT NULL,
  `bathrooms` smallint unsigned NOT NULL,
  `area_sqft` int unsigned NOT NULL,
  `image_url` varchar(800) NOT NULL,
  `gallery` json NOT NULL,
  `featured` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `agent_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `re_prop_status_city_idx` (`status`,`city`),
  KEY `re_prop_price_idx` (`price`),
  KEY `realestate_property_agent_id_4bcf6845_fk_realestate_agent_id` (`agent_id`),
  CONSTRAINT `realestate_property_agent_id_4bcf6845_fk_realestate_agent_id` FOREIGN KEY (`agent_id`) REFERENCES `realestate_agent` (`id`),
  CONSTRAINT `realestate_property_chk_1` CHECK ((`bedrooms` >= 0)),
  CONSTRAINT `realestate_property_chk_2` CHECK ((`bathrooms` >= 0)),
  CONSTRAINT `realestate_property_chk_3` CHECK ((`area_sqft` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realestate_property`
--

LOCK TABLES `realestate_property` WRITE;
/*!40000 ALTER TABLE `realestate_property` DISABLE KEYS */;
INSERT INTO `realestate_property` VALUES (1,'The Hillside Residence','the-hillside-residence','Discover The Hillside Residence, a beautifully curated villa in Beverly Hills. Thoughtfully designed living spaces, an exceptional location, and modern finishes make this property a standout choice. Contact our team for more information and a private viewing.','sale','villa',2450000.00,'120 Example Avenue','Beverly Hills','CA','',4,4,3200,'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1100&q=85','[]',1,'2026-11-08 18:23:22.145800','2026-11-08 18:23:22.145816',1),(2,'Modern Farmhouse Retreat','modern-farmhouse-retreat','Discover Modern Farmhouse Retreat, a beautifully curated house in Austin. Thoughtfully designed living spaces, an exceptional location, and modern finishes make this property a standout choice. Contact our team for more information and a private viewing.','sale','house',1320000.00,'158 Example Avenue','Austin','TX','',3,2,2180,'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1100&q=85','[]',1,'2026-11-08 18:23:22.147206','2026-11-08 18:23:22.147213',2),(3,'The Skyline Penthouse','the-skyline-penthouse','Discover The Skyline Penthouse, a beautifully curated apartment in Miami. Thoughtfully designed living spaces, an exceptional location, and modern finishes make this property a standout choice. Contact our team for more information and a private viewing.','sale','apartment',890000.00,'196 Example Avenue','Miami','FL','',2,2,1450,'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1100&q=85','[]',1,'2026-11-08 18:23:22.148482','2026-11-08 18:23:22.148487',3),(4,'The Oceanview Estate','the-oceanview-estate','Discover The Oceanview Estate, a beautifully curated villa in Newport Beach. Thoughtfully designed living spaces, an exceptional location, and modern finishes make this property a standout choice. Contact our team for more information and a private viewing.','sale','villa',3750000.00,'234 Example Avenue','Newport Beach','CA','',5,5,4800,'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1100&q=85','[]',1,'2026-11-08 18:23:22.149516','2026-11-08 18:23:22.149521',4),(5,'Parkside Contemporary','parkside-contemporary','Discover Parkside Contemporary, a beautifully curated house in San Diego. Thoughtfully designed living spaces, an exceptional location, and modern finishes make this property a standout choice. Contact our team for more information and a private viewing.','sale','house',1175000.00,'272 Example Avenue','San Diego','CA','',3,3,2400,'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1100&q=85','[]',0,'2026-11-08 18:23:22.150555','2026-11-08 18:23:22.150561',1),(6,'The West End Loft','the-west-end-loft','Discover The West End Loft, a beautifully curated apartment in Los Angeles. Thoughtfully designed living spaces, an exceptional location, and modern finishes make this property a standout choice. Contact our team for more information and a private viewing.','rent','apartment',4200.00,'310 Example Avenue','Los Angeles','CA','',2,2,1350,'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1100&q=85','[]',0,'2026-11-08 18:23:22.151566','2026-11-08 18:23:22.151571',2),(7,'Lakefront Family Home','lakefront-family-home','Discover Lakefront Family Home, a beautifully curated house in Seattle. Thoughtfully designed living spaces, an exceptional location, and modern finishes make this property a standout choice. Contact our team for more information and a private viewing.','sale','house',1690000.00,'348 Example Avenue','Seattle','WA','',4,3,3150,'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1100&q=85','[]',0,'2026-11-08 18:23:22.152533','2026-11-08 18:23:22.152538',3),(8,'The Garden Apartment','the-garden-apartment','Discover The Garden Apartment, a beautifully curated apartment in Portland. Thoughtfully designed living spaces, an exceptional location, and modern finishes make this property a standout choice. Contact our team for more information and a private viewing.','rent','apartment',3100.00,'386 Example Avenue','Portland','OR','',2,2,1280,'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1100&q=85','[]',0,'2026-11-08 18:23:22.153482','2026-11-08 18:23:22.153487',4);
/*!40000 ALTER TABLE `realestate_property` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-08 20:10:29
