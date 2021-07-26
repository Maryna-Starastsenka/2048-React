class DynamicHeaders extends React.Component {
    render() {
        return (
            <thead>
            <tr>
                {this.props.tableHeaders.map((tableHeader) => {
                    return <th onClick={() => this.props.sortTableByColumn(tableHeader.columnDef)}>{tableHeader.headerName}</th>;
                })}
            </tr>
            </thead>
        );
    }
}
