const gameBoard = (() => {
    const boardSize = 3;

    const board = Array(boardSize)
        .fill()
        .map(() => Array(boardSize).fill(0));
    return { board };
})();

const playerFactory = (name) => {
    const placeMarker = (i, j) => {
        gameBoard.board[i][j] = 'O';
    };
    return { placeMarker, name };
};

let me = playerFactory('a');

me.placeMarker(1, 1);

console.log(gameBoard.board);
