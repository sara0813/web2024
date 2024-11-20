document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', async (event) => {
      event.preventDefault(); // 폼 기본 동작 방지

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
          const response = await fetch('/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
          });

          const result = await response.json();

          if (response.ok && result.success) {
              alert('로그인 성공!');
              window.location.href = '../index.html'; // 메인 페이지로 이동
          } else {
              alert(result.message || '로그인 실패. 이메일과 비밀번호를 확인하세요.');
          }
      } catch (error) {
          console.error('로그인 요청 중 오류 발생:', error);
          alert('서버와의 통신에 실패했습니다.');
      }
  });
});
