document.addEventListener("DOMContentLoaded", async () => {
    const chatListContainer = document.getElementById("chat-list");

    if (!chatListContainer) {
        console.error("chat-list 컨테이너를 찾을 수 없습니다.");
        return;
    }

    try {
        // 서버에서 채팅 목록 가져오기
        const response = await fetch("/api/chat/list");
        if (!response.ok) throw new Error("채팅 목록을 불러오는 중 오류가 발생했습니다.");
        
        const chatList = await response.json();

        if (chatList.length === 0) {
            chatListContainer.innerHTML = `<div class="no-chat">대화중인 상대가 없습니다.</div>`;
            return;
        }

        chatList.forEach((chat) => {
            const chatItem = document.createElement("div");
            chatItem.className = "chat-item";
            chatItem.innerHTML = `
                <div class="chat-info">
                    <img src="${chat.image || "/path/to/default-image.png"}" alt="${chat.name}" class="chat-image">
                    <span>${chat.name || "알 수 없는 사용자"}</span>
                </div>
            `;

            chatItem.addEventListener("click", () => {
                const chatRoomURL = `/html/productDetail.html?id=${chat.productId}&name=${encodeURIComponent(chat.name)}`;
                window.location.href = chatRoomURL;
            });

            chatListContainer.appendChild(chatItem);
        });
    } catch (error) {
        console.error("채팅 목록을 불러오는 중 오류:", error);
        chatListContainer.innerHTML = `<div class="error">채팅 목록을 불러오는 중 오류가 발생했습니다.</div>`;
    }
});
