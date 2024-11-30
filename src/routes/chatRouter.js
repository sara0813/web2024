const express = require('express');
const router = express.Router();

router.get('/chat', (req, res) => {
  res.send('채팅 라우터 동작 중');
});

module.exports = router;