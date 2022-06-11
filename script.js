// TODO: GAME LOGIC //

const playerFactory = (marker, turnFlag) => {
    let flag = turnFlag;

    const placeMarker = (i, j) => {
        displayController.updateBoard(i, j, marker);
    };

    const toggleFlag = () => {
        if (flag === 0) {
            flag = 1;
        } else {
            flag = 0;
        }
    };

    const getFlag = () => {
        return flag;
    };

    return { placeMarker, toggleFlag, getFlag, marker };
};

const gameBoard = (() => {
    const board = document.querySelector('.board');
    const cellsDisplay = document.querySelectorAll('.cell');
    const boardSize = 3;

    const boardGrid = Array(boardSize)
        .fill()
        .map(() => Array(boardSize).fill('A'));

    const cellClick = () => {};

    const clearBoard = () => {
        boardGrid.forEach((row) => {
            row.fill('');
        });
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
            // displayController.win(marker);
        }
        if (boardGrid[0][2] === boardGrid[1][1] && boardGrid[0][2] === boardGrid[2][0]) {
            // displayController.win(marker);
        }
    };

    const updateBoard = (i, j, marker) => {
        boardGrid[i][j] = marker;
        document.getElementById(`${i}${j}`).textContent = marker;
        // displayController.checkForWin(marker);
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
    const players = [playerFactory('O', true), playerFactory('X', false)];

    const startGame = () => {};

    const changeTurn = () => {
        players.forEach((players) => {
            playerFactory.toggleFlag();
        });
    };

    const updateBoard = (i, j, marker) => {
        gameBoard.updateBoard(i, j, marker);
        if (!gameBoard.checkForWin()) {
            changeTurn();
        }
    };

    return { changeTurn, updateBoard, players };
})();

console.log(gameBoard.boardGrid);

displayController.players[0].placeMarker(1, 1);
