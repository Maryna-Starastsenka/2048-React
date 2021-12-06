class Home extends React.Component {
    constructor() {
        super();
        const userDataFromLocalStorage = localStorage.getItem("user");
        const userData = userDataFromLocalStorage
            ? JSON.parse(atob(userDataFromLocalStorage))
            : null;
        this.state = {
            userId: userData ? userData.userId : null,
            isAdmin: userData ? userData.isAdmin : null,
        };
    }

    render() {
        return (
            <div>
                <Navigation isAdmin={this.state.isAdmin} userId={this.state.userId} />
                <div className="home_container">Welcome to 2048!</div>
            </div>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById("root"));
