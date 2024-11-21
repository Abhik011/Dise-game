let diceResult = null;
let die1 = null;
let die2 = null;
let timer = 50;
let interval = null;
let historyQueue = [];

// Populate guess buttons dynamically
window.onload = () => {
    const guessButtons = document.getElementById("guessButtons");
    for (let i = 2; i <= 12; i++) {
        const button = document.createElement("button");
        button.className = "btn";
        button.innerText = i;
        button.onclick = () => makeGuess(i);
        button.disabled = true;
        guessButtons.appendChild(button);
    }
    startNewRound();
};

// Start a new round
function startNewRound() {
    rollDice();
    resetGuessButtons();
    timer = 50;
    document.getElementById("timer").innerText = timer;
    startTimer();
    historyQueue = [];
}

// Simulate a dice roll
function rollDice() {
    die1 = Math.floor(Math.random() * 6) + 1;
    die2 = Math.floor(Math.random() * 6) + 1;
    diceResult = die1 + die2;

    // Display dice result after 60 seconds
    setTimeout(() => {
        document.getElementById("die1").innerText = die1;
        document.getElementById("die2").innerText = die2;
        document.getElementById("result").innerText = `The dice sum was ${diceResult}!`;

        updateResultHistory();
        updateGuessHistory();
    }, 60000);
}

// Start the timer
function startTimer() {
    interval = setInterval(() => {
        timer--;
        document.getElementById("timer").innerText = timer;

        if (timer === 0) {
            disableGuessButtons();
        } else if (timer === -10) {
            clearInterval(interval);
            startNewRound();
        }
    }, 1000);
}

// Enable guess buttons
function resetGuessButtons() {
    document.querySelectorAll(".btn").forEach(button => (button.disabled = false));
    document.getElementById("result").innerText = "Waiting for the result...";
}

// Disable guess buttons
function disableGuessButtons() {
    document.querySelectorAll(".btn").forEach(button => (button.disabled = true));
}

// Handle user guess
function makeGuess(guess) {
    historyQueue.push({ guess });
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.innerText = `You guessed: ${guess} | Waiting for result...`;
    document.getElementById("guessHistory").prepend(historyItem);
}

// Update history with dice results
function updateGuessHistory() {
    const guessHistory = document.getElementById("guessHistory");
    historyQueue.forEach(item => {
        const resultText =
            item.guess === diceResult
                ? `🎉 You guessed: ${item.guess} | Dice: ${die1} + ${die2} = ${diceResult} 🎉 Correct!`
                : `😢 You guessed: ${item.guess} | Dice: ${die1} + ${die2} = ${diceResult} Wrong.`;
        const historyItem = document.createElement("div");
        historyItem.className = "history-item";
        historyItem.innerText = resultText;
        guessHistory.prepend(historyItem);
    });
    historyQueue = [];
}

// Add results to result history
function updateResultHistory() {
    const resultHistory = document.getElementById("resultHistory");
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.innerText = `Dice: ${die1} + ${die2} = ${diceResult}`;
    resultHistory.prepend(historyItem);
}
