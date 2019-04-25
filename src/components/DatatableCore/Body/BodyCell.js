import React, { Component } from "react";
import { connect } from "react-redux";
import twidth from "text-width";
import { Tooltip, Zoom } from "@material-ui/core";
import {
  columnPropType,
  cellValPropType,
  customDataTypesPropType,
  widthPropType,
  fontPropType
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
    const { cellVal, column, customDataTypes, width, font } = this.props;
    const customDatatype = customDataTypes.find(
      cd => cd.dataType === column.dataType
    );
    const textWidth = twidth(cellVal, {
      family: font,
      size: 15
    });
    const overlap = textWidth - 5 > Number(width.split("px")[0]);
    let cellContent;

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

    return (
      <Tooltip
        title={overlap ? cellVal : ""}
        TransitionComponent={Zoom}
        interactive
      >
        <div style={{ width }}>{cellContent}</div>
      </Tooltip>
    );
  };

  render() {
    return <div className="Table-Cell">{this.buildCell()}</div>;
  }
}

BodyCell.propTypes = {
  cellVal: cellValPropType,
  column: columnPropType.isRequired,
  customDataTypes: customDataTypesPropType.isRequired,
  width: widthPropType.isRequired,
  font: fontPropType
};

const mapStateToProps = state => {
  return {
    customDataTypes: state.customComponentsReducer.customDataTypes,
    font: state.datatableReducer.font
  };
};

export default connect(mapStateToProps)(BodyCell);
