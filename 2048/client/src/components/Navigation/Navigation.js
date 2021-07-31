class Navigation extends React.Component {
    navigateTo(url) {
        window.location.pathname = url;
    }

    render() {
        return (
            <div className='navigation'>
                <div className='navigation_element' onClick={() => this.navigateTo("~starastm/ift3225/tp3/client/index.xhtml")}>
                    Home
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("~starastm/ift3225/tp3/client/game.xhtml")} style={{display: this.props.userId ? 'flex' : 'none'}}>
                    Play
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("~starastm/ift3225/tp3/client/login.xhtml")}>
                    Log in / Log out
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("~starastm/ift3225/tp3/client/registration.xhtml")}>
                    Sign up
                </div>
                <div className='navigation_element' onClick={() => this.navigateTo("~starastm/ift3225/tp3/client/admin-dashboard.xhtml")} style={{display: this.props.isAdmin ? 'flex' : 'none'}}>
                    Admin Dashboard
                </div>
            </div>
        );
    }
}
