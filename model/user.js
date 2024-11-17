const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  nickname: {
    type: String,
    maxlength: 10,
    required: true,
  },
  studentId: {
    type: String,
    unique: true,
    required: true,
    minlength: 8,
    maxlength: 8,
    match: [/^[0-9]{8}$/, '학번은 숫자 8자리여야 합니다.'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: [/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, '비밀번호는 8자 이상이어야 하며, 문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.'],
  },
});

//비밀번호 해싱 전처리
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
