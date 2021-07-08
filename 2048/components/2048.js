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
    rowCount: 2,
    colCount: 3,
}

class Square extends React.Component {
    render() {
        return (
            <button className="square">
                {this.props.row},{this.props.col};{this.props.value}
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

    hasFreeSquares = () => {
        for (let i = 0; i < gameParams.rowCount; i++) {
            for (let j = 0; j < gameParams.colCount; j++) {
                if (this.state.squares[i][j] === 0) {
                    return true;
                }
            }
        }
        this.setState({gameLost: true});
        return false;
    }

    updateGameScore = () => {
        // TODO : update score
        this.setState({
                stepCount: this.state.score + 1
            },
            () => {
                this.afterSetCountFinished()
            }
        )
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

    moveLeft = () => {
        let newBoard = this.createNewBoard();
        for (let i = 0; i < gameParams.rowCount; i++) {
            let offset = 0;
            for (let j = 0; j < gameParams.colCount; j++) {
                if (this.state.squares[i][j] !== 0) {
                    newBoard[i][offset] = this.state.squares[i][j];
                    offset++;
                }
            }
        }

        console.log('left');
        console.log(this.state.squares);
        console.log('new board', newBoard);
        this.setState({
                squares: newBoard
            },
            () => {
                console.log('setState', this.state.squares)
            })
    }

    moveRight = () => {
    }

    createNewBoard() {
        let board = new Array(gameParams.rowCount).fill(0);
        for (let i = 0; i < gameParams.rowCount; i++) {
            board[i] = new Array(gameParams.colCount).fill(0);
        }
        return board;
    }

    handleKeyPress = (event) => {
        switch (event.keyCode) {
            case 37:
                console.log('LEFT key has been pressed');
                this.moveLeft();
                this.updateGameScore();
                this.setState({squares: utils.addRandomSquares(this.state.squares)});
                break;
            case 38:
                console.log('UP key has been pressed');
                this.setState({squares: utils.addRandomSquares(this.state.squares)});
                break;
            case 39:
                console.log('RIGHT key has been pressed');
                this.moveRight();
                this.updateGameScore();
                this.setState({squares: utils.addRandomSquares(this.state.squares)});
                break;
            case 40:
                console.log('DOWN key has been pressed');
                this.setState({squares: utils.addRandomSquares(this.state.squares)});
                break;

            default:
                console.log('Wrong key')
        }
    }

    render() {
        return (
            <div className="game">
                <div className="header">
                    <button onKeyUp={this.handleKeyPress}>Start</button>
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
  