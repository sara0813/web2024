document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  const productDetail = document.getElementById("productDetail");
  const productImagesContainer = document.getElementById("product-images");

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

    // 이미지 배열 순회하여 추가
    product.images.forEach((imageUrl) => {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.alt = "상품 이미지";
      imgElement.style.maxWidth = "300px";
      imgElement.style.margin = "10px";
      productImagesContainer.appendChild(imgElement);
    });
  } catch (error) {
    productDetail.innerHTML = "<p>상품 정보를 불러오는 중 오류가 발생했습니다.</p>";
    console.error(error);
  }
});
