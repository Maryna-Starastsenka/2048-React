class Login extends React.Component {
    api;

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            formErrors: [],
        };

        this.api = new Api();
    }

    handleChange = (e) => {
        const { id, value } = e.target;
        this.setState((prevState) => ({
            ...prevState,
            [id]: value,
            formErrors: prevState.formErrors.filter((error) => error !== id),
        }));
    };

    hasError(key) {
        return this.state.formErrors.indexOf(key) !== -1;
    }

    login = async () => {
        const formErrors = [];
        if (this.state.username === "") {
            formErrors.push("username");
        }

        if (this.state.password === "") {
            formErrors.push("password");
        }

        this.setState({
            formErrors,
        });

        if (formErrors.length > 0) {
            return false;
        } else {
            await this.api.loginUser(this.state.username, this.state.password);
            this.state.username = "";
            this.state.password = "";
        }
    };

    render() {
        return (
            <div>
                <Navigation />
                <div className="login_container">
                    <form className="login_form">
                        <h3>Sign in with your 2048 account</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input
                                id="username"
                                type="username"
                                className={`form-control ${
                                    this.hasError("username") ? "form-control--error" : ""
                                }`}
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={() => this.handleChange(event)}
                            />
                            <div
                                className="form_error-message"
                                style={{
                                    visibility: this.hasError("username") ? "inherit" : "hidden",
                                }}
                            >
                                Username is required!
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                id="password"
                                type="password"
                                className={`form-control ${
                                    this.hasError("password") ? "form-control--error" : ""
                                }`}
                                placeholder="Enter password"
                                value={this.state.password}
                                onChange={() => this.handleChange(event)}
                            />
                            <div
                                className="form_error-message"
                                style={{
                                    visibility: this.hasError("password") ? "inherit" : "hidden",
                                }}
                            >
                                Password is required!
                            </div>
                        </div>

                        <button
                            type="button"
                            className="btn btn-dark btn-lg btn-block"
                            onClick={() => this.login()}
                        >
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Login />, document.getElementById("root"));
