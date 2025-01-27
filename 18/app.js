// Define a class for Record
class Record {
    constructor(name, age, email) {
      this.name = name;
      this.age = age;
      this.email = email;
    }
  
    // Method to display the record as a string
    toString() {
      return `Name: ${this.name}, Age: ${this.age}, Email: ${this.email}`;
    }
  }
  
  // Array to store records
  let records = [];
  
  // Function to add a record
  function addRecord(name, age, email) {
    const record = new Record(name, age, email);
    records.push(record);
    displayRecords();
  }
  
  // Function to display all records
  function displayRecords() {
    const recordList = document.getElementById("recordList");
    recordList.innerHTML = ""; // Clear previous records
  
    records.forEach((record, index) => {
      const recordItem = document.createElement("div");
      recordItem.className = "record-item";
      recordItem.textContent = `Record ${index + 1}: ${record.toString()}`;
      recordList.appendChild(recordItem);
    });
  }
  
  // Handle form submission
  document.getElementById("recordForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting
  
    // Get input values
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const email = document.getElementById("email").value;
  
    // Add record
    addRecord(name, age, email);
  
    // Clear form inputs
    document.getElementById("recordForm").reset();
  });