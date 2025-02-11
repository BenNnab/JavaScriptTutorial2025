// Simulate an async task with Promises
function fetchUserData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { name: "John Doe", age: 30 };
        resolve(user);
      }, 2000); // Simulate a 2-second delay
    });
  }
  
  function processUserData(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        user.age += 5; // Simulate processing
        resolve(user);
      }, 1000); // Simulate a 1-second delay
    });
  }
  
  function displayData(user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Final Data: ${user.name}, ${user.age} years old`);
      }, 1000); // Simulate a 1-second delay
    });
  }
  
  // Using Promises
  document.getElementById("startButton").addEventListener("click", () => {
    document.getElementById("output").innerText = "Starting Task 1...";
  
    fetchUserData()
      .then((user) => {
        document.getElementById("output").innerText = `Task 1 Complete: Fetched User - ${user.name}`;
        return processUserData(user);
      })
      .then((processedUser) => {
        document.getElementById("output").innerText = `Task 2 Complete: Processed User Age - ${processedUser.age}`;
        return displayData(processedUser);
      })
      .then((finalOutput) => {
        document.getElementById("output").innerText = `Task 3 Complete: ${finalOutput}`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
  
  