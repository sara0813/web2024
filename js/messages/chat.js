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

    // 채팅 열기
    chatBtn.addEventListener("click", () => {
        chatWindow.classList.add("active");
    });

    // 채팅 닫기
    closeChatBtn.addEventListener("click", () => {
        chatWindow.classList.remove("active");
    });

    // 메시지 전송
    sendChatBtn.addEventListener("click", () => {
        const message = chatInput.value.trim();
        if (message) {
            const newMessage = document.createElement("div");
            newMessage.className = "chat-message self";
            newMessage.textContent = message;
            chatMessages.appendChild(newMessage);
            chatInput.value = "";
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    });
});
