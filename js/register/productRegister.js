const form = document.getElementById('productForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form); // FormData 객체 사용

    const userNickname = localStorage.getItem('nickname'); // 실제 로그인 정보를 활용하여 닉네임을 가져오세요

    formData.append('seller', userNickname); // seller는 `nickname`을 의미

    const response = await fetch('/api/register', {  // '/submit-product' -> '/api/register'
        method: 'POST',
        body: formData,  // FormData를 보냄
    });

    const result = await response.json();
    alert(result.message);
});
