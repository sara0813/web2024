function sendVerificationCode() {
    const email = document.getElementById("email").value;
    
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

