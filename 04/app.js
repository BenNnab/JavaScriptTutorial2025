// Get elements
const myCheckBox = document.getElementById('myCheckBox');
const visaBtn = document.getElementById('visaBtn');
const masterCardBtn = document.getElementById('masterCardBtn');
const payPalBtn = document.getElementById('payPalBtn');
const mySubmit = document.getElementById('mySubmit');
const subResult = document.getElementById('subResult');
const paymentResult = document.getElementById('paymentResult');

// Add event listener to submit button
mySubmit.addEventListener('click', function() {
    let subscriptionStatus = myCheckBox.checked ? "You are subscribed!" : "You are not subscribed.";
    let paymentMethod = '';

    // Determine the selected payment method
    if (visaBtn.checked) {
        paymentMethod = "Visa";
    } else if (masterCardBtn.checked) {
        paymentMethod = "MasterCard";
    } else if (payPalBtn.checked) {
        paymentMethod = "PayPal";
    } else {
        paymentMethod = "No payment method selected.";
    }

    // Display the results
    subResult.textContent = subscriptionStatus;
    paymentResult.textContent = `You chose to pay with ${paymentMethod}.`;
});
