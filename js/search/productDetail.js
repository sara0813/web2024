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
      document.getElementById("product-image").src = "/path/to/default-image.png"; // 기본 이미지 경로 설정
    }

    const productImagesContainer = document.getElementById("product-images");
    product.images.forEach((imageUrl, index) => {
      if (index > 0) { // 첫 번째 이미지는 이미 사용했으므로 제외
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "상품 이미지";
        imgElement.style.maxWidth = "300px";
        imgElement.style.margin = "10px";
        productImagesContainer.appendChild(imgElement);
      }
    });
// "채팅하기" 버튼 동작 추가
document.getElementById("chat-btn").addEventListener("click", () => {
  // 로컬 저장소에서 기존 채팅 목록 불러오기
  const chatList = JSON.parse(localStorage.getItem("chatList")) || [];
  const newChat = {
    id: product.id,
    name: product.name,
    image: product.images[0] || "/path/to/default-image.png",
  };

  // 중복 방지
  const chatExists = chatList.some((chat) => chat.id === newChat.id);
  if (!chatExists) {
    chatList.push(newChat);
    localStorage.setItem("chatList", JSON.stringify(chatList));
  }

  // 채팅 창 열기
  openChatWindow(newChat);
});
} catch (error) {
productDetail.innerHTML = "<p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>";
console.error(error);
}
});

// 채팅 창 열기 함수
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

// 채팅 창 닫기
document.getElementById("close-chat").addEventListener("click", () => {
document.body.removeChild(chatWindow);
});

// 메시지 전송
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
document.getElementById("send-message").addEventListener("click", () => {
const message = chatInput.value.trim();
if (message) {
  const messageElement = document.createElement("div");
  messageElement.className = "chat-message";
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight; // 최신 메시지로 스크롤
}
});
}