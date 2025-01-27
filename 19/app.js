// Base class for Person
class Person {
    constructor(name, dob) {
      this.name = name;
      this.dob = new Date(dob); // Store DoB as a Date object
    }
  
    // Calculate age based on DoB
    getAge() {
      const today = new Date();
      const birthDate = new Date(this.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
  
    // Check if today is the user's birthday
    isBirthdayToday() {
      const today = new Date();
      const birthDate = new Date(this.dob);
  
      // Use UTC methods to avoid timezone issues
      const todayMonth = today.getUTCMonth();
      const todayDate = today.getUTCDate();
      const birthMonth = birthDate.getUTCMonth();
      const birthDateDay = birthDate.getUTCDate();
  
      // Debugging logs
      console.log(`Today (UTC): Month=${todayMonth}, Date=${todayDate}`);
      console.log(`Birth Date (UTC): Month=${birthMonth}, Date=${birthDateDay}`);
  
      // Compare month and day
      return todayMonth === birthMonth && todayDate === birthDateDay;
    }
  
    toString() {
      return `Name: ${this.name}, Age: ${this.getAge()}`;
    }
  }
  
  // Student class
  class Student extends Person {
    constructor(name, dob, grade) {
      super(name, dob);
      this.grade = grade;
    }
  
    toString() {
      return `${super.toString()}, Grade: ${this.grade}`;
    }
  }
  
  // Employee class
  class Employee extends Person {
    constructor(name, dob, salary) {
      super(name, dob);
      this.salary = salary;
    }
  
    toString() {
      return `${super.toString()}, Salary: $${this.salary}`;
    }
  }
  
  // Array to store records
  let records = [];
  
  // Function to add a record
  function addRecord(type, name, dob, extra) {
    let record;
    if (type === "student") {
      record = new Student(name, dob, extra);
    } else if (type === "employee") {
      record = new Employee(name, dob, extra);
    }
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
  
      // Check if today is the user's birthday
      if (record.isBirthdayToday()) {
        const birthdayMessage = document.createElement("p");
        birthdayMessage.textContent = `🎉 Happy Super Duper Birthday, ${record.name}! 🎉`;
        birthdayMessage.style.color = "green";
        birthdayMessage.style.fontWeight = "bold";
        recordItem.appendChild(birthdayMessage);
      }
  
      // Display the record details
      const recordDetails = document.createElement("p");
      recordDetails.textContent = `Record ${index + 1}: ${record.toString()}`;
      recordItem.appendChild(recordDetails);
  
      // Append the record item to the list
      recordList.appendChild(recordItem);
    });
  }
  
  // Function to sort records
  function sortRecords(sortBy) {
    records.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "age") {
        return a.getAge() - b.getAge();
      } else if (sortBy === "grade" && a instanceof Student) {
        return a.grade.localeCompare(b.grade);
      } else if (sortBy === "salary" && a instanceof Employee) {
        return a.salary - b.salary;
      }
      return 0;
    });
    displayRecords(); // Refresh the display after sorting
  }
  
  // Handle form submission
  document.getElementById("personForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting
  
    // Get input values
    const type = document.getElementById("type").value;
    const name = document.getElementById("name").value;
    const dob = document.getElementById("dob").value;
    const extra = type === "student" ? document.getElementById("grade").value : document.getElementById("salary").value;
  
    // Add record
    addRecord(type, name, dob, extra);
  
    // Clear form inputs
    document.getElementById("personForm").reset();
  });
  
  // Handle sorting
  document.getElementById("sortBy").addEventListener("change", function (e) {
    const sortBy = e.target.value;
    sortRecords(sortBy);
  });
  
  // Toggle fields based on type
  document.getElementById("type").addEventListener("change", function (e) {
    const type = e.target.value;
    document.getElementById("studentFields").style.display = type === "student" ? "block" : "none";
    document.getElementById("employeeFields").style.display = type === "employee" ? "block" : "none";
  });