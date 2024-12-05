const User = require('../models/User'); // User 모델 가져오기

// 회원 탈퇴 컨트롤러
const deleteAccount = async (req, res) => {
    try {
        const userId = req.session.userId; // 세션에서 사용자 ID 가져오기
        if (!userId) {
            return res.status(401).json({ message: '로그인이 필요합니다.' });
        }

        // MongoDB에서 사용자 삭제
        const result = await User.findByIdAndDelete(userId);
        if (!result) {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        // 세션 종료
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: '세션 종료 실패' });
            }
            res.clearCookie('connect.sid');
            res.status(200).json({ message: '회원 탈퇴 성공' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
};

module.exports = { deleteAccount };
