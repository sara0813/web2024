function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "false";
}

function f1() {
    if (!isLoggedIn()) {
        alert("로그인 후 이용해주세요");
        document.getElementById("tab-register").checked = false;
        return;
    }
    location.href = '/html/register.html';
}
function f2() {
    if (!isLoggedIn()) {
        alert("로그인 후 이용해주세요");
        document.getElementById("tab-search").checked = false;
        return;
    }
    location.href = '/html/search.html';
}

function f3() {
    if (!isLoggedIn()) {
        alert("로그인 후 이용해주세요");
        document.getElementById("tab-messages").checked = false;
        return;
    }
    location.href = '/html/messages.html';
}

function f4() {
    if (!isLoggedIn()) {
        alert("로그인 후 이용해주세요");
        document.getElementById("tab-profile").checked = false;
        return;
    }
    location.href = '/html/profile.html';
}

document.oncontextmenu = function () { return false; }