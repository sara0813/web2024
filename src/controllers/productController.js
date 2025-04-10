const { Product } = require("../models/product");

exports.getProductsById = async (id) => {
  return await Product.findById(id);
};

exports.submitProduct = async (req, res) => {
  try {
    console.log("Received productId:", req.params.id);
    
    const {name, category, description, price } = req.body;

    // 이미지 파일 처리: 절대 경로 대신 상대 경로 저장
    const images = req.files.map((file) => `/uploads/${file.filename}`);

    // 필수 값 확인
    if (!name || !description || !price || images.length === 0) {
      return res.status(400).send("모든 필수 값을 입력해야 합니다.");
    }

    const product = new Product({
      name,
      category,
      description,
      price,
      images,
    });

    const savedProduct = await product.save();
    res.status(201).send({ message: "상품이 성공적으로 등록되었습니다.", product: savedProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};


exports.getProducts = async (req, res) => {
  try {
    // Product 데이터 가져오기
    const products = await Product.find(); // populate 제거

    // 데이터 반환
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};

// 상품 검색
exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.query || '';
    const category = req.query.category || '';

    const filter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },          // 제목 검색
        { description: { $regex: query, $options: 'i' } },  // 내용 검색
        { category: { $regex: query, $options: 'i' } },     // 카테고리 검색
      ],
      ...(category && { category }), // 특정 카테고리 필터 (옵션)
    };

    const products = await Product.find(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in searchProducts:", error);
    res.status(500).json({ error: '검색 중 서버 오류가 발생했습니다.' });
  }
};
