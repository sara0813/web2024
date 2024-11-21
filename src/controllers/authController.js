const { User } = require('../models/User'); // User 모델 가져오기
const { Verification } = require('../models/verificationModel');

const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });


const saltRounds = 10;

// 닉네임 중복 체크 함수
exports.checkNickname = async (req, res) => {  // 함수 이름 수정
    const { nickname } = req.body;

    try {
        // 닉네임이 이미 존재하는지 확인
        const existingUser = await User.findOne({ nickname });

        if (existingUser) {
            return res.status(200).json({ exists: true }); // 이미 존재하는 닉네임
        }

        return res.status(200).json({ exists: false }); // 사용 가능한 닉네임
    } catch (error) {
        console.error('닉네임 중복 체크 오류:', error);
        return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
};


// 회원가입 처리
exports.register = async (req, res) => {
    const { nickname, studentId, email, password, verificationCode } = req.body;

    try {
        // 인증 코드 확인
        const userVerificationCode = await Verification.findOne({ email });
        if (!userVerificationCode || verificationCode !== userVerificationCode.code) {
            return res.json({ success: false, message: '인증 코드가 일치하지 않습니다.' });
        }

        // 중복 체크 병렬 처리
        const [existingStudent, existingEmail] = await Promise.all([
            User.findOne({ studentId }),
            User.findOne({ email })
        ]);

        if (existingStudent) {
            return res.json({ success: false, message: '이미 등록된 학번입니다.' });
        }
        if (existingEmail) {
            return res.json({ success: false, message: '이미 등록된 이메일입니다.' });
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 새 사용자 저장
        const newUser = new User({ nickname, studentId, email, password: hashedPassword });
        await newUser.save();

        res.status(200).json({ success: true, message: '회원가입이 완료되었습니다.' });
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error);
        res.status(500).json({ success: false, message: '회원가입 중 오류가 발생했습니다.', error: error.message });
    }
};

// 로그인 처리
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "이메일 또는 비밀번호가 잘못되었습니다." });
        }

        // 비밀번호 비교
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            // 로그인 성공 시, 사용자 정보 세션에 저장
            req.session.user = {
                nickname: user.nickname
            };

            res.json({ success: true, message: "로그인 성공", nickname: user.nickname });
        } else {
            res.json({ success: false, message: "이메일 또는 비밀번호가 잘못되었습니다." });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "서버 오류가 발생했습니다." });
    }
  };