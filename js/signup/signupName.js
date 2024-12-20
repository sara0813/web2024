// 전역 변수 선언
let isNicknameChecked = false;   // 닉네임 확인 상태
let isNicknameValid = false;     // 닉네임 유효성

// 닉네임 확인 함수
function checkNickname() {
    const nicknameInput = document.getElementById('nickname');
    const nicknameError = document.getElementById('nickname-error');
    const nickname = nicknameInput.value.trim(); // 입력값 앞뒤 공백 제거

    // 닉네임 입력이 비어있는지 확인
    if (!nickname) {
        displayError("닉네임을 입력하세요.");
        isNicknameValid = false;
        isNicknameChecked = true;
        return;
    }

    // 닉네임 유효성 검사 (예: 길이 체크, 특수문자 등)
    if (nickname.length > 10) {
        displayError("닉네임은 10자 이내여야 합니다.");
        isNicknameValid = false;
        isNicknameChecked = true;
        return;
    }

    // 서버에 AJAX 요청을 보내 닉네임 중복 체크
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/auth/checkNickname', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.exists) {  // 서버에서 닉네임 중복 여부 확인
                displayError("이미 사용 중인 닉네임입니다.");
                isNicknameValid = false;
            } else {
                displaySuccess("사용 가능한 닉네임입니다.");
                isNicknameValid = true;
            }
        } else {
            displayError("서버 오류가 발생했습니다. 나중에 다시 시도해주세요.");
            isNicknameValid = false;
        }
        isNicknameChecked = true;
    };
    xhr.onerror = function() {
        displayError("서버와의 연결이 실패했습니다.");
        isNicknameValid = false;
        isNicknameChecked = true;
    };

    const data = JSON.stringify({ nickname: nickname });
    xhr.send(data);
}

// 에러 메시지 표시 함수
function displayError(message) {
    const nicknameError = document.getElementById('nickname-error');
    nicknameError.textContent = message;
    nicknameError.className = 'error';
}

// 성공 메시지 표시 함수
function displaySuccess(message) {
    const nicknameError = document.getElementById('nickname-error');
    nicknameError.textContent = message;
    nicknameError.className = 'success';
}
