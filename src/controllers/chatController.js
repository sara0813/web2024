exports.handleConnection = (io) => {
    io.on('connection', (socket) => {
      console.log('새 사용자 연결됨');
  
      // 특정 방에 참가시키기
      socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
        console.log(`사용자가 방에 참가했습니다: ${roomId}`);
      });
  
      // 메시지 수신
      socket.on('chatMessage', ({ roomId, message }) => {
        io.to(roomId).emit('chatMessage', message);
      });
  
      // 연결 해제 시
      socket.on('disconnect', () => {
        console.log('사용자가 연결을 종료했습니다.');
      });
    });
  };