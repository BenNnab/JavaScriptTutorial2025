//----------------------    EXAMPLE 1 <h1> -------------------

// STEP 1 CREATE THE ELEMENT
const newH1 = document.createElement("h1");
const newH2 = document.createElement("h1");

// STEP ADD ATTRIBUTES/PROPERTIES
newH1.textContent = "I like pizza";
newH2.textContent = "I like Banana";
newH1.id = "myH1";
newH1.style.color = "tomato";
newH1.style.textAlign = "center";
newH2.style.color = "orange";



// STEP 3 APPEND ELEMENT TO DOM
document.body.append(newH1);
document.body.prepend(newH2);
document.getElementById("box1").append(newH1);
