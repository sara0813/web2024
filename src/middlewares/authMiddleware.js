const authMiddleware = {
    // 로그인 상태 확인 미들웨어
    isLoggedIn: (req, res, next) => {
      if (req.session.user) {
        next(); // 로그인 상태이면 다음 미들웨어나 라우터로 이동
      } else {
        res.redirect('/auth/login'); // 로그인되지 않으면 로그인 페이지로 리디렉션
      }
    }
  };
  
  module.exports = authMiddleware;
  