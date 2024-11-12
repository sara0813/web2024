let isNicknameChecked = false;
let isNicknameValid = false;

function checkNickname() {
    const nicknameInput = document.getElementById('nickname');
    const nicknameError = document.getElementById('nickname-error');
    const nickname = nicknameInput.value;

    // 닉네임 입력이 비어있는지 확인
    if (!nickname) {
        nicknameError.textContent = "닉네임을 입력하세요.";
        nicknameError.className = 'error'; // 에러 스타일 클래스 추가
        isNicknameValid = false;
        isNicknameChecked = true;
        return; // 닉네임이 없으면 더 이상 진행하지 않음
    }

    // 닉네임 유효성 검사 (예: 길이 체크, 특수문자 등)
    if (nickname.length < 3 || nickname.length > 15) {
        nicknameError.textContent = "닉네임은 3자 이상 15자 이내여야 합니다.";
        nicknameError.className = 'error';
        isNicknameValid = false;
        isNicknameChecked = true;
        return;
    }

    // 서버에 AJAX 요청을 보내 닉네임 중복 체크
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/check-nickname', true); // 서버의 중복 체크 API 엔드포인트
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            if (response.isDuplicate) {
                nicknameError.textContent = "이미 사용 중인 닉네임입니다.";
                nicknameError.className = 'error'; // 에러 스타일 클래스 추가
                isNicknameValid = false;
            } else {
                nicknameError.textContent = "사용 가능한 닉네임입니다.";
                nicknameError.className = 'success'; // 성공 스타일 클래스 추가
                isNicknameValid = true;
            }
        } else {
            nicknameError.textContent = "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.";
            nicknameError.className = 'error'; // 에러 스타일 클래스 추가
            isNicknameValid = false;
        }
        isNicknameChecked = true; // 중복 체크 완료
    };
    xhr.onerror = function() {
        nicknameError.textContent = "서버와의 연결이 실패했습니다.";
        nicknameError.className = 'error'; // 에러 스타일 클래스 추가
        isNicknameValid = false;
        isNicknameChecked = true;
    };

    // 요청 데이터
    const data = JSON.stringify({ nickname: nickname });
    xhr.send(data);
}
