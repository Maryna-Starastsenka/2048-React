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
                    Play
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/login.xhtml")}>
                    Log in
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/registration.xhtml")}>
                    Sign up
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/admin-dashboard.xhtml")}>
                    Admin Dashboard
                </div>
            </div>
        );
    }
}
