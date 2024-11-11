// sendEmail.js
const nodemailer = require('nodemailer');
const { storeVerificationCode } = require('./verifyCode');
const dotenv = require("dotenv");
dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

const { NODEMAILER_USER, NODEMAILER_PASS } = process.env;

console.log("NODEMAILER_USER:", NODEMAILER_USER); // 확인용
console.log("NODEMAILER_PASS:", NODEMAILER_PASS); // 확인용

const transporter = nodemailer.createTransport({
  service: 'naver',
  auth: {
    user: NODEMAILER_USER,
    pass: NODEMAILER_PASS,
  },
});

function generateCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

function sendVerificationEmail(toEmail, verificationCode) {
    let mailOptions = {
        from: NODEMAILER_USER,
        to: toEmail,
        subject: 'ST 마켓 인증 코드',
        html: `
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>안녕하세요, <strong>ST 마켓</strong> 이용자님!</p><br>

        <p>ST 마켓에 가입해 주셔서 감사합니다. <br><br> 아래는 귀하의 인증 코드입니다. 인증 코드를 정확히 입력해 주세요.</p> <br>

        <p style="font-size: 24px; font-weight: bold; color: #007bff;">
            🔑 인증 코드: <span style="font-size: 36px;">${verificationCode}</span>
        </p> <br>

        <p>본 이메일은 ST 마켓에서 회원님의 계정 보안을 위해 발송되었습니다. 인증 코드는 <strong>10분간 유효</strong>하며, 만약 본인이 요청하지 않은 경우 이 메시지를 무시해 주세요.</p> <br>

        <p>언제든지 궁금한 사항이 있다면 문의해 주시기 바랍니다. 감사합니다! </p> <br><br>-ST 마켓 드림-</p>

        </body>
        </html>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('이메일 전송 중 오류가 발생했습니다.', error);
        } else {
            console.log('이메일 전송에 성공했습니다.:', info.response);
        }
    });
}

module.exports = {
    generateCode,
    sendVerificationEmail
};

