const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 닉네임 중복 체크 라우터
router.post('/checkNickname', authController.checkNickname);

// 회원가입 라우터
router.post('/register', authController.register);

//로그인 라우터
router.post('/login',authController.login);

module.exports = router;
