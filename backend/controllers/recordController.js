const Record = require("../models/record");

// Create a new record
const createRecord = async (req, res) => {
  try {
    const { name, dob, type, grade, salary } = req.body;

    if (type === "student" && !grade) {
      return res.status(400).json({ error: "Grade is required for students" });
    }
    if (type === "employee" && !salary) {
      return res.status(400).json({ error: "Salary is required for employees" });
    }

    const record = new Record({ name, dob, type, grade, salary });
    await record.save();
    res.status(201).json({ message: "Record created", record });
  } catch (err) {
    res.status(500).json({ error: "Failed to save record" });
  }
};

// Get all records
const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

// Update a record
const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecord = await Record.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRecord) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "Record updated", record: updatedRecord });
  } catch (err) {
    res.status(500).json({ error: "Failed to update record" });
  }
};

// Delete a record
const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await Record.findByIdAndDelete(id);
    if (!deletedRecord) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "Record deleted", record: deletedRecord });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete record" });
  }
};

// Search and filter records
const searchRecords = async (req, res) => {
  try {
    const { name, type, minAge, maxAge } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (type) filter.type = type;

    if (minAge || maxAge) {
      const today = new Date();
      filter.dob = {};
      if (minAge) filter.dob.$lte = new Date(today.setFullYear(today.getFullYear() - minAge));
      if (maxAge) filter.dob.$gte = new Date(today.setFullYear(today.getFullYear() - maxAge));
    }

    const records = await Record.find(filter);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch filtered records" });
  }
};

module.exports = {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
  searchRecords,
};