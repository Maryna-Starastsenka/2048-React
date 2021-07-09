// TODO:
// 0. Add notification with step score +
// 1. Score +
// 2. Notifications for lost and win game +
// 3. Add colors for squares +
// 4. Extract components
// 5. Refactoring for functions and variables names (in progress)
// 6. General styling +
// 7. Replace Score to Steps : done but steps are incremented when isStepStimulation = true
// 8. Game is won then the square with value 2048 appears +
// 9. handleKeyPress doesn't work : works with Chrome
// 10. Generate 2 random values once the start button is pressed (not before)
// 11. Game over notification doesn't appear when gameLost, additional step is required
// 12. Pause Button (nice to have)
// 13. Make rotation method more general (nice to have)


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

    shiftLeftValues = (board, isStepSimulation) => {
        const newBoard = this.createEmptyBoard();
        let isValueShifted = false;
        for (let i = 0; i < board.length; i++) {
            let colIndex = 0;
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== 0) {
                    newBoard[i][colIndex] = board[i][j];
                    colIndex++;
                    if (j !== 0 && !isStepSimulation) {
                        isValueShifted = true;
                    }
                }
            }
        }
        if (isValueShifted) {
            // TODO : don't increment steps when isStepSimulation
            this.setState({
                steps: this.state.steps + 1
            });
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
        this.isWon(board);
        return board;
    };

    rotateLeft = (board) => {
        const rotatedBoard = this.createEmptyBoard();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                rotatedBoard[i][j] = board[j][board[i].length - 1 - i];
            }
        }
        return rotatedBoard;
    };

    rotateRight = (board) => {
        const rotatedBoard = this.createEmptyBoard();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                rotatedBoard[i][j] = board[board[i].length - 1 - j][i];
            }
        }
        return rotatedBoard;
    };

    reverseBoard = (board) => {
        const reversedBoard = this.createEmptyBoard();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                reversedBoard[i][j] = board[i][board[i].length - 1 - j];
            }
        }
        return reversedBoard;
    };

    createEmptyBoard() {
        let board = new Array(gameParams.rowCount).fill(0);
        for (let i = 0; i < gameParams.rowCount; i++) {
            board[i] = new Array(gameParams.colCount).fill(0);
        }
        return board;
    }

    moveLeft = (board, isStepSimulation = false) => {
        const newBoard1 = this.shiftLeftValues(board, isStepSimulation);
        const newBoard2 = this.combineValues(newBoard1);
        return this.shiftLeftValues(newBoard2, isStepSimulation);
    }

    moveUp = (board, isStepSimulation) => {
        const rotatedBoard = this.rotateLeft(board);
        const newBoard = this.moveLeft(rotatedBoard, isStepSimulation);
        return this.rotateRight(newBoard);
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

    isWon(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 2048) {
                    this.setState({gameWon: true})
                }
            }
        }
    }

    resetGame = () => {
        this.setState({
            squares: this.createInitialBoard(),
            steps: 0,
            gameWon: false,
            gameLost: false,
            lastStepScore: 0,
        })
    }

    createInitialBoard() {
        let board = new Array(gameParams.rowCount).fill(0);
        for (let i = 0; i < gameParams.rowCount; i++) {
            board[i] = new Array(gameParams.colCount).fill(0);
        }
        return utils.addRandomSquares(board, 2);
    }

    render() {
        return (
            <div className="game">
                <Header
                    steps={this.state.steps}
                    resetGame={this.resetGame}
                    handleKeyPress={this.handleKeyPress}
                />

                <div className="game_board">
                    {
                        this.state.gameLost || this.state.gameWon
                            ? <div className="game_game-over-notification">
                                <h2 className='game_game-over-notification_title'>{this.state.gameLost ? 'You lost the game!' : 'You won the game!'}</h2>
                                <button className='game_game-over-notification_button' onClick={this.resetGame}>OK
                                </button>
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