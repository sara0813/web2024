function register() {
    const nickname = document.getElementById("nickname").value;
    const studentId = document.getElementById("student-id").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const privacyPolicyChecked = document.getElementById("privacy-policy").checked;
    const termsOfServiceChecked = document.getElementById("terms-of-service").checked;

    let valid = true;
    let errorMessage = '';

    if (!nickname) {
        errorMessage = '닉네임을 입력해주세요.';
    } 
    else if (!isNicknameChecked) {
        errorMessage = '닉네임 중복체크를 해주세요.';
    } 
    else if (!isNicknameValid) {
        errorMessage = '이미 사용 중인 닉네임입니다.';
    } 
    else if (!studentId) {
        errorMessage = '학번을 입력해주세요.';
    }
    else if (studentId.length !== 8) {
        errorMessage = '학번은 8자리로 입력해주세요.';
    }
    else if (!email) {
        errorMessage = '이메일을 입력해주세요.';
    } 
    else if (!document.getElementById("verification-code").value) {
        errorMessage = '이메일 인증번호를 입력해주세요.';
    }
    else if (document.getElementById("verification-code-error").textContent !== "인증 코드가 일치합니다.") {
        errorMessage = '인증번호를 확인해주세요';
    }
    else if (!password) {
        errorMessage = '비밀번호를 입력해주세요.';
    }
    else if (!confirmPassword) {
        errorMessage = '비밀번호 확인을 입력해주세요.';
    }
    else if (password !== confirmPassword) {
        errorMessage = '비밀번호가 일치하지 않습니다.';
    }
    else if (!privacyPolicyChecked || !termsOfServiceChecked) {
        errorMessage = '개인정보 처리방침 및 이용약관에 동의해야 합니다.';
    }

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    alert('회원가입이 완료되었습니다.');
    window.location.href = "../../html/login.html";
}
