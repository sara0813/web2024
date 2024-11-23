document.addEventListener("DOMContentLoaded", async () => {
  const productList = document.getElementById("product-list");

  try {
    const response = await fetch("/api/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();
    productList.innerHTML = ""; // 초기화

    products.forEach(product => {
      const productItem = document.createElement("div");
      productItem.className = "product-item";

      // 가격에 쉼표 추가
      const formattedPrice = Number(product.price).toLocaleString("ko-KR");

      productItem.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.images[0]}" alt="${product.name}" style="max-width: 200px;">
        <p>가격: ${formattedPrice}원</p>
      `;

      productItem.addEventListener("click", () => {
        window.location.href = `/html/productDetail.html?id=${product._id}`;
      });

      productList.appendChild(productItem);
    });
  } catch (error) {
    productList.innerHTML = "<p>상품 목록을 불러오는 중 오류가 발생했습니다.</p>";
    console.error("Fetch error:", error);
  }
});
