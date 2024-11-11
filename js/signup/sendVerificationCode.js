// 이메일 인증 코드 발송 함수
function sendVerificationCode() {
    const email = document.getElementById('email').value;
    if (validateEmail(email)) {
        fetch('/send-verification-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('인증번호가 발송되었습니다.');
              } else {
                  alert('이메일 전송에 실패했습니다.');
              }
          }).catch(error => {
              console.error('Error:', error);
          });
    } else {
        alert('올바른 이메일 주소를 입력해주세요.');
    }
}