document.addEventListener("DOMContentLoaded", () => {
    const chatListContainer = document.getElementById("chat-list");
    const chatRoom = document.getElementById("chat-room");
    const messagesContainer = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");

    const chatList = [
        { name: "사용자 A" },
        { name: "사용자 B" },
    ];

    if (chatList.length === 0) {
        const noChatMessage = document.createElement("div");
        noChatMessage.className = "no-chat";
        noChatMessage.textContent = "대화중인 상대가 없습니다.";
        chatListContainer.appendChild(noChatMessage);
    } else {
        chatList.forEach((chat) => {
            const chatItem = document.createElement("div");
            chatItem.className = "chat-item";
            chatItem.textContent = chat.name;
            chatItem.addEventListener("click", () => {
                // 채팅방 표시
                chatListContainer.style.display = "none";
                chatRoom.style.display = "flex";
                messagesContainer.innerHTML = ""; // 이전 대화 지우기
                const welcomeMessage = document.createElement("div");
                welcomeMessage.className = "message";
                welcomeMessage.textContent = `${chat.name}님과의 대화`;
                messagesContainer.appendChild(welcomeMessage);
            });
            chatListContainer.appendChild(chatItem);
        });
    }
});
