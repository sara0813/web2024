function isLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "false";
}

function f1a() {
    if (!isLoggedIn()) {
        alert("로그인 후 이용해주세요");
        document.getElementById("tab-register").checked = false;
        return;
    }
    location.href = '/html/register.html';
}
function f2a() {
    if (!isLoggedIn()) {
        alert("로그인 후 이용해주세요");
        document.getElementById("tab-search").checked = false;
        return;
    }
    location.href = '/html/search.html';
}

function f3a() {
    if (!isLoggedIn()) {
        alert("로그인 후 이용해주세요");
        document.getElementById("tab-messages").checked = false;
        return;
    }
    location.href = '/html/messages.html';
}

function f4a() {
    if (!isLoggedIn()) {
        alert("로그인 후 이용해주세요");
        document.getElementById("tab-profile").checked = false;
        return;
    }
    location.href = '/html/profile.html';
}

function f1() {
    location.href = '/html/register.html';
}

function f2() {
    location.href = '/html/search.html';
}

function f3() {
    location.href = '/html/messages.html';
}

function f4() {
    location.href = '/html/profile.html';
}

document.oncontextmenu = function () { return false; }