class Login extends React.Component {
    api;

    constructor() {
        super();

        const userDataFromLocalStorage = localStorage.getItem("user");
        const userData = userDataFromLocalStorage
            ? JSON.parse(atob(userDataFromLocalStorage))
            : null;

        this.state = {
            username: "",
            password: "",
            formErrors: [],
            userId: userData ? userData.userId : null,
            isAdmin: userData ? userData.isAdmin : null,
            message: "",
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

    logOut = () => {
        this.api.logOutUser(this.state.userId);
        localStorage.removeItem("user");
        this.setState({
            userId: null,
            isAdmin: null,
        });
    };

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
            const response = await this.api.loginUser(
                this.state.username,
                this.state.password
            );
            this.state.username = "";
            this.state.password = "";

            this.setState(
                {
                    message: response.message,
                    isAdmin: response.isAdmin,
                    userId: response.userId,
                },
                () => {
                    if (this.state.userId) {
                        localStorage.setItem(
                            "user",
                            btoa(
                                JSON.stringify({
                                    userId: this.state.userId,
                                    isAdmin: this.state.isAdmin,
                                })
                            )
                        );
                    }
                }
            );

            setTimeout(() => {
                this.setState({
                    message: null,
                });
            }, 3000);
        }
    };

    render() {
        return (
            <div>
                <Navigation userId={this.state.userId} isAdmin={this.state.isAdmin} />
                <div className="login_container">
                    {!this.state.userId ? (
                        <div className="login_form">
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
                                        visibility: this.hasError("username")
                                            ? "inherit"
                                            : "hidden",
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
                                        visibility: this.hasError("password")
                                            ? "inherit"
                                            : "hidden",
                                    }}
                                >
                                    Password is required!
                                </div>
                            </div>

                            {this.state.message ? (
                                <div
                                    className="login_form_invalid-data-message"
                                    style={{
                                        display: this.state.message ? "flex" : "none",
                                    }}
                                >
                                    {this.state.message}
                                </div>
                            ) : null}

                            <button
                                type="button"
                                className="btn btn-dark btn-lg btn-block"
                                onClick={() => this.login()}
                            >
                                Log in / Log out
                            </button>
                        </div>
                    ) : this.state.message ? (
                        <div
                            className="login_form_confirmation-message"
                            style={{
                                display: this.state.message ? "flex" : "none",
                            }}
                        >
                            {this.state.message}
                        </div>
                    ) : (
                        <LogoutForm logOut={this.logOut} />
                    )}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Login />, document.getElementById("root"));
