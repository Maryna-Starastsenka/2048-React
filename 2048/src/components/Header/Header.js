class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <div className='header__group'>
                    <h1 className='header__title'>2048</h1>
                    <div className='header__score-container'>
                        <div className='header__score-box'>
                            <span className='header__score-box__title'>SCORE</span>
                            <div className='header__score-box__score'>
                                <span>{this.props.score}</span>
                            </div>
                        </div>
                        <button className='header__button' onKeyUp={this.props.handleKeyPress}
                                onClick={this.props.resetGame}>New Game
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}