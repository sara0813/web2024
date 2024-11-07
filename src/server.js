const express = require('express');
const path = require('path');
const favicon = require('serve-favicon'); // serve-favicon 패키지 추가
const app = express();
const port = 3000;

// favicon 경로 설정
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '../public')));

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
