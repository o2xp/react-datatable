import React from "react";
import DatePickerWrapper from "./DatePickerWrapper";
import TimePickerWrapper from "./TimePickerWrapper";
import DateTimePickerWrapper from "./DateTimePickerWrapper";
import TextFieldWrapper from "./TextFieldWrapper";
import SelectWrapper from "./SelectWrapper";
import BooleanWrapper from "./BooleanWrapper";
import {
  cellValPropType,
  valueVerificationPropType,
  rowIdPropType,
  columnIdPropType,
  setRowEditedPropType,
  valuesPropType,
  dateFormatPropType,
  typePropType,
  inputTypePropType
} from "../../../proptypes";

const CreateInput = ({
  cellVal,
  valueVerification,
  rowId,
  columnId,
  setRowEdited,
  values,
  dateFormat,
  type,
  inputType
}) => {
  switch (inputType) {
    case "datePicker":
      return (
        <DatePickerWrapper
          cellVal={cellVal}
          valueVerification={valueVerification}
          rowId={rowId}
          columnId={columnId}
          dateFormat={dateFormat}
          setRowEdited={setRowEdited}
        />
      );
    case "timePicker":
      return (
        <TimePickerWrapper
          cellVal={cellVal}
          valueVerification={valueVerification}
          rowId={rowId}
          columnId={columnId}
          dateFormat={dateFormat}
          setRowEdited={setRowEdited}
        />
      );
    case "dateTimePicker":
      return (
        <DateTimePickerWrapper
          cellVal={cellVal}
          valueVerification={valueVerification}
          rowId={rowId}
          columnId={columnId}
          dateFormat={dateFormat}
          setRowEdited={setRowEdited}
        />
      );
    case "select":
      return SelectWrapper({
        cellVal,
        values,
        rowId,
        dateFormat,
        columnId,
        setRowEdited
      });
    case "boolean":
      return BooleanWrapper({
        cellVal,
        rowId,
        columnId,
        setRowEdited
      });
    case "input":
    default:
      return (
        <TextFieldWrapper
          cellVal={cellVal}
          type={type}
          valueVerification={valueVerification}
          rowId={rowId}
          columnId={columnId}
          setRowEdited={setRowEdited}
        />
      );
  }
};

CreateInput.propTypes = {
  cellVal: cellValPropType.isRequired,
  valueVerification: valueVerificationPropType,
  rowId: rowIdPropType.isRequired,
  columnId: columnIdPropType.isRequired,
  setRowEdited: setRowEditedPropType,
  values: valuesPropType.isRequired,
  dateFormat: dateFormatPropType.isRequired,
  type: typePropType.isRequired,
  inputType: inputTypePropType.isRequired
};

export default CreateInput;
