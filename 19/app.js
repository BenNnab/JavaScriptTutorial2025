document.addEventListener("DOMContentLoaded", () => {
    const typeSelect = document.getElementById("type");
    const studentFields = document.getElementById("studentFields");
    const employeeFields = document.getElementById("employeeFields");
  
    // Show/hide fields based on selected type
    typeSelect.addEventListener("change", () => {
      if (typeSelect.value === "student") {
        studentFields.style.display = "block";
        employeeFields.style.display = "none";
      } else if (typeSelect.value === "employee") {
        studentFields.style.display = "none";
        employeeFields.style.display = "block";
      }
    });
  
    // Handle form submission
    // 
    const form = document.getElementById("personForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const grade = type === "student" ? document.getElementById("grade").value : null;
  const salary = type === "employee" ? document.getElementById("salary").value : null;

  const record = { name, dob, type, grade, salary };

  console.log("Sending record:", record); // Debugging

  try {
    const response = await fetch("http://127.0.0.1:5000/api/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });

    console.log("Response status:", response.status); // Debugging

    if (response.ok) {
      alert("Record added successfully!");
      form.reset();
    } else {
      const errorData = await response.json(); // Get error details from the backend
      console.error("Error response:", errorData); // Debugging
      alert("Failed to add record.");
    }
  } catch (err) {
    console.error("Error:", err); // Debugging
    alert("An error occurred while adding the record.");
  }
});
  });