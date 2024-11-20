//sendVerificationCode.js

function validateEmailDomain(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@seoultech.ac.kr$/; // 서울과학기술대학교 이메일 형식 정규식
    return emailPattern.test(email);
}

function sendVerificationCode() {
    const email = document.getElementById("email").value;

    // 이메일 도메인 검증
    if (!validateEmailDomain(email)) {
        alert('유효한 이메일 도메인을 입력해주세요. (@seoultech.ac.kr)');
        return; // 유효하지 않으면 더 이상 진행하지 않음
    }

    fetch('/api/verification/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("Verification code sent successfully:", data.verificationCode);  // 인증 코드 출력
            alert("인증 코드가 성공적으로 발송되었습니다!");  // 성공시 경고창
        } else {
            console.error("Failed to send verification code:", data.message);
            alert("인증 코드 발송에 실패하였습니다. 다시 시도해 주세요.");  // 실패시 경고창
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("서버와의 연결에 실패하였습니다. 다시 시도해 주세요.");  // 네트워크 오류시 경고창
    });
}
