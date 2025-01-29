// Select an element by its ID
function selectById() {
    const item = document.getElementById('item2');  // Select the element with ID 'item2'
    item.style.backgroundColor = 'yellow';  // Change background color of the selected item
    alert('Element with ID "item2" selected!');
}

// Select elements by tag name
function selectByTagName() {
    const items = document.getElementsByTagName('li');  // Get all <li> elements
    for (let item of items) {
        item.style.backgroundColor = 'orange';  // Change the background color of all <li> items
    }
    alert('All <li> elements selected!');
}

// Select elements by class name
function selectByClassName() {
    const items = document.getElementsByClassName('item');  // Get all elements with the class 'item'
    for (let item of items) {
        item.style.backgroundColor = 'lightgreen';  // Change background color of all elements with class 'item'
    }
    alert('All elements with class "item" selected!');
}

// Select an element using querySelector
function selectByQuerySelector() {
    const item = document.querySelector('#item3');  // Select the element with ID 'item3'
    item.style.backgroundColor = 'pink';  // Change the background color of the selected item
    alert('Element with ID "item3" selected using querySelector!');
}

// Select multiple elements using querySelectorAll
function selectByQuerySelectorAll() {
    const items = document.querySelectorAll('.item');  // Select all elements with class 'item'
    items.forEach(item => {
        item.style.backgroundColor = 'lightcoral';  // Change background color of each item
    });
    alert('All elements with class "item" selected using querySelectorAll!');
}
