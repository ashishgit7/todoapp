const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  desc: { type: String, required: false },
  date: { type: String, required: false },
  dueDate: { type: String, required: false },
  priority: { type: String, required: false },
  condition: { type: String, required: false },
}, {
  timestamps: true,
});

const Task = mongoose.model('Task', exerciseSchema);

module.exports = Task;