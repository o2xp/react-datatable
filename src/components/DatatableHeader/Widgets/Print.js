import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  IconButton,
  Tooltip,
  Zoom,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Print as PrintIcon, Close as CloseIcon } from "@material-ui/icons";
import {
  rowsPropType,
  columnsPropType,
  rowsCurrentPagePropType,
  rowsSelectedPropType,
  textPropType,
  columnsOrderPropType
} from "../../../proptypes";
import { setRowsSelected as setRowsSelectedAction } from "../../../redux/actions/datatableActions";
import Transition from "./Transition";

const printTab = ({ rows, columns }) => {
  const winPrint = window.open(
    "",
    "",
    "left=0,top=0,width=auto,height=auto,toolbar=0,scrollbars=0,status=0"
  );
  winPrint.document.write(`
  <style type="text/css">
    table {
      border-collapse: collapse;
      margin: 0;
      padding: 0;
      width: 100%;
      table-layout: fixed;
      color: black;
    }
    table tr {
      padding: 0.35em;
      border-bottom: 1px solid #bdc3c7;
    }
    table tr th {
      font-size: 0.85em;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 0.625em;
      text-align: center;
      word-break: break-all;
    }
    table tr td {
      padding: 0.625em;
      text-align: center;
      word-break: break-all;
    }
  </style>`);

  const head = `
  <thead> 
    ${columns.map(col => `<th>${col.label}</th>`)} 
  </thead>`;

  const body = `
  <tbody> 
    ${rows.map(
      r =>
        `<tr> 
          ${columns.map(el => `<td>${r[el.id]}</td>`)} 
        </tr>`
    )} 
  </tbody>`;

  winPrint.document.write(
    `<html>
      <body>
        <table>
          ${head}
          ${body}
        </table>
      </body>
    <html>`
  );
  winPrint.document.close();
  winPrint.focus();
  winPrint.print();
  winPrint.close();
};

export class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      columnsDisplayed: true
    };
  }

  toggleDialog = bool => {
    this.setState({ dialogOpen: bool });
  };

  print = type => {
    const {
      rowsSelected,
      rowsToUse,
      rowsCurrentPage,
      columns,
      columnsOrder
    } = this.props;

    const { columnsDisplayed } = this.state;

    let rows;
    switch (type) {
      case "selected":
        rows = rowsSelected;
        break;
      case "current":
        rows = rowsCurrentPage;
        break;
      case "all":
      default:
        rows = rowsToUse;
        break;
    }

    let filteredColumns = [];

    if (columnsDisplayed || columns.length === columnsOrder.length) {
      columnsOrder.forEach(co => {
        filteredColumns.push(columns.find(col => col.id === co));
      });
    } else {
      filteredColumns = columns;
    }

    filteredColumns = filteredColumns.filter(col => col.id !== "o2xpActions");
    printTab({ rows, columns: filteredColumns });
  };

  render() {
    const {
      rowsSelected,
      printText,
      printTitleText,
      printDescriptionText,
      downloadSelectedRowsText,
      downloadCurrentRowsText,
      downloadAllRowsText
    } = this.props;
    const { dialogOpen, columnsDisplayed } = this.state;

    return (
      <Fragment>
        <Tooltip TransitionComponent={Zoom} title={printText}>
          <span>
            <IconButton
              className="print-icon"
              onClick={() => this.toggleDialog(true)}
            >
              <PrintIcon color="primary" />
            </IconButton>
          </span>
        </Tooltip>

        <Dialog
          open={dialogOpen}
          onClose={() => this.toggleDialog(false)}
          TransitionComponent={Transition}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {printTitleText}
            <IconButton
              aria-label="Close"
              className="close-icon"
              onClick={() => this.toggleDialog(false)}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {printDescriptionText}
            </DialogContentText>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={columnsDisplayed}
                    onChange={() =>
                      this.setState({ columnsDisplayed: !columnsDisplayed })
                    }
                    value="columnsDisplayed"
                  />
                }
                label="Only columns displayed"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              className="rows-selected"
              onClick={() => this.print("selected")}
              variant="contained"
              size="small"
              color="primary"
              disabled={rowsSelected.length === 0}
            >
              {downloadSelectedRowsText}
            </Button>
            <Button
              className="rows-current-page"
              onClick={() => this.print("current")}
              variant="contained"
              size="small"
              color="primary"
            >
              {downloadCurrentRowsText}
            </Button>
            <Button
              className="all-rows"
              onClick={() => this.print("all")}
              variant="contained"
              size="small"
              color="primary"
            >
              {downloadAllRowsText}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

Print.propTypes = {
  columns: columnsPropType.isRequired,
  rowsCurrentPage: rowsCurrentPagePropType.isRequired,
  rowsSelected: rowsSelectedPropType.isRequired,
  rowsToUse: rowsPropType.isRequired,
  columnsOrder: columnsOrderPropType.isRequired,
  printText: textPropType,
  printTitleText: textPropType,
  printDescriptionText: textPropType,
  downloadSelectedRowsText: textPropType,
  downloadCurrentRowsText: textPropType,
  downloadAllRowsText: textPropType
};

const mapDispatchToProps = dispatch => {
  return {
    setRowsSelected: () => dispatch(setRowsSelectedAction([]))
  };
};

const mapStateToProps = state => {
  return {
    columnsOrder:
      state.datatableReducer.features.userConfiguration.columnsOrder,
    rowsSelected: state.datatableReducer.rowsSelected,
    columns: state.datatableReducer.data.columns,
    rowsToUse: state.datatableReducer.pagination.rowsToUse,
    rowsCurrentPage: state.datatableReducer.pagination.rowsCurrentPage,
    printText: state.textReducer.print,
    printTitleText: state.textReducer.printTitle,
    printDescriptionText: state.textReducer.printDescription,
    downloadSelectedRowsText: state.textReducer.downloadSelectedRows,
    downloadCurrentRowsText: state.textReducer.downloadCurrentRows,
    downloadAllRowsText: state.textReducer.downloadAllRows
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Print);
