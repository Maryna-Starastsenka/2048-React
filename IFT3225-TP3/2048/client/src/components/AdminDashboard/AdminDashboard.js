class AdminDashboard extends React.Component {
    api;
    dashboardDataId;

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
            sortDirection: "asc",
            sortColumn: "userId",

            userId: userData ? userData.userId : null,
            isAdmin: userData ? userData.isAdmin : null,
        };

        this.api = new Api();
    }

    async componentDidMount() {
        await this.updateAdminDashBoardData();
        this.dashboardDataId = setInterval(() => {
            this.updateAdminDashBoardData();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.dashboardDataId);
    }

    async updateAdminDashBoardData() {
        await this.updateAdminDashBoardTableData();
        await this.updateUserCount();
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
            ...userCount,
        });
    }

    compareValues = (a, b, sortDirection) => {
        return sortDirection === "asc" ? (a > b ? 1 : -1) : a < b ? 1 : -1;
    };

    getOppositeSortDirection = (sortDirection) => {
        return sortDirection === "asc" ? "desc" : "asc";
    };

    sortTableByColumn = (columnDef) => {
        const sortDirection =
            this.state.sortColumn === columnDef
                ? this.getOppositeSortDirection(this.state.sortDirection)
                : "asc";
        const sortedTable = this.state.tableData.sort((a, b) =>
            this.compareValues(a[columnDef], b[columnDef], sortDirection, columnDef)
        );

        const sortedTableWithoutZeros = sortedTable
            .filter((elem) => elem.bestScore !== 0)
            .concat(sortedTable.filter((elem) => elem.bestScore === 0));

        this.setState({
            sortDirection,
            sortColumn: columnDef,
            tableData: sortedTableWithoutZeros,
        });
    };

    render() {
        return (
            <div>
                <Navigation userId={this.state.userId} isAdmin={this.state.isAdmin} />
                <div className="admin-dashboard_container">
                    <h3>Administrator Dashboard</h3>

                    <div className="admin-dashboard_players-count">
                        <h4>Player count</h4>
                        <div className="admin-dashboard-box">
                            {this.state.userCount || "-"}
                        </div>

                        <h4>Online players</h4>
                        <div className="admin-dashboard-box">
                            {this.state.onlineUserCount || "-"}
                        </div>
                    </div>

                    <h4>Players</h4>

                    {this.state.tableData.length > 0 ? (
                        <DynamicTable
                            tableHeaders={this.state.tableHeaders}
                            data={this.state.tableData}
                            sortTableByColumn={this.sortTableByColumn}
                            sortDirection={this.state.sortDirection}
                            sortColumn={this.state.sortColumn}
                        />
                    ) : (
                        <div className="admin-dashboard_no-players-information">
                            No Players Found
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<AdminDashboard />, document.getElementById("root"));
