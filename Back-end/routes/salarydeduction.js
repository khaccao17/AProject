const express = require('express');
const router = express.Router();
const SalaryDeductionModel = require('../models/SalaryDeductionModel');

// Route để lấy tất cả các khoản khấu trừ lương
router.get('/', async (req, res) => {
    try {
        const salaryDeductions = await SalaryDeductionModel.find();
        res.json(salaryDeductions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route để tạo một khoản khấu trừ lương mới
router.post('/', async (req, res) => {
    const salaryDeduction = new SalaryDeductionModel({
        employeeId: req.body.employeeId,
        deductionDate: req.body.deductionDate,
        amount: req.body.amount,
        reason: req.body.reason
    });

    try {
        const newSalaryDeduction = await salaryDeduction.save();
        res.status(201).json(newSalaryDeduction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route để xem thông tin của một khoản khấu trừ lương cụ thể
router.get('/:id', async (req, res) => {
    try {
        const salaryDeduction = await SalaryDeductionModel.findById(req.params.id);
        if (!salaryDeduction) {
            return res.status(404).json({ message: 'Cannot find salary deduction' });
        }
        res.json(salaryDeduction);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Route để cập nhật thông tin của một khoản khấu trừ lương
router.patch('/:id', async (req, res) => {
    try {
        const updatedSalaryDeduction = await SalaryDeductionModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSalaryDeduction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route để xóa một khoản khấu trừ lương
router.delete('/:id', async (req, res) => {
    try {
        await SalaryDeductionModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted salary deduction' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
