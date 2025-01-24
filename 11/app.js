// Array to store fruits
const fruits = [];

// Select DOM elements
const fruitInput = document.getElementById("fruit-input");
const addButton = document.getElementById("add-button");
const fruitList = document.getElementById("fruit-list");
const errorMessage = document.getElementById("error-message");
const formatOptions = document.getElementById("format-options");

// Function to update the fruit list based on the selected format
function updateFruitList() {
  // Clear the current list
  fruitList.innerHTML = "";

  // Get the selected format
  const format = formatOptions.value;

  // Iterate over the fruits array and create list items with the selected format
  fruits.forEach((fruit) => {
    const listItem = document.createElement("li");
    listItem.textContent = formatFruit(fruit, format);
    fruitList.appendChild(listItem);
  });
}

// Function to format the fruit name based on the selected format
function formatFruit(fruit, format) {
  switch (format) {
    case "uppercase":
      return fruit.toUpperCase();
    case "lowercase":
      return fruit.toLowerCase();
    case "capitalize":
      return fruit.charAt(0).toUpperCase() + fruit.slice(1).toLowerCase();
    default:
      return fruit; // Original format
  }
}

// Function to validate the fruit input
function validateFruit(fruit) {
  const validFruit = /^[A-Za-z]+$/;
  if (fruit === "") {
    errorMessage.textContent = "Fruit name cannot be empty.";
    return false;
  } else if (!validFruit.test(fruit)) {
    errorMessage.textContent = "Fruit name must contain only letters.";
    return false;
  } else if (fruits.includes(fruit)) {
    errorMessage.textContent = "This fruit is already in the list.";
    return false;
  }

  // Clear error message if validation passes
  errorMessage.textContent = "";
  return true;
}

// Add event listener to the "Add" button
addButton.addEventListener("click", () => {
  const fruit = fruitInput.value;

  // Validate the input and add the fruit to the list if valid
  if (validateFruit(fruit)) {
    fruits.push(fruit); // Add the fruit to the array
    updateFruitList(); // Update the displayed list
    fruitInput.value = ""; // Clear the input field
  }
});

// Update the list when the format changes
formatOptions.addEventListener("change", updateFruitList);

// Optional: Allow pressing "Enter" to add a fruit
fruitInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addButton.click(); // Trigger the button click
  }
});
