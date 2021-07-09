// TODO:
// 0. Add notification with step score +
// 1. Score +
// 2. Notifications for lost and win game +
// 3. Add colors for squares +
// 4. Extract components
// 5. Refactoring for functions and variables names (in progress)
// 6. General styling +
// 7. Replace Score to Steps : done but steps are incremented when isStepStimulation = true
// 8. Game is won then the square with value 2048 appears
// 9. handleKeyPress doesn't work
// 10. Generate 2 random values once the start button is pressed (not before)
// 11. Pause Button (nice to have)
// 12. Make rotation method more general (nice to have)


class Game extends React.Component {
    constructor(props) {
        super(props);
        const squares = new Array(gameParams.rowCount).fill(0);
        for (let i = 0; i < gameParams.rowCount; i++) {
            squares[i] = new Array(gameParams.colCount).fill(0);
        }
        this.state = {
            squares: utils.addRandomSquares(squares, 2),
            steps: 0,
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

    /*
    updateGameSteps = (points) => {
        const currentSteps = this.state.steps + points;
        this.setState({
            steps: currentSteps,
            lastStepScore: points
        })

        this.afterSetCountFinished(currentSteps);
    }
*/
/*
    updateGameSteps = () => {
        const currentSteps = this.state.steps + 1;
        this.setState({
            steps: currentSteps
        })
        this.afterSetCountFinished(currentSteps);
    }
*/


    afterSetCountFinished(score) {
        if (score >= 2048) {
            this.setState({
                    gameWon: true
                },
                () => {
                    console.log('game won', this.state.gameWon)
                }
            )
        }
    }

    shiftLeftValues = (board, isStepSimulation) => {
        const newBoard = this.createEmptyBoard();
        let isValueShifted = false;
        for (let i = 0; i < board.length; i++) {
            let colIndex = 0;
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== 0) {
                    newBoard[i][colIndex] = board[i][j];
                    colIndex++;
                    console.log(isStepSimulation, 'is step stimulation')
                    if (i !== 0 && !isStepSimulation) {
                        isValueShifted = true;
                    }
                    console.log(isValueShifted, 'is value shifted 1')
                }
            }
        }
        console.log(isValueShifted, 'is value shifted 2')
        if (isValueShifted && !isStepSimulation) {
            // TODO : not increment steps when StepSimulation
            this.setState({
                steps: this.state.steps + 1
            });
            this.afterSetCountFinished(this.state.steps);
        }
        return newBoard;
    };

    combineValues = (board) => {
        let stepScore = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length - 1; j++) {
                if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
                    board[i][j] = board[i][j] * 2;
                    board[i][j + 1] = 0;
                    stepScore += board[i][j];
                }
            }
        }


        // if (!isStepSimulation) {
        //    this.updateGameSteps(stepScore);
        //}

        return board;
    };

    moveLeft = (board, isStepSimulation = false) => {
        const newBoard1 = this.shiftLeftValues(board, isStepSimulation);
        const newBoard2 = this.combineValues(newBoard1);
        return this.shiftLeftValues(newBoard2, isStepSimulation);
    }

    moveUp = (board, isStepSimulation) => {
        const rotateBoard = this.rotateLeft(board);
        const newBoard = this.moveLeft(rotateBoard, isStepSimulation);
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

    reverseBoard = (board) => {
        const reverseBoard = this.createEmptyBoard();

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                reverseBoard[i][j] = board[i][board[i].length - 1 - j];
            }
        }

        return reverseBoard;
    };

    moveRight = (board, isStepSimulation) => {
        const reversedBoard = this.reverseBoard(board);
        const newBoard = this.moveLeft(reversedBoard, isStepSimulation);
        return this.reverseBoard(newBoard);
    }

    moveDown = (board, isStepSimulation) => {
        const rotateBoard = this.rotateRight(board);
        const newBoard = this.moveLeft(rotateBoard, isStepSimulation);
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
        if (!this.state.gameWon && !this.state.gameLost) {
            let newBoard;
            switch (event.keyCode) {
                case 37:
                    newBoard = this.moveLeft(this.state.squares);
                    break;
                case 38:
                    newBoard = this.moveUp(this.state.squares);
                    break;
                case 39:
                    newBoard = this.moveRight(this.state.squares);
                    break;
                case 40:
                    newBoard = this.moveDown(this.state.squares);
                    break;
                default:
                    break;
            }
            if (this.hasFreeSquares(newBoard)) {
                this.setState({squares: utils.addRandomSquares(newBoard)});
            } else if (!this.hasFreeSquares(newBoard) && !this.isLost(newBoard)) {
                this.setState({squares: newBoard});
            } else {
                this.setState({gameLost: true}, () => {
                    console.log('Game Loss');
                })
            }
        }
    }

    areDifferent = (board, updatedBoard) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== updatedBoard[i][j]) {
                    return true;
                }
            }
        }
        return false;
    };

    isLost = (board) => {
        const isStepSimulation = true;
        if (this.areDifferent(board, this.moveLeft(board, isStepSimulation))) {
            return false;
        }
        if (this.areDifferent(board, this.moveRight(board, isStepSimulation))) {
            return false;
        }
        if (this.areDifferent(board, this.moveUp(board, isStepSimulation))) {
            return false;
        }
        if (this.areDifferent(board, this.moveDown(board, isStepSimulation))) {
            return false;
        }
        return true;
    };

    resetGame = () => {
        this.setState({
            squares: this.createNewBoard(),
            steps: 0,
            gameWon: false,
            gameLost: false,
            lastStepScore: 0,
        })
    }

    render() {
        return (
            <div className="game">
                <Header
                    steps={this.state.steps}
                    resetGame={this.resetGame}
                    handleKeyPress={this.handleKeyPress}
                />

                <div className="game__board">
                    {
                        this.state.gameLost || this.state.gameWon
                            ? <div className="game__game-over-notification">
                                <h2 className='game__game-over-notification__title'>{this.state.gameLost ? 'You lost the game!' : 'You won the game!'}</h2>
                                <button className='game__game-over-notification__button' onClick={this.resetGame}>OK</button>
                            </div>
                            : null
                    }
                    <Board
                        squares={this.state.squares}
                        isGameOver={this.state.gameLost || this.state.gameWon}
                    />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
