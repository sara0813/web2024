const Chat = require("../models/chats");

// 메시지 저장 컨트롤러
exports.saveMessage = async (req, res) => {
    const { roomId, sender, text } = req.body;

    // 디버깅 로그
    console.log("saveMessage 호출 - roomId:", roomId, ", sender:", sender, ", text:", text);

    if (!roomId || !sender || !text) {
        return res.status(400).json({ error: "roomId, sender, text는 필수입니다." });
    }

    // roomId 유효성 검사
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
        console.error("유효하지 않은 roomId:", roomId);
        return res.status(400).json({ error: "유효하지 않은 roomId입니다." });
    }

    try {
        const chatRoom = await Chat.findById(roomId);
        if (!chatRoom) {
            console.error("채팅방을 찾을 수 없습니다 - roomId:", roomId);
            return res.status(404).json({ error: "채팅방을 찾을 수 없습니다." });
        }

        // 메시지 추가
        chatRoom.messages.push({ sender, text });
        await chatRoom.save();

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
        console.error("유효하지 않은 roomId:", roomId);
        return res.status(400).json({ error: "유효하지 않은 roomId입니다." });
    }

    try {
        let chatRoom = await Chat.findById(roomId);

        // 채팅방이 없을 경우 새로 생성
        if (!chatRoom) {
            console.log("채팅방이 존재하지 않아 새로 생성합니다:", roomId);
            chatRoom = new Chat({ productId: roomId, users: [], messages: [] });
            await chatRoom.save();
        }

        res.status(200).json(chatRoom.messages);
    } catch (error) {
        console.error("메시지 조회 오류:", error);
        res.status(500).json({ error: "메시지 조회 중 오류가 발생했습니다." });
    }
};


exports.getChatList = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            console.error("로그인된 사용자 ID를 찾을 수 없습니다.");
            return res.status(401).json({ error: "로그인이 필요합니다." });
        }

        const chatList = await Chat.find({ users: userId }).populate("productId", "name images");

        if (!chatList || chatList.length === 0) {
            console.warn("채팅 목록이 비어 있습니다. userId:", userId);
            return res.status(404).json({ error: "채팅 목록이 없습니다." });
        }

        res.status(200).json(chatList.map(chat => ({
            id: chat._id,
            name: chat.productId?.name || "알 수 없는 상품",
            image: chat.productId?.images[0] || "/path/to/default-image.png",
        })));
    } catch (error) {
        console.error("채팅 목록 조회 오류:", error);
        res.status(500).json({ error: "채팅 목록을 불러오는 중 오류가 발생했습니다." });
    }
};
