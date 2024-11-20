const { User } = require('../models/User');

// 사용자 정보 가져오기
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId); // JWT에서 userId를 사용하여 사용자를 찾음

        if (!user) {
            return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error('사용자 정보 조회 중 오류 발생:', error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
};

// 사용자 정보 업데이트
exports.updateUserProfile = async (req, res) => {
    const { nickname, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(req.userId, { nickname, email }, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: '사용자를 찾을 수 없습니다.' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error('사용자 정보 수정 중 오류 발생:', error);
        res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
};
