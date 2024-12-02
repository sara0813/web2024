document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const productDetail = document.getElementById("productDetail");

    if (!productId) {
        productDetail.innerHTML = "<p>상품 정보를 찾을 수 없습니다.</p>";
        return;
    }

    try {
        // API 호출
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const product = await response.json();

        // 상품 정보 표시
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-price").textContent = `${Number(product.price).toLocaleString("ko-KR")}원`;
        document.getElementById("product-category").textContent = `카테고리: ${product.category}`;
        document.getElementById("product-description").textContent = product.description;

        // 이미지 처리
        const productImageTag = document.getElementById("product-image-tag");
        const productImagesContainer = document.getElementById("product-images");

        if (product.images && product.images.length > 0) {
            // 첫 번째 이미지를 메인 이미지로 설정
            productImageTag.src = product.images[0];

            // 나머지 이미지를 썸네일로 추가
            product.images.forEach((image, index) => {
                const thumbnail = document.createElement("img");
                thumbnail.src = image;
                thumbnail.alt = `상품 이미지 ${index + 1}`;
                thumbnail.className = "thumbnail";
                thumbnail.addEventListener("click", () => {
                    productImageTag.src = image; // 클릭 시 메인 이미지 변경
                });
                productImagesContainer.appendChild(thumbnail);
            });
        } else {
            productImageTag.src = "/uploads/default-image.png";
        }

        // 채팅 버튼 클릭 이벤트
        document.getElementById("chat-btn").addEventListener("click", () => {
            const chatList = JSON.parse(localStorage.getItem("chatList")) || [];
            const newChat = {
                id: product.id,
                name: product.name,
                image: product.images?.[0] || "/uploads/default-image.png",
            };

            // 중복 채팅방 확인
            if (!chatList.some((chat) => chat.id === newChat.id)) {
                chatList.push(newChat);
                localStorage.setItem("chatList", JSON.stringify(chatList));
            }

            // 채팅방 열기
            openChatRoom(newChat);
        });
    } catch (error) {
        productDetail.innerHTML = "<p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>";
        console.error("Error fetching product data:", error);
    }
});
