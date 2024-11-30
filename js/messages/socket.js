const socket = io('http://localhost:8080'); // Socket.IO 서버와 연결

// 채팅 시작 함수
function startChat() {
const productId = '상품 ID'; // 상품 ID를 고유한 방 ID로 사용
socket.emit('joinRoom', { roomId: productId });
document.getElementById('chat-room').style.display = 'block';
}

// 메시지 전송
document.getElementById('send-btn').addEventListener('click', () => {
const message = document.getElementById('message-input').value;
const productId = '상품 ID'; // 상품 ID를 사용해 방 지정
if (message) {
    socket.emit('chatMessage', { roomId: productId, message });
    document.getElementById('message-input').value = '';
}
});

// 서버에서 메시지 수신 시 처리
socket.on('chatMessage', (message) => {
const messagesDiv = document.getElementById('messages');
const newMessage = document.createElement('p');
newMessage.textContent = message;
messagesDiv.appendChild(newMessage);
});