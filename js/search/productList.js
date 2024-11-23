function renderProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // 기존 리스트 초기화

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product-item');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="max-width: 100px;">
            <h4>${product.name}</h4>
            <p>${product.price}원</p>
        `;
        productElement.addEventListener('click', () => {
            window.location.href = `/html/product-detail.html?id=${product.id}`;
        });
        console.log(product);
        productList.appendChild(productElement);
    });
}
