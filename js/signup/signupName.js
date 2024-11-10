function checkNickname() {
    const nicknameInput = document.getElementById('nickname');
    const nicknameError = document.getElementById('nickname-error');
    
    const nickname = nicknameInput.value;

    // 예시: 닉네임 사용 가능 여부를 확인하는 로직
    if (nickname) {
        // 여기에 중복 체크 로직을 추가하여 닉네임이 사용 가능한지 확인합니다.
        if (nickname === "사용불가닉네임") { // 예시: 사용 불가한 닉네임
            nicknameError.textContent = "이미 사용 중인 닉네임입니다.";
            nicknameError.className = 'error'; // 에러 스타일 클래스 추가
            isNicknameValid = false;
        } else {
            nicknameError.textContent = "사용 가능한 닉네임입니다.";
            nicknameError.className = 'success'; // 성공 스타일 클래스 추가
            isNicknameValid = true;
        }
    } else {
        // 닉네임이 입력되지 않은 경우
        nicknameError.textContent = "닉네임을 입력하세요.";
        nicknameError.className = 'error'; // 에러 스타일 클래스 추가
        isNicknameValid = false;
    }

    // 중복체크가 완료되면 isNicknameChecked를 true로 설정
    isNicknameChecked = true;
}
