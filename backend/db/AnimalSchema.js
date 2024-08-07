const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  type: String,
  count: Number
});

const Animal = mongoose.model('Animal', AnimalSchema);

module.exports = Animal;