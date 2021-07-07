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
    colCount: 3
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

    movingLeft = () => {
        // We can check how the data should be overwritten to render it dynamically.
        // The best solution is setState with the new data.
        // Delete lines 122-130 when they are not needed.

        const testData = new Array(gameParams.rowCount).fill(0);
        for (let i = 0; i < gameParams.rowCount; i++) {
            testData[i] = new Array(gameParams.colCount).fill(0);
        }

        for (let i = 0; i < gameParams.rowCount; i++) {
            let offset = 0;
            for (let j = 0; j < gameParams.colCount; j++) {
                if (this.state.squares[i][j] > 0) {
                    testData[i][offset] = this.state.squares[i][j];
                    offset++;
                    //debugger
                }
            }
        }

        console.log('left');
        console.log(this.state.squares);
        console.log(testData);
        this.setState({squares: testData});
        console.log(this.state.squares, 'state after overwrite')

        // for (let i = 0; i < gameParams.rowCount; i++) {
        //     for (let j = 0; j < gameParams.colCount; j++) {
        //         let offset = 0;
        //         let currentSquareVal = this.props.squares[i][j];
        //         debugger
        //         if (currentSquareVal > 0) {
        //             console.log(this.props.squares[i][j])
        //             this.setState({row: i, col: offset, value: currentSquareVal})
        //             //this.props.squares[i][offset] = this.props.squares[i][j]
        //             //debugger
        //             if (j > offset) {
        //                 this.setState({row: i, col: j, value: 0})
        //                 //this.props.squares[i][j] = 0;
        //                 //this.setState({value: 0})
        //             }
        //             offset++;
        //         }
        //     }
        // }
    }

    handleKeyPress = (event) => {
        switch (event.keyCode) {
            case 37:
                console.log('LEFT key has been pressed')
                this.movingLeft();
                break;
            case 38:
                console.log('UP key has been pressed')
                break;
            case 39:
                console.log('RIGHT key has been pressed')
                break;
            case 40:
                console.log('DOWN key has been pressed')
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
  