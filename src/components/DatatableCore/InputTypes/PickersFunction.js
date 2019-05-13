import { moment } from "../../../moment.config";

export const checkValue = ({ cellVal, mounting, valueVerification }) => {
  const { message, error } = valueVerification(cellVal);
  const newState = {
    message,
    error,
    tooltipOpen: mounting ? false : error
  };

  return newState;
};

export const setValue = ({
  date,
  value,
  dateFormat,
  rowId,
  columnId,
  setRowEdited,
  valueVerification
}) => {
  let cellVal = "";
  cellVal = date ? moment(date).format(dateFormat) : cellVal;
  cellVal = value || cellVal;

  let newState = {
    error: false,
    tooltipOpen: false,
    message: ""
  };
  if (valueVerification) {
    newState = checkValue({ cellVal, valueVerification });
  }
  const { error } = newState;
  setRowEdited({
    rowId,
    columnId,
    newValue: cellVal,
    error
  });

  return newState;
};
