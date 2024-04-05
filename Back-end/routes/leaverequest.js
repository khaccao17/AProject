const express = require('express');
const router = express.Router();
const LeaveRequestModel = require('../models/LeaveRequestModel');

// Route để tạo leave request
router.post('/create', async (req, res) => {
    const { employeeId, startDate, endDate, reason } = req.body;
    
    try {
        // Tạo leave request mới
        const newLeaveRequest = new LeaveRequestModel({
            employeeId,
            startDate,
            endDate,
            reason
        });

        const savedLeaveRequest = await newLeaveRequest.save();

        res.status(201).json({ message: 'Leave request created successfully', leaveRequest: savedLeaveRequest });
    } catch (err) {
        console.error('Error creating leave request:', err);
        res.status(500).json({ message: 'Internal Server Error' });
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

// Get leave requests by specific date
router.get('/date/:date', async (req, res) => {
    const { date } = req.params;

    try {
        const leaveRequests = await LeaveRequestModel.find({ startDate: { $lte: date }, endDate: { $gte: date } });
        // Trả về các leave request có ngày bắt đầu nhỏ hơn hoặc bằng date và ngày kết thúc lớn hơn hoặc bằng date
        res.json(leaveRequests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update leave request status
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
