const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 정적 파일 제공 (css, js, html 폴더에 접근)
app.use(express.static(path.join(__dirname, '../'))); // 최상위 폴더의 파일들 제공

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html')); // 최상위 폴더의 index.html
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
