// 1. getElementById
const mainHeading = document.getElementById('main-heading');
mainHeading.textContent = 'Updated Heading using getElementById';
mainHeading.classList.add('highlight');

// 2. getElementsByTagName
const paragraphs = document.getElementsByTagName('p');
for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].textContent = `Paragraph ${i + 1} updated using getElementsByTagName`;
}

// 3. getElementsByClassName
const introElements = document.getElementsByClassName('intro');
for (let i = 0; i < introElements.length; i++) {
    introElements[i].textContent = `Element ${i + 1} with class "intro" updated using getElementsByClassName`;
    introElements[i].classList.add('highlight');
}

// 4. querySelector
const firstParagraph = document.querySelector('p');
firstParagraph.textContent = 'First paragraph updated using querySelector';

// 5. querySelectorAll
const listItems = document.querySelectorAll('li');
listItems.forEach((item, index) => {
    item.textContent = `List item ${index + 1} updated using querySelectorAll`;
});

// Bonus: Event Listener using getElementById
const actionButton = document.getElementById('action-button');
actionButton.addEventListener('click', () => {
    alert('Button clicked!');
});

const myBox =document.getElementById("myBox");
const myButton = document.getElementById("myButton");

myBox.addEventListener("click", Event =>{
    Event.target.style.backgroundColor = "tomato";
    Event.target.textContent = " OUCH!🤣";
});

myBox.addEventListener("mouseover", Event =>{
    Event.target.style.backgroundColor = "yellow";
    Event.target.textContent = " Don't do it!😯";
});
myBox.addEventListener("mouseout", Event =>{
    Event.target.style.backgroundColor = "lightgreen";
    Event.target.textContent = " Click me 😍";
});