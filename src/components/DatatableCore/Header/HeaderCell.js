import React, { Component } from "react";
import {
  NumberWrapper,
  TextWrapper,
  BooleanWrapper,
  DateWrapper,
  TimeWrapper,
  DateTimeWrapper
} from "../CellTypes";
import { columnPropType, widthPropType } from "../../../proptypes";

class HeaderCell extends Component {
  buildHeaderCell = () => {
    const { width, column } = this.props;
    switch (column.dataType) {
      case "number":
        return <NumberWrapper style={{ width }}>{column.label}</NumberWrapper>;
      case "text":
        return <TextWrapper style={{ width }}>{column.label}</TextWrapper>;
      case "boolean":
        return (
          <BooleanWrapper style={{ width }}>{column.label}</BooleanWrapper>
        );
      case "date":
        return <DateWrapper style={{ width }}>{column.label}</DateWrapper>;
      case "time":
        return <TimeWrapper style={{ width }}>{column.label}</TimeWrapper>;
      case "dateTime":
        return (
          <DateTimeWrapper style={{ width }}>{column.label}</DateTimeWrapper>
        );
      default:
        return <TextWrapper style={{ width }}>{column.label}</TextWrapper>;
    }
  };

  render() {
    return <div className="Table-Header-Cell">{this.buildHeaderCell()}</div>;
  }
}

HeaderCell.propTypes = {
  column: columnPropType.isRequired,
  width: widthPropType.isRequired
};

export default HeaderCell;
