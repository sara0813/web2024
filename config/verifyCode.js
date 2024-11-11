// verifyCode.js
let storedVerificationCode = null; // 이메일로 전송된 인증 코드를 저장

// 인증 코드 저장 함수 (이메일 전송 후 호출)
function storeVerificationCode(code) {
    storedVerificationCode = code;
}

// 사용자가 입력한 인증 코드 확인 함수
function verifyEnteredCode(userInputCode) {
    if (storedVerificationCode === null) {
        console.log("인증 코드가 존재하지 않습니다.");
        return false;
    }
    
    if (userInputCode === storedVerificationCode) {
        console.log("인증 코드가 일치합니다.");
        return true;
    } else {
        console.log("인증 코드가 일치하지 않습니다.");
        return false;
    }
}

module.exports = {
    storeVerificationCode,
    verifyEnteredCode
};
