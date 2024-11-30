document.addEventListener("DOMContentLoaded", () => {
    const chatRoom = document.getElementById("chat-room");
    const messagesContainer = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");

    let currentRoomId = null; // 현재 방 ID

    // 로컬 저장소에서 채팅 목록 불러오기
    const chatList = JSON.parse(localStorage.getItem("chatList")) || [];

    // 메시지 보내기
    sendButton.addEventListener("click", () => {
        const messageText = messageInput.value.trim();
        if (messageText && currentRoomId) {
            // 메시지 저장
            const chatMessages = JSON.parse(localStorage.getItem(`chat_${currentRoomId}`)) || [];
            chatMessages.push({ text: messageText, self: true });
            localStorage.setItem(`chat_${currentRoomId}`, JSON.stringify(chatMessages));

            // 메시지 화면에 추가
            const messageElement = document.createElement("div");
            messageElement.className = "message self";
            messageElement.textContent = messageText;
            messagesContainer.appendChild(messageElement);
            messageInput.value = "";

            // 스크롤 최신 메시지로 이동
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // 서버로 메시지 전송 (Socket.IO)
            const socket = io("http://localhost:8080");
            socket.emit("chatMessage", { roomId: currentRoomId, message: messageText });
        }
    });

    // 서버에서 메시지 수신 처리
    const socket = io("http://localhost:8080");
    socket.on("chatMessage", (data) => {
        if (data.roomId === currentRoomId) {
            const messageElement = document.createElement("div");
            messageElement.className = "message";
            messageElement.textContent = data.message;
            messagesContainer.appendChild(messageElement);
        }
    });
});

// 채팅방 열기 함수
function openChatRoom(roomId, userName) {
    const chatRoom = document.getElementById("chat-room");
    const messagesContainer = document.getElementById("messages");

    // 현재 방 ID 업데이트
    currentRoomId = roomId;

    // 채팅 목록 숨기기, 채팅방 표시
    document.getElementById("chat-list").style.display = "none";
    chatRoom.style.display = "flex";

    // 채팅방 사용자명 표시
    const chatRoomHeader = document.getElementById("chat-room-header");
    chatRoomHeader.textContent = `${userName}님과의 대화`;

    // 방에 저장된 메시지 불러오기
    const chatMessages = JSON.parse(localStorage.getItem(`chat_${roomId}`)) || [];
    messagesContainer.innerHTML = ""; // 기존 메시지 초기화
    chatMessages.forEach((message) => {
        const messageElement = document.createElement("div");
        messageElement.className = message.self ? "message self" : "message";
        messageElement.textContent = message.text;
        messagesContainer.appendChild(messageElement);
    });
}
