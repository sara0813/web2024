const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '10m' },  // 인증 코드 유효 기간 설정
});

const Verification = mongoose.model('Verification', verificationSchema);

module.exports = {Verification};
