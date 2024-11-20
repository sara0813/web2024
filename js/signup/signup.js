function register() {
    const nickname = document.getElementById("nickname").value;
    const studentId = document.getElementById("student-id").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const privacyPolicyChecked = document.getElementById("privacy-policy").checked;
    const termsOfServiceChecked = document.getElementById("terms-of-service").checked;
    const verificationCode = document.getElementById("verification-code").value;

    let valid = true;
    let errorMessage = '';

    // 입력값 검증
    if (!nickname) errorMessage = '닉네임을 입력해주세요.';
    else if (!isNicknameChecked) errorMessage = '닉네임 중복체크를 해주세요.';
    else if (!isNicknameValid) errorMessage = '이미 사용 중인 닉네임입니다.';
    else if (!studentId) errorMessage = '학번을 입력해주세요.';
    else if (studentId.length !== 8) errorMessage = '학번은 8자리로 입력해주세요.';
    else if (!email) errorMessage = '이메일을 입력해주세요.';
    else if (!verificationCode) errorMessage = '이메일 인증번호를 입력해주세요.';
    else if (document.getElementById("verification-code-error").textContent !== "인증 코드가 일치합니다.") errorMessage = '인증번호를 확인해주세요';
    else if (!password) errorMessage = '비밀번호를 입력해주세요.';
    else if (!confirmPassword) errorMessage = '비밀번호 확인을 입력해주세요.';
    else if (password !== confirmPassword) errorMessage = '비밀번호가 일치하지 않습니다.';
    else if (!privacyPolicyChecked || !termsOfServiceChecked) errorMessage = '개인정보 처리방침 및 이용약관에 동의해야 합니다.';

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

     // 서버로 전송할 데이터를 출력 (디버깅용)
     console.log({
        nickname,
        studentId,
        email,
        password,
        verificationCode,
    });
    
    // 회원가입 정보를 서버로 보내기

    const serverUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080'
    : 'http://10.10.15.133:9143';

    fetch(`${serverUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nickname,
            studentId,
            email,
            password,
            verificationCode
        })
    }).then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server responded with an error:', response.status, errorData);
            return Promise.reject(errorData.message || 'Unknown server error');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('회원가입이 완료되었습니다.');
            window.location.href = "../../html/login.html";
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`서버와의 연결에 문제가 발생했습니다: ${error}`);
    });
}