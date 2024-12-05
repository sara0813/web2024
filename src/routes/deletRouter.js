const express = require('express');
const router = express.Router();
const { deleteAccount } = require('../controllers/deletController'); // 컨트롤러 가져오기

// 회원 탈퇴 라우트 설정
router.delete('/delete-account', deleteAccount);

module.exports = router; // 라우터 객체 내보내기
