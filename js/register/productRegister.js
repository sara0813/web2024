const form = document.getElementById('productForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form); // FormData 객체 사용

    const response = await fetch('/api/register', {  // '/submit-product' -> '/api/register'
        method: 'POST',
        body: formData,  // FormData를 보냄
    });

    const result = await response.json();
    alert(result.message);
});
