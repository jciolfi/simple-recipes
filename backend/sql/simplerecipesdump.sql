CREATE DATABASE  IF NOT EXISTS `simplerecipes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `simplerecipes`;
-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: localhost    Database: simplerecipes
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `recipe_ingredients`
--

DROP TABLE IF EXISTS `recipe_ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_ingredients` (
  `recipe_id` int NOT NULL,
  `ingredient_name` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  PRIMARY KEY (`recipe_id`,`ingredient_name`),
  UNIQUE KEY `recipe_id` (`recipe_id`,`ingredient_name`),
  CONSTRAINT `recipe_ingredients_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_ingredients`
--

LOCK TABLES `recipe_ingredients` WRITE;
/*!40000 ALTER TABLE `recipe_ingredients` DISABLE KEYS */;
INSERT INTO `recipe_ingredients` VALUES (1,'test ing','1 unit'),(2,'butter','1 stick'),(2,'russet potatoes','4 medium-sized'),(3,'Bread','2 slices'),(3,'Grape jelly','1 jar'),(3,'Peanut butter','1 jar'),(4,'Adobo seasoning blend','10 tablespoons'),(4,'Chicken','2 lbs'),(4,'Olive oil','Enough to coat pan'),(5,'bacon','3 strips'),(5,'lettuce','1 handful'),(5,'tomato','3 slices'),(5,'Turkey','4 slices'),(6,'Large tortilla','1'),(6,'Shredded cheese','Enough to coat tortilla'),(7,'Boxed Pasta','1 box'),(7,'parmesan cheese','desired amount'),(7,'Sauce in jar','1 jar'),(9,'butter','1 stick'),(9,'milk','2 cups'),(9,'russet potatoes','4 medium-sized'),(10,'Bread','2 slices'),(10,'Everything but the bagel seasoning','couple of sprinkles'),(10,'Mixed fruit jam','1 jar'),(10,'Peanut butter','1 jar'),(11,'Bread','2 slices'),(11,'butter','1/8 stick'),(11,'Everything but the bagel seasoning','couple of sprinkles'),(11,'Mixed fruit jam','1 jar'),(11,'Peanut butter','1 jar'),(12,'Adobo seasoning blend','10 tablespoons'),(12,'Chicken','2 lbs'),(12,'Vegetable oil','2 quarts'),(13,'lettuce','1 handful'),(13,'oil & vinegar','a few swigs'),(13,'provolone cheese','4 slices'),(13,'Roast beef','4 slices'),(13,'tomato','3 slices'),(14,'Large tortilla','1'),(14,'raw chicken','0.5 lbs'),(14,'Shredded cheese','Enough to coat tortilla'),(15,'Boxed Pasta','1 box'),(15,'eggs','1 dozen'),(15,'pancetta','8 servings'),(15,'parmesan cheese','30 oz');
/*!40000 ALTER TABLE `recipe_ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_tags`
--

DROP TABLE IF EXISTS `recipe_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_tags` (
  `recipe_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`tag_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `recipe_tags_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recipe_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_tags`
--

LOCK TABLES `recipe_tags` WRITE;
/*!40000 ALTER TABLE `recipe_tags` DISABLE KEYS */;
INSERT INTO `recipe_tags` VALUES (4,1),(12,1),(2,3),(3,3),(5,3),(6,3),(9,3),(10,3),(11,3),(13,3),(14,3),(5,6),(7,6),(13,6),(15,6),(3,7),(10,7),(11,7),(2,8),(9,8),(5,10),(6,10),(13,10),(14,10),(1,11),(2,13),(9,13);
/*!40000 ALTER TABLE `recipe_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipe_tools`
--

DROP TABLE IF EXISTS `recipe_tools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipe_tools` (
  `recipe_id` int NOT NULL,
  `tool_id` int NOT NULL,
  PRIMARY KEY (`recipe_id`,`tool_id`),
  KEY `tool_id` (`tool_id`),
  CONSTRAINT `recipe_tools_ibfk_1` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`recipe_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `recipe_tools_ibfk_2` FOREIGN KEY (`tool_id`) REFERENCES `tools` (`tool_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipe_tools`
--

LOCK TABLES `recipe_tools` WRITE;
/*!40000 ALTER TABLE `recipe_tools` DISABLE KEYS */;
INSERT INTO `recipe_tools` VALUES (1,1),(6,1),(11,1),(14,1),(15,1),(4,2),(12,2),(2,4),(7,4),(9,4),(15,4),(1,8),(4,8),(7,8),(12,8),(15,8),(7,12),(15,12),(4,17),(12,17),(2,23),(9,23),(3,24),(5,24),(10,24),(11,24),(13,24);
/*!40000 ALTER TABLE `recipe_tools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `recipe_id` int NOT NULL,
  `author_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `prep_time` int NOT NULL,
  `servings` int NOT NULL,
  `instructions` text NOT NULL,
  PRIMARY KEY (`recipe_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,1,'test title',20,1,'instructions test'),(2,1,'mashed potatoes',30,4,'peel potatoes. boil potatoes in pot. mash potatoes. stir and add butter.'),(3,1,'PB & J',5,1,'spread PB on one side of bread and Jelly on other. Combine.'),(4,1,'chicken tenders',5,3,'Use medium-high heat. Add oil. Season chicken w/ spice blend. Sear for 5 mins on each side'),(5,1,'Deli Sandwich',5,2,'Spread mayo, add turkey, add lettuce, add tomato, add bacon'),(6,1,'Quesadilla',15,1,'Sprinkle cheese on tortilla. Fold and pan sear on medium-high for 2 mins each side.'),(7,1,'Pasta & Red Sauce',25,8,'Boil pasta in salted water according to box instructions. Strain, add red sauce into pot and stir. Add parmesan on top'),(9,2,'better mashed potatoes',30,4,'peel potatoes. boil potatoes in pot. mash potatoes. stir and add butter and milk.'),(10,1,'Better PB & J',5,1,'spread PB on one side of bread and Jelly on other. Sprinkle seasoning on both pieces. Combine.'),(11,3,'Best PB & J',5,1,'Toast bread with butter in pan. spread PB on one side of bread and Jelly on other. Sprinkle seasoning on both pieces. Combine.'),(12,2,'fried chicken tenders',5,3,'Use medium-high heat. Add oil to bottom of pot and heat to 350. Season chicken w/ spice blend. Put in oil for 8 minutes'),(13,4,'Deli Sandwich',10,2,'Spread mayo, add roast beef, add cheese, add oil/vinegar, add lettuce/tomato'),(14,4,'Chicken Quesadilla',15,1,'Bake chicken for 15 mins at 350. Shred and add with cheese on tortilla. Fold and pan sear on medium-high for 2 mins each side.'),(15,4,'Carbonara',25,8,'Boil pasta in salted water according to box instructions. Dice and cook pancetta on low heat while pasta cooks. Mix 8 egg yolks, 4 eggs, parmesan. Combine pasta with pancetta when pasta is done. Turn off heat, add egg/cheese mix and stir for 10 mins');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `recipes_after_insert` AFTER INSERT ON `recipes` FOR EACH ROW BEGIN
    UPDATE
		users u
	SET
		u.num_recipes = u.num_recipes + 1
	WHERE
		u.user_id = NEW.author_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `recipes_after_delete` AFTER DELETE ON `recipes` FOR EACH ROW BEGIN
    UPDATE
		users u
	SET
		u.num_recipes = u.num_recipes - 1
	WHERE
		u.user_id = OLD.author_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(32) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Healthy'),(2,'Cook With Friends'),(3,'Easy'),(4,'Challenging'),(5,'Low Calorie'),(6,'Party'),(7,'Eat Everyday'),(8,'Rich'),(9,'Light'),(10,'Savory'),(11,'Sweet'),(12,'Spicy'),(13,'Creamy'),(14,'Crunchy'),(15,'Fresh'),(16,'Date Night'),(17,'Limited Cleaning');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tools`
--

DROP TABLE IF EXISTS `tools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tools` (
  `tool_id` int NOT NULL AUTO_INCREMENT,
  `tool_name` varchar(64) NOT NULL,
  PRIMARY KEY (`tool_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tools`
--

LOCK TABLES `tools` WRITE;
/*!40000 ALTER TABLE `tools` DISABLE KEYS */;
INSERT INTO `tools` VALUES (1,'Skillet'),(2,'Frying Pan'),(3,'Saucepot'),(4,'Soup Pot'),(5,'Wok'),(6,'Baking Sheet'),(7,'Baking Dish'),(8,'Tongs'),(9,'Spatula'),(10,'Whisk'),(11,'Spoon'),(12,'Strainer'),(13,'Chopsticks'),(14,'Fork'),(15,'Measuring Cup Set'),(16,'Measuring Spoon Set'),(17,'Chef\'s Knife'),(18,'Paring Knife'),(19,'Scissors'),(20,'Vegetable Peeler'),(21,'Grater'),(22,'Rolling Pin'),(23,'Masher'),(24,'Butter Knife');
/*!40000 ALTER TABLE `tools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `username` varchar(16) NOT NULL,
  `num_recipes` int NOT NULL DEFAULT '0',
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test@gmail.com','abc','abc',8,'2022-04-29 11:47:13'),(2,'test2@gmail.com','abc','test',2,'2022-04-29 14:38:19'),(3,'test3@gmail.com','abc','test3',1,'2022-04-29 14:45:57'),(4,'test4@gmail.com','abc','test4',3,'2022-04-29 15:08:29');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'simplerecipes'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `remove_old_accounts` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `remove_old_accounts` ON SCHEDULE AT '2022-05-29 11:45:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
	DELETE FROM users
    WHERE last_updated < NOW() - INTERVAL 5 YEAR;
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'simplerecipes'
--
/*!50003 DROP FUNCTION IF EXISTS `account_exists` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `account_exists`(
  email VARCHAR(255),
  pass VARCHAR(255)
) RETURNS int
    READS SQL DATA
    DETERMINISTIC
BEGIN
DECLARE userID INT;

SELECT
  u.user_id
FROM
  users u
WHERE
  u.email = LOWER(email) AND u.pass = pass
INTO userID;

RETURN userID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `is_unique_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `is_unique_email`(
  email VARCHAR(255)
) RETURNS tinyint(1)
    READS SQL DATA
    DETERMINISTIC
BEGIN
DECLARE unique_email BOOL;

SELECT NOT EXISTS
(
  SELECT 
    *
  FROM
    users u
  WHERE 
    u.email = email
)
INTO unique_email;

RETURN unique_email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `is_unique_username` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `is_unique_username`(
  username VARCHAR(255)
) RETURNS tinyint(1)
    READS SQL DATA
    DETERMINISTIC
BEGIN
DECLARE unique_username BOOL;

SELECT NOT EXISTS
(
  SELECT 
    *
  FROM 
    users u
  WHERE
    u.username = username
)
INTO unique_username;

RETURN unique_username;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_recipe` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_recipe`(recipeID INT)
BEGIN

SELECT
  recipe_id,
  username,
  title,
  prep_time,
  servings,
  instructions,
  GROUP_CONCAT(DISTINCT T.ingredient_amts SEPARATOR '@@') AS ingredients,
  tags,
  tools
FROM 
(
  SELECT
    r.recipe_id,
    u.username,
    r.title,
    r.prep_time,
    r.servings,
    r.instructions,
    CONCAT(ri.ingredient_name, '##', ri.amount) AS ingredient_amts,
    GROUP_CONCAT(DISTINCT tg.tag_name SEPARATOR '##') AS tags, 
    GROUP_CONCAT(DISTINCT tl.tool_name SEPARATOR '##') AS tools
  FROM
	  recipes r
  JOIN 
	  users u ON r.author_id = u.user_id
  JOIN
	  recipe_ingredients ri ON r.recipe_id = ri.recipe_id
  JOIN
	  recipe_tags rtg ON r.recipe_id = rtg.recipe_id
  JOIN 
	  tags tg ON rtg.tag_id = tg.tag_id
  JOIN 
	  recipe_tools rtl ON r.recipe_id = rtl.recipe_id
  JOIN 
	  tools tl ON rtl.tool_id = tl.tool_id
  GROUP BY 
    r.recipe_id, ri.ingredient_name
  HAVING 
    r.recipe_id = recipeID
) as T
GROUP BY recipe_id, tags, tools;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_user` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user`(userID INT)
BEGIN

SELECT
  u.user_id,
  u.email,
  u.username
FROM
  users u
WHERE
  u.user_id = userID;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-29 18:28:46
