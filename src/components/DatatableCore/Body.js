import React, { Component } from "react";
import { connect } from "react-redux";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { rowsPropType } from "../proptypes/proptypes";

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rows } = this.props;
    return (
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.id}>
            {Object.keys(row).map((key, id) => (
              <TableCell
                key={key}
                align={id > 0 ? "right" : "left"}
                component={id === 0 ? "th" : undefined}
                scope={id === 0 ? "row" : undefined}
              >
                <div>{row[key]}</div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    );
  }
}

Body.propTypes = {
  rows: rowsPropType
};

const mapStateToProps = state => {
  return {
    rows: state.datatableReducer.data.rows
  };
};

export default connect(mapStateToProps)(Body);
