// DOM elements
const numberInput = document.getElementById("number-input");
const calculateButton = document.getElementById("calculate-button");
const sumResult = document.getElementById("sum-result");
const averageResult = document.getElementById("average-result");
const minResult = document.getElementById("min-result");
const maxResult = document.getElementById("max-result");
const medianResult = document.getElementById("median-result");
const modeResult = document.getElementById("mode-result");
const errorMessage = document.getElementById("error-message");

// Arrow function to handle calculations
const calculateResults = () => {
  const input = numberInput.value.trim();

  // Convert input to array of numbers
  const numbers = input
    .split(',')
    .map((num) => parseFloat(num.trim()))
    .filter((num) => !isNaN(num));

  // Validate input
  if (numbers.length === 0) {
    errorMessage.textContent = "Please enter a valid list of numbers.";
    return;
  }

  // Clear error message
  errorMessage.textContent = "";

  // Calculate Sum using reduce
  const sum = numbers.reduce((acc, num) => acc + num, 0);

  // Calculate Mean
  const mean = sum / numbers.length;

  // Calculate Min and Max
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  // Calculate Median
  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const median =
    sortedNumbers.length % 2 === 0
      ? (sortedNumbers[sortedNumbers.length / 2 - 1] +
          sortedNumbers[sortedNumbers.length / 2]) /
        2
      : sortedNumbers[Math.floor(sortedNumbers.length / 2)];

  // Calculate Mode
  const frequency = {};
  numbers.forEach((num) => (frequency[num] = (frequency[num] || 0) + 1));
  const maxFrequency = Math.max(...Object.values(frequency));
  const mode = Object.keys(frequency)
    .filter((key) => frequency[key] === maxFrequency)
    .map((num) => parseFloat(num));
  const modeDisplay = mode.length === numbers.length ? "No mode" : mode.join(", ");

  // Display Results
  sumResult.textContent = sum;
  averageResult.textContent = mean.toFixed(2);
  minResult.textContent = min;
  maxResult.textContent = max;
  medianResult.textContent = median;
  modeResult.textContent = modeDisplay;
};

// Event listener using arrow function
calculateButton.addEventListener("click", () => calculateResults());
