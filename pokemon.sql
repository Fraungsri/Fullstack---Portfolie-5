-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: pokemon
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `pokemon`
--

DROP TABLE IF EXISTS `pokemon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon` (
  `pokedex_number` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `speed` int DEFAULT NULL,
  `special_defence` int DEFAULT NULL,
  `special_attack` int DEFAULT NULL,
  `defence` int DEFAULT NULL,
  `attack` int DEFAULT NULL,
  `hp` int DEFAULT NULL,
  `primary_type` varchar(45) DEFAULT NULL,
  `secondary_type` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon`
--

LOCK TABLES `pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon` DISABLE KEYS */;
INSERT INTO `pokemon` VALUES (1,'Bulbasaur',45,65,65,49,49,55,'Grass','Poison'),(2,'Ivysaur',60,80,80,63,62,60,'Grass','Poison'),(3,'Venusaur',80,100,100,83,82,80,'Grass','Poison'),(4,'Charmander',65,50,60,43,52,39,'Fire','null'),(5,'Charmeleon',80,65,80,58,64,58,'Fire','null'),(6,'Charizard',100,85,109,78,84,78,'Fire','Flying'),(7,'Squirtle',43,64,50,65,48,44,'Water','null'),(8,'Wartortle',58,80,65,80,63,59,'Water','null'),(9,'Blastoise',78,105,85,100,83,79,'Water','null'),(10,'Caterpie',45,20,20,35,30,45,'Bug','null'),(11,'Metapod',30,25,25,55,20,50,'Bug','null'),(12,'Butterfree',70,80,90,50,45,60,'Bug','Flying'),(13,'Weedle',50,20,20,30,35,40,'Bug','Poison'),(14,'Kakuna',35,25,25,50,25,45,'Bug','Poison'),(15,'Beedrill',75,80,45,40,90,65,'Bug','Poison'),(16,'Pidgey',56,35,35,40,45,40,'Normal','Flying'),(17,'Pidgeotto',71,50,50,55,60,63,'Normal','Flying'),(18,'Pidgeot',101,70,70,75,80,83,'Normal','Flying'),(19,'Rattata',72,35,25,35,56,30,'Normal','null'),(20,'Raticate',97,70,50,60,81,55,'Normal','null'),(21,'Spearow',70,31,31,30,60,40,'Normal','Flying'),(22,'Fearow',100,61,61,65,90,65,'Normal','Flying'),(23,'Ekans',55,54,40,44,60,35,'Poison','null'),(24,'Arbok',80,79,65,69,85,60,'Poison','null'),(25,'Pikachu',90,50,50,40,55,35,'Electric','null'),(26,'Raichu',110,80,90,55,90,60,'Electric','null'),(27,'Sandshrew',40,30,20,85,75,50,'Ground','null'),(28,'Sandslash',65,55,45,110,100,75,'Ground','null'),(29,'Nidoran-f',41,40,40,52,47,55,'Poison','null'),(30,'Nidorina',56,55,55,67,62,70,'Poison','null'),(31,'Nidoqueen',76,85,75,87,92,90,'Poison','Ground'),(32,'Nidoran-m',50,40,40,40,57,46,'Poison','null'),(33,'Nidorino',65,55,55,57,72,61,'Poison','null'),(34,'Nidoking',85,75,85,77,102,81,'Poison','Ground'),(35,'Clefairy',35,65,60,48,45,70,'Fairy','null'),(36,'Clefable',60,90,95,73,70,95,'Fairy','null'),(37,'Vulpix',65,65,50,40,41,38,'Fire','null'),(38,'Ninetales',100,100,81,75,76,73,'Fire','null'),(39,'Jigglypuff',20,25,45,20,45,115,'Normal','Fairy'),(40,'Wigglytuff',45,50,85,45,70,140,'Normal','Fairy'),(41,'Zubat',55,40,30,35,45,40,'Poison','Flying'),(42,'Golbat',90,75,65,70,80,75,'Poison','Flying'),(43,'Oddish',30,65,75,55,50,45,'Grass','Poison'),(44,'Gloom',40,75,85,70,65,60,'Grass','Poison'),(45,'Vileplume',50,90,110,85,80,75,'Grass','Poison'),(46,'Paras',25,55,45,55,70,35,'Bug','Grass'),(47,'Parasect',30,80,60,80,95,60,'Bug','Grass'),(48,'Venonat',45,55,40,50,55,60,'Bug','Poison'),(49,'Venomoth',90,75,90,60,65,70,'Bug','Poison'),(50,'Diglett',95,45,35,25,55,10,'Ground','null'),(51,'Dugtrio',120,70,50,50,80,35,'Ground','null'),(52,'Meowth',90,40,40,35,45,40,'Normal','null'),(53,'Persian',115,65,65,60,70,65,'Normal','null'),(54,'Psyduck',55,50,65,48,52,50,'Water','null'),(55,'Golduck',85,80,95,78,82,80,'Water','null'),(56,'Mankey',70,45,35,35,80,40,'Fighting','null'),(57,'Primeape',95,70,60,60,105,65,'Fighting','null'),(58,'Growlithe',60,50,70,45,70,55,'Fire','null'),(59,'Arcanine',95,80,100,80,110,90,'Fire','null'),(60,'Poliwag',90,40,40,40,50,40,'Water','null'),(61,'Poliwhirl',90,50,50,65,65,65,'Water','null'),(62,'Poliwrath',70,90,70,95,95,90,'Water','Fighting'),(63,'Abra',90,55,105,15,20,25,'Psychic','null'),(64,'Kadabra',105,70,120,30,35,40,'Psychic','null'),(65,'Alakazam',120,95,135,45,50,55,'Psychic','null'),(66,'Machop',35,35,35,50,80,70,'Fighting','null'),(67,'Machoke',45,60,50,70,100,80,'Fighting','null'),(68,'Machamp',55,85,65,80,130,90,'Fighting','null'),(69,'Bellsprout',40,30,70,35,75,50,'Grass','Poison'),(70,'Weepinbell',55,45,85,50,90,65,'Grass','Poison'),(71,'Victreebel',70,70,100,65,105,80,'Grass','Poison'),(72,'Tentacool',70,100,50,35,40,40,'Water','Poison'),(73,'Tentacruel',100,120,80,65,70,80,'Water','Poison'),(74,'Geodude',20,30,30,100,80,40,'Rock','Ground'),(75,'Graveler',35,45,45,115,95,55,'Rock','Ground'),(76,'Golem',45,65,55,130,120,80,'Rock','Ground'),(77,'Ponyta',90,65,65,55,85,50,'Fire','null'),(78,'Rapidash',105,80,80,70,100,65,'Fire','null'),(79,'Slowpoke',15,40,40,65,65,90,'Water','Psychic'),(80,'Slowbro',30,80,100,110,75,95,'Water','Psychic'),(81,'Magnemite',45,55,95,70,35,25,'Electric','Steel'),(82,'Magneton',70,70,120,95,60,50,'Electric','Steel'),(83,'Farfetchd',60,62,58,55,65,52,'Normal','Flying'),(84,'Doduo',75,35,35,45,85,35,'Normal','Flying'),(85,'Dodrio',100,60,60,70,110,60,'Normal','Flying'),(86,'Seel',45,70,45,55,45,65,'Water','null'),(87,'Dewgong',70,95,70,80,70,90,'Water','Ice'),(88,'Grimer',25,50,40,50,80,80,'Poison','null'),(89,'Muk',50,100,65,75,105,105,'Poison','null'),(90,'Shellder',40,25,45,100,65,30,'Water','null'),(91,'Cloyster',70,45,85,180,95,50,'Water','Ice'),(92,'Gastly',80,35,100,30,35,30,'Ghost','Poison'),(93,'Haunter',95,55,115,45,50,45,'Ghost','Poison'),(94,'Gengar',110,75,130,60,65,60,'Ghost','Poison'),(95,'Onix',70,45,30,160,45,35,'Rock','Ground'),(96,'Drowzee',42,90,43,45,48,60,'Psychic','null'),(97,'Hypno',67,115,73,70,73,85,'Psychic','null'),(98,'Krabby',50,25,25,90,105,30,'Water','null'),(99,'Kingler',75,50,50,115,130,55,'Water','null'),(100,'Voltorb',100,55,55,50,30,40,'Electric','null'),(101,'Electrode',140,80,80,70,50,60,'Electric','null'),(102,'Exeggcute',40,45,60,80,40,60,'Grass','Psychic'),(103,'Exeggutor',55,65,125,85,95,95,'Grass','Psychic'),(104,'Cubone',35,50,40,95,50,50,'Ground','null'),(105,'Marowak',45,80,50,110,80,60,'Ground','null'),(106,'Hitmonlee',87,110,35,53,120,50,'Fighting','null'),(107,'Hitmonchan',76,110,35,79,105,50,'Fighting','null'),(108,'Lickitung',30,75,60,75,55,90,'Normal','null'),(109,'Koffing',35,45,60,95,65,40,'Poison','null'),(110,'Weezing',60,70,85,120,90,65,'Poison','null'),(111,'Rhyhorn',25,30,30,95,85,80,'Ground','Rock'),(112,'Rhydon',40,45,45,120,130,105,'Ground','Rock'),(113,'Chansey',50,105,35,5,5,250,'Normal','null'),(114,'Tangela',60,40,100,115,55,65,'Grass','null'),(115,'Kangaskhan',90,80,40,80,95,105,'Normal','null'),(116,'Horsea',60,25,70,70,40,30,'Water','null'),(117,'Seadra',85,45,95,95,65,55,'Water','null'),(118,'Goldeen',63,50,35,60,67,45,'Water','null'),(119,'Seaking',68,80,65,65,92,80,'Water','null'),(120,'Staryu',85,55,70,55,45,30,'Water','null'),(121,'Starmie',115,85,100,85,75,60,'Water','Psychic'),(122,'Mr-mime',90,120,100,65,45,40,'Psychic','Fairy'),(123,'Scyther',105,80,55,80,110,70,'Bug','Flying'),(124,'Jynx',95,95,115,35,50,65,'Ice','Psychic'),(125,'Electabuzz',105,85,95,57,83,65,'Electric','null'),(126,'Magmar',93,85,100,57,95,65,'Fire','null'),(127,'Pinsir',85,70,55,100,125,65,'Bug','null'),(128,'Tauros',110,70,40,95,100,75,'Normal','null'),(129,'Magikarp',80,20,15,55,10,20,'Water','null'),(130,'Gyarados',81,100,60,79,125,95,'Water','Flying'),(131,'Lapras',60,95,85,80,85,130,'Water','Ice'),(132,'Ditto',48,48,48,48,48,48,'Normal','null'),(133,'Eevee',55,65,45,50,55,55,'Normal','null'),(134,'Vaporeon',65,95,110,60,65,130,'Water','null'),(135,'Jolteon',130,95,110,60,65,65,'Electric','null'),(136,'Flareon',65,110,95,60,130,65,'Fire','null'),(137,'Porygon',40,75,85,70,60,65,'Normal','null'),(138,'Omanyte',35,55,90,100,40,35,'Rock','Water'),(139,'Omastar',55,70,115,125,60,70,'Rock','Water'),(140,'Kabuto',55,45,55,90,80,30,'Rock','Water'),(141,'Kabutops',80,70,65,105,115,60,'Rock','Water'),(142,'Aerodactyl',130,75,60,65,105,80,'Rock','Flying'),(143,'Snorlax',30,110,65,65,110,160,'Normal','null'),(144,'Articuno',85,125,95,100,85,90,'Ice','Flying'),(145,'Zapdos',100,90,125,85,90,90,'Electric','Flying'),(146,'Moltres',90,85,125,90,100,90,'Fire','Flying'),(147,'Dratini',50,50,50,45,64,41,'Dragon','null'),(148,'Dragonair',70,70,70,65,84,61,'Dragon','null'),(149,'Dragonite',80,100,100,95,134,91,'Dragon','Flying'),(150,'Mewtwo',130,90,154,90,110,106,'Psychic','null'),(151,'Mew',100,100,100,100,100,100,'Psychic','null');
/*!40000 ALTER TABLE `pokemon` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 17:27:13
