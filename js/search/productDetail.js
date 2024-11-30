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

    // 가격에 쉼표 추가
    const formattedPrice = Number(product.price).toLocaleString("ko-KR");

    // 상품명, 가격, 설명 등 설정
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `${formattedPrice}원`;
    document.getElementById("product-category").textContent = `카테고리: ${product.category}`;
    document.getElementById("product-description").textContent = product.description;

    // 첫 번째 이미지를 메인 이미지로 설정
    if (product.images && product.images.length > 0) {
      document.getElementById("product-image").src = product.images[0];
    } else {
      document.getElementById("product-image").src = "/path/to/default-image.png"; // 기본 이미지 경로 설정
    }

    // 나머지 이미지 배열 순회하여 추가
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
  } catch (error) {
    productDetail.innerHTML = "<p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>";
    console.error(error);
  }
});
