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
};

const gameParams = {
    rowCount: 2,
    colCount: 2
}

class Square extends React.Component {
    handleKeyUp(event) {
        if (event.keyCode === 13) {
            console.log('Enter key has been pressed')
        }
    }
    render() {
        return (
            <button className="square" onKeyUp={ this.handleKeyUp }>
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
                    <Square row={i - 1} col={j - 1} value={this.props.squares[i - 1][j - 1]}/>
                ))}
            </div>
        ))
    )

    initBoard = (props) => {
        const firstSquare = {
            ...this.getRandomSquareCoordinates(),
            value: utils.random(1, 2) * 2,
        }

        let secondSquareCoordinates = this.getRandomSquareCoordinates();

        while (!this.isSecondSquareValid(firstSquare.row, firstSquare.col,
            secondSquareCoordinates.row, secondSquareCoordinates.col)) {
            secondSquareCoordinates = this.getRandomSquareCoordinates();
        }
        const secondSquare = {
            ...secondSquareCoordinates,
            value: utils.random(1, 2) * 2,
        }

        this.props.squares[firstSquare.row][firstSquare.col] = firstSquare.value;
        this.props.squares[secondSquare.row][secondSquare.col] = secondSquare.value;
    }

    isSecondSquareValid(firstSquareRow, firstSquareCol, secondSquareRow, secondSquareCol) {
        return !(firstSquareRow === secondSquareRow && firstSquareCol === secondSquareCol);
    }

    getRandomSquareCoordinates = () => {
        return {
            row: utils.random(0, gameParams.rowCount - 1),
            col: utils.random(0, gameParams.colCount - 1),
        }
    }

    render() {
        this.initBoard();
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
            squares: squares,
        };
    }

    render() {
        return (
            <div className="game">
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
  