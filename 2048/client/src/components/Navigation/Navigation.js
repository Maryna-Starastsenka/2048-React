class Navigation extends React.Component {
    navigateTo(url) {
        window.location.pathname = url;
    }

    render() {
        return (
            <div className='navigation'>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/client/index.xhtml")}>
                    Home
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/client/game.xhtml")} style={{display: this.props.userId ? 'block' : 'none'}}>
                    Play
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/client/login.xhtml")}>
                    Log in
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/client/registration.xhtml")}>
                    Sign up
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("/2048/2048/client/admin-dashboard.xhtml")} style={{display: this.props.isAdmin ? 'block' : 'none'}}>
                    Admin Dashboard
                </div>
            </div>
        );
    }
}
