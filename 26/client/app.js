// app.js
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Fetch tasks from the server
async function fetchTasks() {
  const response = await fetch("http://localhost:5000/api/tasks");
  const tasks = await response.json();
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    li.classList.toggle("completed", task.completed);
    li.addEventListener("click", () => toggleTaskCompletion(task._id, task.completed));
    taskList.appendChild(li);
  });
}

// Add new task
addTaskBtn.addEventListener("click", async () => {
  const taskTitle = taskInput.value;
  if (!taskTitle) return;

  const response = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: taskTitle }),
  });
  const newTask = await response.json();
  fetchTasks();
  taskInput.value = "";
});

// Toggle task completion status
async function toggleTaskCompletion(taskId, completed) {
  const updatedTask = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed }),
  });
  fetchTasks();
}

// Load tasks on page load
fetchTasks();
