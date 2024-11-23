document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (!productId) {
        document.getElementById('product-detail').innerHTML = '<p>상품 정보를 찾을 수 없습니다.</p>';
        return;
    }

    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error('상품 정보를 가져오는 데 실패했습니다.');

        const product = await response.json();

        document.getElementById('product-image').src = product.image;
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-price').textContent = `${product.price}원`;
        document.getElementById('product-category').textContent = `카테고리: ${product.category}`;
        document.getElementById('product-description').textContent = product.description;
    } catch (error) {
        console.error('상품 정보를 로드하는 중 오류가 발생했습니다:', error);
        document.getElementById('product-detail').innerHTML = '<p>상품 정보를 찾을 수 없습니다.</p>';
    }
});
