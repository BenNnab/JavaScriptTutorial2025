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

// Function to handle the calculation
function calculateResults() {
  const input = numberInput.value.trim();
  
  // Split the input into an array of numbers
  const numbers = input.split(',').map((num) => parseFloat(num.trim())).filter((num) => !isNaN(num));

  // Validate input
  if (numbers.length === 0) {
    errorMessage.textContent = "Please enter a valid list of numbers.";
    return;
  }

  // Clear error message
  errorMessage.textContent = "";

  // Using reduce to calculate the sum
  const sum = numbers.reduce((acc, num) => acc + num, 0);

  // Calculate the mean (average)
  const mean = sum / numbers.length;

  // Calculate the min and max values
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  // Calculate the median
  const sortedNumbers = [...numbers].sort((a, b) => a - b);
  const median = sortedNumbers.length % 2 === 0
    ? (sortedNumbers[sortedNumbers.length / 2 - 1] + sortedNumbers[sortedNumbers.length / 2]) / 2
    : sortedNumbers[Math.floor(sortedNumbers.length / 2)];

  // Calculate the mode
  const frequency = {};
  let maxFrequency = 0;
  let mode = [];
  
  numbers.forEach(num => {
    frequency[num] = (frequency[num] || 0) + 1;
    if (frequency[num] > maxFrequency) {
      maxFrequency = frequency[num];
      mode = [num];
    } else if (frequency[num] === maxFrequency) {
      mode.push(num);
    }
  });

  if (mode.length === numbers.length) {
    mode = ['No mode']; // No mode if all numbers are unique
  }

  // Display the results
  sumResult.textContent = sum;
  averageResult.textContent = mean.toFixed(2); // Round to 2 decimal places
  minResult.textContent = min;
  maxResult.textContent = max;
  medianResult.textContent = median;
  modeResult.textContent = mode.join(', ');
}

// Event listener for the "Calculate" button
calculateButton.addEventListener("click", calculateResults);
