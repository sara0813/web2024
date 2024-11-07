const express = require('express'); 
const path = require('path'); // path 모듈을 추가합니다.
const app = express();
const port = 3000;

// 정적 파일 제공 (HTML, CSS, JS 파일 등)
app.use(express.static(path.join(__dirname, '../public'))); // 정적 파일 경로 수정

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html')); // 메인 페이지 경로 수정
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
