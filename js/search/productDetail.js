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
                id: product.id || "unknown-id", // 기본값으로 'unknown-id' 설정
                name: product.name || "Unknown Product",
                image: product.images[0] || "/path/to/default-image.png",
            };
            
            if (!newChat.id || newChat.id === "unknown-id") {
                console.error("Error: Product ID is invalid! Cannot open chat.");
                return;
            }

            const chatExists = chatList.some((chat) => chat.id === newChat.id);
            if (!chatExists) {
                chatList.push(newChat);
                localStorage.setItem("chatList", JSON.stringify(chatList));
            }

            openChatRoom(newChat); // 고유 채팅방 열기
        });
    } catch (error) {
        productDetail.innerHTML = "<p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>";
        console.error(error);
    }
});

