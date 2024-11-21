const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { submitProduct } = require('../controllers/productController'); // 수정된 부분

// Multer 설정 (이미지 업로드)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // 이미지 저장 경로
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 고유 파일명 생성
    }
});

const upload = multer({ storage: storage });

// 상품 등록 라우트
router.post('/register', upload.array('image', 5), submitProduct); // 수정된 부분

module.exports = router;