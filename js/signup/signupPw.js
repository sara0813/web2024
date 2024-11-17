function showPasswordRequirements() {
    const passwordError = document.getElementById('password-error');
    // 비밀번호 조건을 안내하는 문구를 추가
    passwordError.textContent = "8자리 이상, 문자/숫자/특수문자 각각 1개 이상 포함";
    passwordError.classList.add('password-requirements');
    passwordError.classList.remove('password-error');
}

function checkPasswordCompletion() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');
    const passwordValue = passwordInput.value;

    const isValidLength = passwordValue.length >= 8;
    const containsLetter = /[a-zA-Z]/.test(passwordValue);
    const containsNumber = /[0-9]/.test(passwordValue);
    const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

    // 조건을 모두 만족하면 에러 메시지를 지우고 문구를 없앤다
    if (isValidLength && containsLetter && containsNumber && containsSpecialChar) {
        passwordError.textContent = ""; // 비밀번호가 조건을 만족하면 문구를 비운다
        passwordError.classList.remove('password-error');
        passwordError.classList.add('password-requirements');
    } else {
        // 조건에 맞지 않으면 에러 메시지 처리
        if (!isValidLength) {
            passwordError.textContent = "비밀번호는 8자리 이상이어야 합니다.";
        } else if (!containsLetter) {
            passwordError.textContent = "비밀번호는 문자를 1개 이상 포함해야 합니다.";
        } else if (!containsNumber) {
            passwordError.textContent = "비밀번호는 숫자를 1개 이상 포함해야 합니다.";
        } else if (!containsSpecialChar) {
            passwordError.textContent = "비밀번호는 특수문자를 1개 이상 포함해야 합니다.";
        }

        passwordError.classList.add('password-error');
        passwordError.classList.remove('password-requirements');
    }
}

// 'input' 이벤트를 사용하여 실시간으로 비밀번호 조건을 확인
document.getElementById('password').addEventListener('input', checkPasswordCompletion);

// 포커스를 받았을 때 조건 안내 문구 표시
document.getElementById('password').addEventListener('focus', showPasswordRequirements);
