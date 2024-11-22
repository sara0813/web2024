document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  if (!productList) {
    console.error('Error: #product-list element not found in the DOM.');
    return;
  }

  loadProducts();
});
async function loadProducts() {
  try {
      const response = await fetch('/api/products');
      const products = await response.json();

      const productList = document.getElementById('product-list');
      productList.innerHTML = ''; // 초기화

      products.forEach(product => {
          const productItem = document.createElement('div');
          productItem.className = 'product-item';

          // 이미지 URL 생성
          const imageUrl = product.images[0];

          productItem.innerHTML = `
              <h3>${product.name}</h3>
              <p>카테고리: ${product.category}</p>
              <p>${product.description}</p>
              <p>가격: ${product.price}원</p>
              <img src="${imageUrl}" alt="${product.name}" style="max-width: 200px;">
          `;
          productList.appendChild(productItem);
      });
  } catch (error) {
      console.error('상품 데이터를 불러오는 중 오류가 발생했습니다:', error);
  }
}
