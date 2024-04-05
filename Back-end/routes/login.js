const express = require('express');
const router = express.Router();
const LoginModel = require('../models/LoginModel');
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Tìm người dùng trong cơ sở dữ liệu dựa trên username
        const user = await LoginModel.findOne({ username });

        // Kiểm tra nếu người dùng không tồn tại hoặc mật khẩu không khớp
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Tạo mã token
        const token = jwt.sign({ userId: user._id }, 'khaccao17', { expiresIn: '1h' }); // Thay 'your_secret_key_here' bằng một chuỗi bí mật thực tế

        // Nếu mọi thứ đều đúng, gửi phản hồi thành công cùng với mã token
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
