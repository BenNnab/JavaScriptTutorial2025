function checkNumber() {
    const number = parseInt(document.getElementById('textBox').value);
    const result = document.getElementById('result');
    const primeBtn = document.getElementById('primeBtn');
    const oddBtn = document.getElementById('oddBtn');
    const evenBtn = document.getElementById('evenBtn');
    const squareBtn = document.getElementById('squareBtn');

    if (primeBtn.checked) {
        result.textContent = isPrime(number) ? `${number} is a Prime Number.` : `${number} is not a Prime Number.`;
    } else if (oddBtn.checked) {
        result.textContent = (number % 2 !== 0) ? `${number} is an Odd Number.` : `${number} is not an Odd Number.`;
    } else if (evenBtn.checked) {
        result.textContent = (number % 2 === 0) ? `${number} is an Even Number.` : `${number} is not an Even Number.`;
    } else if (squareBtn.checked) {
        result.textContent = isPerfectSquare(number) ? `${number} is a Square Number.` : `${number} is not a Square Number.`;
    } else {
        result.textContent = "Please select a check option.";
    }
}

function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

function isPerfectSquare(num) {
    return num >= 0 && Math.sqrt(num) % 1 === 0;
}
