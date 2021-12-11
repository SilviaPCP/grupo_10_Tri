-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: tstoredb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_user`
--

DROP TABLE IF EXISTS `category_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_user` (
  `category_user_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`category_user_id`),
  KEY `user_id_fk` (`user_id`),
  KEY `category_id_fk` (`category_id`),
  CONSTRAINT `category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_user`
--

LOCK TABLES `category_user` WRITE;
/*!40000 ALTER TABLE `category_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_date` date NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `product_id_fk` (`product_id`),
  KEY `user_id_fk2` (`user_id`),
  CONSTRAINT `product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `user_id_fk2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` char(50) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `color` varchar(100) NOT NULL,
  `size` varchar(50) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (5,'Monitor',5000,20,'triatlon','Monitorea tu entrenamiento','Negro','UNITALLA','destacado1.jpg'),(6,'Bici Aerium C:68 SL Low',76000,50,'bike','Probablemente no hay una bicicleta más rápida en el circo de triatlón que el Aerium C:68 SL. Responsables de tanta velocidad y alto rendimiento son su innovadora aerodinámica y la cuidadosa selección de componentes de alta gama.   ','AZUL','MED','image-1639188729309.webp'),(7,'Short impermeable',250,1,'swim','SHORT LIGERO ','NEGRO','M','destacado4.jpg'),(8,'BICI PARA TRI',150000,10,'bike','BICI PARA TRIALTON        ','NEGRO','UNI','image-1639188192795.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` char(50) NOT NULL,
  `last_name` char(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` char(10) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'SILVIA','PEREZ','scpc99@lim.com','1234','F','2021-11-21','2021-11-21','image-1635246972170.jpg','1971-07-16'),(2,'ANTONIO','OROPEZA','antonio@gmail','1234','H','2021-11-21','2021-11-21','image-1635646482832.jpg','1990-07-16'),(3,'LARISA','PEREZ','larisa@limvet.com.mx','$2a$10$DZrCfHj5XF3sQLAEE59SzuNziNpRdRRrDgE9rkm5Kz3PlF6gxlJC6','femenino','2021-12-10','2021-12-10','image-1639141883429.jpg','2005-09-28'),(4,'LEO','PEREZ','leo@limvet.com.mx','$2a$10$Hv/9rXbJt0eEGCsCLX7vTe5wgilgss49dUADi3KIaOY6HWB.qRglq','masculino','2021-12-10','2021-12-10','image-1639142309353.jpg','2003-06-19'),(5,'JULIO','LIMON','julio@limvet.com.mx','$2a$10$KHLMyxlEQNM9VYEG3AfwceiEDhHo.t6kUZCc/5bJ1nnOtw2Eql/e6','masculino','2021-12-10','2021-12-10','default-image.png','1067-05-03'),(6,'SILVIA','PEREZ','silvia@limvet.com.mx','$2a$10$uulitQ7Zkd3DH.B.VFvaouWuOVpW4GeI/Fnejw50dQJy.YoRydn0.','sinSelecci','2021-12-11','2021-12-11','image-1639191985787.jpg','1971-07-16');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tstoredb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-10 21:41:02
