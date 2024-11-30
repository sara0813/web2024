document.addEventListener("DOMContentLoaded", () => {
    const chatListContainer = document.getElementById("chat-list");

    const chatList = JSON.parse(localStorage.getItem("chatList")) || [];

    if (chatList.length === 0) {
        chatListContainer.innerHTML = `<div class="no-chat">대화중인 상대가 없습니다.</div>`;
    } else {
        chatList.forEach((chat) => {
            const chatItem = document.createElement("div");
            chatItem.className = "chat-item";
            chatItem.innerHTML = `
                <img src="${chat.image}" alt="${chat.name}" class="chat-image">
                <span>${chat.name}</span>
            `;
            chatItem.addEventListener("click", () => {
                openChatRoom(chat);
            });
            chatListContainer.appendChild(chatItem);
        });
    }
});
