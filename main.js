// Mastermind by Nailu
// 23/12/2022

const game = {
    win: false,
    tryCount: 0,
    grid: [null, null, null, null],
    userGrid: [null, null, null, null],
    clues: [null, null, null, null],
    colorsList: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'white'],
    colorsCode: {
        red: 'rgb(239, 35, 60)',
        orange: 'rgb(255, 84, 0)',
        yellow: 'rgb(255, 190, 11)',
        green: 'rgb(112, 224, 0)',
        blue: 'rgb(58, 134, 255)',
        purple: 'rgb(131, 56, 236)',
        black: 'rgb(11, 9, 10)',
        white: 'rgb(255, 255, 255)'
    },
    init: function() {
        getRandomGrid();
        generateGrid();

        const tryButton = document.getElementById("try-btn");
        tryButton.addEventListener("click", () => {
            getUserGuesses();
            displayUserGrid();
            isCorrect();
            isWinner();
            displayClues();

            // Test win or lose condition
            if(this.win) {
                displayWin();
                return;
            } else if(this.tryCount === 12) {
                displayLose();
                return;
            }

            generateGrid();
        })
    }
}


const getRandomGrid = () => {
    for(slot in game.grid) {
        const randomColor = game.colorsList[Math.floor(Math.random() * 8)];
        game.grid[slot] = randomColor;
    }
};

const isCorrect = () => {
    game.clues = [null, null, null, null];

    for(guess in game.userGrid) {
        if(game.grid.includes(game.userGrid[guess])) {
            if(game.userGrid.indexOf(game.userGrid[guess]) === game.grid.indexOf(game.userGrid[guess])) {
                game.clues[game.clues.indexOf(null)] = "red";
            } else {
                game.clues[game.clues.indexOf(null)] = "white";
            }
        }
    }
};

const isWinner = () => game.win = game.clues.every(guess => guess === "red");

const getUserGuesses = () => {
    game.userGrid = [null, null, null, null];

    game.userGrid[0] = document.getElementById("select-A").value;
    game.userGrid[1] = document.getElementById("select-B").value;
    game.userGrid[2] = document.getElementById("select-C").value;
    game.userGrid[3] = document.getElementById("select-D").value;
}

const scroll = () => document.getElementsByClassName("footer")[0].scrollIntoView();

const generateGrid = () => {
    game.tryCount++;

    const grid = document.getElementsByClassName("grid")[0];

    grid.innerHTML = grid.innerHTML + `<div class="row">
    <div class="row-cell">
        <div class="row-color" id="row-${game.tryCount}-cell-1"></div>
    </div>
    <div class="row-cell">
        <div class="row-color" id="row-${game.tryCount}-cell-2"></div>
    </div>
    <div class="row-cell">
        <div class="row-color" id="row-${game.tryCount}-cell-3"></div>
    </div>
    <div class="row-cell">
        <div class="row-color" id="row-${game.tryCount}-cell-4"></div>
    </div>
    <div class="clue-grid" id="clue-grid-${game.tryCount}">
        <div class="clue-cell">
            <div class="clue-color" id="clue-grid-${game.tryCount}-1"></div>
        </div>
        <div class="clue-cell">
            <div class="clue-color" id="clue-grid-${game.tryCount}-2"></div>
        </div>
        <div class="clue-cell">
            <div class="clue-color" id="clue-grid-${game.tryCount}-3"></div>
        </div>
        <div class="clue-cell">
            <div class="clue-color" id="clue-grid-${game.tryCount}-4"></div>
        </div>
    </div>
    </div>`
    scroll();
}

const displayUserGrid = () => {
    for(slot in game.userGrid) {
        const cell = document.getElementById(`row-${game.tryCount}-cell-${1*(slot) + 1}`);

        cell.style.backgroundColor = game.colorsCode[game.userGrid[slot]];
    }
}

const displayClues = () => {
    for(slot in game.clues) {
        const cell = document.getElementById(`clue-grid-${game.tryCount}-${1*(slot) + 1}`);

        cell.style.backgroundColor = game.colorsCode[game.clues[slot]];
    }
}

const displayWin = () => {
    document.getElementById("try-btn").disabled = true;
    document.getElementsByClassName("score")[0].innerHTML = `<div class="result"><span id="win">VICTORY!</span>
    <span id="score">Score: ${game.tryCount}/12</span></div>
    <button type="button" onClick="window.location.reload()">
    Play Again
    </button>`
    scroll();
}

const displayLose = () => {
    document.getElementById("try-btn").disabled = true;
    document.getElementsByClassName("score")[0].innerHTML = `<div class="result"><span id="lose">YOU LOST!</span>
    <span id="reason">Too many failed attempts.</span></div>
    <button type="button" onClick="window.location.reload()">
    Try Again
    </button>`
    scroll();
}

game.init()