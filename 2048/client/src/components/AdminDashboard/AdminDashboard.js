class AdminDashboard extends React.Component {
    render() {
        return (
            <div>
                <Navigation/>
                <div className='admin-dashboard_container'>
                    <h3>Administrator Dashboard</h3>

                    <h4>Players</h4>
                    <table className="table table-success table-striped table-hover">
                        <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Admin rights</th>
                            <th>Best score</th>
                            <th>Online</th>
                            <th>Signup date</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                            <td>1</td>
                        </tr>
                        </tbody>
                    </table>

                    <h4>Player count</h4>

                    <h4>Online players</h4>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<AdminDashboard/>, document.getElementById("root"));
