const gameBoard = (() => {
    const board = document.querySelector('.board');
    const boardSize = 3;

    const boardGrid = Array(boardSize)
        .fill()
        .map(() => Array(boardSize).fill('A'));

    const clearBoard = () => {
        boardGrid.forEach((row) => {
            row.fill('');
        });
        const cells = document.querySelectorAll('.cell');
        [...cells].forEach((cell) => {
            cell.innerText = '';
        });
    };

    const createBoard = (() => {
        boardGrid.forEach((row, i) => {
            row.forEach((cell, j) => {
                div = document.createElement('div');
                div.classList.add('cell');
                div.innerText = cell;

                board.appendChild(div);
            });
        });
    })();

    return { boardGrid, createBoard, clearBoard };
})();

const displayController = (() => {})();

const playerFactory = (name, marker) => {
    const placeMarker = (i, j) => {
        gameBoard.boardGrid[i][j] = marker;
    };

    return { placeMarker, name };
};

let me = playerFactory('a', 'O');

me.placeMarker(1, 1);

console.log(gameBoard.board);
