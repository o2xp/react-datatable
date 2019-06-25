import React from "react";
import { mount } from "enzyme";
import TextFieldWrapper, {
  TextFieldWrapper as TextFieldWrapperPureComponent
} from "../../../../src/components/DatatableCore/InputTypes/TextFieldWrapper";
import { customVariant } from "../../../../src/components/MuiTheme";

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

const rowId = "5cd9307025f4f0572995990f";

describe("Select wrapper", () => {
  global.document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: "BODY",
      ownerDocument: document
    }
  });

  it("should render a Tootltip and Input and MaskedInput", () => {
    const wrapper = mount(
      <TextFieldWrapper
        cellVal={10}
        type="number"
        columnId="age"
        rowId={rowId}
        valueVerification={valueVerification}
        setRowEdited={setRowEdited}
        mask={[
          "(",
          /[1-9]/,
          /\d/,
          /\d/,
          ")",
          " ",
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]}
      />
    );
    expect(wrapper.find("Tooltip")).toHaveLength(1);
    expect(wrapper.find("Input")).toHaveLength(1);
  });

  it("should render a Tootltip and Input", () => {
    const wrapper = mount(
      <TextFieldWrapper
        cellVal={10}
        type="number"
        columnId="age"
        rowId={rowId}
        valueVerification={valueVerification}
        setRowEdited={setRowEdited}
      />
    );
    expect(wrapper.find("Tooltip")).toHaveLength(1);
    expect(wrapper.find("Input")).toHaveLength(1);
  });

  describe("onValueChange", () => {
    it("should be called on textfield value change", () => {
      const wrapper = mount(
        <TextFieldWrapperPureComponent
          cellVal={10}
          type="number"
          columnId="age"
          rowId={rowId}
          valueVerification={valueVerification}
          setRowEdited={setRowEdited}
          classes={{ customVariant }}
        />
      );
      const spy = jest.spyOn(wrapper.instance(), "onValueChange");
      wrapper.instance().forceUpdate();

      wrapper.find("input").simulate("change", { target: { value: 50 } });
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(50);
    });

    it("with good value", () => {
      const wrapper = mount(
        <TextFieldWrapperPureComponent
          cellVal={10}
          type="number"
          columnId="age"
          rowId={rowId}
          valueVerification={valueVerification}
          setRowEdited={setRowEdited}
          classes={{ customVariant }}
        />
      );
      wrapper.instance().onValueChange(75);
      expect(wrapper.state()).toEqual({
        tooltipOpen: false,
        message: "",
        error: false
      });
    });

    it("with error value", () => {
      const wrapper = mount(
        <TextFieldWrapperPureComponent
          cellVal={10}
          type="number"
          columnId="age"
          rowId={rowId}
          valueVerification={valueVerification}
          setRowEdited={setRowEdited}
          classes={{ customVariant }}
        />
      );
      wrapper.instance().onValueChange(150);
      expect(wrapper.state()).toEqual({
        tooltipOpen: true,
        message: "Value is too big",
        error: true
      });
    });
  });

  describe("toggleTooltip", () => {
    it("should be called on textfield focus", () => {
      const wrapper = mount(
        <TextFieldWrapperPureComponent
          cellVal={10}
          type="number"
          columnId="age"
          rowId={rowId}
          valueVerification={valueVerification}
          setRowEdited={setRowEdited}
          classes={{ customVariant }}
        />
      );
      const spy = jest.spyOn(wrapper.instance(), "toggleTooltip");
      wrapper.instance().forceUpdate();

      wrapper.find("input").simulate("focus");
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(true);
    });

    it("should set tooltipOpen to true", () => {
      const wrapper = mount(
        <TextFieldWrapperPureComponent
          cellVal={150}
          type="number"
          columnId="age"
          rowId={rowId}
          valueVerification={valueVerification}
          setRowEdited={setRowEdited}
          classes={{ customVariant }}
        />
      );
      wrapper.instance().toggleTooltip(true);
      expect(wrapper.state()).toEqual({
        tooltipOpen: true,
        message: "Value is too big",
        error: true
      });
    });

    it("should set tooltipOpen to false", () => {
      const wrapper = mount(
        <TextFieldWrapperPureComponent
          cellVal={10}
          type="number"
          columnId="age"
          rowId={rowId}
          valueVerification={valueVerification}
          setRowEdited={setRowEdited}
          classes={{ customVariant }}
        />
      );
      wrapper.instance().toggleTooltip(false);
      expect(wrapper.state()).toEqual({
        tooltipOpen: false,
        message: "",
        error: false
      });
    });
  });

  describe("on textfield blur should set tooltipOpen to false", () => {
    it("should be called on textfield focus", () => {
      const wrapper = mount(
        <TextFieldWrapperPureComponent
          cellVal={150}
          type="number"
          columnId="age"
          rowId={rowId}
          valueVerification={valueVerification}
          setRowEdited={setRowEdited}
          classes={{ customVariant }}
        />
      );
      wrapper.find("input").simulate("blur");
      expect(wrapper.state()).toEqual({
        tooltipOpen: false,
        message: "Value is too big",
        error: true
      });
    });
  });

  describe("componentDidMount should be called", () => {
    it("with valueVerification", () => {
      const spy = jest.spyOn(
        TextFieldWrapperPureComponent.prototype,
        "componentDidMount"
      );
      const wrapper = mount(
        <TextFieldWrapperPureComponent
          cellVal={150}
          type="number"
          columnId="age"
          rowId={rowId}
          valueVerification={valueVerification}
          setRowEdited={setRowEdited}
          classes={{ customVariant }}
        />
      );
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalled();
    });

    it("without valueVerification", () => {
      const spy = jest.spyOn(
        TextFieldWrapperPureComponent.prototype,
        "componentDidMount"
      );
      const wrapper = mount(
        <TextFieldWrapperPureComponent
          cellVal={150}
          type="number"
          columnId="age"
          rowId={rowId}
          setRowEdited={setRowEdited}
          classes={{ customVariant }}
        />
      );
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalled();
    });
  });
});
