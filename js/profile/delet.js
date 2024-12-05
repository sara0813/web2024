document.getElementById('delete-account-btn').addEventListener('click', async function () {
    const confirmation = confirm('정말로 회원 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.');
    if (!confirmation) return;

    try {
        const response = await fetch('/api/users/delete-account', { // 경로 수정
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // 세션 쿠키 포함
        });
        

        if (response.ok) {
            alert('회원 탈퇴가 완료되었습니다.');
            location.href = '/index.html'; // 메인 페이지로 이동
        } else {
            const errorData = await response.json();
            alert(`회원 탈퇴 실패: ${errorData.message}`);
        }
    } catch (error) {
        alert('회원 탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
});
