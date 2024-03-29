class Header extends React.Component {
    handleKeyPress = (event) => {
        this.props.moveSquares(event);
    };

    render() {
        return (
            <div className="header">
                <div className="header_group">
                    <h1 className="header_title">2048</h1>
                    <div className="header_steps-container">
                        <div className="header_steps-group">
                            <div className="header_steps-box">
                                <span className="header_steps-box_title">STEPS</span>
                                <div className="header_steps-box_score">
                                    <span>{this.props.steps}</span>
                                </div>
                            </div>
                            <div className="header_steps-box">
                                <span className="header_steps-box_title">My Best Score</span>
                                <div className="header_steps-box_score">
                                    <span>{this.props.bestScore}</span>
                                </div>
                            </div>
                            <div className="header_steps-box">
                                <span className="header_steps-box_title">Best Score</span>
                                <div className="header_steps-box_score">
                                    <span>{this.props.bestGeneralScore}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            className="header_button"
                            onKeyUp={this.handleKeyPress}
                            onClick={this.props.resetGame}
                        >
                            New Game
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
