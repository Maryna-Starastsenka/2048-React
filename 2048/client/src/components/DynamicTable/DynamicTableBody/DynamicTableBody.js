class DynamicTableBody extends React.Component {
    buildRow(element, tableHeaders) {
        return (
            <tr>
                {tableHeaders.map((tableHeader) => {
                    return (
                        <td>
                            {tableHeader.columnDef === "isAdmin" ||
                            tableHeader.columnDef === "isOnline"
                                ? `${element[tableHeader.columnDef] === true ? "Yes" : "No"}`
                                : tableHeader.columnDef === "bestScore"
                                    ? `${
                                        element[tableHeader.columnDef] === 0
                                            ? "No score"
                                            : `${element[tableHeader.columnDef]}`
                                    }`
                                    : `${element[tableHeader.columnDef]}`}
                        </td>
                    );
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
