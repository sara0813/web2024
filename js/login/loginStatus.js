document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const nickname = localStorage.getItem("nickname");

    if (isLoggedIn && nickname) {
        document.getElementById("welcome-message").textContent = `${nickname}님, 반갑습니다!`;
    } else {
        document.getElementById("welcome-message").textContent = "로그인 해주세요.";
    }
});
