const validateProduct = (req, res, next) => {
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
        return res.status(400).json({ message: '모든 필드를 입력해야 합니다.' });
    }
    next();
};
module.exports = { validateProduct };
