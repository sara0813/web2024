const mongoose = require('mongoose');

// Verification 코드 스키마 정의
const verificationSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    code: { type: String, required: true }
}, { timestamps: true });

// Verification 모델 정의
const Verification = mongoose.model('Verification', verificationSchema);

module.exports = { Verification };
