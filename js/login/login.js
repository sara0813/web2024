document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log(email, password);  // 확인용 로그 추가

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (result.success) {
        alert("로그인 성공!");
        window.location.href = "../index.html"; // 예시로 /home 페이지로 이동
    } else {
        alert("로그인 실패: " + result.message);
    }
});
