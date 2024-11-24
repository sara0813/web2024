// 검색 버튼 클릭 이벤트
document.getElementById('search-btn').addEventListener('click', async (event) => {
    event.preventDefault(); // 버튼의 기본 동작 방지

    const query = document.getElementById('search-query').value.trim(); // 검색어 가져오기

    if (!query) {
        alert('검색어를 입력해주세요.');
        return; // 검색어가 없으면 종료
    }

    try {
        const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`); // 검색 요청
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const results = await response.json();

        document.getElementById('product-list').style.display = 'none'; // 상품 리스트 숨기기
        document.getElementById('search-results').style.display = 'block'; // 검색 결과 표시
        renderSearchResults(results);
    } catch (error) {
        console.error('검색 중 오류 발생:', error);
        alert('검색 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
});

// 검색 결과 렌더링
function renderSearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // 기존 결과 초기화

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>검색 결과가 없습니다.</p>';
        return;
    }

    results.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';

        // 이미지 URL 생성
        const imageUrl = product.images[0] || '/default-image.jpg'; // 기본 이미지 설정

        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${imageUrl}" alt="${product.name}" style="max-width: 200px;">
            <p>가격: ${product.price.toLocaleString()}원</p>
        `;

        resultsContainer.appendChild(productItem);

        // 상세 페이지 이동 이벤트 추가
        productItem.addEventListener("click", () => {
            window.location.href = `/html/productDetail.html?id=${product._id}`;
        });
    });
}
