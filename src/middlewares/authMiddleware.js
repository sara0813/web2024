const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization;

  if (!token) {
    return res.status(401).send('로그인이 필요합니다.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // 사용자 정보를 req.user에 저장
    next();
  } catch (err) {
    return res.status(401).send('유효하지 않은 토큰입니다.');
  }
};

module.exports = authMiddleware;
