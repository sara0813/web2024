const Chat = require("../models/chats");

// 메시지 저장 컨트롤러
exports.saveMessage = async (req, res) => {
    const { roomId, sender, text } = req.body;

    // roomId 디버깅
    console.log("getMessages - roomId:", roomId);

    if (!roomId || !sender || !text) {
        return res.status(400).json({ error: "roomId, sender, text는 필수입니다." });
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ error: "유효하지 않은 roomId입니다." });
        }

        const chatRoom = await Chat.findById(mongoose.Types.ObjectId(roomId));
        if (!chatRoom) {
            return res.status(404).json({ error: "채팅방을 찾을 수 없습니다." });
        }

        // 메시지 추가
        chatRoom.messages.push({ sender, text });
        await chatRoom.save(); // 저장

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("메시지 저장 오류:", error);
        res.status(500).json({ error: "메시지 저장 중 오류가 발생했습니다." });
    }
};

const mongoose = require("mongoose");

//채팅 기록 가져오기
exports.getMessages = async (req, res) => {
    const { roomId } = req.params;

    if (!roomId || !mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({ error: "유효하지 않은 roomId입니다." });
    }

    try {
        const chatRoom = await Chat.findById(roomId);
        if (!chatRoom) {
            return res.status(404).json({ error: "채팅방을 찾을 수 없습니다." });
        }

        res.status(200).json(chatRoom.messages);
    } catch (error) {
        console.error("메시지 조회 오류:", error);
        res.status(500).json({ error: "메시지 조회 중 오류가 발생했습니다." });
    }
};

