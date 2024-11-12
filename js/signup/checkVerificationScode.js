// 인증번호 확인 함수
function checkVerificationCode() {
    const email = document.getElementById("email").value;
    const verificationCodeInput = document.getElementById("verification-code").value;

    if (!email || !verificationCodeInput) {
        alert("이메일과 인증번호를 모두 입력해주세요.");
        return;
    }

    // 서버에 인증번호 확인 요청 보내기 (AJAX)
    fetch('/verify-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            verificationCode: verificationCodeInput,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("인증번호가 일치합니다.");
        } else {
            document.getElementById("verification-code-error").innerText = "인증번호가 일치하지 않습니다.";
        }
    })
    .catch(error => {
        console.error("인증번호 확인 중 오류 발생:", error);
        alert("오류가 발생했습니다. 다시 시도해주세요.");
    });
}
