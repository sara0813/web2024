const form = document.getElementById('productForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let isValid = true;
    let errorMessage = '';

    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const images = document.getElementById('product-image').files;
    const category = document.getElementById('product-category').value;

    // 유효성 검사
    if (!name) {
        isValid = false;
        errorMessage += '상품 이름은 필수입니다.\n';
    }
    if (!category) {
        isValid = false;
        errorMessage += '카테고리를 선택해주세요.\n';
    }
    if (description.length < 10) {
        isValid = false;
        errorMessage += '설명은 최소 10자 이상이어야 합니다.\n';
    }
    if (description.length > 500) {
        isValid = false;
        errorMessage += '설명은 최대 500자까지 입력할 수 있습니다.\n';
    }
    if (price % 10 !== 0) {
        isValid = false;
        errorMessage += '가격은 10원 단위로 입력해주세요.\n';
    }
    if (images.length === 0) {
        isValid = false;
        errorMessage += '상품 이미지 최소 1개 이상 업로드해야 합니다.\n';
    }

    if (!isValid) {
        alert(errorMessage);
        return;
    }

    // 서버에 데이터 제출
    const formData = new FormData(form);
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message || '상품이 성공적으로 등록되었습니다!');

            // 페이지 새로고침
            window.location.reload();
        } else {
            alert(result.message || '상품 등록에 실패했습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('상품 등록 중 오류 발생:', error);
        alert('상품 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
});
