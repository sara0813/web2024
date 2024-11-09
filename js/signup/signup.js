function register() {
    // 모든 필수 입력 필드 체크
    const nickname = document.getElementById("nickname").value;
    const studentId = document.getElementById("student-id").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const privacyPolicyChecked = document.getElementById("privacy-policy").checked;
    const termsOfServiceChecked = document.getElementById("terms-of-service").checked;

    let valid = true;

    // 닉네임 체크
    checkNickname();

    // 학번 검증
    validateStudentId();

    // 필수 체크박스 검증
    if (!privacyPolicyChecked || !termsOfServiceChecked) {
        alert('개인정보 처리방침 및 이용약관에 동의해야 합니다.');
        valid = false;
    }

    if (valid) {
        // 회원가입 기능 구현
        alert('회원가입이 완료되었습니다.');
    }
}

