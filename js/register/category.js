function selectCategory(category) {
    document.getElementById('product-category').value = category;

    // 선택한 카테고리 버튼 강조 표시
    document.querySelectorAll('.category-buttons button').forEach(button => {
        button.classList.remove('selected');
        if (button.getAttribute('data-category') === category) {
            button.classList.add('selected');
        }
    });
}
