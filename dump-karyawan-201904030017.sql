-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: karyawan
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `adonis_schema` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (6,'1503248427885_user',1,'2019-03-25 15:48:48'),(7,'1503248427886_token',1,'2019-03-25 15:48:50'),(8,'1553406678072_perusahaan_schema',1,'2019-03-25 15:48:50'),(9,'1553411166498_kepegawaian_schema',1,'2019-03-25 15:48:51'),(10,'1553474933732_pertemanan_schema',1,'2019-03-25 15:48:52');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kepegawaians`
--

DROP TABLE IF EXISTS `kepegawaians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `kepegawaians` (
  `tdp` int(10) unsigned DEFAULT NULL,
  `ktp` int(10) unsigned DEFAULT NULL,
  `status` enum('sedang','telah') DEFAULT 'sedang',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  KEY `kepegawaians_tdp_foreign` (`tdp`),
  KEY `kepegawaians_ktp_foreign` (`ktp`),
  CONSTRAINT `kepegawaians_ktp_foreign` FOREIGN KEY (`ktp`) REFERENCES `users` (`ktp`),
  CONSTRAINT `kepegawaians_tdp_foreign` FOREIGN KEY (`tdp`) REFERENCES `perusahaans` (`tdp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kepegawaians`
--

LOCK TABLES `kepegawaians` WRITE;
/*!40000 ALTER TABLE `kepegawaians` DISABLE KEYS */;
INSERT INTO `kepegawaians` VALUES (11,2,'sedang','2019-03-25 22:56:34','2019-03-25 22:56:34'),(11,2,'sedang','2019-03-25 22:56:51','2019-03-25 22:56:51'),(11,1,'sedang','2019-03-26 08:31:43','2019-03-26 08:31:43'),(11,2,'telah','2019-03-26 23:40:07','2019-03-26 23:40:07');
/*!40000 ALTER TABLE `kepegawaians` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pertemanans`
--

DROP TABLE IF EXISTS `pertemanans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `pertemanans` (
  `ktp_user` int(10) unsigned NOT NULL,
  `ktp_teman` int(10) unsigned NOT NULL,
  `status` varchar(255) DEFAULT 'menunggu',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  KEY `pertemanans_ktp_user_foreign` (`ktp_user`),
  KEY `pertemanans_ktp_teman_foreign` (`ktp_teman`),
  CONSTRAINT `pertemanans_ktp_teman_foreign` FOREIGN KEY (`ktp_teman`) REFERENCES `users` (`ktp`),
  CONSTRAINT `pertemanans_ktp_user_foreign` FOREIGN KEY (`ktp_user`) REFERENCES `users` (`ktp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pertemanans`
--

LOCK TABLES `pertemanans` WRITE;
/*!40000 ALTER TABLE `pertemanans` DISABLE KEYS */;
INSERT INTO `pertemanans` VALUES (4,1,'pernah bekerja sama','2019-03-25 22:50:34','2019-03-26 13:15:12'),(1,4,'teman kantor','2019-03-25 22:52:05','2019-03-26 09:06:08'),(4,2,'teman kantor','2019-03-26 08:49:10','2019-03-26 09:06:08'),(2,4,'teman kantor','2019-03-26 08:51:01','2019-03-26 09:06:08'),(2,4,'teman kantor','2019-03-26 08:51:01','2019-03-26 09:06:08'),(3,2,'pernah bekerja sama','2019-03-26 16:12:48','2019-03-26 16:21:38'),(2,3,'pernah bekerja sama','2019-03-26 16:12:48','2019-03-26 16:21:38'),(3,1,'pernah bekerja sama','2019-03-26 16:12:48','2019-03-26 16:21:38'),(1,3,'pernah bekerja sama','2019-03-26 16:12:48','2019-03-26 16:21:38'),(2,1,'pernah bekerja sama','2019-03-26 23:40:07','2019-03-26 23:40:07'),(1,2,'pernah bekerja sama','2019-03-26 23:40:07','2019-03-26 23:40:07'),(5,2,'pernah bekerja sama','2019-04-02 20:50:43','2019-04-03 00:05:07'),(2,5,'pernah bekerja sama','2019-04-02 20:50:44','2019-04-03 00:05:07'),(2,5,'pernah bekerja sama','2019-04-02 20:50:44','2019-04-03 00:05:07'),(5,1,'pernah bekerja sama','2019-04-02 20:50:44','2019-04-03 00:05:07'),(1,5,'pernah bekerja sama','2019-04-02 20:50:44','2019-04-03 00:05:07'),(7,8,'teman','2019-04-02 23:14:55','2019-04-02 23:29:11');
/*!40000 ALTER TABLE `pertemanans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perusahaans`
--

DROP TABLE IF EXISTS `perusahaans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `perusahaans` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tdp` int(10) unsigned NOT NULL,
  `nama` varchar(255) NOT NULL,
  `pemilik` int(10) unsigned DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `perusahaans_tdp_unique` (`tdp`),
  KEY `perusahaans_pemilik_foreign` (`pemilik`),
  CONSTRAINT `perusahaans_pemilik_foreign` FOREIGN KEY (`pemilik`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perusahaans`
--

LOCK TABLES `perusahaans` WRITE;
/*!40000 ALTER TABLE `perusahaans` DISABLE KEYS */;
INSERT INTO `perusahaans` VALUES (1,11,'alfamart',1,'2019-03-25 22:55:31','2019-03-25 22:55:31'),(2,22,'indomaret',1,'2019-03-25 22:55:41','2019-03-25 22:55:41');
/*!40000 ALTER TABLE `perusahaans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_token_unique` (`token`),
  KEY `tokens_user_id_foreign` (`user_id`),
  KEY `tokens_token_index` (`token`),
  CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ktp` int(10) unsigned NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `username` varchar(80) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_ktp_unique` (`ktp`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11245 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'angling1','zainuddin1','1','user1@gmail.com','$2a$10$l1FpRDnEHxeyXcFbbwWxg.1DAxYmNO.uBD3pRXx2yzsTUvK8wfDne','2019-03-25 22:49:34','2019-03-25 22:49:34'),(2,2,'angling2','zainuddin2','2','user2@gmail.com','$2a$10$zlasuVnC7R1a8yUPkz22muweH60pGjQnl8GQdWHiVxSBFqbdUS5Bu','2019-03-25 22:49:49','2019-03-25 22:49:49'),(3,3,'angling3','zainuddin3','3','user3@gmail.com','$2a$10$Bq2n5vNrFR6e1de5Zz0cG.A1CrvxDiHzOhYthNjIqnlBtSXTkFanK','2019-03-25 22:49:59','2019-03-25 22:49:59'),(4,4,'angling4','zainuddin3','4','user4@gmail.com','$2a$10$vNzODhIxL1K2hs.5jJykKuKYRawRg/BRVGjC0SJ/eFBfy5.1czyfq','2019-03-25 22:50:08','2019-03-25 22:50:08'),(5,5,'angling5','zainuddin3','5','user5@gmail.com','$2a$10$Z7FeNbJ6xqBHMsIp.js8rOPfgRjtX4Sz0P0JEi6eG0F.6j7KKQsZa','2019-03-25 22:54:34','2019-03-25 22:54:34'),(6,6,'angling6','zainuddin3','6','user6@gmail.com','$2a$10$/5bHY3RnV9DbksxyBAZ9yOp88cchGQ3hdIyXLz74u6rIH7FWQTs3a','2019-03-25 22:54:44','2019-03-25 22:54:44'),(7,7,'angling7','zainuddin3','7','user7@gmail.com','$2a$10$vWS39Wq33KiPHLhhgu05aOr/Va9KzBwNaQFtPQBKVvc/QMWRd6ckK','2019-03-25 22:54:55','2019-03-25 22:54:55'),(8,8,'angling8','zainuddin3','8','user8@gmail.com','$2a$10$UvAiRNCsHpmiAgYb3oD4lu/C/fEY9nQgExFXyYsm6zcZN2gryVmqu','2019-03-25 22:55:03','2019-03-25 22:55:03'),(1111,111,'angling1','zainuddin3','1111','user111@gmail.com','$2a$10$ODtQWmgw2BVmWz6pFZ7JJOodnZyUF9e/FB2bwK8Ug1QCQ7N33BTUK','2019-04-02 07:27:29','2019-04-02 07:27:29'),(11111,1111,'angling1','zainuddin3','11111','user1111@gmail.com','$2a$10$Rmq/A.LhwbOILJDcpdg3xeolo7JYFpwkXWBApVXuuvR3QsXy78LsC','2019-04-02 07:30:25','2019-04-02 07:30:25'),(11112,991,'angling991','zainuddin3','991','user991@gmail.com','$2a$10$KL2GhjxGq88C56PCrOAUB.ZxnM2fJ7HxIWm4BSa8p6PzNGKd6xRH.','2019-04-02 07:45:55','2019-04-02 07:45:55'),(11131,9912,'angling9912','zainuddin3','9912','user9912@gmail.com','$2a$10$eiyiRJ6Qcw0QnIBPhKq.huLB6uOCnvYk0ClbAf09U4/MzfNHApPE6','2019-04-02 08:15:35','2019-04-02 08:15:35'),(11133,99121,'angling9912','zainuddin3','99121','user99121@gmail.com','$2a$10$w9Gy/B41E2tgDgWbuTwqKu07fIyO2J1IWMUemkOOyFIPufOOdSxN2','2019-04-02 08:16:21','2019-04-02 08:16:21'),(11135,991212,'angling9912','zainuddin3','991212','user991212@gmail.com','$2a$10$lWOs/mOHlmiiLskIRxwzY.7mCqBZ4LwRUMyHzqnCmg16eGl8sHn3.','2019-04-02 08:18:28','2019-04-02 08:18:28'),(11137,9912123,'angling9912','zainuddin3','9912123','user9912123@gmail.com','$2a$10$QIzj3Y4pscmcAyGL6ysVJOzGUpER0DkdwjzpzClFfEXyvuaY43VVW','2019-04-02 08:19:30','2019-04-02 08:19:30'),(11138,99121234,'angling9912','zainuddin3','99121234','user99121234@gmail.com','$2a$10$Q33RmjTotSn/D10UXOiUte0nxvzNoJRwOzIzDcCA3kuMamIzDTmJy','2019-04-02 08:20:04','2019-04-02 08:20:04'),(11139,991212345,'angling9912','zainuddin3','991212354','user991212345@gmail.com','$2a$10$pgAWLL.Y0kNbMYzingKZLOJ4JBMKhsoDg5a9TNhuVh60SXrlRBY4i','2019-04-02 08:31:32','2019-04-02 08:31:32'),(11140,71,'angling9912','zainuddin3','9912123545','user9912123545@gmail.com','$2a$10$4Un1nO9azAXlusqXRQrrJu2HjTpLLnvop6QmJ/ehib4vEACwxIGwS','2019-04-02 08:33:02','2019-04-02 08:33:02'),(11142,711,'angling9912','zainuddin3','99121235451','user99121235451@gmail.com','$2a$10$66P9VPJhgsW5Fp2mZq2JP.Ue76vy4PVtI1SVk8QNS8ih31CciIdI.','2019-04-02 08:33:43','2019-04-02 08:33:43'),(11143,7112,'angling9912','zainuddin3','991212354512','user991212354512@gmail.com','$2a$10$9auqHvQID5N02YTMF6WQHelK9Yl07sha9L4qiP.AoNIilNjzzRIjm','2019-04-02 08:35:17','2019-04-02 08:35:17'),(11162,33,'james','bond','james_bond','jamesbond@gmail.com','$2a$10$bBdcQle/wwpTxH47JLKTbuDAZ1RJX6./elAY/BUMPFBw2UHoBvNOG','2019-04-02 14:51:11','2019-04-02 14:51:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'karyawan'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-03  0:17:37
