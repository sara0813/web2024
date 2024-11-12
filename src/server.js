// src/server.js
const express = require('express');
const path = require('path');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = 3000;

app.use(express.json());

// .env 값 확인 (콘솔에 출력)
console.log("NODEMAILER_USER: ", process.env.NODEMAILER_USER);
console.log("NODEMAILER_PASS: ", process.env.NODEMAILER_PASS);

// 정적 파일 제공 (css, js 폴더에 접근)
app.use(express.static(path.join(__dirname, '..'))); // 루트 디렉토리로 이동하여 모든 파일 제공

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html')); // 루트 디렉토리의 index.html
});

// 인증 코드 생성 함수
function generateVerificationCode() {
  const code = Math.floor(100000 + Math.random() * 900000); // 6자리 랜덤 숫자
  return code.toString(); // 문자열로 반환
}

// Nodemailer 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

// POST 요청을 처리할 `/send-code` 엔드포인트 설정
app.post('/send-code', (req, res) => {
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
      res.json({ success: true, verificationCode }); // 인증 코드 반환
    }
  });
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
