class Course extends React.Component {
    render() {
        return (
            <li class="list-group-item">
                Cours : {this.props.sigle} - Ouvert : {(this.props.opened) ? "Oui" : "Non"}
            </li>
        )
    }
}
