// 로그인 상태 확인 및 UI 업데이트 함수
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/auth/user')  // 서버의 로그인 상태 확인 API 호출
        .then(response => response.json())
        .then(data => {
            const userInfoDiv = document.getElementById('user-info');
            const welcomeMsg = document.getElementById('welcome-msg');
            const registerBtn = document.getElementById('register-btn');
            const loginBtn = document.getElementById('login-btn');
            
            // 로그인된 경우
            if (data.loggedIn) {
                welcomeMsg.textContent = `${data.nickname}님 반갑습니다`; // 닉네임 표시
                userInfoDiv.style.display = 'block'; // 사용자 정보 영역 보이기
                registerBtn.style.display = 'none';  // 회원가입 버튼 숨기기
                loginBtn.style.display = 'none';     // 로그인 버튼 숨기기
            } else {
                // 로그인되지 않은 경우
                userInfoDiv.style.display = 'none'; // 사용자 정보 영역 숨기기
                registerBtn.style.display = 'block'; // 회원가입 버튼 보이기
                loginBtn.style.display = 'block';    // 로그인 버튼 보이기
            }
        })
        .catch(error => console.error('로그인 상태 확인 실패:', error));
});

// 로그아웃 버튼 클릭 시
document.getElementById('logout-btn')?.addEventListener('click', () => {
    fetch('/api/auth/logout', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            location.reload(); // 로그아웃 후 페이지 새로고침
        }
    })
    .catch(error => console.error('로그아웃 실패:', error));
});
