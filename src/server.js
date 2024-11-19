const express = require('express');
const path = require('path');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bcrypt = require('bcrypt');

// 기존에 정의된 userSchema 파일에서 User 모델을 가져옴
const { User } = require('../model/user');  // userModelFile 경로에 맞게 수정

const app = express();
const port = 8080;

dotenv.config({ path: path.join(__dirname, '../.env') });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: "http://localhost:your_client_port",  // 클라이언트의 주소로 변경
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.static(path.join(__dirname, '..'))); // 루트 디렉토리로 이동하여 모든 파일 제공

console.log(process.env.MONGO_URI);  // URI가 제대로 출력되는지 확인

//몽고bd 연결 코드
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log('MongoDB 연결 오류:',err));

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

// 인증 코드 저장을 위한 변수
let sentVerificationCode = null; // 인증 코드가 저장될 변수

// POST 요청을 처리할 /send-code 엔드포인트 설정
app.post('/send-code', (req, res) => {
  const { email } = req.body;
  const verificationCode = generateVerificationCode(); // 인증 코드 생성

  // 인증 코드를 저장
  sentVerificationCode = verificationCode;

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
    </html>`
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

// POST 요청을 처리할 /verify-code 엔드포인트 설정
app.post('/verify-code', (req, res) => {
  const { code } = req.body; // 요청으로 받은 인증 코드

  console.log(`Received code: ${code}`); // 수신된 코드 출력
  console.log(`Sent verification code: ${sentVerificationCode}`); // 서버에 저장된 코드 출력

  if (code === sentVerificationCode) {
      return res.json({ success: true, message: "인증 코드가 일치합니다." });
  } else {
      return res.json({ success: false, message: "인증 코드가 일치하지 않습니다." });
  }
});


app.post('/check-nickname', (req, res) => {
  const { nickname } = req.body;

  // MongoDB에서 닉네임 중복 확인
  User.findOne({ nickname: nickname })
    .then(existingUser => {
      if (existingUser) {
        res.json({ exists: true });  // 이미 존재하는 닉네임
      } else {
        res.json({ exists: false });  // 사용 가능한 닉네임
      }
    })
    .catch(error => {
      console.error('Error checking nickname:', error);
      res.status(500).json({ success: false, message: '서버 오류' });
    });
});

// 회원가입 처리 라우트
app.post('/register', async (req, res) => {
  try {
    const { nickname, studentId, email, password, verificationCode } = req.body;

    // 인증 코드 확인
    if (verificationCode !== sentVerificationCode) {
      return res.json({ success: false, message: '인증 코드가 일치하지 않습니다.' });
    }

    // 학번 중복 체크
    const existingStudent = await User.findOne({ studentId });
    if (existingStudent) {
      return res.json({ success: false, message: '이미 등록된 학번입니다.' });
    }

    // 이메일 중복 체크
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({ success: false, message: '이미 등록된 이메일입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10).catch(err => {
      console.error("비밀번호 해싱 오류:", err);  // 오류 발생 시 콘솔에 출력
      return res.status(500).json({ success: false, message: "비밀번호 해싱 중 오류가 발생했습니다." });
    });
    // 새 사용자 객체 생성
    const newUser = new User({
      nickname,
      studentId,
      email,
      password: hashedPassword,
      verificationCode
    });

    // 데이터베이스에 저장
    await newUser.save();

    res.status(200).json({ success: true, message: '회원가입이 완료' });

  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);  // 오류 메시지 출력
    res.status(500).json({ success: false, message: '회원가입 중 오류가 발생했습니다.' });
  }
});

// 서버 시작
app.listen(port, '0.0.0.0',() => {
    console.log(`서버가 http://0.0.0.0:${port} 에서 실행 중입니다.`);
});