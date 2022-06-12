const content = document.querySelector('.content');

const playerFactory = (marker, turnFlag) => {
    let flag = turnFlag;

    const placeMarker = (cell) => {
        if (!document.getElementById(cell).firstChild) {
            gameBoard.updateBoard(cell, getMarker());
            return true;
        }
        return false;
    };

    const toggleFlag = () => {
        flag = !flag;
    };

    const setFlag = (bool) => {
        flag = bool;
    };

    const getFlag = () => {
        return flag;
    };

    const getMarker = () => {
        return marker;
    };

    return { placeMarker, toggleFlag, getFlag, getMarker, setFlag };
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
            if (cell.firstChild) cell.removeChild(cell.firstChild);
        });
        boardGrid.forEach((row) => {
            row.fill('');
        });
        displayController.newGame();
    };

    const checkForWin = (marker) => {
        for (let i = 0; i < 3; i++) {
            const win =
                boardGrid[i].every((v) => v === marker) ||
                (boardGrid[0][i] === marker &&
                    boardGrid[0][i] === boardGrid[1][i] &&
                    boardGrid[0][i] === boardGrid[2][i]) ||
                (boardGrid[0][0] === marker &&
                    boardGrid[0][0] === boardGrid[1][1] &&
                    boardGrid[0][0] === boardGrid[2][2]) ||
                ((boardGrid[0][2] === marker && boardGrid[0][2]) === boardGrid[1][1] &&
                    boardGrid[0][2] === boardGrid[2][0]);

            if (win) {
                displayController.announceWin();
                break;
            }
        }

        checkFull();
    };

    const checkFull = () => {
        let rows = 0;
        boardGrid.forEach((row) => {
            const k = row.every((x) => {
                return x === 'O' || x === 'X';
            });
            if (k) {
                rows++;
            }
        });

        if (rows === 3) {
            displayController.announceDraw();
        }
    };

    const updateBoard = (cell, marker) => {
        const cellPos = cell.split('');
        currentCell = document.getElementById(cell);
        if (currentCell.innerText === '' && boardGrid[cellPos[0]][cellPos[1]] === '') {
            boardGrid[cellPos[0]][cellPos[1]] = marker;

            span = document.createElement('span');
            span.innerText = marker;
            currentCell.appendChild(span);
        }
        checkForWin(marker);

        // displayController.checkForWin();
    };

    const createBoard = (() => {
        boardGrid.forEach((row, i) => {
            row.forEach((_cell, j) => {
                div = document.createElement('div');
                div.classList.add('cell');
                div.id = `${i}${j}`;
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

    const announceWin = () => {
        const div = document.createElement('div');
        const span = document.createElement('span');

        div.classList.add('win-message');
        span.innerText = `Player ${getCurrentPlayer().getMarker()} wins!`;

        div.appendChild(span);

        content.appendChild(div);

        gameBoard.getCells().forEach((cell) => {
            cell.removeEventListener('click', placeMarker);
        });

        setTimeout(() => {
            content.removeChild(content.lastChild);
            gameBoard.clearBoard();
        }, 2000);
    };

    const announceDraw = () => {
        const div = document.createElement('div');
        const span = document.createElement('span');

        div.classList.add('draw-message');
        span.innerText = `It's a draw! Restarting...`;

        div.appendChild(span);

        content.appendChild(div);

        gameBoard.getCells().forEach((cell) => {
            cell.removeEventListener('click', placeMarker);
        });

        setTimeout(() => {
            content.removeChild(content.lastChild);
            gameBoard.clearBoard();
        }, 2000);
    };

    const changeTurns = () => {
        players.forEach((player) => {
            player.toggleFlag();
        });
        const span = document.querySelector('.current-player').firstChild;
        span.innerText = `Player ${getCurrentPlayer().getMarker()}'s turn`;
    };

    const newGame = () => {
        gameBoard.getCells().forEach((cell) => {
            cell.addEventListener('click', placeMarker);
        });
        players[0].setFlag(true);
        players[1].setFlag(false);
        const span = document.querySelector('.current-player').firstChild;
        span.innerText = `Player ${getCurrentPlayer().getMarker()} begins`;
    };

    const placeMarker = (e) => {
        const turnCheck = getCurrentPlayer().placeMarker(e.currentTarget.id);
        if (turnCheck) {
            changeTurns();
        }
    };

    return { players, newGame, getCurrentPlayer, announceWin, announceDraw };
})();

displayController.newGame();
