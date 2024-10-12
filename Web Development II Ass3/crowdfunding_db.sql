

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
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of fundraiser
-- ----------------------------
INSERT INTO `fundraiser` VALUES (1, 'Firefighters Local 3631', 'Fundraiser for OCFA Handcrew', '500,000', '223,782', 'Chicago', '1', 1, '1.png');
INSERT INTO `fundraiser` VALUES (2, 'Toni Ocallaghan', 'Saving Jay', '250,000', '29,695', 'Los Angeles', '1', 2, '2.png');
INSERT INTO `fundraiser` VALUES (3, 'Nico Pellatz', 'Neustart für Berkin', '2,000,000', '259,928', 'Seattle', '1', 3, '3.png');
INSERT INTO `fundraiser` VALUES (4, 'Roxanne De Groof', 'Help mij het leven nog wat langer te vieren.', '950,000', '112,785', 'Los Angeles', '2', 1, '4.png');
INSERT INTO `fundraiser` VALUES (5, 'Gina DellaMonica- Giacchetto and 2 others', 'Join us to help Austin and Bella Trezza and their family', '200,000', '158,835', 'Chicago', '1', 3, '5.png');
INSERT INTO `fundraiser` VALUES (6, 'Corneby and Titmus Family and Friends and Rob Corneby', 'Help a Family in Need on their Journey to Healing', '100,000', '176,465', 'Los Angeles', '2', 3, '6.png');
INSERT INTO `fundraiser` VALUES (7, 'Claudia Elsässer is organizing', 'Plötzlicher Tod des Familienvaters', '600,000', '50,750', 'Los Angeles', '2', 1, '7.png');

SET FOREIGN_KEY_CHECKS = 1;
