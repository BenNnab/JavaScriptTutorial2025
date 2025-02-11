// Simulate Callback Hell
document.getElementById("output").innerText = "Starting Task 1...";

// Task 1: Fetch user data (simulated with setTimeout)
setTimeout(() => {
  const user = { name: "John Doe", age: 30 };
  document.getElementById("output").innerText = `Task 1 Complete: Fetched User - ${user.name}`;

  // Task 2: Process user data (nested setTimeout)
  setTimeout(() => {
    user.age += 5; // Simulate processing
    document.getElementById("output").innerText = `Task 2 Complete: Processed User Age - ${user.age}`;

    // Task 3: Display processed data (nested setTimeout)
    setTimeout(() => {
      document.getElementById("output").innerText = `Task 3 Complete: Final Data - ${user.name}, ${user.age} years old`;
    }, 1000); // 1 second delay for Task 3

  }, 1000); // 1 second delay for Task 2

}, 2000); // 2 second delay for Task 1