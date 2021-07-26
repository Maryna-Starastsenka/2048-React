class Registration extends React.Component {
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
            messageStatus: "",
            enableCheckedBox: false,
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
        localStorage.removeItem("user");
        this.setState({
            userId: null,
            isAdmin: null,
        });
    };

    signUp = async () => {
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
            const response = await this.api.createNewUser(
                this.state.username,
                this.state.password,
                this.state.isAdmin,
            );

            this.state.username = "";
            this.state.password = "";

            this.setState({
                message: response.message,
                messageStatus: response.status,
            });

            setTimeout(() => {
                this.setState({
                    message: null,
                });
            }, 15000);
        }
    };

    onClick = () => {
        const checked = !this.state.enableCheckedBox;
        this.setState({enableCheckedBox: checked});
        this.setState({isAdmin: checked});
    }

    render() {
        return (
            <div>
                <Navigation userId={this.state.userId} isAdmin={this.state.isAdmin} />
                <div className="sign-up_container">
                    {!this.state.userId ? (
                        <div className="sign-up_form">
                            <h3>Sign up to play 2048!</h3>

                            <div
                                className="sign-up_form_confirmation-message"
                                style={{
                                    display: this.state.message ? "flex" : "none",
                                    color:
                                        this.state.messageStatus === "Failed" ? "red" : "green",
                                }}
                            >
                                {this.state.message}
                            </div>

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

                            <div className="form-group form-check">
                                <input className="form-check-input"
                                    type="checkbox"
                                    name="account-type"
                                    value="admin"
                                    checked={this.state.enableCheckedBox}
                                    onChange={this.onClick}/>
                                <label className="form-check-label">Administrator account</label>
                            </div>

                            <button
                                type="button"
                                className="btn btn-dark btn-lg btn-block"
                                onClick={() => this.signUp()}
                            >
                                Sign up
                            </button>
                        </div>
                    ) : (
                        <div className="sign-up_form">
                            <h3>You're already logged in</h3>

                            <button
                                type="button"
                                className="btn btn-dark btn-lg btn-block logout-btn"
                                onClick={() => this.logOut()}
                            >
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Registration />, document.getElementById("root"));
