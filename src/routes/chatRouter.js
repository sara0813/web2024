const express = require("express");
const { createChatRoom } = require("../controllers/chatController");
const router = express.Router();

// 채팅방 생성 라우트
router.post("/create", createChatRoom);

module.exports = router;
