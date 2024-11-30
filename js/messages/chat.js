document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOMContentLoaded triggered"); // 디버깅용 로그

    const productDetail = document.getElementById("productDetail");

    // `productDetail` 요소 확인
    if (!productDetail) {
        console.error("Error: Element with ID 'productDetail' not found!");
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    // URL에 `id` 파라미터가 없을 경우
    if (!productId) {
        productDetail.innerHTML = "<p>상품 정보를 찾을 수 없습니다.</p>";
        return;
    }

    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const product = await response.json();

        // DOM 요소 설정
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");
        const productCategory = document.getElementById("product-category");
        const productDescription = document.getElementById("product-description");
        const productImage = document.getElementById("product-image");
        const chatBtn = document.getElementById("chat-btn");

        // 요소가 모두 존재하는지 확인
        if (!productName || !productPrice || !productCategory || !productDescription || !productImage || !chatBtn) {
            console.error("Error: One or more product elements are missing!");
            return;
        }

        // 데이터 설정
        productName.textContent = product.name || "상품 이름 없음";
        productPrice.textContent = `${Number(product.price).toLocaleString("ko-KR") || 0}원`;
        productCategory.textContent = `카테고리: ${product.category || "없음"}`;
        productDescription.textContent = product.description || "설명이 없습니다.";
        productImage.src = product.images?.[0] || "/path/to/default-image.png";

        // 채팅 버튼 이벤트 설정
        chatBtn.addEventListener("click", () => {
            const chatList = JSON.parse(localStorage.getItem("chatList")) || [];
            const newChat = {
                id: product.id || "fallback-id",
                name: product.name,
                image: product.images?.[0] || "/path/to/default-image.png",
            };

            console.log("Final Chat Object:", newChat); // 디버깅용 로그

            const chatExists = chatList.some((chat) => chat.id === newChat.id);
            if (!chatExists) {
                chatList.push(newChat);
                localStorage.setItem("chatList", JSON.stringify(chatList));
            }

            openChatRoom(newChat);
        });
    } catch (error) {
        console.error("Error fetching product data:", error);
        productDetail.innerHTML = "<p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>";
    }
});
