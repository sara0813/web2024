// verifyCode.js
let verificationCodeStore = {};

function storeVerificationCode(email, code) {
    // 인증번호와 이메일을 저장
    verificationCodeStore[email] = { code, timestamp: Date.now() };
}

function verifyCode(email, inputCode) {
    const stored = verificationCodeStore[email];

    if (!stored) {
        return false; // 인증번호가 존재하지 않음
    }

    // 인증번호 유효 기간 설정 (예: 10분)
    const isValid = Date.now() - stored.timestamp < 10 * 60 * 1000;
    if (!isValid) {
        delete verificationCodeStore[email]; // 유효 기간 초과시 삭제
        return false;
    }

    return stored.code === inputCode;
}

module.exports = {
    storeVerificationCode,
    verifyCode
};
