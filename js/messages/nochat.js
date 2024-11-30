document.addEventListener("DOMContentLoaded", () => {
    const chatListContainer = document.getElementById("chat-list");

    // 로컬 저장소에서 채팅 목록 불러오기
    const chatList = JSON.parse(localStorage.getItem("chatList")) || [];

    if (chatList.length === 0) {
        // 채팅 목록이 비어있을 경우
        chatListContainer.innerHTML = `<div class="no-chat">대화중인 상대가 없습니다.</div>`;
    } else {
        // 채팅 목록 생성
        chatList.forEach((chat) => {
            const chatItem = document.createElement("div");
            chatItem.className = "chat-item";
            chatItem.innerHTML = `
                <img src="${chat.image}" alt="${chat.name}" class="chat-image">
                <span>${chat.name}</span>
            `;
            chatItem.addEventListener("click", () => {
                // 채팅방 열기
                openChatRoom(chat.id, chat.name);
            });
            chatListContainer.appendChild(chatItem);
        });
    }
});

// 채팅방 열기 함수
function openChatRoom(roomId, userName) {
    const chatRoom = document.getElementById("chat-room");
    const messagesContainer = document.getElementById("messages");

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
