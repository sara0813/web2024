document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출을 막고, 유효성 검사를 먼저 진행합니다.
    
    let isValid = true;
    let errorMessage = '';

    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const images = document.getElementById('product-image').files;
    const category = document.getElementById('product-category').value;
    
    // 상품 이름 (필수)
    if (!name) {
        isValid = false;
        errorMessage += '상품 이름은 필수입니다.\n';
    }

    // 카테고리 (선택 안 됨)
    if (!category) {
        isValid = false;
        errorMessage += '카테고리를 선택해주세요.\n';
    }

    // 상품 설명 (최소 10자 이상, 최대 500자)
    if (description.length < 10) {
        isValid = false;
        errorMessage += '설명은 최소 10자 이상이어야 합니다.\n';
    }
    if (description.length > 500) {
        isValid = false;
        errorMessage += '설명은 최대 500자까지 입력할 수 있습니다.\n';
    }

    // 가격 (10으로 나누어 떨어짐)
    if (price % 10 !== 0) {
        isValid = false;
        errorMessage += '가격은 10원 단위로 입력해주세요.\n';
    }

    // 상품 이미지 (최소 1개, 올바른 형식)
    if (images.length === 0) {
        isValid = false;
        errorMessage += '상품 이미지 최소 1개 이상 업로드해야 합니다.\n';
    }

    // 유효성 검사 실패 시 경고창 표시
    if (!isValid) {
        alert(errorMessage);
    } else {
        alert('상품이 성공적으로 등록되었습니다!');
        this.submit();
    }
});
