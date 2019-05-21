import {
  checkValue,
  setValue
} from "../../../../src/components/DatatableCore/InputTypes/PickersFunction";
import { moment } from "../../../../src/moment.config";

const setRowEdited = jest.fn();
const valueVerification = val => {
  let error;
  let message;
  switch (true) {
    case val > 100:
      error = true;
      message = "Value is too big";
      break;
    default:
      error = false;
      message = "";
      break;
  }
  return {
    error,
    message
  };
};
const goodCheckValue = {
  cellVal: 10,
  mounting: false,
  valueVerification
};

const errorCheckValue = {
  cellVal: 101,
  mounting: false,
  valueVerification
};

const defaultSetValue = {
  value: 10,
  rowId: "5cd9307025f4f0572995990f",
  columnId: "age",
  setRowEdited
};

const dateSetValue = {
  date: moment().format("YYYY-MM-DDTHH:mm"),
  dateFormat: "YYYY-MM-DDTHH:mm",
  rowId: "5cd9307025f4f0572995990f",
  columnId: "age",
  setRowEdited
};

describe("PickersFunction", () => {
  describe("checkValue", () => {
    it("with good value", () => {
      const res = checkValue(goodCheckValue);
      const expectedRes = {
        message: "",
        error: false,
        tooltipOpen: false
      };
      expect(res).toEqual(expectedRes);
    });

    it("with error value", () => {
      const res = checkValue(errorCheckValue);
      const expectedRes = {
        message: "Value is too big",
        error: true,
        tooltipOpen: true
      };
      expect(res).toEqual(expectedRes);
    });

    it("with good value while mouting", () => {
      const res = checkValue({ ...goodCheckValue, mounting: true });
      const expectedRes = {
        message: "",
        error: false,
        tooltipOpen: false
      };
      expect(res).toEqual(expectedRes);
    });

    it("with error value while mouting", () => {
      const res = checkValue({ ...errorCheckValue, mounting: true });
      const expectedRes = {
        message: "Value is too big",
        error: true,
        tooltipOpen: false
      };
      expect(res).toEqual(expectedRes);
    });
  });

  describe("setValue", () => {
    it("with default value", () => {
      const res = setValue(defaultSetValue);
      const expectedRes = {
        message: "",
        error: false,
        tooltipOpen: false
      };
      expect(res).toEqual(expectedRes);
    });

    it("with default value and valueVerification", () => {
      const res = setValue({ ...defaultSetValue, valueVerification });
      const expectedRes = {
        message: "",
        error: false,
        tooltipOpen: false
      };
      expect(res).toEqual(expectedRes);
    });

    it("with default value and without valueVerification", () => {
      const res = setValue(dateSetValue);
      const expectedRes = {
        message: "",
        error: false,
        tooltipOpen: false
      };
      expect(res).toEqual(expectedRes);
    });
  });
});
