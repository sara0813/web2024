function openChatRoom(chat) {
  const roomId = chat.id; // chat.id 확인
  if (!roomId) {
      console.error("Error: roomId is undefined! Check the chat object:", chat);
      return;
  }

  console.log(`Trying to join room: ${roomId}`);
  const chatWindowId = `chat-window-${roomId}`;
  let chatWindow = document.getElementById(chatWindowId);

  if (!chatWindow) {
      // 채팅창 생성
      chatWindow = document.createElement("div");
      chatWindow.id = chatWindowId;
      chatWindow.className = "chat-window";
      chatWindow.innerHTML = `
          <div id="chat-header">
              <h3>${chat.name}</h3>
              <button id="close-chat-${roomId}">닫기</button>
          </div>
          <div id="chat-messages-${roomId}" class="chat-messages"></div>
          <div id="chat-input-container">
              <input type="text" id="chat-input-${roomId}" placeholder="메시지를 입력하세요">
              <button id="send-message-${roomId}">보내기</button>
          </div>
      `;
      document.body.appendChild(chatWindow);

      // 기존 채팅 기록 로드
      const messagesContainer = document.getElementById(`chat-messages-${roomId}`);
      const storedMessages = JSON.parse(localStorage.getItem(`chat_${roomId}`)) || [];
      storedMessages.forEach((message) => {
          const messageElement = document.createElement("div");
          messageElement.className = message.self ? "chat-message self" : "chat-message other";
          messageElement.textContent = message.text;
          messagesContainer.appendChild(messageElement);
      });

      // 클라이언트가 방에 입장
      socket.emit("joinRoom", { roomId });
      console.log(`Emitting joinRoom event for roomId: ${roomId}`);

      // 메시지 전송
      document.getElementById(`send-message-${roomId}`).addEventListener("click", () => {
          const chatInput = document.getElementById(`chat-input-${roomId}`);
          const message = chatInput.value.trim();
          if (message) {
              // 서버로 메시지 전송
              socket.emit("chatMessage", { roomId, message });

              // 메시지 로컬 스토리지에 저장
              const newMessage = { text: message, self: true };
              storedMessages.push(newMessage);
              localStorage.setItem(`chat_${roomId}`, JSON.stringify(storedMessages));

              // 메시지 화면에 표시
              const messageElement = document.createElement("div");
              messageElement.className = "chat-message self";
              messageElement.textContent = message;
              messagesContainer.appendChild(messageElement);

              // 스크롤 최신 메시지로 이동
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

// 서버로부터 메시지 수신 처리
socket.on("chatMessage", (data) => {
  const { roomId, message } = data;

  console.log(`Message received in room ${roomId}: ${message}`);
  const messagesContainer = document.getElementById(`chat-messages-${roomId}`);
  if (messagesContainer) {
      const newMessage = document.createElement("div");
      newMessage.className = "chat-message other";
      newMessage.textContent = message;
      messagesContainer.appendChild(newMessage);

      // 메시지를 로컬 스토리지에 저장
      const storedMessages = JSON.parse(localStorage.getItem(`chat_${roomId}`)) || [];
      storedMessages.push({ text: message, self: false });
      localStorage.setItem(`chat_${roomId}`, JSON.stringify(storedMessages));

      // 최신 메시지로 스크롤
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } else {
      console.error(`No chat-messages container found for roomId: ${roomId}`);
  }
});