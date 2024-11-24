const express = require('express');
const multer = require('multer');
const path = require('path');
const { submitProduct, getProductsById, getProducts, searchProducts } = require('../controllers/productController');

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

router.get('/products/:id', async (req, res) => {
  try {
    const product = await getProductsById(req.params.id); // ID로 상품 검색
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "상품을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: "서버 오류" });
  }
});

router.get('/search', searchProducts);

module.exports = router;
