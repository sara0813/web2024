const express = require('express');
const multer = require('multer');
const path = require('path');
const { submitProduct, getProducts } = require('../controllers/productController');

const router = express.Router();

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads'); // 루트 디렉토리 기준 경로
    console.log('Upload Path:', uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 고유 파일명 생성
  },
});

const upload = multer({ storage: storage });

// 라우트 정의
router.post('/register', upload.array('image', 5), submitProduct);
router.get('/products', getProducts);

module.exports = router;
