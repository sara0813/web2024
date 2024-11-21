const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const session = require('express-session');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/authRoutes');
const verificationRouter = require('./routes/verificationRouter');

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = 8080;

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html')); // 루트 디렉토리의 index.html
});

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'Hello!',
  resave: false,
  saveUninitialized: true,
}));

app.use('/api/auth', authRouter);
app.use('/api/verification', verificationRouter);

app.use(express.static(path.join(__dirname, '..'))); // 루트 디렉토리로 이동하여 모든 파일 제공

//몽고bd 연결 코드
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log('MongoDB 연결 오류:',err));

//확인용
console.log(process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);

// 서버 시작
app.listen(port, '0.0.0.0', () => {
    console.log(`서버가 http://0.0.0.0:${port} 에서 실행 중입니다.`);
});