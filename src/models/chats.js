const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
    users: [{ type: String, required: true }],
    messages: [
        {
            sender: { type: String, required: true },
            text: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        },
    ],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
