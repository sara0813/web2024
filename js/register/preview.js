const fileInput = document.getElementById('photos');
const previewContainer = document.getElementById('preview');

fileInput.addEventListener('change', function(event) {
    previewContainer.innerHTML = ''; // 미리보기 초기화
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px'; // 미리보기 이미지 크기 설정
            img.style.margin = '5px';
            previewContainer.appendChild(img);
        };

        reader.readAsDataURL(file); // 파일을 DataURL로 읽어 미리보기 표시
    }
});

