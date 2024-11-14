const express = require('express');
const nodemailer = require("nodemailer");
const { User } = require('../models/User');

const router = express.Router();

// Nodemailer 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// 인증 코드 생성 함수
function generateVerificationCode() {
  const code = Math.floor(100000 + Math.random() * 900000); // 6자리 랜덤 숫자
  return code.toString(); // 문자열로 반환
}

// 이메일 인증 코드 전송
router.post('/send-code', (req, res) => {
  const { email } = req.body;
  const verificationCode = generateVerificationCode(); // 인증 코드 생성

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: 'ST 마켓 인증 코드',
    html: `
      <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>안녕하세요, <strong>ST 마켓</strong> 이용자님!</p><br>
        <p>ST 마켓에 가입해 주셔서 감사합니다. <br><br> 아래는 귀하의 인증 코드입니다. 인증 코드를 정확히 입력해 주세요.</p><br>
        <p style="font-size: 24px; font-weight: bold; color: #007bff;">
          🔑 인증 코드: <span style="font-size: 36px;">${verificationCode}</span>
        </p><br>
        <p>본 이메일은 ST 마켓에서 회원님의 계정 보안을 위해 발송되었습니다. 인증 코드는 <strong>10분간 유효</strong>하며, 만약 본인이 요청하지 않은 경우 이 메시지를 무시해 주세요.</p><br>
        <p>언제든지 궁금한 사항이 있다면 문의해 주시기 바랍니다. 감사합니다! </p><br><br>-ST 마켓 드림-</p>
      </body>
      </html>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, authCode: verificationCode }); // 클라이언트 코드에서 사용하는 'authCode'로 반환
        }
    });
});

// 인증 코드 검증
router.post('/verify-code', (req, res) => {
  const { code } = req.body; // 요청으로 받은 인증 코드

  if (code === sentVerificationCode) {
      return res.json({ success: true, message: "인증 코드가 일치합니다." });
  } else {
      return res.json({ success: false, message: "인증 코드가 일치하지 않습니다." });
  }
});

// 닉네임 중복 검사
router.post('/check-nickname', async (req, res) => {
  const { nickname } = req.body;
  const user = await User.findOne({ nickname });
  if (user) {
      return res.status(400).json({ error: '이 닉네임은 이미 사용 중입니다.' });
  }
  res.status(200).json({ message: '사용 가능한 닉네임입니다.' });
});

module.exports = router;
