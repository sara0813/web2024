// 비밀번호 확인 함수
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const confirmPasswordError = document.getElementById('confirm-password-error');

    // 비밀번호 확인 필드에 입력이 있을 때만 확인
    if (confirmPassword !== '' && password !== confirmPassword) {
        confirmPasswordError.textContent = '비밀번호가 일치하지 않습니다.';
    } else {
        // 비밀번호가 일치하면 오류 메시지 제거
        confirmPasswordError.textContent = '';
    }
}

// 비밀번호 확인 필드에서 포커스가 벗어날 때 확인
document.getElementById('confirm-password').addEventListener('blur', validatePasswordMatch);

// 비밀번호 확인 입력값이 수정될 때마다 오류 메시지를 즉시 제거
document.getElementById('confirm-password').addEventListener('input', function() {
    const confirmPasswordError = document.getElementById('confirm-password-error');
    if (confirmPasswordError.textContent !== '') {
        validatePasswordMatch();
    }
});

// 회원가입 버튼 클릭 시 비밀번호 일치 여부 확인
document.getElementById('signup-btn').addEventListener('click', function(event) {
    const confirmPasswordError = document.getElementById('confirm-password-error');
    if (confirmPasswordError.textContent !== '') {
        event.preventDefault();  // 비밀번호가 일치하지 않으면 폼 제출 방지
    }
});
