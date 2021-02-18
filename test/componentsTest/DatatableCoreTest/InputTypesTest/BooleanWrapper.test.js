import { mount } from "enzyme";
import { Checkbox } from "@material-ui/core";
import BooleanWrapper from "../../../../src/components/DatatableCore/InputTypes/BooleanWrapper";

const setRowEdited = jest.fn();
const booleanValue = {
  cellVal: true,
  rowId: "5cd9307025f4f0572995990f",
  columnId: "adult",
  setRowEdited: ({ rowId, columnId, newValue }) =>
    setRowEdited({ rowId, columnId, newValue })
};

describe("Boolean wrapper", () => {
  it("should render a Checkbox", () => {
    const wrapper = mount(BooleanWrapper(booleanValue));
    expect(wrapper.find(Checkbox)).toHaveLength(1);
  });

  it("should render a Checkbox that is checked", () => {
    const wrapper = mount(BooleanWrapper(booleanValue));
    expect(wrapper.find("input").props().checked).toBeTruthy();
  });

  it("should render a Checkbox that is not checked", () => {
    const wrapper = mount(BooleanWrapper({ ...booleanValue, cellVal: false }));
    expect(wrapper.find("input").props().checked).toBeFalsy();
  });

  it("should call setRowEdited onChange", () => {
    const wrapper = mount(BooleanWrapper(booleanValue));
    wrapper.find("input").simulate("change", { target: { checked: false } });
    const { rowId, columnId } = booleanValue;
    expect(setRowEdited).toHaveBeenCalled();
    expect(setRowEdited).toHaveBeenCalledWith({
      rowId,
      columnId,
      newValue: false
    });
  });
});
