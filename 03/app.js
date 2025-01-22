const MyText = document.getElementById('myText');
const mySubmit = document.getElementById('mySubmit');
const resultElement = document.getElementById('resultElement');

mySubmit.onclick = function () {
    let age = MyText.value.trim();

    // Check if the input is a number
    if (isNaN(age) || age === "") {
        resultElement.textContent = 'Please enter a valid number.';
        return;
    }

    age = Number(age);

    // Nested if conditions for age validation
    if (age < 0) {
        resultElement.textContent = 'Your age cannot be below 0.';
    } else if (age === 0) {
        resultElement.textContent = 'You cannot visit the site, YOU ARE JUST BORN.';
    } else if (age >= 100) {
        resultElement.textContent = 'You are TOO OLD to visit this site.';
    } else if (age >= 18) {
        resultElement.textContent = 'You are qualified to visit this site.';
    } else {
        resultElement.textContent = 'You must be 18+ to visit this site.';
    }
};
