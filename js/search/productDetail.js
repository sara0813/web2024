document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const productDetail = document.getElementById("productDetail");

    if (!productId) {
        console.error("URL에서 productId가 누락되었습니다.");
        document.getElementById("productDetail").innerHTML = "<p>상품 ID가 누락되었습니다.</p>";
        return;
    }
    console.log("Fetched productId:", productId);

    try {
        // API 호출
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const product = await response.json();

        // 각 요소를 가져오기 전에 null 확인
        const productNameElement = document.getElementById("product-name");
        const productPriceElement = document.getElementById("product-price");
        const productCategoryElement = document.getElementById("product-category");
        const productDescriptionElement = document.getElementById("product-description");
        const productImageTag = document.getElementById("product-image-tag");
        const productImagesContainer = document.getElementById("product-images");

        if (!productNameElement || !productPriceElement || !productCategoryElement || !productDescriptionElement || !productImageTag || !productImagesContainer) {
            throw new Error("필수 DOM 요소가 누락되었습니다.");
        }

        // 상품 정보 표시
        productNameElement.textContent = product.name;
        productPriceElement.textContent = `${Number(product.price).toLocaleString("ko-KR")}원`;
        productCategoryElement.textContent = `카테고리: ${product.category}`;
        productDescriptionElement.textContent = product.description;

        // 이미지 처리
        if (product.images && product.images.length > 0) {
            productImageTag.src = product.images[0];

            product.images.forEach((image, index) => {
                const thumbnail = document.createElement("img");
                thumbnail.src = image;
                thumbnail.alt = `상품 이미지 ${index + 1}`;
                thumbnail.className = "thumbnail";
                thumbnail.addEventListener("click", () => {
                    productImageTag.src = image;
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

            if (!chatList.some((chat) => chat.id === newChat.id)) {
                chatList.push(newChat);
                localStorage.setItem("chatList", JSON.stringify(chatList));
            }

            openChatRoom(newChat);
        });
    } catch (error) {
        productDetail.innerHTML = "<p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>";
        console.error("Error fetching product data:", error);
    }
});
