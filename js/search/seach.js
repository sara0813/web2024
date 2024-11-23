// 검색 버튼 클릭 시 동작
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    // 검색어 가져오기
    const query = document.getElementById('search-query').value;

    if (query.trim() === '') {
        alert('검색어를 입력해주세요.');
        return;
    }

    // 검색 결과 표시
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = `<p>"${query}"에 대한 검색 결과입니다.</p>`;
    searchResults.classList.add('active'); // 활성화 클래스 추가
});
