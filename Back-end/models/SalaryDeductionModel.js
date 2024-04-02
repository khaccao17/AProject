const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalaryDeductionSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee' },
    deductionDate: { type: Date, default: Date.now },
    amount: Number,
    reason: String
});

const SalaryDeductionModel = mongoose.model('salarydeduction', SalaryDeductionSchema,'salarydeduction');

module.exports = SalaryDeductionModel;
