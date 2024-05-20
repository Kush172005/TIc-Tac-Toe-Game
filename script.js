// Styles using js
let gm_brd = document.querySelector('.game-board');
gm_brd.style.justifyContent = "center";
gm_brd.style.width = "100vw";

var cells = document.querySelectorAll('.cell');

let restart = document.querySelector('#restartButton');
restart.style.marginTop = "20px";
restart.style.padding = "5px";

// Adding X and 0 to th game
let moveHistory = []
let count = 0;
gm_brd.addEventListener('click', (event) => {
    if (event.target.textContent === '') {
        if (count % 2 == 0){
            count += 1;
            event.target.textContent = 'X';
            
        }
        else{
            count += 1;
            event.target.textContent = 'O';
        }
        moveHistory.push(event.target);

    }
    winner();
    
    if (count == 9){
        alert("It's a draw!");
    } 
})


const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

// Function to "cut" winning line
function cutWinningLine(winningCells) {
    winningCells.forEach(cell => {
        cell.style.backgroundColor = "#4CAF50";
        
    });
}

function removeWinningLine(cells) {
    cells.forEach(cell => {
        cell.style.backgroundColor = "#ccc";
        
    });
}

// Function to check for winner
function winner() {
    let lst1 = [];
    let lst2 = [];
    
    cells.forEach((cell, index) => {
        if (cell.textContent === 'X') {
            lst1.push(cell);
        } else if (cell.textContent === 'O') {
            lst2.push(cell);
        }
    });

    for (const combination of winningCombinations) {
        if (combination.every(index => lst1.includes(cells[index]))) {
            cutWinningLine(lst1);
            step_aft_X_win()
            return;
        } else if (combination.every(index => lst2.includes(cells[index]))) {
            cutWinningLine(lst2);
            step_aft_Y_win()
            return;
        }
    }
}

function step_aft_X_win(){
    const h4 = document.createElement('h4');
    h4.innerText = 'X Wins 🎉';
    h4.classList.add("wn");
    gm_brd.appendChild(h4);
    setTimeout(() => {
        resetgame();
        removeWinningLine(cells);
        h4.innerText = '';
    }, 2000)
}

function step_aft_Y_win(){
    const h4 = document.createElement('h4');
    h4.innerText = 'O Wins 🎉';
    h4.classList.add("wn");
    gm_brd.appendChild(h4);
    setTimeout(() => {
        resetgame();
        removeWinningLine(cells);
        h4.innerText = '';
    }, 2000)
}


function resetgame(){
    cells.forEach(cell => {
        cell.textContent = '';
    })
    moveHistory = [];
    count = 0;
}

restart.onclick = resetgame;

// undo button
let undo_btn = document.querySelector('#undoButton');
function udo(){
    if (moveHistory.length > 0) {
        let lastMove = moveHistory.pop();
        lastMove.textContent = ''; 
        count -= 1;
    }
}

undo_btn.onclick = udo;