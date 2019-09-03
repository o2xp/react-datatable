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
  maskPropType,
  inputTypePropType,
  labelPropType
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
  mask,
  inputType,
  label = ""
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
          label={label}
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
          label={label}
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
          label={label}
        />
      );
    case "select":
      return SelectWrapper({
        cellVal,
        values,
        rowId,
        dateFormat,
        columnId,
        setRowEdited,
        label
      });
    case "boolean":
      return BooleanWrapper({
        cellVal,
        rowId,
        columnId,
        setRowEdited,
        label
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
          mask={mask}
          label={label}
        />
      );
  }
};

CreateInput.propTypes = {
  cellVal: cellValPropType.isRequired,
  label: labelPropType,
  valueVerification: valueVerificationPropType,
  mask: maskPropType,
  rowId: rowIdPropType.isRequired,
  columnId: columnIdPropType.isRequired,
  setRowEdited: setRowEditedPropType,
  values: valuesPropType.isRequired,
  dateFormat: dateFormatPropType.isRequired,
  type: typePropType.isRequired,
  inputType: inputTypePropType.isRequired
};

export default CreateInput;
