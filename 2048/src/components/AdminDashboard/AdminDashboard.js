class AdminDashboard extends React.Component {
    render() {
        return (
            <div>
                <Navigation/>
                <div className='admin-dashboard_container'>
                    Here will be Admin Dashboard page :)
                </div>
            </div>
        );
    }
}

ReactDOM.render(<AdminDashboard/>, document.getElementById("root"));
