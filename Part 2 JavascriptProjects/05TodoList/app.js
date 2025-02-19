const toDoList = [];

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const dateElement = document.querySelector('.js-date-input');
    const timeElement = document.querySelector('.js-time-input'); // Updated to time input

    // Check if elements exist
    if (!inputElement || !dateElement || !timeElement) {
        console.error('One or more input elements are missing in the DOM.');
        return;
    }

    const name = inputElement.value.trim();
    const date = dateElement.value;
    const time = timeElement.value; // Get the time value

    if (name) {
        // Add the to-do item with date and time (if provided)
        toDoList.push({
            name: name,
            date: date,
            time: time // Store the time value
        });
        console.log(toDoList);

        // Clear input fields
        inputElement.value = '';
        dateElement.value = '';
        timeElement.value = '';

        // Re-render the to-do list
        renderTodoList();
    } else {
        alert('Please enter a valid to-do item.');
    }
}

function renderTodoList() {
    const todoListElement = document.querySelector('.js-todo-list');
    if (!todoListElement) {
        console.error('The to-do list element is missing in the DOM.');
        return;
    }

    let todoListHTML = '';
    for (let i = 0; i < toDoList.length; i++) {
        const todo = toDoList[i];
        const html = `
            <div class="todo-item">
                <p><strong>${todo.name}</strong></p>
                ${todo.date ? `<p>Date: ${todo.date}</p>` : ''}
                ${todo.time ? `<p>Time: ${todo.time}</p>` : ''} <!-- Display the time -->
                <button onclick="deleteTodo(${i})">Delete</button>
            </div>
        `;
        todoListHTML += html;
    }
    todoListElement.innerHTML = todoListHTML;
}

function deleteTodo(index) {
    toDoList.splice(index, 1); // Remove the item at the specified index
    renderTodoList(); // Re-render the list
}

// Add event listeners
document.querySelector('.js-add-todo-button')?.addEventListener('click', addTodo);
document.querySelector('.js-name-input')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});