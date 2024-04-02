const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeaveRequestSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'EmployeeModel' },
    startDate: Date,
    endDate: Date,
    reason: String,
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'EmployeeModel' }
});

const LeaveRequestModel = mongoose.model('leaverequest', LeaveRequestSchema,'leaverequest');

module.exports = LeaveRequestModel;
