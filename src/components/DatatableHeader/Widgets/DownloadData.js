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
  Button,
  Select,
  MenuItem,
  Input
} from "@material-ui/core";
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
  setRowsSelectedPropType
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
      fileName: "my-data"
    };
  }

  download = type => {
    const {
      rows,
      columns,
      rowsCurrentPage,
      rowsSelected,
      setRowsSelected
    } = this.props;
    const { fileType, fileName } = this.state;

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

    const hiddenElement = document.createElement("a");

    if (fileType === "csv") {
      const json2csvParser = new Json2csvParser({ columns });
      const csv = json2csvParser.parse(data);
      hiddenElement.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
      hiddenElement.target = "_blank";
      hiddenElement.download = `${fileName}.csv`;
    } else {
      hiddenElement.href = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data)
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
    const { rowsSelected, rows, isRefreshing } = this.props;
    const { dialogOpen, fileType, fileName } = this.state;
    const disabled = rows.length === 0 || isRefreshing;
    return (
      <Fragment>
        <Tooltip
          TransitionComponent={Zoom}
          title={disabled ? "No data to download" : "Download data"}
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
            Download Data
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
              Data will be exported in {fileType} file
            </DialogContentText>
            <br />
            <Input
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
            >
              <MenuItem value="csv">.csv</MenuItem>
              <MenuItem value="json">.json</MenuItem>
            </Select>
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
              Rows selected
            </Button>
            <Button
              className="rows-current-page"
              onClick={() => this.download("current")}
              variant="contained"
              size="small"
              color="primary"
            >
              Rows of current page
            </Button>
            <Button
              className="all-rows"
              onClick={() => this.download("all")}
              variant="contained"
              size="small"
              color="primary"
            >
              All rows
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
  setRowsSelected: setRowsSelectedPropType
};

const mapDispatchToProps = dispatch => {
  return {
    setRowsSelected: () => dispatch(setRowsSelectedAction([]))
  };
};

const mapStateToProps = state => {
  return {
    rowsSelected: state.datatableReducer.rowsSelected,
    isRefreshing: state.datatableReducer.isRefreshing,
    columns: state.datatableReducer.data.columns,
    rows: state.datatableReducer.data.rows,
    rowsCurrentPage: state.datatableReducer.pagination.rowsCurrentPage
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadData);
