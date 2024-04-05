const bcrypt = require('bcryptjs');

// routes/registerRoutes.js
const express = require('express');
const router = express.Router();
const RegisterModel = require('../models/RegisterModel');
const jwt = require('jsonwebtoken');
// Route để tạo người dùng mới
router.post('/create', async (req, res) => {
    const { username, email, password, fullName, phoneNumber, dateOfBirth, address,role } = req.body;
    
    try {
        // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(password, 10); // Sử dụng salt round là 10

        // Tạo người dùng mới với mật khẩu đã mã hóa
        const newUser = new RegisterModel({
            username,
            email,
            password: hashedPassword, // Lưu mật khẩu đã được mã hóa vào cơ sở dữ liệu
            fullName,
            phoneNumber,
            dateOfBirth,
            address,
            role
        });

        const savedUser = await newUser.save();

        // Tạo mã token
        const token = jwt.sign({ userId: savedUser._id }, 'khaccao17', { expiresIn: '1h' }); // Thay 'your_secret_key_here' bằng một chuỗi bí mật thực tế

        res.status(201).json({ user: savedUser, token }); // Trả về mã token trong phản hồi
    } catch (err) {
        // Kiểm tra loại lỗi và trả về thông báo phù hợp
        if (err.name === 'ValidationError') {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});
// Route để xác thực thông tin đăng nhập
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Tìm người dùng trong cơ sở dữ liệu dựa trên username
        const user = await RegisterModel.findOne({ username });

        // Kiểm tra nếu người dùng không tồn tại hoặc mật khẩu không khớp
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Nếu mọi thứ đều đúng, gửi phản hồi thành công
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Các phần còn lại của mã không cần thay đổi

module.exports = router;
