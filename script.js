// TODO: GAME LOGIC //

const playerFactory = (marker, turnFlag) => {
    let flag = turnFlag;

    const placeMarker = (cell) => {
        if (flag) {
            gameBoard.updateBoard(cell, getMarker());
        }
    };

    const toggleFlag = () => {
        flag = !flag;
    };

    const getFlag = () => {
        return flag;
    };

    const getMarker = () => {
        return marker;
    };

    return { placeMarker, toggleFlag, getFlag, getMarker };
};

const gameBoard = (() => {
    let cellsDisplay = document.querySelectorAll('.cell');
    const board = document.querySelector('.board');
    const boardSize = 3;

    const boardGrid = Array(boardSize)
        .fill()
        .map(() => Array(boardSize).fill(''));

    const getCells = () => {
        cellsDisplay = document.querySelectorAll('.cell');
        return [...cellsDisplay];
    };

    const clearBoard = () => {
        getCells().forEach((cell) => {
            cell.innerText = '';
        });
        boardGrid.forEach((row) => {
            row.fill('');
        });
    };

    const checkForWin = () => {
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

    const updateBoard = (cell, marker) => {
        const cellPos = cell.split('');
        boardGrid[cellPos[0]][cellPos[1]] = marker;

        currentCell = document.getElementById(cell);
        if (currentCell.innerText === '') {
            currentCell.firstChild.innerText = marker;
        }

        // displayController.checkForWin();
    };

    const createBoard = (() => {
        boardGrid.forEach((row, i) => {
            row.forEach((cell, j) => {
                div = document.createElement('div');
                span = document.createElement('span');
                div.classList.add('cell');
                div.id = `${i}${j}`;

                div.appendChild(span);
                div.style.userSelect = 'none';

                board.appendChild(div);
                getCells();
            });
        });
    })();

    return { boardGrid, createBoard, getCells, updateBoard, clearBoard, checkForWin };
})();

const displayController = (() => {
    let players = [playerFactory('O', true), playerFactory('X', false)];
    let currentPlayer;

    const getCurrentPlayer = () => {
        players.forEach((player) => {
            if (player.getFlag()) {
                currentPlayer = player;
            }
        });
        return currentPlayer;
    };

    const changeTurns = () => {
        players.forEach((player) => {
            player.toggleFlag();
        });
    };

    const clickCells = () => {
        gameBoard.getCells().forEach((cell) => {
            cell.addEventListener('click', placeMarker);
        });
    };

    const placeMarker = (e) => {
        getCurrentPlayer().placeMarker(e.currentTarget.id);
        changeTurns();
    };

    return { players, clickCells, getCurrentPlayer };
})();

displayController.getCurrentPlayer();
displayController.clickCells();
