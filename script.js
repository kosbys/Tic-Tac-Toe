// TODO: GAME LOGIC //

const playerFactory = (marker) => {
    const placeMarker = (i, j) => {
        gameBoard.updateBoard(i, j, marker);
    };

    return { placeMarker };
};

const gameBoard = (() => {
    const board = document.querySelector('.board');
    const cellsDisplay = document.querySelectorAll('.cell');
    const boardSize = 3;

    const boardGrid = Array(boardSize)
        .fill()
        .map(() => Array(boardSize).fill('A'));

    const clearBoard = () => {
        boardGrid.forEach((row) => {
            row.fill('');
        });
        const cells = document.querySelectorAll('.cell');
        [...cellsDisplay].forEach((cell) => {
            cell.innerText = '';
        });
    };

    const checkForWin = (marker) => {
        for (let i = 0; i < 3; i++) {
            if (boardGrid[i].every((v) => v === boardGrid[i][0])) {
                // displayController.win(marker);
            }
            if (boardGrid[0][i] === boardGrid[1][i] && boardGrid[0][i] === boardGrid[2][i]) {
                // displayController.win(marker);
            }
        }
        if (boardGrid[0][0] === boardGrid[1][1] && boardGrid[0][0] === boardGrid[2][2]) {
        }
        if (boardGrid[0][2] === boardGrid[1][1] && boardGrid[0][2] === boardGrid[2][0]) {
        }
    };

    const updateBoard = (i, j, marker) => {
        boardGrid[i][j] = marker;
        document.getElementById(`${i}${j}`).textContent = marker;
        displayController.checkForWin(marker);
    };

    const createBoard = (() => {
        boardGrid.forEach((row, i) => {
            row.forEach((cell, j) => {
                div = document.createElement('div');
                div.classList.add('cell');
                div.id = `${i}${j}`;
                div.innerText = cell;

                board.appendChild(div);
            });
        });
    })();

    return { boardGrid, createBoard, updateBoard, clearBoard, checkForWin };
})();

const displayController = (() => {
    return {};
})();

const Player1 = playerFactory('O');
const Player2 = playerFactory('X');

gameBoard.checkForWin(Player1.marker);

console.log(gameBoard.boardGrid);
