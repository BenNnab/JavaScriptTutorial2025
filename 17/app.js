// Student Class
class Student {
    constructor(name, grade, age) {
      this.name = name;
      this.grade = grade;
      this.age = age;
    }
  
    // Method to get the student's description
    getDescription() {
      return `${this.name}, Grade: ${this.grade}, Age: ${this.age}`;
    }
  }
  
  // Array to store students
  const students = [];
  
  // DOM elements
  const nameInput = document.getElementById("name");
  const gradeInput = document.getElementById("grade");
  const ageInput = document.getElementById("age");
  const addStudentButton = document.getElementById("add-student-button");
  const studentList = document.getElementById("student-list");
  const errorMessage = document.getElementById("error-message");
  
  // Function to add a student
  const addStudent = () => {
    // Get input values
    const name = nameInput.value.trim();
    const grade = gradeInput.value.trim();
    const age = parseInt(ageInput.value.trim(), 10);
  
    // Validate input
    if (!name || !grade || isNaN(age) || age <= 0) {
      errorMessage.textContent = "Please provide valid student details.";
      return;
    }
  
    // Clear error message
    errorMessage.textContent = "";
  
    // Create a new student object
    const student = new Student(name, grade, age);
  
    // Add the student to the array
    students.push(student);
  
    // Clear input fields
    nameInput.value = "";
    gradeInput.value = "";
    ageInput.value = "";
  
    // Update the student list display
    displayStudents();
  };
  
  // Function to display the list of students
  const displayStudents = () => {
    // Clear the list
    studentList.innerHTML = "";
  
    // Check if there are any students
    if (students.length === 0) {
      studentList.innerHTML = "<li>No students in the list.</li>";
      return;
    }
  
    // Display each student
    students.forEach((student, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        ${student.getDescription()} 
        <button onclick="removeStudent(${index})">Remove</button>
      `;
      studentList.appendChild(listItem);
    });
  };
  
  // Function to remove a student
  const removeStudent = (index) => {
    // Remove the student from the array
    students.splice(index, 1);
  
    // Update the display
    displayStudents();
  };
  
  // Add event listener for the "Add Student" button
  addStudentButton.addEventListener("click", addStudent);
  