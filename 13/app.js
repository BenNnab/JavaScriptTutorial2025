// DOM elements
const minInput = document.getElementById("min-input");
const maxInput = document.getElementById("max-input");
const generateButton = document.getElementById("generate-button");
const numberList = document.getElementById("number-list");
const filterOptions = document.getElementById("filter-options");
const errorMessage = document.getElementById("error-message");

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Function to check if a number is a perfect square
function isPerfectSquare(num) {
  const sqrt = Math.sqrt(num);
  return sqrt === Math.floor(sqrt); // True if sqrt is an integer
}

// Function to generate numbers within a range
function generateNumbers(min, max) {
  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  return numbers;
}

// Function to filter numbers based on the selected filter
function filterNumbers(numbers, filter) {
  switch (filter) {
    case "even":
      return numbers.filter((num) => num % 2 === 0);
    case "odd":
      return numbers.filter((num) => num % 2 !== 0);
    case "prime":
      return numbers.filter((num) => isPrime(num));
    case "perfect-square":
      return numbers.filter((num) => isPerfectSquare(num));
    default:
      return numbers; // All numbers
  }
}

// Function to render the numbers
function renderNumbers(numbers) {
  // Clear the current list
  numberList.innerHTML = "";

  // Use map to create list items
  const listItems = numbers.map((num) => `<li>${num}</li>`).join("");

  // Insert the list items into the DOM
  numberList.innerHTML = listItems;
}

// Event listener for the "Generate Numbers" button
generateButton.addEventListener("click", () => {
  const min = parseInt(minInput.value);
  const max = parseInt(maxInput.value);

  // Validate inputs
  if (isNaN(min) || isNaN(max)) {
    errorMessage.textContent = "Please enter valid numbers for both fields.";
    return;
  }
  if (min > max) {
    errorMessage.textContent = "Minimum value cannot be greater than maximum value.";
    return;
  }

  // Clear error message
  errorMessage.textContent = "";

  // Generate the numbers and render the list
  const numbers = generateNumbers(min, max);
  const filter = filterOptions.value;
  const filteredNumbers = filterNumbers(numbers, filter);
  renderNumbers(filteredNumbers);
});

// Event listener for the filter dropdown
filterOptions.addEventListener("change", () => {
  const min = parseInt(minInput.value);
  const max = parseInt(maxInput.value);

  if (isNaN(min) || isNaN(max) || min > max) return;

  // Re-generate the filtered list
  const numbers = generateNumbers(min, max);
  const filter = filterOptions.value;
  const filteredNumbers = filterNumbers(numbers, filter);
  renderNumbers(filteredNumbers);
});
