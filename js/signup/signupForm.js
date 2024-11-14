const form = document.getElementById('signup-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nickname = document.getElementById('nickname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname, email, password }),
  });

  const data = await response.json();
  if (response.status === 201) {
    alert(data.message);
  } else {
    alert('회원가입에 실패했습니다.');
  }
});
