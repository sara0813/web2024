
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const sendEmail = require("../config/sendEmail");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 이메일 사용자와 비밀번호가 제대로 로드되었는지 확인
console.log("이메일 사용자:", process.env.NODEMAILER_USER);
console.log("이메일 비밀번호:", process.env.NODEMAILER_PASS);

// JSON 요청 본문을 파싱하기 위한 미들웨어
app.use(express.json());

// 정적 파일 제공 (css, js 폴더에 접근)
app.use(express.static(path.join(__dirname, '..'))); // 루트 디렉토리로 이동하여 모든 파일 제공

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html')); // 루트 디렉토리의 index.html
});

// 이메일 인증 코드 발송 API
app.post('/send-verification-email', async (req, res) => {
    const { email } = req.body;

    // 이메일이 없는 경우 처리
    if (!email) {
        return res.status(400).json({ error: '이메일이 필요합니다.' });
    }

    try {
        const verificationCode = sendEmail.generateCode();
        
        // 이메일 전송
        await sendEmail.sendVerificationEmail(email, verificationCode);

        // 성공적으로 이메일을 보냈다면 응답
        res.json({ success: true, verificationCode });
    } catch (error) {
        console.error('이메일 전송 오류:', error);
        res.status(500).json({ error: '이메일 전송에 실패했습니다.' });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
 