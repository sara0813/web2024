document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const productDetail = document.getElementById("productDetail");
    const chatWindow = document.getElementById("chat-window");
    const chatBtn = document.getElementById("chat-btn");
    const closeChatBtn = document.getElementById("close-chat-btn");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendChatBtn = document.getElementById("send-chat-btn");

    // Socket.IO 연결
    const socket = io();

    // 상품 상세 정보 로드
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error("상품 데이터를 불러오는 중 오류가 발생했습니다.");
        const product = await response.json();

        document.getElementById("product-name").textContent = product.name || "상품 이름 없음";
        document.getElementById("product-price").textContent = `${Number(product.price).toLocaleString()}원`;
        document.getElementById("product-category").textContent = `카테고리: ${product.category || "없음"}`;
        document.getElementById("product-description").textContent = product.description || "설명이 없습니다.";
        document.getElementById("product-image-tag").src = product.images?.[0] || "/uploads/default-image.png";
    } catch (error) {
        console.error("상품 정보를 불러오는 중 오류:", error);
    }

    // 채팅 열기 및 기존 메시지 불러오기
    chatBtn.addEventListener("click", async () => {
        chatWindow.classList.add("active");

        // 기존 메시지 로드
        try {
            const response = await fetch(`/api/chat/messages/${productId}`);
            if (response.ok) {
                const messages = await response.json();
                chatMessages.innerHTML = ""; // 기존 메시지 초기화
                messages.forEach((msg) => {
                    const newMessage = document.createElement("div");
                    newMessage.className = msg.sender === "self" ? "chat-message self" : "chat-message other";
                    newMessage.innerHTML = `
                        <div class="message-sender">${msg.sender}</div>
                        <div class="message-text">${msg.text}</div>
                        <div class="message-timestamp">${new Date(msg.timestamp).toLocaleString()}</div>
                    `;
                    chatMessages.appendChild(newMessage);
                });
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        } catch (error) {
            console.error("기존 메시지 로드 오류:", error);
        }

        // Socket.IO를 통해 채팅방 입장
        socket.emit("joinRoom", { roomId: productId });

        // 서버에서 메시지 수신
        socket.on("chatMessage", (message) => {
            const newMessage = document.createElement("div");
            newMessage.className = message.sender === "self" ? "chat-message self" : "chat-message other";
            newMessage.innerHTML = `
                <div class="message-sender">${message.sender}</div>
                <div class="message-text">${message.text}</div>
                <div class="message-timestamp">${new Date(message.timestamp).toLocaleString()}</div>
            `;
            chatMessages.appendChild(newMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    });

    // 채팅 닫기
    closeChatBtn.addEventListener("click", () => {
        chatWindow.classList.remove("active");
    });

    // 메시지 전송
    sendChatBtn.addEventListener("click", () => {
        const message = chatInput.value.trim();
        if (message) {
            const roomId = productId;
            const sender = "self"; // 현재 사용자를 "self"로 표시

            // Socket.IO를 통해 메시지 전송
            socket.emit("chatMessage", { roomId, sender, text: message });

            // 화면에 즉시 반영
            const newMessage = document.createElement("div");
            newMessage.className = "chat-message self";
            newMessage.innerHTML = `
                <div class="message-text">${message}</div>
            `;
            chatMessages.appendChild(newMessage);
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
});
