// Function to add a record
async function addRecord(type, name, dob, extra) {
    const recordData = {
      name,
      dob,
      type,
      grade: type === "student" ? extra : undefined,
      salary: type === "employee" ? extra : undefined,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recordData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save record");
      }
  
      const data = await response.json();
      console.log("Record saved:", data.record);
      displayRecords(); // Refresh the display
    } catch (error) {
      console.error("Error saving record:", error);
    }
  }
  
  // Function to fetch and display records
  async function displayRecords() {
    try {
      const response = await fetch("http://localhost:5000/api/records");
      if (!response.ok) {
        throw new Error("Failed to fetch records");
      }
  
      const records = await response.json();
      const recordList = document.getElementById("recordList");
      recordList.innerHTML = ""; // Clear previous records
  
      records.forEach((record, index) => {
        const recordItem = document.createElement("div");
        recordItem.className = "record-item";
  
        // Check if today is the user's birthday
        const today = new Date();
        const birthDate = new Date(record.dob);
        if (today.getMonth() === birthDate.getMonth() && today.getDate() === birthDate.getDate()) {
          const birthdayMessage = document.createElement("p");
          birthdayMessage.textContent = `🎉 Happy Birthday, ${record.name}! 🎉`;
          birthdayMessage.style.color = "green";
          birthdayMessage.style.fontWeight = "bold";
          recordItem.appendChild(birthdayMessage);
        }
  
        // Display the record details
        const recordDetails = document.createElement("p");
        recordDetails.textContent = `Record ${index + 1}: Name: ${record.name}, Age: ${calculateAge(record.dob)}, ${
          record.type === "student" ? `Grade: ${record.grade}` : `Salary: $${record.salary}`
        }`;
        recordItem.appendChild(recordDetails);
  
        // Append the record item to the list
        recordList.appendChild(recordItem);
      });
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  }
  
  // Helper function to calculate age
  function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }