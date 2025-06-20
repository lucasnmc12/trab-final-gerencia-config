-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: msi
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `nomeCliente` varchar(45) NOT NULL,
  `cpfCliente` varchar(45) NOT NULL,
  `cidadeCliente` varchar(45) NOT NULL,
  `estadoCliente` varchar(45) NOT NULL,
  `enderecoCliente` varchar(45) DEFAULT NULL,
  `telefoneCliente` varchar(45) DEFAULT NULL,
  `emailCliente` varchar(45) NOT NULL,
  `senhaCliente` varchar(45) NOT NULL,
  `isAdmin` tinyint NOT NULL,
  PRIMARY KEY (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'admin','0','0','0','0','0','admin','123',1),(2,'Gabriel ','151.345205.98','Contagem','Minas Gerais','São Paulo','31985745545','gabigol@gmail.com','cruzeir1',0),(3,'Julia Borges','78965412568','Macaúbas','Bahia','Rua Abacaxi','55998745667','julia@gmail.com','123',0),(4,'Letícia Blom','78945661563','Nova Lima','Minas Gerais','Rua Lauro Magalhães','31998745666','leticiarblom@gmail.com','mar02',0);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `custo`
--

DROP TABLE IF EXISTS `custo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custo` (
  `idCusto` int NOT NULL AUTO_INCREMENT,
  `custoMetro` double NOT NULL,
  `custoComodo` double NOT NULL,
  `custoGaragem` double NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`idCusto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `custo`
--

LOCK TABLES `custo` WRITE;
/*!40000 ALTER TABLE `custo` DISABLE KEYS */;
INSERT INTO `custo` VALUES (1,40,30,200,'2023-10-28 05:12:03','2023-10-28 05:12:03'),(2,50,20,100,'2023-11-01 22:25:45','2023-11-01 22:25:45');
/*!40000 ALTER TABLE `custo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etapa`
--

DROP TABLE IF EXISTS `etapa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `etapa` (
  `idEtapa` int NOT NULL AUTO_INCREMENT,
  `fk_idObra` int DEFAULT NULL,
  `nomeEtapa` varchar(45) NOT NULL,
  `dataInicio` date NOT NULL,
  `dataFim` date DEFAULT NULL,
  `statusObra` tinyint DEFAULT NULL,
  PRIMARY KEY (`idEtapa`),
  KEY `idObra_idx` (`fk_idObra`),
  KEY `fk_idObra_idx` (`fk_idObra`),
  CONSTRAINT `fk_idObra` FOREIGN KEY (`fk_idObra`) REFERENCES `obra` (`idObra`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etapa`
--

LOCK TABLES `etapa` WRITE;
/*!40000 ALTER TABLE `etapa` DISABLE KEYS */;
INSERT INTO `etapa` VALUES (2,2,'Lote','2023-11-01','2023-11-01',0),(3,2,'Etapa 1','2023-11-10',NULL,1),(4,7,'Lote','2023-12-12','2023-12-12',0);
/*!40000 ALTER TABLE `etapa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fornecedor`
--

DROP TABLE IF EXISTS `fornecedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fornecedor` (
  `idFornecedor` int NOT NULL AUTO_INCREMENT,
  `cnpj` varchar(45) NOT NULL,
  `nomeFornecedor` varchar(45) NOT NULL,
  `telefoneFornecedor` varchar(45) DEFAULT NULL,
  `emailFornecedor` varchar(45) NOT NULL,
  `siteFornecedor` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idFornecedor`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fornecedor`
--

LOCK TABLES `fornecedor` WRITE;
/*!40000 ALTER TABLE `fornecedor` DISABLE KEYS */;
INSERT INTO `fornecedor` VALUES (20,'77.634.456/7856-11','Leroy Merlin','(11) 4020-5376','contato@leroymerlin.com','www.leroymerlin.com.br'),(22,'48.634.563/7456-11','ABC da Construção','(31) 4574 5228 ','abcdaconstrucao@gmail.com','www.abcdaconstrucao.com.br'),(25,'77.634.456/7856-11','Fagid ','(31) 99856 6322','fagid@gmail.com','www.fagid.com.br');
/*!40000 ALTER TABLE `fornecedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `idItem` int NOT NULL AUTO_INCREMENT,
  `fk_idEtapa` int DEFAULT NULL,
  `descricaoItem` varchar(45) DEFAULT NULL,
  `valorItem` double DEFAULT NULL,
  `pagamentoItem` tinyint DEFAULT NULL,
  PRIMARY KEY (`idItem`),
  KEY `fk_idEtapa_idx` (`fk_idEtapa`),
  CONSTRAINT `fk_idEtapa` FOREIGN KEY (`fk_idEtapa`) REFERENCES `etapa` (`idEtapa`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,2,'Lote',40000,0),(2,3,'Material',359.22,0),(3,4,'Lote',450000,0),(4,3,'Item',10,0),(5,3,'material',50.2,0),(6,3,'Material',200,0);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `idMaterial` int NOT NULL AUTO_INCREMENT,
  `fk_idFornecedor` int DEFAULT NULL,
  `nomeMaterial` varchar(45) NOT NULL,
  `precoMaterial` double NOT NULL,
  `tipoMaterial` varchar(45) NOT NULL,
  `descricaoMaterial` varchar(80) NOT NULL,
  PRIMARY KEY (`idMaterial`),
  KEY `idFornecedor_idx` (`fk_idFornecedor`),
  CONSTRAINT `idFornecedor` FOREIGN KEY (`fk_idFornecedor`) REFERENCES `fornecedor` (`idFornecedor`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (5,25,'Tijolo',2.4,'unidade','tijolo azul'),(15,20,'Cimento',10,'unidade','cimento para obra'),(16,20,'Tijolo',10,'m²','tijolo verde');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `obra`
--

DROP TABLE IF EXISTS `obra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `obra` (
  `idObra` int NOT NULL AUTO_INCREMENT,
  `fk_idCliente` int NOT NULL,
  `enderecoObra` varchar(45) NOT NULL,
  `cidadeObra` varchar(45) NOT NULL,
  `tamanhoTerrenoObra` varchar(45) NOT NULL,
  `dataInicioObra` date NOT NULL,
  `qtdComodosObra` int NOT NULL,
  `garagemObra` tinyint NOT NULL,
  PRIMARY KEY (`idObra`),
  KEY `idCliente_idx` (`fk_idCliente`),
  CONSTRAINT `idCliente` FOREIGN KEY (`fk_idCliente`) REFERENCES `cliente` (`idCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `obra`
--

LOCK TABLES `obra` WRITE;
/*!40000 ALTER TABLE `obra` DISABLE KEYS */;
INSERT INTO `obra` VALUES (2,4,'Rua Pablo','Nova Lima','100','2023-10-05',5,1),(7,2,'Lauro Magalhães Santeiro','Belo Horizonte','300','2023-11-01',2,1),(8,3,'Rua Santa Maria','Macaúbas','200','2023-12-13',5,1);
/*!40000 ALTER TABLE `obra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `servico`
--

DROP TABLE IF EXISTS `servico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `servico` (
  `idServico` int NOT NULL AUTO_INCREMENT,
  `fk_idObra` int NOT NULL,
  `tipoServico` varchar(45) NOT NULL,
  `descricaoServico` varchar(45) DEFAULT NULL,
  `dataContratacao` date NOT NULL,
  `valorServico` double NOT NULL,
  PRIMARY KEY (`idServico`),
  KEY `idObra_idx` (`fk_idObra`),
  CONSTRAINT `idObra` FOREIGN KEY (`fk_idObra`) REFERENCES `obra` (`idObra`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `servico`
--

LOCK TABLES `servico` WRITE;
/*!40000 ALTER TABLE `servico` DISABLE KEYS */;
INSERT INTO `servico` VALUES (2,2,'eletrico','serviço eletrico','2023-10-14',100),(5,2,'projeto','projeto de obra','2023-10-15',300),(6,2,'Arquitetônico ','construir uma casa simples no minecraft','2023-02-12',10000);
/*!40000 ALTER TABLE `servico` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-13 17:19:58
