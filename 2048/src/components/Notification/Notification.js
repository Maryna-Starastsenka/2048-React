class Notification extends React.Component {
    render() {
        return (
            <div className="game-over-notification">
                <h2 className="game-over-notification_title">
                    {this.props.gameLost
                        ? "You lost the game!"
                        : "You won the game!"}
                </h2>
                <button
                    className="game-over-notification_button"
                    onClick={this.props.resetGame}
                >
                    OK
                </button>
            </div>
        );
    }
}
