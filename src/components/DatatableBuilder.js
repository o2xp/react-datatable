import React, { Component, Fragment } from "react";
import { Table } from "@material-ui/core";
import { connect } from "react-redux";
import Header from "./DatatableCore/Header";
import Body from "./DatatableCore/Body";
import { dataPropType } from "./proptypes/proptypes";

class DatatableBuilder extends Component {
  render() {
    const { data } = this.props;
    return (
      <Fragment>
        {data.columns.length > 0 && data.rows.length > 0 && (
          <Table>
            <Header />
            <Body />
          </Table>
        )}
        {(data.columns.length === 0 || data.rows.length === 0) && (
          <div id="no-rows">There is no data yet</div>
        )}
      </Fragment>
    );
  }
}

DatatableBuilder.propTypes = {
  data: dataPropType
};

const mapStateToProps = state => {
  return {
    data: state.datatableReducer.data
  };
};

export default connect(mapStateToProps)(DatatableBuilder);
