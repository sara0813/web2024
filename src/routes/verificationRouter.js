const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/verificationController');

// 인증 코드 발송 라우트
router.post('/send-code', verificationController.sendVerificationCode);

router.post('/verify-code', verificationController.checkVerificationCode);

module.exports = router;
