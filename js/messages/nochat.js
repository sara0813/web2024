document.addEventListener("DOMContentLoaded", () => {
    const messagesContainer = document.getElementById("messages");
    
    // 예시: 대화 목록이 비어있음
    const chatList = []; // 채팅 데이터 리스트 (API 연동 시 업데이트)

    if (chatList.length === 0) {
        const noChatMessage = document.createElement("div");
        noChatMessage.className = "no-chat";
        noChatMessage.textContent = "대화중인 상대가 없습니다.";
        messagesContainer.appendChild(noChatMessage);
    } else {
        chatList.forEach((chat) => {
            const chatMessage = document.createElement("div");
            chatMessage.className = "message";
            chatMessage.textContent = chat.message; // API 데이터 활용
            messagesContainer.appendChild(chatMessage);
        });
    }
});
