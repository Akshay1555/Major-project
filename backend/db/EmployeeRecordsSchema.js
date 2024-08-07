const mongoose = require('mongoose');
const bcrypt=require("bcrypt");
const EmployeeRecordsSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{type:String,default:"employee"}
  }, {
    timestamps: true
});

EmployeeRecordsSchema.pre('save', async function(next) {
  try {
 
    if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
    console.log("Before saving a user:", this);
    next();
  } catch (error) {
    next(error); 
  }
});

const EmployeeRecords = mongoose.model('EmployeeRecords', EmployeeRecordsSchema);

module.exports = EmployeeRecords;
