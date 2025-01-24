// Function that adds a task to the list
function addTask(callback) {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Simulate an operation (like saving the task to a database or API)
    setTimeout(() => {
        // After the task is "saved", we invoke the callback function
        callback(taskText);
    }, 1000);  // Simulating a delay of 1 second
}

// Callback function that adds the task to the list
function taskAddedCallback(taskText) {
    const taskList = document.getElementById('taskList');
    
    // Create a new list item
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    // Append the new task to the list
    taskList.appendChild(listItem);

    // Clear the input field
    document.getElementById('taskInput').value = '';
}
