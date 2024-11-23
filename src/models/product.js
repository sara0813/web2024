const mongoose = require("mongoose");
const { MAX } = require("uuid");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [20, "상품명은 최대 20자까지 입력할 수 있습니다."],
      required: [true, "상품 이름은 필수입니다."],
    },
    category: {
      type: String,
      required: true,
      enum: ["전자기기", "생활용품", "화장품", "의류", "도서", "가구", "기타"],
      default: "기타",
    },
    description: {
      type: String,
      required: true,
      maxlength: [500, "설명은 최대 500자까지 입력할 수 있습니다."],
      minlength: [10, "설명은 최소 10자 이상이어야 합니다."],
    },
    price: {
      type: Number,
      required: true,
      max: 9999999999, 
      validate: {
        validator: function (value) {
          return value % 10 === 0; // 10으로 나누어 떨어지는지 확인
        },
        message: props => `${props.value} is not a multiple of 10!` // 유효하지 않을 때 표시할 메시지
      }
    },       
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
