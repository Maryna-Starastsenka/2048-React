class Game extends React.Component {
    api;
    bestScoreId;

    constructor(props) {
        super(props);

        const userDataFromLocalStorage = localStorage.getItem("user");
        const userData = userDataFromLocalStorage
            ? JSON.parse(atob(userDataFromLocalStorage))
            : null;

        this.state = {
            squares: this.createEmptyBoard(),
            steps: 0,
            gameWon: false,
            gameLost: false,
            userId: userData ? userData.userId : null,
            isAdmin: userData ? userData.isAdmin : null,
        };

        this.api = new Api();
    }

    async componentDidMount() {
        await this.updateScore();
        this.bestScoreId = setInterval(() => {
            this.updateScore();
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.bestScoreId);
    }

    async updateScore() {
        await this.updateUserBestScore();
        await this.updateBestGeneralScore();
    }

    async updateUserBestScore() {
        const bestScore = await this.api.getUserBestScore(this.state.userId);
        this.setState({
            bestScore: bestScore.bestScore,
        });
}
    async updateBestGeneralScore() {
        const bestGeneralScore = await this.api.getGeneralBestScore();
        this.setState({
            bestGeneralScore: bestGeneralScore.bestGeneralScore,
        });
    }

    shiftLeftValues = (board) => {
        const leftShiftBoard = this.createEmptyBoard();
        for (let i = 0; i < board.length; i++) {
            let index = 0;
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== 0) {
                    leftShiftBoard[i][index] = board[i][j];
                    index++;
                }
            }
        }
        this.setState({ steps: this.state.steps + 1 });
        return leftShiftBoard;
    };

    combineValues = (board) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length - 1; j++) {
                if (board[i][j] !== 0 && board[i][j] === board[i][j + 1]) {
                    board[i][j] = board[i][j] * 2;
                    board[i][j + 1] = 0;
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
        this.setState({ steps: this.state.steps + 1 });
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

    moveLeft = (board) => {
        const leftShiftBoard = this.shiftLeftValues(board);
        const newBoard = this.combineValues(leftShiftBoard);
        return this.shiftLeftValues(newBoard);
    };

    moveUp = (board) => {
        const rotatedBoard = this.rotateLeft(board);
        const newBoard = this.moveLeft(rotatedBoard);
        return this.rotateRight(newBoard);
    };

    moveRight = (board) => {
        const reversedBoard = this.reverseBoard(board);
        const newBoard = this.moveLeft(reversedBoard);
        return this.reverseBoard(newBoard);
    };

    moveDown = (board) => {
        const rotateBoard = this.rotateRight(board);
        const newBoard = this.moveLeft(rotateBoard);
        return this.rotateLeft(newBoard);
    };

    moveSquares = (event) => {
        if (!this.state.gameWon && !this.state.gameLost) {
            let newBoard;
            switch (event.key) {
                case "ArrowLeft":
                    newBoard = this.moveLeft(this.state.squares);
                    break;
                case "ArrowUp":
                    newBoard = this.moveUp(this.state.squares);
                    break;
                case "ArrowRight":
                    newBoard = this.moveRight(this.state.squares);
                    break;
                case "ArrowDown":
                    newBoard = this.moveDown(this.state.squares);
                    break;
                default:
                    break;
            }
            newBoard = this.hasFreeSquares(newBoard)
                ? utils.addRandomSquares(newBoard)
                : newBoard;
            this.setState({ squares: newBoard });
            if (this.isLost(newBoard)) {
                this.setState({ gameLost: true });
            }
        }
    };

    hasFreeSquares = (board) => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === 0) {
                    return true;
                }
            }
        }
        return false;
    };

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
        if (this.areDifferent(board, this.moveLeft(board))) {
            return false;
        }
        if (this.areDifferent(board, this.moveRight(board))) {
            return false;
        }
        if (this.areDifferent(board, this.moveUp(board))) {
            return false;
        }
        if (this.areDifferent(board, this.moveDown(board))) {
            return false;
        }
        return true;
    };


    isWon(board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 16) {
                    this.setState({ gameWon: true });
                    (this.state.steps < this.state.bestScore) ?
                        this.api.updateUserScore(this.state.steps, this.state.userId) : null
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
        });
    };

    createInitialBoard() {
        return utils.addRandomSquares(this.createEmptyBoard(), 2);
    }

    render() {
        return (
            <div>
                <Navigation userId={this.state.userId} isAdmin={this.state.isAdmin} />
                <div className="game_container">
                    <Header
                        steps={this.state.steps}
                        resetGame={this.resetGame}
                        moveSquares={this.moveSquares}
                        bestScore={this.state.bestScore}
                        bestGeneralScore={this.state.bestGeneralScore}
                    />

                    <div className="game_board">
                        {this.state.gameLost || this.state.gameWon ? (
                            <Notification
                                gameLost={this.state.gameLost}
                                resetGame={this.resetGame}
                            />
                        ) : null}
                        <Board
                            squares={this.state.squares}
                            isGameOver={this.state.gameLost || this.state.gameWon}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById("root"));
