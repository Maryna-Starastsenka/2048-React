class Square extends React.Component {
    render() {
        return (
            <button
                className="square"
                style={{
                    background: squareHelpers.getSquareBackgroundColor(
                        this.props.value
                    ),
                    color: squareHelpers.getSquareColor(this.props.value),
                    fontSize: squareHelpers.getSquareFontSize(this.props.value),
                }}
            >
                {this.props.value !== 0 ? this.props.value : null}
            </button>
        );
    }
}
