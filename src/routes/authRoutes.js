const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// 닉네임 중복 체크 라우터
router.post('/checkNickname', authController.checkNickname);

// 회원가입 라우터
router.post('/register', authController.register);

//로그인 라우터
router.post('/login',authController.login);

// 대시보드 페이지 (로그인된 사용자만 접근)
router.get('/dashboard', authMiddleware.isLoggedIn, authController.dashboard);

// 로그아웃 처리
router.post('/logout', authController.logout);

module.exports = router;
