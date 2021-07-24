class DynamicTableBody extends React.Component {
    buildRow(element, tableHeaders) {
        return (
            <tr>
                {tableHeaders.map((tableHeader) => {
                    return <td>{element[tableHeader.columnDef]}</td>;
                })}
            </tr>
        );
    }

    render() {
        return (
            <tbody>
            {this.props.data.map((element) => {
                return this.buildRow(element, this.props.tableHeaders);
            })}
            </tbody>
        );
    }
}
