// COUNTER PROGRAM

// Declaring  and initialising Constants
const decreaseBtn =document.getElementById('decreaseBtn');
const resetBtn =document.getElementById('resetBtn');
const increaseBtn =document.getElementById('increaseBtn');
const countlabel =document.getElementById('countlabel');

// Initializing Count Variable
let count = 0;

// FUNCTION FOR CUNTER INCREASE
increaseBtn.onclick = function(){
    count++;
    countlabel.textContent = count;
}

// FUNCTION FOR COUNTER DECREASE
decreaseBtn.onclick = function(){
    count--;
    countlabel.textContent = count;
}

// FUNCTION FOR COUNTER RESET
resetBtn.onclick = function(){
    count = 0;
    countlabel.textContent = count;
}

