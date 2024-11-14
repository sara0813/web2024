// 회원가입 함수
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

    console.log("회원가입 시작"); // 디버깅용 로그 추가

    // 필수 입력값 체크
    if (!nickname) {
        errorMessage = '닉네임을 입력해주세요.';
    } else if (!studentId) {
        errorMessage = '학번을 입력해주세요.';
    } else if (!email) {
        errorMessage = '이메일을 입력해주세요.';
    } else if (!password) {
        errorMessage = '비밀번호를 입력해주세요.';
    } else if (!confirmPassword) {
        errorMessage = '비밀번호 확인을 입력해주세요.';
    } else if (!privacyPolicyChecked || !termsOfServiceChecked) {
        errorMessage = '개인정보 처리방침 및 이용약관에 동의해야 합니다.';
    } else if (!isNicknameChecked) {
        errorMessage = '닉네임 중복체크를 해주세요.';
    } else if (!isNicknameValid) {
        errorMessage = '이미 사용 중인 닉네임입니다.';
    }

    // 상태 확인 로그
    console.log("중복체크 상태:", isNicknameChecked, "닉네임 유효:", isNicknameValid);

    if (errorMessage) {
        alert(errorMessage);
        return; // 경고창이 뜨면 바로 종료
    }
    
    // 학번 검증
    validateStudentId();
    const studentIdError = document.getElementById('student-id-error').textContent;
    if (studentIdError) {
        alert(studentIdError);
        return;
    }

    // 이메일 도메인 체크 (학교 이메일)
    const isEmailValid = validateEmail();
    if (!isEmailValid) {
        alert('유효한 이메일 도메인을 입력해주세요. (예: @seoultech.ac.kr)');
        return;
    }

    // 비밀번호 강도 체크
    checkPasswordCompletion();
    const passwordError = document.getElementById('password-error').textContent;
    if (passwordError) {
        alert("passwordError");
        return;
    }

    // 비밀번호 확인 일치 여부 체크
    validatePasswordMatch();
    const confirmPasswordError = document.getElementById('confirm-password-error').textContent;
    if (confirmPasswordError) {
        alert(confirmPasswordError);
        return;
    }

    // 모든 조건이 통과한 경우
    alert('회원가입이 완료되었습니다.');
}
