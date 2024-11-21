const { Product } = require("../models/product");
const { User } = require("../models/User"); // User 모델 가져오기

exports.submitProduct = async (req, res) => {
  try {
    const { name, category, description, price, images, sellerName } = req.body;

    // sellerName으로 User를 찾기
    const seller = await User.findOne({ name: sellerName });

    if (!seller) {
      return res.status(400).send("판매자를 찾을 수 없습니다.");
    }

    // Product 생성
    const product = new Product({
      name,
      category,
      description,
      price,
      images,
      seller: seller._id, // 올바른 ObjectId 값 넣기
    });

    await product.save();
    res.status(201).send("상품이 성공적으로 등록되었습니다.");
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};