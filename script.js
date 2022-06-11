const gameBoard = (() => {
    const board = document.querySelector('.board');
    const boardSize = 3;

    const boardGrid = Array(boardSize)
        .fill()
        .map(() => Array(boardSize).fill(''));

    const createBoard = (() => {
        boardGrid.forEach((row, i) => {
            row.forEach((cell, j) => {
                div = document.createElement('div');
                div.classList.add('cell');
                div.id = `#${i + j + 1}`;
                div.innerText = cell;

                board.appendChild(div);
            });
        });
    })();

    return { boardGrid };
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
