// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart quantity
    let cartQuantity = 0;

    // Get references to the buttons and display element
    const showQuantityButton = document.getElementById('show-quantity');
    const addToCartButton = document.getElementById('add-to-cart');
    const addTwoButton = document.getElementById('add-two');
    const addThreeButton = document.getElementById('add-three');
    const resetCartButton = document.getElementById('reset-cart');
    const quantityDisplay = document.getElementById('quantity-display');

    // Function to update the quantity display
    function updateQuantityDisplay() {
        quantityDisplay.textContent = `Quantity: ${cartQuantity}`;
    }

    // Event listeners for each button
    showQuantityButton.addEventListener('click', () => {
        alert(`Current Quantity: ${cartQuantity}`);
    });

    addToCartButton.addEventListener('click', () => {
        cartQuantity += 1;
        updateQuantityDisplay();
    });

    addTwoButton.addEventListener('click', () => {
        cartQuantity += 2;
        updateQuantityDisplay();
    });

    addThreeButton.addEventListener('click', () => {
        cartQuantity += 3;
        updateQuantityDisplay();
    });

    resetCartButton.addEventListener('click', () => {
        cartQuantity = 0;
        updateQuantityDisplay();
    });

    // Initialize the display
    updateQuantityDisplay();
});