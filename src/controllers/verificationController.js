const nodemailer = require('nodemailer');
const { Verification } = require('../models/verificationModel');

// 인증 코드 생성
exports.generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 인증 코드 생성
};
// 인증 코드 발송
exports.sendVerificationCode = async (req, res) => {
    const { email } = req.body;
    const verificationCode = exports.generateVerificationCode();

    try {
        // 인증 코드 DB에 저장
        await Verification.findOneAndUpdate({ email }, { code: verificationCode }, { upsert: true });

        // Nodemailer 설정
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS,
            },
        });

        const mailOptions = {
            from: process.env.NODEMAILER_USER,
            to: email,
            subject: 'ST 마켓 인증 코드',
            html: `
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <p>안녕하세요, <strong>ST 마켓</strong> 이용자님!</p><br>
        
                    <p>ST 마켓에 가입해 주셔서 감사합니다. <br><br> 아래는 귀하의 인증 코드입니다. 인증 코드를 정확히 입력해 주세요.</p><br>
        
                    <p style="font-size: 24px; font-weight: bold; color: #007bff;">
                      🔑 인증 코드: <span style="font-size: 36px;">${verificationCode}</span>
                    </p><br>
        
                    <p>본 이메일은 ST 마켓에서 회원님의 계정 보안을 위해 발송되었습니다. 인증 코드는 <strong>10분간 유효</strong>하며, 만약 본인이 요청하지 않은 경우 이 메시지를 무시해 주세요.</p><br>
        
                    <p>언제든지 궁금한 사항이 있다면 문의해 주시기 바랍니다. 감사합니다!</p><br><br>-ST 마켓 드림-
                </body>
            </html>`
        };        

        // 이메일 발송
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ success: false, message: '이메일 발송에 실패했습니다.' });
            }

            // 인증 코드와 성공 메시지를 함께 반환
            res.json({ success: true, message: '인증 코드가 이메일로 발송되었습니다.', verificationCode: verificationCode });
        });
    } catch (error) {
        console.error('인증 코드 발송 중 오류 발생:', error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
};


// 인증 코드 확인
exports.checkVerificationCode = async (req, res) => {
    const { email, code } = req.body;
    
    try {
        const verificationData = await Verification.findOne({ email }); // DB에서 이메일로 인증 코드 찾기
        if (!verificationData) {
            return res.status(404).json({ success: false, message: "이메일을 통한 인증 코드 요청이 없습니다." });
        }

        // 코드 만료 확인
        if (Date.now() > verificationData.expiresAt) {
            return res.status(400).json({ success: false, message: "인증 코드가 만료되었습니다." });
        }

        if (code === verificationData.code) {
            return res.json({ success: true, message: "인증 코드가 일치합니다." });
        } else {
            return res.status(400).json({ success: false, message: "인증 코드가 일치하지 않습니다." });
        }
    } catch (error) {
        console.error("인증 코드 확인 중 오류 발생:", error);
        res.status(500).json({ success: false, message: "서버 오류가 발생했습니다." });
    }
};
