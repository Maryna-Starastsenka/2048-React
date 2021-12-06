class DynamicHeaders extends React.Component {
    render() {
        return (
            <thead>
            <tr>
                {this.props.tableHeaders.map((tableHeader) => {
                    return (
                        <th
                            onClick={() =>
                                this.props.sortTableByColumn(tableHeader.columnDef)
                            }
                        >
                            <div className="header-content">
                                {tableHeader.headerName}
                                {tableHeader.columnDef === this.props.sortColumn ? (
                                    <div
                                        className="header-content_sort-arrow"
                                        style={{
                                            transform:
                                                this.props.sortDirection === "asc"
                                                    ? "rotate(180deg)"
                                                    : null,
                                        }}
                                    >
                                        ▼
                                    </div>
                                ) : null}
                            </div>
                        </th>
                    );
                })}
            </tr>
            </thead>
        );
    }
}
