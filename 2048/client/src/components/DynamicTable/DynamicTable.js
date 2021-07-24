class DynamicTable extends React.Component {
    render() {
        return (
            <table className="table table-success table-striped table-hover">
                <DynamicHeaders tableHeaders={this.props.tableHeaders} />
                <DynamicTableBody
                    tableHeaders={this.props.tableHeaders}
                    data={this.props.data}
                />
            </table>
        );
    }
}
