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

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "상품 정보를 불러오는 중 오류가 발생했습니다." });
  }
});

module.exports = router;
