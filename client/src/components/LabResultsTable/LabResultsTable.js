import React from "react";
import "./LabResultsTable.css";
import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Skeleton, Alert, Slide
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";


class LabResultsTable extends React.Component {
    static columns = [
        {field: "clinicNo", headerName: "Clinic No.", styles: {minWidth: 70}},
        {field: "barcode", headerName: "Barcode", styles: {minWidth: 70}},
        {field: "patientId", headerName: "Pat. ID.", styles: {minWidth: 70}},
        {field: "patientName", headerName: "Pat. Name", styles: {minWidth: 140}},
        {field: "dateOfBirth",headerName: "DOB", styles: {minWidth: 90}},
        {field: "gender", headerName: "Gen.", align: "right", styles: { textAlign: "center", minWidth: 30 }},
        {field: "collectionDate", headerName: "Col. Date", styles: {minWidth: 90}},
        {field: "collectionTime", headerName: "Col. Time", styles: {minWidth: 70}},
        {field: "testCode", headerName: "Test code", styles: {minWidth: 70}},
        {field: "testName", headerName: "Test name", styles: {minWidth: 100}},
        {field: "result", headerName: "Result", styles: {minWidth: 70, textAlign: "right"}},
        {field: "unit", headerName: "Unit", styles: {minWidth: 70, textAlign: "right"}},
        {field: "refRangeLow", headerName: "Ref. RLow", styles: {minWidth: 70, textAlign: "right"}},
        {field: "refRangeHigh", headerName: "Ref. RHigh", styles: {minWidth: 70, textAlign: "right"}},
        {field: "note", headerName: "Note", styles: {minWidth: 70}},
        {field: "nonSpecRefs", headerName: "Non Spec. Refs.", styles: {minWidth: 250}}
    ];

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);

        this.props.dataSource.onError = (e) => this._handleFetchError(e);
        this.props.dataSource.onDataFetched = (data) => this._handleFetchSuccess(data);

        console.log(process.env.REACT_APP_API_URL);

        this.state = {
            rows: [],
            notification: undefined,
            fetchError: false,
            loading: false
        };
    }

    componentDidMount() {
        this._loadRows().then();
    }

    render() {
        return (
            <TableContainer className="d-table-container" ref={this._refHandler}>
                <Table className='d-table' stickyHeader aria-label="sticky table">
                    <TableHead sx={{backgroundColor: 'blue'}}>
                        <TableRow sx={{ "& th": {backgroundColor: "#66B5CB", color: "#FFF"}}}>
                            {this._renderTableHeader()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this._renderTableBody()}
                    </TableBody>
                </Table>

                {this.renderNotification(this.state.notification)}
            </TableContainer>
        );
    }
    renderNotification(notification){
        const visible = !!notification;
        return visible && (<Snackbar open={visible}
                  anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                  autoHideDuration={5000}
                  onClose={this.handleClose}>
            <Alert onClose={this.handleClose}
                   severity={notification.severity || 'error'} sx={{ width: '100%' }}>
                {notification.message}
            </Alert>
        </Snackbar>);
    }
    handleClose(){
        this.setState({ notification: undefined });
    }
    _renderTableBody() {
        const [rows, accessor] = this.state.loading || this.state.fetchError
            ? [
                [...Array(5).keys()].map(i => { return { id: i } }),
                (row, col) => (<Skeleton variant="text" animation="wave" sx={{ fontSize: '1rem' }} />)]
            : [this.state.rows, (row, col) => row[col.field]];

        return this._renderTableRows(rows, accessor);
    }

    _renderTableRows(rows, accessor) {
        return rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {this._renderRowCells(row, accessor)}
            </TableRow>
        ));
    }

    _renderTableHeader() {
        return this._renderRowCells(null, (row,col) => col.headerName);
    }

    _renderRowCells(row, accessor) {
        return LabResultsTable.columns.map(col => (
            <TableCell key={col.field} style={col.styles}>
                {accessor(row, col)}
            </TableCell>
        ));
    }

    _refHandler = (el) => {
        if(el == null)
            return;

        const elTop = Math.ceil(el.getBoundingClientRect().y);
        const elBorderBottomWidth = getComputedStyle(el).borderBottomWidth;
        const parentPaddingBottom = getComputedStyle(el.parentElement).paddingBottom;
        el.style.height = `calc(100vh - ${elTop}px - ${parentPaddingBottom} - ${elBorderBottomWidth})`;
    };

    _handleFetchError(e) {
        this.setState({
            notification: e,
            fetchError: true
        });
    }

    _handleFetchSuccess(data) {
        this.setState({
            rows: data,
            notification: undefined,
            fetchError: false
        });
    }

    async _loadRows() {
        this.setState({ loading: true });
        await this.props.dataSource.refresh();
        this.setState({ loading: false });
    }
}

export default LabResultsTable;