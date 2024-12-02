const { Chat } = require("../models/chat");

// 채팅방 생성 컨트롤러
exports.createChatRoom = async (req, res) => {
    const { productId, userId } = req.body;

    if (!productId || !userId) {
        return res.status(400).json({ error: "상품 ID와 사용자 ID는 필수입니다." });
    }

    try {
        let chatRoom = await Chat.findOne({ productId, users: { $all: [userId] } });
        if (!chatRoom) {
            chatRoom = new Chat({ productId, users: [userId] });
            await chatRoom.save();
        }

        res.json({ roomId: chatRoom._id });
    } catch (error) {
        console.error("채팅방 생성 오류:", error);
        res.status(500).json({ error: "채팅방 생성 중 오류가 발생했습니다." });
    }
};

exports.handleConnection = (io) => {
    io.on('connection', (socket) => {
        console.log('사용자가 연결되었습니다:', socket.id);
      
        socket.on('joinRoom', ({ roomId }) => {
            if (!roomId) {
                console.error('Error: roomId is undefined on joinRoom event!');
                return;
            }
            socket.join(roomId);
            console.log(`사용자 ${socket.id}가 방 ${roomId}에 입장했습니다.`);
        });
      
        socket.on('chatMessage', (data) => {
            if (!data.roomId || !data.message) {
                console.error('Error: roomId or message is undefined in chatMessage event!');
                return;
            }
            console.log(`방 ${data.roomId}에서 받은 메시지: ${data.message}`);
            io.to(data.roomId).emit('chatMessage', { roomId: data.roomId, message: data.message });
        });
      
        socket.on('disconnect', () => {
            console.log('사용자가 연결을 종료했습니다:', socket.id);
        });
    });
};
