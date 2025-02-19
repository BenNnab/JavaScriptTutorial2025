// WHILE LOOP
// let i = 1;

// while(i <= 5){
//     console.log(i);
//     i++;
// }

// for(let i =1 ; i <= 5; i++){
//     console.log(i);
// }

// const todoList = [
//     'Make dinner',
//     'wash dishes',
//     'watch youtude'
// ];

// for (let index = 0; index <= todoList.length - 1; index++){
//     const value = todoList[index]
//     console.log(value);
// }

// for (let i = 0; i < todoList.length; i++){
//     const value = todoList[i]
//     console.log(value);
// }

const nums = [
    10, 20, 30, 100, 200, 300
];
let Total = 0;

for (let i = 0; i < nums.length; i++){
    const num = nums[i]
    Total += num;
}

console.log(Total);


const numsDoubled = [
    
];


for (let i = 0; i < nums.length; i++){
    const num = nums[i]
    numsDoubled.push(num * 2);
}

console.log(numsDoubled);