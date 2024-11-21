const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // 필수 항목
  },
  category: {
    type: String,
    required: true, // 필수 항목
    default: "general", // 기본 카테고리 설정
  },
  description: {
    type: String,
    required: true, // 필수 항목
    maxlength: 500, // 설명 최대 길이 제한
  },
  price: {
    type: Number,
    required: true, // 필수 항목
  },
  images: {
    type: [String],
    required: true, // 이미지 배열 필수
    validate: {
      validator: function (v) {
        return v && v.length > 0; // 최소 1개 이상의 이미지가 있어야 함
      },
      message: "상품 이미지를 최소 1개 이상 업로드해야 합니다.",
    },
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // 판매자 정보를 User 모델과 연결
    required: true, // 필수 항목
  },
}, { timestamps: true }); // 생성 및 수정 시간 자동 기록

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
