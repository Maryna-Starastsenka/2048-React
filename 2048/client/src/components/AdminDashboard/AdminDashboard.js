class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);

        const userDataFromLocalStorage = localStorage.getItem("user");
        const userData = userDataFromLocalStorage
            ? JSON.parse(atob(userDataFromLocalStorage))
            : null;

        this.state = {
            tableHeaders: [
                {
                    columnDef: "userId",
                    headerName: "User ID",
                },
                {
                    columnDef: "username",
                    headerName: "Username",
                },
                {
                    columnDef: "isAdmin",
                    headerName: "Admin rights",
                },
                {
                    columnDef: "bestScore",
                    headerName: "Best Score",
                },
                {
                    columnDef: "isOnline",
                    headerName: "Online",
                },
                {
                    columnDef: "signUpDate",
                    headerName: "Signup date",
                },
            ],

            data: [
                {
                    userId: "1",
                    username: "name",
                    isAdmin: "true",
                    bestScore: "20",
                    isOnline: "true",
                    signUpDate: "10/10/2010",
                },
                {
                    userId: "2",
                    username: "name2",
                    isAdmin: "false",
                    bestScore: "30",
                    isOnline: "true",
                    signUpDate: "12/12/2012",
                },
            ],
            userId: userData ? userData.userId : null,
            isAdmin: userData ? userData.isAdmin : null,
        };
    }

    render() {
        return (
            <div>
                <Navigation userId={this.state.userId} isAdmin={this.state.isAdmin} />
                <div className="admin-dashboard_container">
                    <h3>Administrator Dashboard</h3>

                    <h4>Players</h4>

                    <DynamicTable
                        tableHeaders={this.state.tableHeaders}
                        data={this.state.data}
                    />

                    <h4>Player count</h4>

                    <h4>Online players</h4>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<AdminDashboard />, document.getElementById("root"));
