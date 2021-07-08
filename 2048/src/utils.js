const utils = {
    getArrayWithRangedNumbers: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),

    getRandomNumberFromRange: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    getRandomSquareCoordinates: (rowCount, colCount) => ({
            row: utils.getRandomNumberFromRange(0, rowCount - 1),
            col: utils.getRandomNumberFromRange(0, colCount - 1),
        }),

    addRandomSquares: (squares, squareCount = 1) => {
        while (squareCount > 0) {
            const coordinates = utils.getRandomSquareCoordinates(squares.length, squares.length);
            const square = {
                ...coordinates,
                value: utils.getRandomNumberFromRange(1, 2) * 2,
            }

            if (squares[square.row][square.col] === 0) {
                squares[square.row][square.col] = square.value;
                squareCount--;
            }
        }
        return squares;
    },
};