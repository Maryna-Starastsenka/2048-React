class Board extends React.Component {
    squaresDisplay = () =>
        utils.getArrayWithRangedNumbers(1, gameParams.rowCount).map((i) => (
            <div className="board-row">
                {utils
                    .getArrayWithRangedNumbers(1, gameParams.colCount)
                    .map((j) => (
                        <Square
                            row={i - 1}
                            col={j - 1}
                            value={this.props.squares[i - 1][j - 1]}
                        />
                    ))}
            </div>
        ));

    render() {
        return (
            <div style={{ opacity: this.props.isGameOver ? "0.4" : null }}>
                {this.squaresDisplay()}
            </div>
        );
    }
}