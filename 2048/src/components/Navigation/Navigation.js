class Navigation extends React.Component {
    navigateTo(url) {
        window.location.pathname = url;
    }

    render() {
        return (
            <div className='navigation'>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/index.xhtml")}>
                    Home
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/game.xhtml")}>
                    Game
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/login.xhtml")}>
                    Login
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/registration.xhtml")}>
                    Registration
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/admin-dashboard.xhtml")}>
                    Admin Dashboard
                </div>
            </div>
        );
    }
}
