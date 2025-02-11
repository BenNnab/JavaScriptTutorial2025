const myButton = document.getElementById("mybutton");

// Add hover effect
myButton.addEventListener("mouseover", event => {
    event.target.classList.add("hover");
});

myButton.addEventListener("mouseout", event => {
    event.target.classList.remove("hover");
});

// Add initial "enabled" class
myButton.classList.add("enabled");

// Toggle between "enabled" and "disabled" on click
myButton.addEventListener("click", event => {
    if (event.target.classList.contains("enabled")) {
        event.target.classList.replace("enabled", "disabled");
    } else {
        event.target.classList.replace("disabled", "enabled");
    }
});