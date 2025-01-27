// Nested Classes for Employee and Department
class Department {
    constructor(name, id) {
      this.name = name;
      this.id = id;
    }
  
    getDetails() {
      return `Department: ${this.name} (ID: ${this.id})`;
    }
  }
  
  class Employee {
    constructor(name, age, department) {
      this.name = name;
      this.age = age;
      this.department = department;
    }
  
    getDetails() {
      return `${this.name}, Age: ${this.age}, ${this.department.getDetails()}`;
    }
  }
  
  // Array to store employee records
  const employees = [];
  
  // DOM Elements
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const departmentNameInput = document.getElementById("department-name");
  const departmentIdInput = document.getElementById("department-id");
  const addRecordButton = document.getElementById("add-record-button");
  const recordList = document.getElementById("record-list");
  const errorMessage = document.getElementById("error-message");
  
  // Function to add a record
  const addRecord = () => {
    // Get input values
    const name = nameInput.value.trim();
    const age = parseInt(ageInput.value.trim(), 10);
    const departmentName = departmentNameInput.value.trim();
    const departmentId = departmentIdInput.value.trim();
  
    // Validate input
    if (!name || isNaN(age) || age <= 0 || !departmentName || !departmentId) {
      errorMessage.textContent = "Please provide valid employee and department details.";
      return;
    }
  
    // Clear error message
    errorMessage.textContent = "";
  
    // Create a new department object
    const department = new Department(departmentName, departmentId);
  
    // Create a new employee object
    const employee = new Employee(name, age, department);
  
    // Add the employee to the array
    employees.push(employee);
  
    // Clear input fields
    nameInput.value = "";
    ageInput.value = "";
    departmentNameInput.value = "";
    departmentIdInput.value = "";
  
    // Update the record list display
    displayRecords();
  };
  
  // Function to display records
  const displayRecords = () => {
    // Clear the list
    recordList.innerHTML = "";
  
    // Check if there are any records
    if (employees.length === 0) {
      recordList.innerHTML = "<li>No records found.</li>";
      return;
    }
  
    // Display each record
    employees.forEach((employee, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        ${employee.getDetails()} 
        <button onclick="removeRecord(${index})">Remove</button>
      `;
      recordList.appendChild(listItem);
    });
  };
  
  // Function to remove a record
  const removeRecord = (index) => {
    // Remove the employee from the array
    employees.splice(index, 1);
  
    // Update the display
    displayRecords();
  };
  
  // Add event listener for the "Add Record" button
  addRecordButton.addEventListener("click", addRecord);
  