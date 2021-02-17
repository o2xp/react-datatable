import { shallow, mount } from "enzyme";
import { Select, Checkbox } from "@material-ui/core";
import CreateInput from "../../../../src/components/DatatableCore/InputTypes/CreateInput";

const setRowEdited = jest.fn();
const value = {
  cellVal: "Morgan Dubois",
  rowId: "5cd9307025f4f0572995990f",
  columnId: "name",
  values: ["John Doe", "Jahn Dae", "Jyhn Dye"],
  type: "text",
  setRowEdited: ({ rowId, columnId, newValue }) =>
    setRowEdited({ rowId, columnId, newValue })
};

describe("CreateInput should render a", () => {
  it("DatePicker", () => {
    const wrapper = shallow(CreateInput({ ...value, inputType: "datePicker" }));
    expect(wrapper.find("DatePickerWrapper")).toHaveLength(1);
  });
  it("TimePicker", () => {
    const wrapper = shallow(CreateInput({ ...value, inputType: "timePicker" }));
    expect(wrapper.find("TimePickerWrapper")).toHaveLength(1);
  });
  it("DateTimePicker", () => {
    const wrapper = shallow(
      CreateInput({ ...value, inputType: "dateTimePicker" })
    );
    expect(wrapper.find("DateTimePickerWrapper")).toHaveLength(1);
  });
  it("Select", () => {
    const wrapper = mount(
      CreateInput({ ...value, cellVal: "John Doe", inputType: "select" })
    );
    expect(wrapper.find(Select)).toHaveLength(1);
  });
  it("Checkbox", () => {
    const wrapper = mount(
      CreateInput({ ...value, cellVal: true, inputType: "boolean" })
    );
    expect(wrapper.find(Checkbox)).toHaveLength(1);
  });
  it("TextField", () => {
    const wrapper = shallow(CreateInput({ ...value, inputType: "input" }));
    expect(wrapper.find("TextFieldWrapper")).toHaveLength(1);
  });
  it("TextField on default", () => {
    const wrapper = shallow(CreateInput(value));
    expect(wrapper.find("TextFieldWrapper")).toHaveLength(1);
  });
});
