const express = require('express');
const router = express.Router();
const LoginModel = require('./LoginModel');
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const loginData = new LoginModel(email, password);
    if (!loginData.isValid()) {
        return res.status(400).json({ error: 'Email and password are invalid' });
    }
    const sampleEmail = 'admin@email.com';
    const samplePassword = 'password123';

    if (email === sampleEmail && password === samplePassword) {
        return res.status(200).json({ message: 'Email and password are invalid' });
    } else {
        return res.status(401).json({ error: 'Email or password is incorrect' });
    }
});

module.exports = router;
