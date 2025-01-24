// Library array to store book objects
let library = [];

// DOM elements
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");
const addBookButton = document.getElementById("add-book-button");
const bookList = document.getElementById("book-list");
const errorMessage = document.getElementById("error-message");

// Function to add a book to the library
const addBook = () => {
  // Get user input
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const year = parseInt(yearInput.value.trim(), 10);

  // Validate input
  if (!title || !author || isNaN(year) || year <= 0) {
    errorMessage.textContent = "Please enter valid book details.";
    return;
  }

  // Clear error message
  errorMessage.textContent = "";

  // Create a book object
  const book = {
    title,
    author,
    year,
  };

  // Add the book to the library
  library.push(book);

  // Clear input fields
  titleInput.value = "";
  authorInput.value = "";
  yearInput.value = "";

  // Update the book list display
  displayBooks();
};

// Function to display books in the library
const displayBooks = () => {
  // Clear the book list
  bookList.innerHTML = "";

  // Check if the library is empty
  if (library.length === 0) {
    bookList.innerHTML = "<li>No books in the library.</li>";
    return;
  }

  // Display each book as a list item
  library.forEach((book, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${book.title}</strong> by ${book.author} (Published in ${book.year}) <button onclick="removeBook(${index})">Remove</button>`;
    bookList.appendChild(listItem);
  });
};

// Function to remove a book from the library
const removeBook = (index) => {
  // Remove the book from the library
  library.splice(index, 1);

  // Update the book list display
  displayBooks();
};

// Event listener for the "Add Book" button
addBookButton.addEventListener("click", addBook);
