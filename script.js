// script.js

function rollDice() {
    const die1 = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    const die2 = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
    return { die1, die2, sum: die1 + die2 };
}

function playGame() {
    // Get the user's guess
    const userGuess = parseInt(document.getElementById("guess").value);

    // Check if input is valid
    if (!userGuess || userGuess < 2 || userGuess > 12) {
        alert("Please enter a valid number between 2 and 12.");
        return;
    }

    // Roll the dice
    const dice = rollDice();

    // Display the dice and the sum
    document.getElementById("diceResult").innerHTML = `🎲 Dice: ${dice.die1} + ${dice.die2} = ${dice.sum}`;

    // Check the result
    const resultMessage =
        dice.sum === userGuess
            ? "🎉 Congratulations! You guessed it right!"
            : "😢 Sorry, wrong guess. Try again!";
    document.getElementById("result").innerHTML = resultMessage;
}
