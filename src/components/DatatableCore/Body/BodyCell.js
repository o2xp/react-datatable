import React, { Component } from "react";
import { connect } from "react-redux";
import twidth from "text-width";
import { Tooltip, Zoom } from "@material-ui/core";
import { setRowEdited as setRowEditedAction } from "../../../redux/actions/datatableActions";
import {
  columnPropType,
  cellValPropType,
  customDataTypesPropType,
  widthPropType,
  rowIdPropType,
  editingPropType,
  setRowEditedPropType,
  onClickPropType,
  isScrollingPropType,
  isLastLockedPropType,
  stylePropType,
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
      setRowEdited,
      onClick,
      style,
      isLastLocked,
      isScrolling
    } = this.props;
    const customDatatype = customDataTypes.find(
      cd => cd.dataType === column.dataType
    );
    const textWidth = twidth(cellVal, {
      family: font,
      size: 13
    });
    const overlap = textWidth + 5 > Number(width.split("px")[0]);
    let cellContent;
    const {
      inputType,
      dataType,
      values,
      valueVerification,
      dateFormatIn,
      dateFormatOut,
      mask
    } = column;
    const columnId = column.id;
    const properties = {
      cellVal,
      editing,
      inputType,
      values,
      rowId,
      columnId,
      valueVerification,
      dateFormatIn,
      dateFormatOut,
      mask,
      setRowEdited
    };

    if (customDatatype && !editing) {
      cellContent = customDatatype.component(cellVal, width);
    } else {
      switch (dataType) {
        case "number":
          cellContent = NumberType(properties);
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
        case "text":
        default:
          cellContent = TextType(properties);
          break;
      }
    }

    let className = "";
    switch (true) {
      case isLastLocked && isScrolling:
        className = `Table-Cell Table-Cell-${column.id}  scrolling-shadow`;
        break;
      case isLastLocked && !isScrolling:
        className = `Table-Cell Table-Cell-${column.id} no-scrolling-shadow`;
        break;
      default:
        className = `Table-Cell Table-Cell-${column.id} `;
        break;
    }

    return (
      <div
        className={className}
        onClick={() => onClick(cellVal)}
        onKeyDown={this.handleKeyDown}
        role="presentation"
        style={style}
      >
        <Tooltip
          arrow
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
  rowId: rowIdPropType.isRequired,
  editing: editingPropType.isRequired,
  isScrolling: isScrollingPropType.isRequired,
  isLastLocked: isLastLockedPropType.isRequired,
  style: stylePropType.isRequired,
  setRowEdited: setRowEditedPropType,
  onClick: onClickPropType,
  font: fontPropType
};

const mapStateToProps = state => {
  return {
    customDataTypes: state.customComponentsReducer.customDataTypes,
    isScrolling: state.datatableReducer.dimensions.isScrolling,
    font: state.datatableReducer.font
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRowEdited: ({ columnId, rowId, newValue, error }) =>
      dispatch(setRowEditedAction({ columnId, rowId, newValue, error }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyCell);
