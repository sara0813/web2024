// 상품 데이터 예시 (비어 있는 경우를 가정)
const myProducts = []; // 상품 데이터 배열

// DOM 요소 참조
const productList = document.getElementById('my-products');
const noProductsMessage = document.getElementById('no-products-message');

// 상품 목록 렌더링 함수
function renderProducts() {
    if (myProducts.length === 0) {
        // 상품이 없을 경우 메시지 표시
        noProductsMessage.style.display = 'block';
        productList.style.display = 'none';
    } else {
        // 상품이 있을 경우 메시지 숨기고 리스트 표시
        noProductsMessage.style.display = 'none';
        productList.style.display = 'block';

        // 상품 목록 동적 추가
        myProducts.forEach((product) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - ${product.price}원`;
            productList.appendChild(listItem);
        });
    }
}

// 페이지 로드 시 상품 렌더링
document.addEventListener('DOMContentLoaded', renderProducts);
