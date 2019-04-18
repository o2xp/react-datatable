import React, { Component } from "react";
import { connect } from "react-redux";
import {
  columnPropType,
  cellValPropType,
  customDataTypesPropType,
  widthPropType
} from "../../../proptypes";
import {
  NumberType,
  TextType,
  BooleanType,
  DateType,
  TimeType,
  DateTimeType
} from "../CellTypes";

export class BodyCell extends Component {
  buildCell = () => {
    const { cellVal, column, customDataTypes, width } = this.props;
    const customDatatype = customDataTypes.find(
      cd => cd.dataType === column.dataType
    );

    let cellContent = null;

    if (customDatatype) {
      cellContent = customDatatype.component(cellVal, width);
    } else {
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
    }

    return <div style={{ width }}>{cellContent}</div>;
  };

  render() {
    return <div className="Table-Cell">{this.buildCell()}</div>;
  }
}

BodyCell.propTypes = {
  cellVal: cellValPropType.isRequired,
  column: columnPropType.isRequired,
  customDataTypes: customDataTypesPropType.isRequired,
  width: widthPropType.isRequired
};

const mapStateToProps = state => {
  return {
    customDataTypes: state.customComponentsReducer.customDataTypes
  };
};

export default connect(mapStateToProps)(BodyCell);
