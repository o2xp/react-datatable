import React, { Component } from "react";
import { connect } from "react-redux";
import twidth from "text-width";
import { Tooltip, Zoom, TextField } from "@material-ui/core";
import { setRowEdited as setRowEditedAction } from "../../../redux/actions/datatableActions";
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
    const {
      cellVal,
      column,
      customDataTypes,
      width,
      font,
      rowId,
      editing,
      setRowEdited
    } = this.props;
    const customDatatype = customDataTypes.find(
      cd => cd.dataType === column.dataType
    );
    const textWidth = twidth(cellVal, {
      family: font,
      size: 15
    });
    const overlap = textWidth + 5 > Number(width.split("px")[0]);
    let cellContent;
    const { inputType, dataType, values, valueVerification } = column;
    const columnId = column.id;
    const properties = {
      cellVal,
      editing,
      inputType,
      values,
      rowId,
      columnId,
      valueVerification,
      setRowEdited
    };

    if (customDatatype && !editing) {
      cellContent = customDatatype.component(cellVal, width);
    } else {
      switch (dataType) {
        case "number":
          cellContent = NumberType(properties);
          break;
        case "text":
          cellContent = TextType(properties);
          break;
        case "boolean":
          cellContent = BooleanType(properties);
          break;
        case "date":
          cellContent = DateType(properties);
          break;
        case "time":
          cellContent = TimeType(properties);
          break;
        case "dateTime":
          cellContent = DateTimeType(properties);
          break;
        default:
          cellContent = TextType(properties);
          break;
      }
    }

    return (
      <div className={`Table-Cell ${column.id}`}>
        <Tooltip
          title={overlap && !editing ? cellVal : ""}
          TransitionComponent={Zoom}
          interactive
        >
          <div style={{ width }}>{cellContent}</div>
        </Tooltip>
      </div>
    );
  };

  render() {
    return this.buildCell();
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

const mapDispatchToProps = dispatch => {
  return {
    setRowEdited: ({ columnId, rowId, newValue }) =>
      dispatch(setRowEditedAction({ columnId, rowId, newValue }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BodyCell);
