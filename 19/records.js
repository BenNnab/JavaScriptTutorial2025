document.addEventListener("DOMContentLoaded", () => {
    const recordTable = document.getElementById("recordTable").getElementsByTagName("tbody")[0];
  
    // Fetch and display records
    async function fetchRecords() {
      try {
        const response = await fetch("/api/records");
        const records = await response.json();
        displayRecords(records);
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    }
  
    // Display records in the table
    function displayRecords(records) {
      recordTable.innerHTML = ""; // Clear existing rows
  
      records.forEach((record) => {
        const row = recordTable.insertRow();
        row.innerHTML = `
          <td>${record.name}</td>
          <td>${record.dob}</td>
          <td>${record.type}</td>
          <td>${record.grade || "-"}</td>
          <td>${record.salary || "-"}</td>
          <td>
            <button onclick="editRecord('${record._id}')">Edit</button>
            <button onclick="deleteRecord('${record._id}')">Delete</button>
          </td>
        `;
      });
    }
  
    // Edit record
    window.editRecord = (id) => {
      alert(`Edit record with ID: ${id}`);
      // Redirect to an edit page or open a modal
    };
  
    // Delete record
    window.deleteRecord = async (id) => {
      if (confirm("Are you sure you want to delete this record?")) {
        try {
          const response = await fetch(`/api/records/${id}`, { method: "DELETE" });
          if (response.ok) {
            alert("Record deleted successfully!");
            fetchRecords(); // Refresh the table
          } else {
            alert("Failed to delete record.");
          }
        } catch (err) {
          console.error("Error:", err);
          alert("An error occurred while deleting the record.");
        }
      }
    };
  
    // Initial fetch of records
    fetchRecords();
  });