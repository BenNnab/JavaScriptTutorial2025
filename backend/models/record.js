// backend/models/record.js

const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: Date, required: true },
  type: { type: String, required: true, enum: ["student", "employee"] },
  grade: { type: Number, required: function () { return this.type === "student"; } },
  salary: { type: Number, required: function () { return this.type === "employee"; } },
});

module.exports = mongoose.model("Record", recordSchema);