const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'], required: true },
  status: { type: String, enum: ['Pending', 'Ongoing', 'Done'], default: 'Pending' },
  createdDate: { type: Date, default: Date.now }, // Automatically set the creation date
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Associate task with a user
});

const Task = mongoose.model('Task', taskSchema);