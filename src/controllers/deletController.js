const { User } = require('../models/User'); // User 모델 가져오기

const deleteAccount = async (req, res) => {
    try {
        res.status(200).json({ message: '회원 탈퇴 성공' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 오류' });
    }
};

module.exports = { deleteAccount };
