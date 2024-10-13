
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------

CREATE TABLE `category`  (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '名称',
  PRIMARY KEY (`category_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, 'Medical');
INSERT INTO `category` VALUES (2, 'Memorial');
INSERT INTO `category` VALUES (3, 'Family');
INSERT INTO `category` VALUES (4, 'education');
INSERT INTO `category` VALUES (5, 'service');

-- ----------------------------
-- Table structure for donation
-- ----------------------------

CREATE TABLE `donation`  (
  `donation_id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '金额',
  `giver` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '捐赠人',
  `fundraiser_id` int(11) NOT NULL COMMENT '筹款人id',
  `date` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '捐赠时间',
  PRIMARY KEY (`donation_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of donation
-- ----------------------------
INSERT INTO `donation` VALUES (3, '134', 'test', 1, '2024-10-9 21:51:59');
INSERT INTO `donation` VALUES (4, '12', 'www', 1, '2024-10-9 21:52:8');
INSERT INTO `donation` VALUES (5, '188', 'zhangsan', 1, '2024-10-10 16:53:31');
INSERT INTO `donation` VALUES (6, '156', 'lisi', 1, '2024-10-10 16:53:53');
INSERT INTO `donation` VALUES (7, '15', 'lala', 11, '2024-10-10 16:55:0');
INSERT INTO `donation` VALUES (8, '16', 'newone', 11, '2024-10-10 16:55:13');
INSERT INTO `donation` VALUES (1, '15', '123', 11, '2024-10-10 16:55:14');
INSERT INTO `donation` VALUES (2, '45', '321', 11, '2024-10-10 16:55:15');
INSERT INTO `donation` VALUES (9, '75', 'ne', 11, '2024-10-10 16:55:16');
INSERT INTO `donation` VALUES (10, '36', 'no', 11, '2024-10-10 16:55:17');
INSERT INTO `donation` VALUES (11, '35', 'newtwo', 11, '2024-10-10 16:55:18');

-- ----------------------------
-- Table structure for fundraiser
-- ----------------------------

CREATE TABLE `fundraiser`  (
  `fundraiser_id` int(11) NOT NULL AUTO_INCREMENT,
  `organizer` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '组织者',
  `caption` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '标题',
  `target_funding` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '目标资金',
  `current_funding` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '当前\r\n资金',
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '城市',
  `active` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '活动1是2否',
  `category_id` int(11) NULL DEFAULT NULL COMMENT '类别id',
  `fundraiser_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '图片',
  PRIMARY KEY (`fundraiser_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of fundraiser
-- ----------------------------
INSERT INTO `fundraiser` VALUES (1, 'OC Firefighters Local 3631', 'Fundraiser for OCFA Handcrew', '500000', '490', 'Chicago', '1', 1, '1.png');
INSERT INTO `fundraiser` VALUES (2, 'Toni Ocallaghan', 'Saving Jay', '250000', '0', 'Los Angeles', '1', 2, '2.png');
INSERT INTO `fundraiser` VALUES (3, 'Nico Pellatz', 'Neustart für Berkin', '2000000', '0', 'Seattle', '1', 3, '3.png');
INSERT INTO `fundraiser` VALUES (4, 'Roxanne De Groof', 'Help mij het leven nog wat langer te vieren.', '95000', '0', 'Los Angeles', '2', 1, '4.png');
INSERT INTO `fundraiser` VALUES (5, 'Gina DellaMonica- Giacchetto and 2 others', 'Join us to help Austin and Bella Trezza and their family', '200000', '0', 'Chicago', '1', 3, '5.png');
INSERT INTO `fundraiser` VALUES (6, 'Corneby and Titmus Family and Friends and Rob Corneby', 'Help a Family in Need on their Journey to Healing', '100000', '0', 'Los Angeles', '2', 3, '6.png');
INSERT INTO `fundraiser` VALUES (7, 'Claudia Elsässer is organizing', 'Plötzlicher Tod des Familienvaters', '60000', '0', 'Los Angeles', '2', 1, '7.png');
INSERT INTO `fundraiser` VALUES (8, 'Gina DellaMonica- Giacchetto and 2 others', 'Join us to help Austin and Bella Trezza and their family', '200000', '0', 'Chicago', '1', 3, '5.png');
INSERT INTO `fundraiser` VALUES (9, 'Corneby and Titmus Family and Friends and Rob Corneby', 'Help a Family in Need on their Journey to Healing', '100000', '0', 'Los Angeles', '2', 3, '6.png');
INSERT INTO `fundraiser` VALUES (10, 'Claudia Elsässer is organizing', 'Plötzlicher Tod des Familienvaters', '60000', '0', 'Los Angeles', '2', 1, '7.png');

SET FOREIGN_KEY_CHECKS = 1;
