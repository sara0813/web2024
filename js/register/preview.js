const fileInput = document.getElementById('product-image');
const previewContainer = document.getElementById('preview');

// 파일 입력 필드에 change 이벤트 리스너 추가
fileInput.addEventListener('change', function(event) {
    previewContainer.innerHTML = ''; // 미리보기 초기화
    const files = event.target.files;

    // 파일 목록 반복
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        // 파일 읽기가 완료되면 미리보기 이미지를 생성
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result; // 읽어들인 파일을 이미지로 표시
            img.style.width = '100px'; // 이미지 크기 설정
            img.style.margin = '5px'; // 이미지 간격 설정
            previewContainer.appendChild(img); // 미리보기 컨테이너에 추가
        };

        reader.readAsDataURL(file); // 파일을 DataURL 형식으로 읽어서 미리보기 표시
    }
});
