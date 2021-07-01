class CourseList extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const openedOnly = this.props.openedOnly;
        const rows = []

        this.props.courses.forEach(course => {
            if (openedOnly && !course.opened)
                return
            if (!course.sigle.includes(filterText))
                return
            rows.push(
                <Course 
                    sigle={course.sigle} 
                    opened={course.opened}
                />
            )
        })
        
        return (
            <ul class="list-group">
                {rows}
            </ul>
        )
    }
}
