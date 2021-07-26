class AdminDashboard extends React.Component {
    api;

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

            tableData: [],

            userId: userData ? userData.userId : null,
            isAdmin: userData ? userData.isAdmin : null,
        };

        this.api = new Api();
    }

    async componentDidMount() {
        await this.updateAdminDashBoardTableData();
        this.tableDataId = setInterval(
            () => {
                this.updateAdminDashBoardTableData();
                this.updateUserCount();
                this.updateOnlineUserCount();
            },
            10000
        );
    }

    componentWillUnmount() {
        clearInterval(this.tableDataId);
    }

    async updateAdminDashBoardTableData() {
        const tableData = await this.api.getAdminDashBoardTable();
        this.setState({
            tableData: tableData,
        });
    }

    async updateUserCount() {
        const userCount = await this.api.getUserCount();
        this.setState({
            userCount: userCount.userCount,
        });
        console.log(userCount, "user count")
    }

    async updateOnlineUserCount() {
        const onlineUserCount = await this.api.getOnlineUserCount();
        this.setState({
            onlineUserCount: onlineUserCount.onlineUserCount,
        });
        console.log(onlineUserCount, "online user count")
    }

    sortTableByColumn = (columnDef) => {
        this.setState(
            (prevState) => ({
                ...prevState,
                tableData: prevState.tableData.sort((a, b) => a[columnDef] - b[columnDef])
            })
        )
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
                        data={this.state.tableData}
                        sortTableByColumn={this.sortTableByColumn}
                    />

                    <h4>Player count</h4>
                        <div className="admin-dashboard-box">
                            users
                        </div>

                    <h4>Online players</h4>
                        <div className="admin-dashboard-box">
                            online users
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<AdminDashboard />, document.getElementById("root"));
