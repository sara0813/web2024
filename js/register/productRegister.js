document.getElementById('productForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 폼 제출 방지

    let isValid = true;
    let errorMessage = '';

    // 입력 필드 값 가져오기
    const name = document.getElementById('product-name').value;
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;
    const images = document.getElementById('product-image').files;
    const category = document.getElementById('product-category').value;

    // 유효성 검사
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
    if (price % 10 !== 0 || price <= 0) {
        isValid = false;
        errorMessage += '가격은 10원 단위로 입력하고, 0보다 커야 합니다.\n';
    }

    // 상품 이미지 (최소 1개, 올바른 형식)
    if (images.length === 0) {
        isValid = false;
        errorMessage += '상품 이미지를 최소 1개 이상 업로드해야 합니다.\n';
    }

    // 유효성 검사 실패 시 경고창 표시
    if (!isValid) {
        alert(errorMessage);
        return; // 서버로 요청을 보내지 않음
    }

    // 유효성 검사를 통과한 경우 서버로 데이터 전송
    const formData = new FormData(this); // FormData 객체 생성
    try {
        const response = await fetch('/api/register', { // 서버로 데이터 전송
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('서버 요청에 실패했습니다.');
        }

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            window.location.reload()

        } else {
            alert(`등록 실패: ${result.message}`);
        }
    } catch (error) {
        console.error('에러 발생:', error);
        alert('상품 등록 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
});
