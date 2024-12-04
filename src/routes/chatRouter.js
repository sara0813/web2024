const express = require("express");
const { saveMessage, getMessages, getChatList } = require("../controllers/chatController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/messages", saveMessage);
router.get("/messages/:roomId", getMessages);
router.get("/list", authMiddleware, getChatList);

module.exports = router;
