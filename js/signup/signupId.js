// 학번 입력 중 숫자 외의 문자 제거
function validateStudentId() {
    const studentIdInput = document.getElementById('student-id');
    const studentIdError = document.getElementById('student-id-error');
    
    // 숫자가 아닌 경우 경고창 표시
    if (isNaN(studentIdInput.value)) {
        alert("숫자만 입력 가능합니다.");
        studentIdInput.value = studentIdInput.value.replace(/[^0-9]/g, ''); // 숫자 외의 문자 제거
        return;
    }
}

// 학번 입력 완료 후(포커스를 벗어났을 때) 8자리 확인 및 메시지 처리
function checkStudentIdCompletion() {
    const studentIdInput = document.getElementById('student-id');
    const studentIdError = document.getElementById('student-id-error');

    // 학번 길이가 8자리를 초과할 때 잘라내기
    if (studentIdInput.value.length > 8) {
        studentIdInput.value = studentIdInput.value.slice(0, 8);
    }

    // 8자리 입력 시 즉시 오류 메시지 제거
    if (studentIdInput.value.length === 8) {
        studentIdError.textContent = ""; // 오류 메시지 초기화
    } else {
        studentIdError.textContent = "학번은 8자리로 입력해 주세요."; // 오류 메시지
    }
}

// 학번 입력 중 8자리가 되면 즉시 오류 메시지 제거
function handleStudentIdInput() {
    const studentIdInput = document.getElementById('student-id');
    const studentIdError = document.getElementById('student-id-error');
    
    // 학번이 8자리일 때 오류 메시지 지우기
    if (studentIdInput.value.length === 8) {
        studentIdError.textContent = ""; // 오류 메시지 초기화
    } else if (studentIdInput.value.length !== 8) {
        studentIdError.textContent = "학번은 8자리로 입력해 주세요."; // 오류 메시지
    }
}

document.getElementById('student-id').addEventListener('blur', checkStudentIdCompletion);
document.getElementById('student-id').addEventListener('input', handleStudentIdInput);
document.getElementById('student-id').addEventListener('input', validateStudentId);
