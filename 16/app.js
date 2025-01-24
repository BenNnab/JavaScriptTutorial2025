// Constructor function for creating car objects
function Car(make, model, year, color) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.getDescription = function () {
      return `${this.year} ${this.color} ${this.make} ${this.model}`;
    };
  }
  
  // Array to store car objects
  const cars = [];
  
  // DOM elements
  const makeInput = document.getElementById("make");
  const modelInput = document.getElementById("model");
  const yearInput = document.getElementById("year");
  const colorInput = document.getElementById("color");
  const addCarButton = document.getElementById("add-car-button");
  const carList = document.getElementById("car-list");
  const errorMessage = document.getElementById("error-message");
  
  // Function to add a car
  const addCar = () => {
    // Get input values
    const make = makeInput.value.trim();
    const model = modelInput.value.trim();
    const year = parseInt(yearInput.value.trim(), 10);
    const color = colorInput.value.trim();
  
    // Validate input
    if (!make || !model || isNaN(year) || year <= 0 || !color) {
      errorMessage.textContent = "Please provide valid car details.";
      return;
    }
  
    // Clear error message
    errorMessage.textContent = "";
  
    // Create a new car object
    const car = new Car(make, model, year, color);
  
    // Add the car to the array
    cars.push(car);
  
    // Clear input fields
    makeInput.value = "";
    modelInput.value = "";
    yearInput.value = "";
    colorInput.value = "";
  
    // Update the car list display
    displayCars();
  };
  
  // Function to display the list of cars
  const displayCars = () => {
    // Clear the list
    carList.innerHTML = "";
  
    // Check if there are any cars
    if (cars.length === 0) {
      carList.innerHTML = "<li>No cars in the list.</li>";
      return;
    }
  
    // Display each car
    cars.forEach((car, index) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        ${car.getDescription()} 
        <button onclick="removeCar(${index})">Remove</button>
      `;
      carList.appendChild(listItem);
    });
  };
  
  // Function to remove a car
  const removeCar = (index) => {
    // Remove the car from the array
    cars.splice(index, 1);
  
    // Update the display
    displayCars();
  };
  
  // Add event listener for the "Add Car" button
  addCarButton.addEventListener("click", addCar);
  