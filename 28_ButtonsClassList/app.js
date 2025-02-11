let buttons = document.querySelectorAll(".myButton");

// Function to apply styles and event listeners to a button
function setupButton(button) {
    // Add initial styles and content
    button.style.backgroundColor = "green";
    button.textContent += "🥰";

    // Add event listeners
    button.addEventListener("click", event => {
        if (event.target.style.backgroundColor === "tomato") {
            event.target.style.backgroundColor = ""; // Reset to default
        } else {
            event.target.style.backgroundColor = "tomato";
        }
    });

    button.addEventListener("mouseover", event => {
        event.target.style.backgroundColor = "lightblue";
    });

    button.addEventListener("mouseout", event => {
        event.target.style.backgroundColor = ""; // Reset to default
    });
}

// Apply styles and event listeners to existing buttons
buttons.forEach(setupButton);

// Add a new button
const newButton = document.createElement("button"); // STEP 1
newButton.textContent = "Button 5"; // STEP 2
newButton.classList = "myButton";
document.body.appendChild(newButton); // STEP 3

// Apply styles and event listeners to the new button
setupButton(newButton);