class Home extends React.Component {
    render() {
        return (
            <div>
                <Navigation/>
                <div className='home_container'>
                    Welcome to 2048!
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Home/>, document.getElementById("root"));
