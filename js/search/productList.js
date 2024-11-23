document.addEventListener("DOMContentLoaded", async () => {
    const productList = document.getElementById("product-list");
  
    try {
      const response = await fetch("/api/products");
      const products = await response.json();
  
      productList.innerHTML = ""; // 초기화
      products.forEach((product) => {
        const productItem = document.createElement("div");
        productItem.className = "product-item";
  
        productItem.innerHTML = `
          <h3>${product.name}</h3>
          <img src="${product.images[0]}" alt="${product.name}" style="max-width: 200px;">
          <p>가격: ${product.price}원</p>
        `;
  
        // 클릭 이벤트로 상세 페이지로 이동
        productItem.addEventListener("click", () => {
          window.location.href = `/html/product-detail.html?id=${product._id}`;
        });
  
        productList.appendChild(productItem);
      });
    } catch (error) {
      productList.innerHTML = "<p>상품을 불러오는 중 오류가 발생했습니다.</p>";
      console.error(error);
    }
  });
  