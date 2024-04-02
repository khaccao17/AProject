const express = require('express');
const router = express.Router();
const LeaveRequestModel = require('../models/LeaveRequestModel');

// Create a new leave request
router.post('/create', async (req, res) => {
    const leaveRequest = new LeaveRequestModel({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        reason: req.body.reason,
    });
    try {
        const newLeaveRequest = await leaveRequest.save();
        res.status(201).json(newLeaveRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all leave requests
router.get('/', async (req, res) => {
    try {
        const leaveRequests = await LeaveRequestModel.find();
        res.json(leaveRequests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get leave requests by Employee ID
router.get('/employee/:employeeId', async (req, res) => {
    try {
        const leaveRequests = await LeaveRequestModel.find({ employeeId: req.params.employeeId });
        res.json(leaveRequests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const leaveRequest = await LeaveRequestModel.findByIdAndUpdate(id, { status }, { new: true });

        if (!leaveRequest) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        res.json(leaveRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
