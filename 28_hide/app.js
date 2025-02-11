// Show and Hide Element

// const myButton = document.getElementById("myButton");
// const myImg = document.getElementById("myImg");

// myButton.addEventListener("click", Event => {
//     if(myImg.style.display === "none"){
//         myImg.style.display = "block";
//         myButton.textContent = "Hide"
//     }
//     else{
//         myImg.style.display = "none";
//         myButton.textContent = "Show";
//     }
// });

const myButton = document.getElementById("myButton");
const myImg = document.getElementById("myImg");

myButton.addEventListener("click", event => {
    if (myImg.style.visibility === "hidden") {
        myImg.style.visibility = "visible";
        myButton.textContent = "Hide"; // Update button text to "Hide"
    } else {
        myImg.style.visibility = "hidden";
        myButton.textContent = "Show"; // Update button text to "Show"
    }
});