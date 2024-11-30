const socket = io("http://localhost:8080"); // Socket.IO 서버와 연결

// 채팅 시작
function startChat(productId) {
    // 상품 ID를 방 ID로 사용
    socket.emit("joinRoom", { roomId: productId });
    document.getElementById("chat-room").style.display = "block";
}

// 메시지 전송
document.getElementById("send-btn").addEventListener("click", () => {
    const message = document.getElementById("message-input").value.trim();
    const productId = document.getElementById("chat-room").dataset.roomId; // 방 ID 가져오기
    if (message) {
        socket.emit("chatMessage", { roomId: productId, message });
        document.getElementById("message-input").value = "";
    }
});

// 서버에서 메시지 수신 처리
socket.on("chatMessage", (data) => {
    const { message } = data;
    const messagesDiv = document.getElementById("messages");
    const newMessage = document.createElement("div");
    newMessage.className = "message";
    newMessage.textContent = message;
    messagesDiv.appendChild(newMessage);
});
