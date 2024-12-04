const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require("mongoose")
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const http = require("http");
const { Server } = require("socket.io");
const Chat = require("./models/chats");

const authRouter = require('./routes/authRoutes');
const verificationRouter = require('./routes/verificationRouter');
const productRoutes = require('./routes/productRoutes');
const chatRouter = require('./routes/chatRouter');

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = 8080;

// 기본 라우트 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html')); // 루트 디렉토리의 index.html
});

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

// 업로드 폴더 설정
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("사용자가 연결되었습니다:", socket.id);

  socket.on("joinRoom", async ({ roomId }) => {
      if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
          console.error("유효하지 않은 roomId입니다.");
          return;
      }
      socket.join(roomId);
      console.log(`사용자 ${socket.id}가 방 ${roomId}에 입장했습니다.`);
  });

  socket.on("chatMessage", async ({ roomId, sender, text }) => {
      try {
          if (!Chat) {
              console.error("Chat 모델이 정의되지 않았습니다.");
              return;
          }
          if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
              console.error("유효하지 않은 roomId입니다.");
              return;
          }
          if (!sender || !text) {
              console.error("필수 데이터 누락: sender 또는 text가 없습니다.");
              return;
          }

          const message = { sender, text, timestamp: new Date() };
          const chatRoom = await Chat.findById(roomId);

          if (!chatRoom) {
              const newChat = new Chat({ productId: roomId, users: [sender], messages: [message] });
              await newChat.save();
          } else {
              chatRoom.messages.push(message);
              await chatRoom.save();
          }

          io.to(roomId).emit("chatMessage", message);
      } catch (error) {
          console.error("메시지 전송 오류:", error);
      }
  });

  socket.on("disconnect", () => {
      console.log("사용자가 연결을 종료했습니다:", socket.id);
  });
});


app.use(express.static(path.join(__dirname, '..'))); 
app.use('/uploads', express.static(uploadDir));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'Hello!',
  resave: false,
  saveUninitialized: true,
}));

app.use('/api/auth', authRouter);
app.use('/api/verification', verificationRouter);
app.use('/api', productRoutes);
app.use('/api/chat', chatRouter);

//몽고bd 연결 코드
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log('MongoDB 연결 오류:',err));

// 서버 시작
server.listen(port, '0.0.0.0', () => {
    console.log(`서버가 http://0.0.0.0:${port} 에서 실행 중입니다.`);
});