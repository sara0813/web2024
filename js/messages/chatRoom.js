document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const roomId = params.get("id");
    const roomName = decodeURIComponent(params.get("name"));

    if (!roomId) {
        alert("올바르지 않은 방 ID입니다.");
        window.location.href = "/html/messages.html";
        return;
    }

    const chatRoomTitle = document.getElementById("chat-room-title");
    const messagesDiv = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");

    chatRoomTitle.textContent = `${roomName}님과의 대화`;

    const socket = io("http://localhost:8080");

    // 방에 입장
    socket.emit("joinRoom", { roomId });

    // 메시지 표시 함수
    const appendMessage = (message, isSelf = false) => {
        const newMessage = document.createElement("div");
        newMessage.className = `message ${isSelf ? "self" : "other"}`;
        newMessage.textContent = message;
        messagesDiv.appendChild(newMessage);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };

    // 서버에서 메시지 수신
    socket.on("chatMessage", ({ roomId: receivedRoomId, message }) => {
        if (receivedRoomId === roomId) {
            appendMessage(message);
        }
    });

    // 메시지 전송
    sendButton.addEventListener("click", () => {
        const message = messageInput.value.trim();
        if (message) {
            socket.emit("chatMessage", { roomId, message });
            appendMessage(message, true);
            messageInput.value = "";
        }
    });
});
