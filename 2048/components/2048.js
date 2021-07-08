// TODO:
// 1. Score
// 2. Notifications for lost and win game
// 3. Add colors for squares
// 4. Extract components
// 5. Refactoring for functions and variables names
// 6. General styling
// 7. Pause Button (nice to have)
// 8. Make rotation method more general (nice to have)

// Math science
const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length - 1)];
    },

    addRandomSquares: (squares, squareCount = 1) => {
        while (squareCount > 0) {
            const square = {
                ...utils.getRandomSquareCoordinates(),
                value: utils.random(1, 2) * 2,
            }

            if (squares[square.row][square.col] === 0) {
                squares[square.row][square.col] = square.value;
                squareCount--;
            }
        }
        return squares;
    },

    getRandomSquareCoordinates: () => {
        return {
            row: utils.random(0, gameParams.rowCount - 1),
            col: utils.random(0, gameParams.colCount - 1),
        }
    }
};

const gameParams = {
    rowCount: 3,
    colCount: 3,
}

class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {this.props.value}
            </button>
        )
    }
}

class Board extends React.Component {
    SquaresDisplay = props => (
        utils.range(1, gameParams.rowCount).map(i => (
            <div className="board-row">
                {utils.range(1, gameParams.colCount).map(j => (
                    <Square
                        row={i - 1}
                        col={j - 1}
                        value={this.props.squares[i - 1][j - 1]}
                    />
                ))}
            </div>
        ))
    )

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.SquaresDisplay()}
                </div>
            </div>)
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        const squares = new Array(gameParams.rowCount).fill(0);
        for (let i = 0; i < gameParams.rowCount; i++) {
            squares[i] = new Array(gameParams.colCount).fill(0);
        }
        this.state = {
            squares: utils.addRandomSquares(squares, 2),
            score: 0,
            gameWon: false,
            gameLost: false,
        };
    }

    hasFreeSquares = (board) => {
        for (let i = 0; i < gameParams.rowCount; i++) {
            for (let j = 0; j < gameParams.colCount; j++) {
                if (board[i][j] === 0) {
                    return true;
                }
            }
        }
        return false;
    }

    updateGameScore = () => {
        let score = 0;
        this.state.squares.forEach((row) => {
            row.forEach((square) => score += square);
        })

        this.setState({score})
    }

    afterSetCountFinished() {
        // should be 2048
        if (this.state.score === 32) {
            this.setState({
                    gameWon: true
                },
                () => {
                    console.log('game won', this.state.gameWon)
                }
            )
        }
    }

    compress = (board) => {
        const newBoard = this.createEmptyBoard();
        for (let i = 0; i < board.length; i++) {
            let colIndex = 0;
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== 0) {
                    newBoard[i][colIndex] = board[i][j];
                    colIndex++;
                }
            }
        }
        return newBoard;
    };

    merge = (board) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length - 1; j++) {
                if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
                    board[i][j] = board[i][j] * 2;
                    board[i][j + 1] = 0;
                }
            }
        }

        return board;
    };

    moveLeft = (board) => {
        const newBoard1 = this.compress(board);
        const newBoard2 = this.merge(newBoard1);
        return this.compress(newBoard2);
    }

    moveUp = (board) => {
        const rotateBoard = this.rotateLeft(board);
        const newBoard = this.moveLeft(rotateBoard);
        return this.rotateRight(newBoard);
    };

    rotateLeft = (board) => {
        const rotateBoard = this.createEmptyBoard();

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                rotateBoard[i][j] = board[j][board[i].length - 1 - i];
            }
        }

        return rotateBoard;
    };

    rotateRight = (board) => {
        const rotateBoard = this.createEmptyBoard();

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                rotateBoard[i][j] = board[board[i].length - 1 - j][i];
            }
        }

        return rotateBoard;
    };

    reverse = (board) => {
        const reverseBoard = this.createEmptyBoard();

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                reverseBoard[i][j] = board[i][board[i].length - 1 - j];
            }
        }

        return reverseBoard;
    };

    moveRight = (board) => {
        const reversedBoard = this.reverse(board);
        const newBoard = this.moveLeft(reversedBoard);
        return this.reverse(newBoard);
    }

    moveDown = (board) => {
        const rotateBoard = this.rotateRight(board);
        const newBoard = this.moveLeft(rotateBoard);
        return this.rotateLeft(newBoard);
    };


    createEmptyBoard() {
        let board = new Array(gameParams.rowCount).fill(0);
        for (let i = 0; i < gameParams.rowCount; i++) {
            board[i] = new Array(gameParams.colCount).fill(0);
        }
        return board;
    }

    createNewBoard() {
        let board = new Array(gameParams.rowCount).fill(0);
        for (let i = 0; i < gameParams.rowCount; i++) {
            board[i] = new Array(gameParams.colCount).fill(0);
        }
        return utils.addRandomSquares(board, 2);
    }

    handleKeyPress = (event) => {
        if(!this.state.gameWon && !this.state.gameLost) {
            let newBoard;
            switch (event.keyCode) {
                case 37:
                    console.log('LEFT key has been pressed');
                    newBoard = this.moveLeft(this.state.squares);
                    break;
                case 38:
                    console.log('UP key has been pressed');
                    newBoard = this.moveUp(this.state.squares);
                    break;
                case 39:
                    console.log('RIGHT key has been pressed');
                    newBoard = this.moveRight(this.state.squares);
                    break;
                case 40:
                    console.log('DOWN key has been pressed');
                    newBoard = this.moveDown(this.state.squares);
                    break;

                default:
                    console.log('Wrong key')
            }
            if (this.hasFreeSquares(newBoard)) {
                this.setState({squares: utils.addRandomSquares(newBoard)});
            } else {
                this.setState({gameLost: true}, () => {
                    console.log('Game Loss');
                })
            }
            this.updateGameScore();
        }
    }

    resetGame = () => {
        this.setState({
            squares: this.createNewBoard(),
            score: 0,
            gameWon: false,
            gameLost: false,
        })
    }

    render() {
        return (
            <div className="game">
                <div className="header">
                    <div>
                        <button onKeyUp={this.handleKeyPress} onClick={this.resetGame}>New Game</button>
                    </div>
                    <div>Score : {this.state.score}</div>
                </div>
                <div className="game-board">
                    <Board
                        squares={this.state.squares}
                    />
                </div>
            </div>
        );
    }

}

// ========================================

ReactDOM.render(<Game/>, document.getElementById("root"));
  