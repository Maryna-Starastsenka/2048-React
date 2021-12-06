class LogoutForm extends React.Component {
    render() {
        return (
            <div className="logout-form">
                <h3 className="logout-form_title">You're already logged in</h3>

                <button
                    type="button"
                    className="btn btn-dark btn-lg btn-block logout-btn"
                    onClick={() => this.props.logOut()}
                >
                    Log out
                </button>
            </div>
        );
    }
}
