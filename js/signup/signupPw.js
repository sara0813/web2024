function showPasswordRequirements() {
    const passwordError = document.getElementById('password-error');
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

    if (!isValidLength) {
        passwordError.textContent = "비밀번호는 8자리 이상이어야 합니다.";
    } else if (!containsLetter) {
        passwordError.textContent = "비밀번호는 문자를 1개 이상 포함해야 합니다.";
    } else if (!containsNumber) {
        passwordError.textContent = "비밀번호는 숫자를 1개 이상 포함해야 합니다.";
    } else if (!containsSpecialChar) {
        passwordError.textContent = "비밀번호는 특수문자를 1개 이상 포함해야 합니다.";
    } else {
        passwordError.textContent = "";
    }

    if (passwordError.textContent !== "") {
        passwordError.classList.add('password-error');
        passwordError.classList.remove('password-requirements');
    }
}

document.getElementById('password').addEventListener('focus', showPasswordRequirements);
document.getElementById('password').addEventListener('blur', checkPasswordCompletion);
