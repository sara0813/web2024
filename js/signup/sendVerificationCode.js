//sendVerificationCode.js

function validateEmailDomain(email) {
    const emailDomain = email.split('@')[1]; // '@' 뒤의 도메인 부분을 추출
    return emailDomain === 'seoultech.ac.kr'; // 도메인이 일치하는지 확인
}

function sendVerificationCode() {
    const email = document.getElementById("email").value;

    // 이메일 도메인 검증
    if (!validateEmailDomain(email)) {
        alert('유효한 이메일 도메인을 입력해주세요. (예: @seoultech.ac.kr)');
        return; // 유효하지 않으면 더 이상 진행하지 않음
    }

    fetch('/send-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Verification code sent successfully:", data.authCode);
            alert("인증 코드가 성공적으로 발송되었습니다!");  // 성공시 경고창
        } else {
            console.error("Failed to send verification code");
            alert("인증 코드 발송에 실패하였습니다. 다시 시도해 주세요.");  // 실패시 경고창
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("서버와의 연결에 실패하였습니다. 다시 시도해 주세요.");  // 네트워크 오류시 경고창
    });
}
