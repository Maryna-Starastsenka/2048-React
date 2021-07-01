class FilterableCourseList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            openedOnly: false
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this)
        this.handleOpenedChange = this.handleOpenedChange.bind(this)
    }
    
    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        })
    }
    
    handleOpenedChange(openedOnly) {
        this.setState({
            openedOnly: openedOnly
        })
    }
  
    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    openedOnly={this.state.openedOnly}
                    // On passe nos méthodes de changement de "state"
                    // dans note "component" enfant.
                    onFilterTextChange={this.handleFilterTextChange}
                    onOpenedChange={this.handleOpenedChange}
                />
                <CourseList
                    courses={this.props.courses}
                    filterText={this.state.filterText}
                    openedOnly={this.state.openedOnly}
                />
            </div>
        )
    }
}


