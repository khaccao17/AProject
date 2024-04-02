var mongoose = require('mongoose')
var EmployeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name can not be empty']
         },
         position: {
            type: String,
            required: [true, 'Position can not be empty']
         },
         salary: {
            type: Number,
            required: [true, "salary can not be empty"]
         },
         image: String
    }
)
var EmployeeModel = mongoose.model('employee', EmployeeSchema, 'employee')
module.exports = EmployeeModel;