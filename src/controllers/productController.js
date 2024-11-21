const { Product } = require("../models/product");

exports.submitProduct = async (req, res) => {
  try {
    const { name, category, description, price } = req.body;

    // 이미지 파일 처리
    const images = req.files.map(file => file.path); // 업로드된 파일 경로 저장

    // 필수 값 확인
    if (!name || !description || !price || images.length === 0) {
      return res.status(400).send("모든 필수 값을 입력해야 합니다.");
    }

    // Product 생성
    const product = new Product({
      name,
      category,
      description,
      price,
      images,
    });

    await product.save();
    res.status(201).send("상품이 성공적으로 등록되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};
