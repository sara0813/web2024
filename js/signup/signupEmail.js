function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const email = emailInput.value;

    // 이메일 도메인 검사 (학교 이메일인 경우만 유효)
    const emailDomainPattern = /@seoultech.ac.kr$/;

    if (emailDomainPattern.test(email)) {
        emailError.textContent = ""; // 이메일 도메인 오류 메시지 초기화
        return true; // 도메인 검사 통과
    } else {
        emailError.textContent = "도메인이 잘못되었습니다. @seoultech.ac.kr 이메일만 허용됩니다."; // 도메인 오류 메시지
        return false; // 도메인 오류
    }
}

// 이메일 입력 필드에서 포커스가 벗어날 때 도메인 검사를 수행
document.getElementById("email").addEventListener("blur", function() {
    validateEmail(); // 포커스가 벗어날 때 이메일 검증
});

// 이메일 인증 버튼 클릭 시 이메일 검증 함수 호출
document.getElementById("verify-email-btn").addEventListener("click", function() {
    const emailValid = validateEmail();

    if (emailValid) {
        // 이메일이 올바른 도메인일 경우 이메일 전송
        sendEmailVerification();
    }
    // 도메인 오류가 있을 경우 emailError가 이미 메시지를 보여줌
});

// 이메일 인증 함수
function sendEmailVerification() {
    const emailError = document.getElementById("email-error");

    // 도메인 오류가 없을 경우 이메일 전송 알림
    if (emailError.textContent === "") {
        alert("이메일이 전송되었습니다."); // 이메일 전송 성공 알림
    } else {
        alert("이메일 전송에 실패하였습니다."); // 이메일 전송 실패 알림
    }
}