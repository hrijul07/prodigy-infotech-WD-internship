let board = Array(9).fill("");
let currentPlayer = "X";
let gameState = "IDLE"; // IDLE, ONGOING, WIN, DRAW
let mode = "";

const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// Start game
function startGame(selectedMode) {
    mode = selectedMode;
    resetGame();
    gameState = "ONGOING";
    statusDisplay.innerText = `Mode: ${mode} | X's Turn`;
}

// Handle click
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.dataset.index;

        if (board[index] !== "" || gameState !== "ONGOING") return;

        playMove(index, currentPlayer);

        if (mode === "AI" && gameState === "ONGOING" && currentPlayer === "O") {
            setTimeout(aiMove, 500);
        }
    });
});

// Play move
function playMove(index, player) {
    board[index] = player;
    cells[index].innerText = player;
    cells[index].classList.add(player);

    checkGame();
}

// Check game state
function checkGame() {
    let winnerCombo = null;

    for (let pattern of winPatterns) {
        const [a,b,c] = pattern;

        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            winnerCombo = pattern;
            break;
        }
    }

    if (winnerCombo) {
        gameState = "WIN";
        statusDisplay.innerText = `${currentPlayer} Wins`;

        winnerCombo.forEach(i => cells[i].classList.add("win"));
        return;
    }

    if (!board.includes("")) {
        gameState = "DRAW";
        statusDisplay.innerText = "Draw Game";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = `Mode: ${mode} | ${currentPlayer}'s Turn`;
}

// AI move
function aiMove() {
    let move = findBestMove();
    playMove(move, "O");
}

// AI logic
function findBestMove() {

    // Try winning
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "O";
            if (isWinner("O")) {
                board[i] = "";
                return i;
            }
            board[i] = "";
        }
    }

    // Block player
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "X";
            if (isWinner("X")) {
                board[i] = "";
                return i;
            }
            board[i] = "";
        }
    }

    // Center
    if (board[4] === "") return 4;

    // Random
    let empty = board.map((v,i) => v === "" ? i : null).filter(v => v !== null);
    return empty[Math.floor(Math.random() * empty.length)];
}

// Check winner helper
function isWinner(player) {
    return winPatterns.some(([a,b,c]) =>
        board[a] === player && board[b] === player && board[c] === player
    );
}

// Reset
function resetGame() {
    board = Array(9).fill("");
    currentPlayer = "X";
    gameState = "IDLE";

    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("X", "O", "win");
    });

    statusDisplay.innerText = "Choose mode to start";
}