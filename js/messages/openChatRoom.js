function openChatRoom(chat) {
    const { id: roomId, name } = chat;

    if (!roomId) {
        console.error("Error: roomId is undefined! Check the chat object:", chat);
        return;
    }

    let chatWindow = document.getElementById(`chat-window-${roomId}`);
    if (!chatWindow) {
        chatWindow = document.createElement("div");
        chatWindow.id = `chat-window-${roomId}`;
        chatWindow.className = "chat-window active";
        chatWindow.innerHTML = `
            <div id="chat-header">
                <h3>${name}</h3>
                <button id="close-chat-${roomId}">닫기</button>
            </div>
            <div id="chat-messages-${roomId}" class="chat-messages"></div>
            <div id="chat-input-container">
                <input type="text" id="chat-input-${roomId}" placeholder="메시지를 입력하세요">
                <button id="send-message-${roomId}">보내기</button>
            </div>
        `;
        document.body.appendChild(chatWindow);

        const messagesContainer = document.getElementById(`chat-messages-${roomId}`);

        // 저장된 메시지 불러오기
        const storedMessages = JSON.parse(localStorage.getItem(`chat_${roomId}`)) || [];
        storedMessages.forEach((msg) => {
            const messageElement = document.createElement("div");
            messageElement.className = msg.self ? "chat-message self" : "chat-message other";
            messageElement.textContent = msg.text;
            messagesContainer.appendChild(messageElement);
        });

        // 메시지 전송
        document.getElementById(`send-message-${roomId}`).addEventListener("click", () => {
            const chatInput = document.getElementById(`chat-input-${roomId}`);
            const message = chatInput.value.trim();
            if (message) {
                // 메시지 저장 및 화면 출력
                const newMessage = { text: message, self: true };
                storedMessages.push(newMessage);
                localStorage.setItem(`chat_${roomId}`, JSON.stringify(storedMessages));

                const messageElement = document.createElement("div");
                messageElement.className = "chat-message self";
                messageElement.textContent = message;
                messagesContainer.appendChild(messageElement);

                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                chatInput.value = "";
            }
        });

        // 채팅창 닫기
        document.getElementById(`close-chat-${roomId}`).addEventListener("click", () => {
            document.body.removeChild(chatWindow);
        });
    } else {
        console.log(`Chat window for roomId: ${roomId} already exists.`);
    }
}
