import React, { Component } from "react";
import { TableCell } from "@material-ui/core";
import { connect } from "react-redux";
import { columnPropType, cellValPropType } from "../../proptypes/proptypes";
import {
  NumberType,
  TextType,
  BooleanType,
  DateType,
  TimeType,
  DateTimeType
} from "../CellTypes";

class BodyCell extends Component {
  buildCell = () => {
    const { cellVal, column, customDataTypes } = this.props;
    const customDatatype = customDataTypes.find(
      cd => cd.dataType === column.dataType
    );

    if (customDatatype) {
      return customDatatype.component(cellVal);
    }
    let cellContent = null;
    switch (column.dataType) {
      case "number":
        cellContent = NumberType(cellVal);
        break;
      case "text":
        cellContent = TextType(cellVal);
        break;
      case "boolean":
        cellContent = BooleanType(cellVal);
        break;
      case "date":
        cellContent = DateType(cellVal);
        break;
      case "time":
        cellContent = TimeType(cellVal);
        break;
      case "dateTime":
        cellContent = DateTimeType(cellVal);
        break;
      default:
        cellContent = TextType(cellVal);
        break;
    }
    return <TableCell>{cellContent}</TableCell>;
  };

  render() {
    return this.buildCell();
  }
}

BodyCell.propTypes = {
  cellVal: cellValPropType,
  column: columnPropType.isRequired
};

const mapStateToProps = state => {
  return {
    customDataTypes: state.customComponentsReducer.customDataTypes
  };
};

export default connect(mapStateToProps)(BodyCell);
