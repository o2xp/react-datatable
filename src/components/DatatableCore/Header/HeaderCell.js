import React, { Component } from "react";
import { TableCell } from "@material-ui/core";
import {
  NumberWrapper,
  TextWrapper,
  BooleanWrapper,
  DateWrapper,
  TimeWrapper,
  DateTimeWrapper
} from "../CellTypes";
import { columnPropType } from "../../../proptypes";

class HeaderCell extends Component {
  buildHeaderCell = () => {
    const { column } = this.props;
    switch (column.dataType) {
      case "number":
        return <NumberWrapper>{column.label}</NumberWrapper>;
      case "text":
        return <TextWrapper>{column.label}</TextWrapper>;
      case "boolean":
        return <BooleanWrapper>{column.label}</BooleanWrapper>;
      case "date":
        return <DateWrapper>{column.label}</DateWrapper>;
      case "time":
        return <TimeWrapper>{column.label}</TimeWrapper>;
      case "dateTime":
        return <DateTimeWrapper>{column.label}</DateTimeWrapper>;
      default:
        return <TextWrapper>{column.label}</TextWrapper>;
    }
  };

  render() {
    return <TableCell>{this.buildHeaderCell()}</TableCell>;
  }
}

HeaderCell.propTypes = {
  column: columnPropType.isRequired
};

export default HeaderCell;
