const express = require('express');
const router = express.Router();
const EmployeeModel = require('../models/EmployeeModel'); // Đổi tên EmployeeModel thành Employee

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await EmployeeModel.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new employee
router.post('/create', async (req, res) => {
    const employee = new EmployeeModel({
        name: req.body.name,
        position: req.body.position,
        salary: req.body.salary,
        image: req.body.image
    });
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get employee by ID
router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee);
});

// Middleware to get employee by ID
async function getEmployee(req, res, next) {
    try {
        const employee = await EmployeeModel.findById(req.params.id);
        if (employee == null) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.employee = employee;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;
