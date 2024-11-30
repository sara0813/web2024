const socket = io('http://localhost:8080');

socket.on('chatMessage', (data) => {
  const { roomId, message } = data;
  const messagesDiv = document.getElementById(`chat-messages-${roomId}`);
  if (messagesDiv) {
    const newMessage = document.createElement('div');
    newMessage.className = 'chat-message other';
    newMessage.textContent = message;
    messagesDiv.appendChild(newMessage);

    // 최신 메시지로 스크롤
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  } else {
    console.error(`No chat-messages container found for roomId: ${roomId}`);
  }
});
