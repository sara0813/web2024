document.addEventListener("DOMContentLoaded", () => {
    const chatListContainer = document.getElementById("chat-list");

    // chatListContainer가 없을 경우 오류 방지
    if (!chatListContainer) {
        console.error("chat-list 컨테이너를 찾을 수 없습니다.");
        return;
    }

    let chatList = [];

    try {
        // localStorage에서 채팅 리스트 가져오기
        const storedChatList = localStorage.getItem("chatList");
        if (storedChatList) {
            chatList = JSON.parse(storedChatList);
        }
    } catch (error) {
        console.error("localStorage에서 채팅 리스트를 가져오는 중 오류가 발생했습니다:", error);
    }

    // 채팅 리스트가 비어 있는 경우 처리
    if (chatList.length === 0) {
        chatListContainer.innerHTML = `<div class="no-chat">대화중인 상대가 없습니다.</div>`;
        return;
    }

    // 채팅 리스트를 동적으로 추가
    chatList.forEach((chat) => {
        console.log("현재 채팅 데이터:", chat);

        const chatItem = document.createElement("div");
        chatItem.className = "chat-item";
        chatItem.innerHTML = `
            <img src="${chat.image || "/path/to/default-image.png"}" alt="${chat.name}" class="chat-image">
            <span>${chat.name || "알 수 없는 사용자"}</span>
        `;

        // 채팅 항목 클릭 이벤트 추가
        chatItem.addEventListener("click", () => {
            console.log(`채팅방으로 이동: ${chat.name}`);
            const chatRoomURL = `/html/productDetail.html?id=${chat.id}&name=${encodeURIComponent(chat.name)}`;
            window.location.href = chatRoomURL;
        });

        chatListContainer.appendChild(chatItem);
    });
});
