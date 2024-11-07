function sendEmailVerification() {
    // 이메일 인증번호 전송 기능 구현
    alert('인증번호 전송 기능은 아직 구현되지 않았습니다.');
}

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

    // 이메일 도메인 검증
    const emailError = document.getElementById("email-error");
    emailError.textContent = '';
    if (!email.endsWith('@seoultech.ac.kr')) {
        emailError.textContent = '학교 이메일만 사용 가능합니다.';
        valid = false;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        valid = false;
    }

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

