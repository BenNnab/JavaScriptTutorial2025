function rollDice() {
    // Get the number of dice to roll
    const numDice = parseInt(document.getElementById('numDice').value);

    // Clear previous results
    document.getElementById('diceResult').innerHTML = '';
    document.getElementById('diceImage').innerHTML = '';

    // Roll the dice and store the results
    const results = [];
    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * 6) + 1;  // Generate a number between 1 and 6
        results.push(roll);

        // Create image for each dice roll (adjust your image paths as necessary)
        const diceImg = document.createElement('img');
        diceImg.src = `dice_images/d${roll}.png`; // Updated to use d1.png, d2.png, etc.
        diceImg.alt = `Dice ${roll}`;
        document.getElementById('diceImage').appendChild(diceImg);
    }

    // Display the roll results
    document.getElementById('diceResult').innerHTML = `You rolled: ${results.join(', ')}`;
}
