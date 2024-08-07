const mongoose = require('mongoose');

const RequirementSchema = new mongoose.Schema({
  purpose: String,
  amount: Number
});

module.exports = mongoose.model('Requirement', RequirementSchema);