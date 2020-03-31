import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import {
  IconButton,
  Tooltip,
  Zoom,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Select,
  MenuItem,
  Input
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import {
  CloudDownload as CloudDownloadIcon,
  Close as CloseIcon
} from "@material-ui/icons";
import {
  rowsPropType,
  columnsPropType,
  rowsCurrentPagePropType,
  rowsSelectedPropType,
  isRefreshingPropType,
  setRowsSelectedPropType,
  textPropType,
  columnsOrderPropType
} from "../../../proptypes";
import { setRowsSelected as setRowsSelectedAction } from "../../../redux/actions/datatableActions";
import Transition from "./Transition";

export class DownloadData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      fileType: "csv",
      fileName: "my-data",
      columnsDisplayed: true
    };
  }

  download = type => {
    const {
      columns,
      rowsCurrentPage,
      rowsSelected,
      setRowsSelected,
      columnsOrder,
      rowsToUse
    } = this.props;
    const { fileType, fileName, columnsDisplayed } = this.state;

    let data = null;
    switch (type) {
      case "selected":
        data = rowsSelected;
        break;
      case "current":
        data = rowsCurrentPage;
        break;
      default:
      case "all":
        data = rowsToUse;
        break;
    }

    const dataReturned = cloneDeep(data);

    dataReturned.forEach(el => {
      const newEl = el;
      if (columnsDisplayed) {
        Object.keys(newEl).forEach(key => {
          if (!columnsOrder.includes(key)) {
            delete newEl[key];
          }
        });
      } else {
        Object.keys(newEl).forEach(key => {
          if (!columns.map(col => col.id).includes(key)) {
            delete newEl[key];
          }
        });
      }
      return newEl;
    });

    const hiddenElement = document.createElement("a");

    if (fileType === "csv") {
      let cols = [];
      if (columnsDisplayed) {
        columnsOrder.forEach(col => {
          cols.push(columns.find(c => c.id === col));
        });
      } else {
        cols = columns.map(col => col);
      }
      cols = cols.filter(col => col.id !== "o2xpActions");

      const dataOrdered = dataReturned.map(dr => {
        const newObj = {};
        cols.forEach(col => {
          newObj[col.id] = dr[col.id];
        });
        return newObj;
      });

      cols = cols.map(col => col.label);

      const newRows = [cols, ...dataOrdered.map(row => Object.values(row))];
      const csvContent = newRows.map(e => e.join(",")).join("\n");

      hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(
        csvContent
      )}`;
      hiddenElement.target = "_blank";
      hiddenElement.download = `${fileName}.csv`;
    } else {
      hiddenElement.href = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(dataReturned)
      )}`;
      hiddenElement.target = "_blank";
      hiddenElement.download = `${fileName}.json`;
    }

    hiddenElement.click();
    this.setState({ dialogOpen: false });
    if (type === "selected") {
      setRowsSelected();
    }
  };

  toggleDialog = bool => {
    this.setState({ dialogOpen: bool });
  };

  setFileName = e => {
    this.setState({ fileName: e.target.value });
  };

  setFileType = e => {
    this.setState({ fileType: e.target.value });
  };

  render() {
    const {
      rowsSelected,
      rows,
      isRefreshing,
      downloadText,
      downloadTitleText,
      downloadDescriptionText,
      downloadSelectedRowsText,
      downloadCurrentRowsText,
      downloadAllRowsText
    } = this.props;
    const { dialogOpen, fileType, fileName, columnsDisplayed } = this.state;
    const disabled = rows.length === 0 || isRefreshing;
    return (
      <Fragment>
        <Tooltip
          TransitionComponent={Zoom}
          title={disabled ? "" : downloadText}
        >
          <span>
            <IconButton
              className={
                disabled
                  ? "disabled-icon download-data-icon"
                  : "download-data-icon"
              }
              onClick={() => this.toggleDialog(true)}
              disabled={disabled}
            >
              <CloudDownloadIcon color="primary" />
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
            {downloadTitleText}
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
              {downloadDescriptionText} {fileType}
            </DialogContentText>
            <br />
            <Input
              style={{ fontSize: "1rem", lineHeight: "1.1875em" }}
              inputProps={{ className: "input-fileName" }}
              label={fileName}
              value={fileName}
              error={!(fileName.split(" ").join("").length > 0)}
              onChange={e => this.setFileName(e)}
              onFocus={e => e.target.select()}
              autoFocus
            />
            <Select
              position="end"
              value={fileType}
              onChange={e => this.setFileType(e)}
              style={{ fontSize: "1rem", lineHeight: "1.1875em" }}
            >
              <MenuItem value="csv">.csv</MenuItem>
              <MenuItem value="json">.json</MenuItem>
            </Select>
            <br />
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
              onClick={() => this.download("selected")}
              variant="contained"
              size="small"
              color="primary"
              disabled={rowsSelected.length === 0}
            >
              {downloadSelectedRowsText}
            </Button>
            <Button
              className="rows-current-page"
              onClick={() => this.download("current")}
              variant="contained"
              size="small"
              color="primary"
            >
              {downloadCurrentRowsText}
            </Button>
            <Button
              className="all-rows"
              onClick={() => this.download("all")}
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

DownloadData.propTypes = {
  rows: rowsPropType.isRequired,
  columns: columnsPropType.isRequired,
  rowsCurrentPage: rowsCurrentPagePropType.isRequired,
  rowsToUse: rowsCurrentPagePropType.isRequired,
  rowsSelected: rowsSelectedPropType.isRequired,
  isRefreshing: isRefreshingPropType.isRequired,
  columnsOrder: columnsOrderPropType.isRequired,
  setRowsSelected: setRowsSelectedPropType,
  downloadText: textPropType,
  downloadTitleText: textPropType,
  downloadDescriptionText: textPropType,
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
    isRefreshing: state.datatableReducer.isRefreshing,
    columns: state.datatableReducer.data.columns,
    rows: state.datatableReducer.data.rows,
    rowsCurrentPage: state.datatableReducer.pagination.rowsCurrentPage,
    rowsToUse: state.datatableReducer.pagination.rowsToUse,
    downloadText: state.textReducer.download,
    downloadTitleText: state.textReducer.downloadTitle,
    downloadDescriptionText: state.textReducer.downloadDescription,
    downloadSelectedRowsText: state.textReducer.downloadSelectedRows,
    downloadCurrentRowsText: state.textReducer.downloadCurrentRows,
    downloadAllRowsText: state.textReducer.downloadAllRows
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadData);
