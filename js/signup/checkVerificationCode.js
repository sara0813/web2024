function checkVerificationCode() {
    const enteredCode = document.getElementById("verification-code").value;

    if (!enteredCode) {
        document.getElementById("verification-code-error").innerText = "인증번호를 입력해주세요.";
        document.getElementById("verification-code-error").classList.remove("success");
        document.getElementById("verification-code-error").classList.add("error");
        return;
    }

    fetch("http://localhost:3000/verify-code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            code: enteredCode // 인증 코드 전송
        })
    })
    .then(response => response.json())
    .then(data => {
        const errorMessageElement = document.getElementById("verification-code-error");

        if (data.success) {
            errorMessageElement.innerText = "인증 코드가 일치합니다.";
            errorMessageElement.classList.remove("error");
            errorMessageElement.classList.add("success");
        } else {
            errorMessageElement.innerText = "인증 코드가 일치하지 않습니다. 다시 시도해 주세요.";
            errorMessageElement.classList.remove("success");
            errorMessageElement.classList.add("error");
        }
    })
    .catch(error => {
        console.error("인증번호 확인 중 오류 발생:", error);
        const errorMessageElement = document.getElementById("verification-code-error");
        errorMessageElement.innerText = "인증번호 확인 중 오류가 발생했습니다.";
        errorMessageElement.classList.remove("success");
        errorMessageElement.classList.add("error");
    });
}
