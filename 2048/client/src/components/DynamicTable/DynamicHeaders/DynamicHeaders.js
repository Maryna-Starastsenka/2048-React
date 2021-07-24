class DynamicHeaders extends React.Component {
    render() {
        return (
            <thead>
            <tr>
                {this.props.tableHeaders &&
                this.props.tableHeaders.map((tableHeader) => {
                    return <th>{tableHeader.headerName}</th>;
                })}
            </tr>
            </thead>
        );
    }
}
