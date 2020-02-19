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
  keyColumnPropType,
  columnsOrderPropType
} from "../../../proptypes";
import { setRowsSelected as setRowsSelectedAction } from "../../../redux/actions/datatableActions";
import Transition from "./Transition";

const Json2csvParser = require("json2csv").Parser;

export class DownloadData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      fileType: "csv",
      fileName: "my-data",
      columnsDisplayed: false
    };
  }

  download = type => {
    const {
      rows,
      columns,
      rowsCurrentPage,
      rowsSelected,
      setRowsSelected,
      columnsOrder,
      keyColumn
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
        data = rows;
        break;
    }

    const dataReturned = cloneDeep(data);

    dataReturned.forEach(el => {
      const newEl = el;
      if (columnsDisplayed) {
        Object.keys(newEl).forEach(key => {
          if (key !== keyColumn && !columnsOrder.includes(key)) {
            delete newEl[key];
          }
        });
      } else {
        delete newEl.editableId;
      }
      return newEl;
    });

    const hiddenElement = document.createElement("a");

    if (fileType === "csv") {
      const json2csvParser = new Json2csvParser({ columns });
      const csv = json2csvParser.parse(dataReturned);
      hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
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
    this.setState({ dialogOpen: bool, columnsDisplayed: false });
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
  rowsSelected: rowsSelectedPropType.isRequired,
  isRefreshing: isRefreshingPropType.isRequired,
  columnsOrder: columnsOrderPropType.isRequired,
  keyColumn: keyColumnPropType.isRequired,
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
    keyColumn: state.datatableReducer.keyColumn,
    isRefreshing: state.datatableReducer.isRefreshing,
    columns: state.datatableReducer.data.columns,
    rows: state.datatableReducer.data.rows,
    rowsCurrentPage: state.datatableReducer.pagination.rowsCurrentPage,
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
