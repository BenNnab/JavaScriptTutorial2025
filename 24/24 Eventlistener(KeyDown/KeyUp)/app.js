
// const myBox =document.getElementById("myBox");
// // const myButton = document.getElementById("myButton");
// const moveAmount = 10;
// let x = 0;
// let y = 0;

document.addEventListener("keydown", Event =>{
    myBox.style.backgroundColor = "tomato";
    myBox.textContent = "🤣";
 });

document.addEventListener("keyup", Event =>{
    myBox.style.backgroundColor = "yellow";
    myBox.textContent = "😯";
});
// Select the box element
const myBox = document.getElementById("myBox"); // or use document.querySelector(".myBox")

// Initialize position variables
let x = 0; // Initial horizontal position
let y = 0; // Initial vertical position
const moveAmount = 10; // Number of pixels to move per keypress

// Add event listener for keydown events
document.addEventListener("keydown", (event) => {
  if (event.key.startsWith("Arrow")) {

    // Prevent default scrolling behavior
    event.preventDefault();

    // Update position based on the arrow key pressed
    switch (event.key) {
      case "ArrowUp":
        y -= moveAmount;
        break;
      case "ArrowDown":
        y += moveAmount;
        break;
      case "ArrowLeft":
        x -= moveAmount;
        break;
      case "ArrowRight":
        x += moveAmount;
        break;
    }

    // Update the box's position
    myBox.style.top = `${y}px`;
    myBox.style.left = `${x}px`;
  }
});
