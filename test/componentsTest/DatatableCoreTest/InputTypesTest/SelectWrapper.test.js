import { mount } from "enzyme";
import SelectWrapper from "../../../../src/components/DatatableCore/InputTypes/SelectWrapper";

const setRowEdited = jest.fn();
const selectValue = {
  cellVal: "green",
  rowId: "5cd9307025f4f0572995990f",
  columnId: "eyeColor",
  setRowEdited: ({ rowId, columnId, newValue }) =>
    setRowEdited({ rowId, columnId, newValue }),
  values: ["green", "blue", "brown"]
};

const selectValueDateFormat = {
  cellVal: "2017-06-02T11:22",
  rowId: "5cd9307025f4f0572995990f",
  columnId: "birthDate",
  setRowEdited: ({ rowId, columnId, newValue }) =>
    setRowEdited({ rowId, columnId, newValue }),
  values: ["2017-06-02T11:22", "1944-12-08T04:35", "1965-02-12T18:38"],
  dateFormat: "YYYY-MM-DDTHH:mm"
};

describe("Select wrapper", () => {
  it("should render a Select", () => {
    const wrapper = mount(SelectWrapper(selectValue));
    expect(wrapper.find("Select")).toHaveLength(1);
  });

  it("should call setRowEdited onChange", () => {
    const wrapper = mount(SelectWrapper(selectValue));
    wrapper
      .find("Select")
      .props()
      .onChange({ target: { value: "brown" } });
    const { rowId, columnId } = selectValue;
    expect(setRowEdited).toHaveBeenCalled();
    expect(setRowEdited).toHaveBeenCalledWith({
      rowId,
      columnId,
      newValue: "brown"
    });
  });

  it("should call setRowEdited onChange with formated date", () => {
    const wrapper = mount(SelectWrapper(selectValueDateFormat));
    wrapper
      .find("Select")
      .props()
      .onChange({ target: { value: "1944-12-08T04:35" } });
    const { rowId, columnId } = selectValueDateFormat;
    expect(setRowEdited).toHaveBeenCalled();
    expect(setRowEdited).toHaveBeenCalledWith({
      rowId,
      columnId,
      newValue: "1944-12-08T04:35"
    });
  });
});
