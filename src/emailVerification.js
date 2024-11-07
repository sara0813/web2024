const nodemailer = require('nodemailer');

// 이메일 전송을 위한 transporter 설정
const transporter = nodemailer.createTransport({
    service: 'gmail', // 예시로 Gmail을 사용, 학교 메일 서버에 맞게 수정
    auth: {
        user: process.env.EMAIL_USER, // 환경 변수로 보내는 이메일 설정
        pass: process.env.EMAIL_PASS  // 환경 변수로 비밀번호 설정
    }
});

// 인증 코드 생성 (6자리 랜덤 코드)
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000); // 6자리 숫자
}

// 이메일 도메인 검사 (학교 웹메일만 허용)
function isValidSchoolEmail(email) {
    const emailDomainPattern = /@seoultech.ac.kr$/; // 학교 이메일 도메인
    return emailDomainPattern.test(email); // 올바른 도메인인지 검사
}

// 이메일 전송 함수
function sendVerificationEmail(toEmail) {
    if (!isValidSchoolEmail(toEmail)) {
        console.log("올바른 학교 이메일이 아닙니다.");
        return; // 학교 이메일이 아니면 전송하지 않음
    }

    const verificationCode = generateVerificationCode();

    const mailOptions = {
        from: process.env.EMAIL_USER,  // 보내는 이메일
        to: toEmail,                   // 받는 이메일 (학교 이메일)
        subject: '학교 이메일 인증 코드',
        text: `귀하의 인증 코드는 ${verificationCode}입니다.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('이메일 전송 실패:', error);
        } else {
            console.log('이메일 전송 성공:', info.response);
        }
    });
}

// 사용자가 입력한 이메일로 인증 코드 전송
function handleEmailSubmission(userEmail) {
    sendVerificationEmail(userEmail);
}

// 예시로 사용자가 입력한 이메일
handleEmailSubmission('student@seoultech.ac.kr'); // 학교 이메일일 경우
handleEmailSubmission('someone@otherdomain.com'); // 학교 이메일이 아닐 경우
