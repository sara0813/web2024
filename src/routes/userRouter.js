const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middlewar/authMiddleware'); // JWT 인증 미들웨어

// 사용자 프로필 정보 조회
router.get('/profile', verifyToken, userController.getUserProfile);

// 사용자 프로필 정보 업데이트
router.put('/profile', verifyToken, userController.updateUserProfile);

module.exports = router;
