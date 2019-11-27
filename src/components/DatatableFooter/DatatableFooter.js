import React, { Component } from "react";
import { connect } from "react-redux";
import { Select, MenuItem, IconButton } from "@material-ui/core";
import {
  NavigateNext as NavigateNextIcon,
  NavigateBefore as NavigateBeforeIcon
} from "@material-ui/icons";
import {
  paginationPropType,
  widthNumberPropType,
  rowsPerPagePropType,
  setPagePagePropType,
  setRowsPerPagePropType,
  textPropType
} from "../../proptypes";
import {
  setPage as setPageAction,
  setRowsPerPage as setRowsPerPageAction
} from "../../redux/actions/datatableActions";

class DatatableFooter extends Component {
  render() {
    const {
      width,
      rowsPerPage,
      pagination,
      setPage,
      setRowsPerPage,
      paginationRowsText,
      paginationPageText
    } = this.props;

    return (
      <div className="Footer" style={{ width }}>
        <div className="Footer-Element">
          {paginationRowsText} :
          <Select
            className="select-rowsPerPage"
            value={pagination.rowsPerPageSelected}
            onChange={e => setRowsPerPage(e.target.value)}
            disabled={
              rowsPerPage.available.length === 1 || pagination.pageTotal === 0
            }
          >
            {rowsPerPage.available.map(val => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div className="Footer-Element">
          {paginationPageText} :
          <Select
            className="select-page"
            value={pagination.pageSelected}
            onChange={e => setPage(e.target.value)}
            disabled={pagination.pageTotal === 1 || pagination.pageTotal === 0}
          >
            {Array.apply(null, { length: pagination.pageTotal })
              .map(Number.call, Number)
              .map(val => (
                <MenuItem key={val} value={val + 1}>
                  {val + 1}
                </MenuItem>
              ))}
          </Select>
        </div>

        <div className="Footer-Element">
          <IconButton
            className="previous-page"
            disabled={
              pagination.pageSelected === 1 || pagination.pageTotal === 0
            }
            onClick={() => setPage(pagination.pageSelected - 1)}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            className="next-page"
            disabled={
              pagination.pageSelected === pagination.pageTotal ||
              pagination.pageTotal === 0
            }
            onClick={() => setPage(pagination.pageSelected + 1)}
          >
            <NavigateNextIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

DatatableFooter.propTypes = {
  pagination: paginationPropType.isRequired,
  width: widthNumberPropType.isRequired,
  rowsPerPage: rowsPerPagePropType.isRequired,
  setPage: setPagePagePropType,
  setRowsPerPage: setRowsPerPagePropType,
  paginationRowsText: textPropType,
  paginationPageText: textPropType
};

const mapDispatchToProps = dispatch => {
  return {
    setPage: pageNumber => dispatch(setPageAction(pageNumber)),
    setRowsPerPage: rowsPerPage => dispatch(setRowsPerPageAction(rowsPerPage))
  };
};

const mapStateToProps = state => {
  return {
    width: state.datatableReducer.dimensions.datatable.widthNumber,
    pagination: state.datatableReducer.pagination,
    rowsPerPage: state.datatableReducer.features.rowsPerPage,
    paginationRowsText: state.textReducer.paginationRows,
    paginationPageText: state.textReducer.paginationPage
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatatableFooter);
