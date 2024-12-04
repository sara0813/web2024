const express = require("express");
const { saveMessage, getMessages } = require("../controllers/chatController");
const router = express.Router();

router.post("/messages", saveMessage);
router.get("/messages/:roomId", (req, res, next) => {
    console.log("요청 URL:", req.originalUrl);
    console.log("roomId:", req.params.roomId);
    next();
}, getMessages);

module.exports = router;
