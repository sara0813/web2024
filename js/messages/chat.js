document.addEventListener("DOMContentLoaded", () => {
    const chatListContainer = document.getElementById("chat-list");
    const chatRoom = document.getElementById("chat-room");
    const messagesContainer = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");

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
                // 선택한 채팅방으로 이동
                chatListContainer.style.display = "none";
                chatRoom.style.display = "flex";
                messagesContainer.innerHTML = `<div class="message">"${chat.name}"에 대한 대화</div>`;
            });
            chatListContainer.appendChild(chatItem);
        });
    }

    // 메시지 보내기
    sendButton.addEventListener("click", () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const message = document.createElement("div");
            message.className = "message self";
            message.textContent = messageText;
            messagesContainer.appendChild(message);
            messageInput.value = "";
        }
    });
});

