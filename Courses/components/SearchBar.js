class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleOpenedChange = this.handleOpenedChange.bind(this)
    }
    
    // Le "state" n'est pas local, il faut le changer à partir du "props"
    // passé par le parent.
    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }
    
    handleOpenedChange(e) {
        this.props.onOpenedChange(e.target.checked)
    }
    
    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Rechercher"
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange}
                />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.openedOnly}
                        onChange={this.handleOpenedChange}
                    />
                    {' '}
                    Monter les cours overts aux inscriptions seulement.
                </p>
            </form>
        )
    }
}
