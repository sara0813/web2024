const jwt = require('jsonwebtoken');

// JWT 인증 미들웨어
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ success: false, message: '인증 토큰이 없습니다.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: '유효하지 않은 토큰입니다.' });
    }
};

module.exports = verifyToken;
