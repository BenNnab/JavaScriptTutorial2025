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

// Using Async/Await
document.getElementById("startButton").addEventListener("click", async () => {
  try {
    document.getElementById("output").innerText = "Starting Task 1...";

    const user = await fetchUserData();
    document.getElementById("output").innerText = `Task 1 Complete: Fetched User - ${user.name}`;

    const processedUser = await processUserData(user);
    document.getElementById("output").innerText = `Task 2 Complete: Processed User Age - ${processedUser.age}`;

    const finalOutput = await displayData(processedUser);
    document.getElementById("output").innerText = `Task 3 Complete: ${finalOutput}`;
  } catch (error) {
    console.error("Error:", error);
  }
});
  