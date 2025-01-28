const express = require("express");
const router = express.Router();
const {
  createRecord,
  getAllRecords,
  updateRecord,
  deleteRecord,
  searchRecords,
} = require("../controllers/recordController");

// Routes
router.post("/", createRecord);
router.get("/", getAllRecords);
router.put("/:id", updateRecord);
router.delete("/:id", deleteRecord);
router.get("/search", searchRecords);

module.exports = router;