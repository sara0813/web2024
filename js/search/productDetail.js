document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const productDetail = document.getElementById("productDetail");

  if (!productId) {
      productDetail.innerHTML = "<p>상품 정보를 찾을 수 없습니다.</p>";
      return;
  }

  try {
      const response = await fetch(`/api/products/${productId}`);
      const product = await response.json();

      const formattedPrice = Number(product.price).toLocaleString("ko-KR");

      document.getElementById("product-name").textContent = product.name;
      document.getElementById("product-price").textContent = `${formattedPrice}원`;
      document.getElementById("product-category").textContent = `카테고리: ${product.category}`;
      document.getElementById("product-description").textContent = product.description;

      if (product.images && product.images.length > 0) {
          document.getElementById("product-image").src = product.images[0];
      } else {
          document.getElementById("product-image").src = "/path/to/default-image.png";
      }

      document.getElementById("chat-btn").addEventListener("click", () => {
          const chatList = JSON.parse(localStorage.getItem("chatList")) || [];
          const newChat = {
              id: product.id,
              name: product.name,
              image: product.images[0] || "/path/to/default-image.png",
          };

          const chatExists = chatList.some((chat) => chat.id === newChat.id);
          if (!chatExists) {
              chatList.push(newChat);
              localStorage.setItem("chatList", JSON.stringify(chatList));
          }

          openChatWindow(newChat);
      });
  } catch (error) {
      productDetail.innerHTML = "<p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>";
      console.error(error);
  }
});

function openChatWindow(chat) {
  const chatWindow = document.createElement("div");
  chatWindow.id = "chat-window";
  chatWindow.innerHTML = `
      <div id="chat-header">
          <h3>${chat.name}</h3>
          <button id="close-chat">닫기</button>
      </div>
      <div id="chat-messages"></div>
      <div id="chat-input-container">
          <input type="text" id="chat-input" placeholder="메시지를 입력하세요">
          <button id="send-message">보내기</button>
      </div>
  `;
  document.body.appendChild(chatWindow);

  const chatMessages = JSON.parse(localStorage.getItem(`chat_${chat.id}`)) || [];
  const messagesContainer = document.getElementById("chat-messages");

  chatMessages.forEach((message) => {
      const messageElement = document.createElement("div");
      messageElement.className = message.self ? "chat-message self" : "chat-message";
      messageElement.textContent = message.text;
      messagesContainer.appendChild(messageElement);
  });

  document.getElementById("close-chat").addEventListener("click", () => {
      document.body.removeChild(chatWindow);
  });

  document.getElementById("send-message").addEventListener("click", () => {
      const chatInput = document.getElementById("chat-input");
      const message = chatInput.value.trim();
      if (message) {
          chatMessages.push({ text: message, self: true });
          localStorage.setItem(`chat_${chat.id}`, JSON.stringify(chatMessages));

          const messageElement = document.createElement("div");
          messageElement.className = "chat-message self";
          messageElement.textContent = message;
          messagesContainer.appendChild(messageElement);
          chatInput.value = "";
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
  });
}
