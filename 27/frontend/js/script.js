const API_URL = "http://localhost:5000/api";

// Function to check if the token is expired
function isTokenExpired(token) {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split(".")[1])); // Decode the token payload
  const expirationTime = payload.exp * 1000; // Convert to milliseconds
  return Date.now() > expirationTime; // Check if the token has expired
}

// Function to fetch data with token validation
async function fetchWithToken(url, options) {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token"); // Clear the expired token
    window.location.href = "/index.html"; // Redirect to the login page
    return Promise.reject("Token expired or invalid.");
  }

  options = options || {};
  options.headers = options.headers || {};
  options.headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
      // Token is expired or invalid
      localStorage.removeItem("token"); // Clear the expired token
      window.location.href = "/index.html"; // Redirect to the login page
      return Promise.reject("Token expired or invalid.");
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// TASK CREATION FUNCTION
document.getElementById("taskForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const status = document.getElementById("status").value;

  try {
    const response = await fetchWithToken(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, category, status }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Task created successfully!");
      window.location.href = "tasks.html"; // Redirect to tasks page
    } else {
      alert(data.error || "Failed to create task");
    }
  } catch (err) {
    alert("An error occurred");
  }
});

// Load tasks for the logged-in user
const loadTasks = async () => {
  try {
    const response = await fetchWithToken(`${API_URL}/tasks`);
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = tasks
      .map(
        (task) => `
        <div class="card">
          <div class="card-avatar-root">
            <img src="https://via.placeholder.com/50" alt="${task.title}" class="card-avatar-img">
          </div>
          <div class="card-body">
            <div class="ellipsis title">Title: ${task.title}</div>
            <div class="small-font description">Description: ${task.description}</div>
            <div class="small-font category">Category: ${task.category}</div>
            <div class="ellipsis status">Status: ${task.status}</div>
            <div class="small-font date">Date Created: ${new Date(task.createdDate).toLocaleString()}</div>
          </div>
        </div>
      `
      )
      .join("");
  } catch (err) {
    alert("An error occurred");
  }
};

// Load tasks when the tasks page loads
if (window.location.pathname.includes("tasks.html")) {
  loadTasks();
}

// Update a task
const updateTask = async (taskId) => {
  const newTitle = prompt("Enter new title:");
  const newDescription = prompt("Enter new description:");
  const newCategory = prompt("Enter new category (Daily, Weekly, Monthly, Yearly):");
  const newStatus = prompt("Enter new status (Pending, Ongoing, Done):");

  if (newTitle && newDescription && newStatus) {
    try {
      const response = await fetchWithToken(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          category: newCategory,
          status: newStatus,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        loadTasks(); // Reload tasks after updating
      } else {
        alert(data.error || "Failed to update task");
      }
    } catch (err) {
      alert("An error occurred");
    }
  }
};

// Delete a task
const deleteTask = async (taskId) => {
  if (confirm("Are you sure you want to delete this task?")) {
    try {
      const response = await fetchWithToken(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        loadTasks(); // Reload tasks after deleting
      } else {
        alert(data.error || "Failed to delete task");
      }
    } catch (err) {
      alert("An error occurred");
    }
  }
};

// Login form submission
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token); // Save token to localStorage
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    alert("An error occurred");
  }
});

// Register form submission
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Registration successful! Please login.");
      window.location.href = "index.html"; // Redirect to login page
    } else {
      alert(data.error || "Registration failed");
    }
  } catch (err) {
    alert("An error occurred");
  }
});

// Logout button functionality
document.getElementById("logoutButton")?.addEventListener("click", function () {
  localStorage.removeItem("token"); // Clear the token
  window.location.href = "/27/frontend/index.html"; // Redirect to the login page
});

// Filter tasks by category
const filterTasks = async () => {
  const category = document.getElementById("filterCategory").value;
  const url = category === "all" ? `${API_URL}/tasks` : `${API_URL}/tasks?category=${category}`;

  try {
    const response = await fetchWithToken(url);
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = tasks
      .map(
        (task) => `
        <div class="task-item">
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <p>Category: ${task.category}</p>
          <p>Status: ${task.status}</p>
          <p>Created: ${new Date(task.createdDate).toLocaleString()}</p>
          <div class="actions">
            <button onclick="updateTask('${task._id}')">Edit</button>
            <button onclick="deleteTask('${task._id}')">Delete</button>
          </div>
        </div>
      `
      )
      .join("");
  } catch (err) {
    alert("An error occurred");
  }
};