function checkNumbers() {
    const minNumber = parseInt(document.getElementById('minNumber').value);
    const maxNumber = parseInt(document.getElementById('maxNumber').value);

    if (minNumber > maxNumber) {
        alert('Min number should be less than or equal to Max number.');
        return;
    }

    const primes = [];
    const evens = [];
    const odds = [];
    const perfectSquares = [];
    const commonFactors = findCommonFactors(minNumber, maxNumber);
    const commonMultiples = findCommonMultiples(minNumber, maxNumber);

    // Loop through the range from minNumber to maxNumber
    for (let i = minNumber; i <= maxNumber; i++) {
        if (isPrime(i)) primes.push(i);
        if (i !== 0 && i % 2 === 0) evens.push(i); // Exclude 0 from even numbers
        if (i !== 0 && i % 2 !== 0) odds.push(i); // Exclude 0 from odd numbers
        if (isPerfectSquare(i)) perfectSquares.push(i);
    }

    // Display the results
    document.getElementById('primeNumbers').textContent = `Prime Numbers: ${primes.join(', ')}`;
    document.getElementById('evenNumbers').textContent = `Even Numbers: ${evens.join(', ')}`;
    document.getElementById('oddNumbers').textContent = `Odd Numbers: ${odds.join(', ')}`;
    document.getElementById('perfectSquares').textContent = `Perfect Squares: ${perfectSquares.join(', ')}`;
    document.getElementById('commonFactors').textContent = `Common Factors: ${commonFactors.join(', ')}`;
    document.getElementById('commonMultiples').textContent = `Common Multiples: ${commonMultiples.join(', ')}`;
}

// Function to check if a number is prime
function isPrime(num) {
    if (num <= 1) return false; // Exclude 0 and 1 from being prime
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to check if a number is a perfect square
function isPerfectSquare(num) {
    return num >= 0 && Math.sqrt(num) % 1 === 0;
}

// Function to find common factors of two numbers
function findCommonFactors(num1, num2) {
    const factors = [];
    if (num1 === 0 || num2 === 0) {
        return ['Infinite common factors with 0'];
    }
    const min = Math.min(num1, num2);
    for (let i = 1; i <= min; i++) {
        if (num1 % i === 0 && num2 % i === 0) {
            factors.push(i);
        }
    }
    return factors;
}

// Function to find common multiples of two numbers
function findCommonMultiples(num1, num2) {
    const multiples = [];
    if (num1 === 0 || num2 === 0) {
        return ['Infinite common multiples with 0'];
    }
    let i = Math.max(num1, num2);
    while (multiples.length < 10) { // Only show first 10 common multiples
        if (i % num1 === 0 && i % num2 === 0) {
            multiples.push(i);
        }
        i++;
    }
    return multiples;
}
