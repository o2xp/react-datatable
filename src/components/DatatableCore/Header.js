import React, { Component } from "react";
import { connect } from "react-redux";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import { columnsPropType } from "../proptypes/proptypes";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { columns } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map((column, id) => (
            <TableCell key={column.id} align={id === 0 ? "left" : "right"}>
              <div>{column.label}</div>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

Header.propTypes = {
  columns: columnsPropType
};

const mapStateToProps = state => {
  return {
    columns: state.datatableReducer.data.columns
  };
};

export default connect(mapStateToProps)(Header);
