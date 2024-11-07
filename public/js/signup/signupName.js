// 닉네임
function checkNickname() {
    const nicknameInput = document.getElementById('nickname');
    const nicknameError = document.getElementById('nickname-error');
    
    const nickname = nicknameInput.value;

    // 예시: 닉네임 사용 가능 여부를 확인하는 로직
    if (nickname) {
        // 닉네임이 사용 가능하다고 가정
        nicknameError.textContent = "사용 가능한 닉네임입니다.";
        nicknameError.className = 'success'; // 성공 스타일 클래스 추가
    } else {
        // 닉네임이 입력되지 않은 경우
        nicknameError.textContent = "닉네임을 입력하세요.";
        nicknameError.className = 'error'; // 에러 스타일 클래스 추가
    }

    // 여기에 추가적인 로직을 추가하여 닉네임 중복 여부를 체크할 수 있습니다.
}
