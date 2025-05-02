// Select elements
const box = document.querySelector(".dialogue-box");
const container = document.querySelector(".game-container");
const grid = document.querySelector(".grid");
const cells = document.querySelectorAll(".cell");
const resetButton = document.getElementById("Reset");
const submitButton = document.getElementById("submitbutton");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");

// Game state
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to check for a winner
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            isGameActive = false;

             // Determine the winner's name
             const winnerName = currentPlayer === "X" ? player1Input.value || "Player 1" : player2Input.value || "Player 2";
             alert(`${winnerName} wins!`);
            return;
        }
    }

    // Check for a draw
    if (!gameBoard.includes("")) {
        isGameActive = false;
        alert("It's a draw!");
    }
}

// Function to handle cell clicks
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameBoard[cellIndex] !== "" || !isGameActive) return;

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === "X" ? "x" : "o");

    checkWinner();

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Function to reset the game
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
}

// Function to handle player name submission
function handlePlayerSubmit() {
    const player1Name = player1Input.value || "Player 1";
    const player2Name = player2Input.value || "Player 2";

    alert(`Welcome ${player1Name} and ${player2Name}!`);
    box.style.display = "none";
    container.style.display = "block";
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
submitButton.addEventListener("click", handlePlayerSubmit);

// Initial setup
container.style.display = "none"; // Hide the game container until players are confirmed