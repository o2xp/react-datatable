import React from "react";
import { mount } from "enzyme";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import DatePickerWrapper, {
  DatePickerWrapper as DatePickerWrapperPureComponent
} from "../../../../src/components/DatatableCore/InputTypes/DatePickerWrapper";
import { customVariant } from "../../../../src/components/MuiTheme";
import { moment, locale } from "../../../../src/moment.config";

const setRowEdited = jest.fn();
const valueVerification = val => {
  if (new Date("May 17, 2019").getTime() < new Date(val).getTime()) {
    return {
      error: true,
      message: "Date can't be in futur"
    };
  }
  return {
    error: false,
    message: ""
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

  describe("should render a Tootltip and DatePicker", () => {
    it("with value", () => {
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <DatePickerWrapper
            cellVal="2000-05-17"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
          />
        </MuiPickersUtilsProvider>
      );
      expect(wrapper.find("Tooltip")).toHaveLength(1);
      expect(wrapper.find(DatePicker)).toHaveLength(1);
    });

    it("without value", () => {
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <DatePickerWrapper
            cellVal=""
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
          />
        </MuiPickersUtilsProvider>
      );
      expect(wrapper.find("Tooltip")).toHaveLength(1);
      expect(wrapper.find(DatePicker)).toHaveLength(1);
    });
  });

  describe("onValueChange", () => {
    it("should setState", () => {
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <DatePickerWrapperPureComponent
            cellVal="2015-05-17"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper
        .find(DatePicker)
        .props()
        .onChange(moment("2050-05-17"));
      expect(wrapper.state()).toEqual({
        tooltipOpen: true,
        message: "Date can't be in futur",
        error: true
      });
    });

    it("should update state", () => {
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <DatePickerWrapperPureComponent
            cellVal="2017-05-17"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper.instance().onDateChange(moment("2017-08-17"));
      expect(wrapper.state()).toEqual({
        tooltipOpen: false,
        message: "",
        error: false
      });
      wrapper.instance().onDateChange(moment("2019-05-20"));
      expect(wrapper.state()).toEqual({
        tooltipOpen: true,
        message: "Date can't be in futur",
        error: true
      });
    });
  });

  describe("toggleTooltip", () => {
    it("should set tooltipOpen to false on picker open", () => {
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <DatePickerWrapperPureComponent
            cellVal="2048-05-17"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper
        .find(DatePicker)
        .props()
        .onOpen();
      expect(wrapper.state()).toEqual({
        tooltipOpen: false,
        message: "Date can't be in futur",
        error: true
      });
    });

    it("should set tooltipOpen to false on onClickAway", () => {
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <DatePickerWrapperPureComponent
            cellVal="2019-05-17"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper
        .find("ClickAwayListener")
        .props()
        .onClickAway();
      expect(wrapper.state()).toEqual({
        tooltipOpen: false,
        message: "Date can't be in futur",
        error: true
      });
    });

    it("should set tooltipOpen", () => {
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <DatePickerWrapperPureComponent
            cellVal="2022-05-17"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper.instance().toggleTooltip(false);
      expect(wrapper.state()).toEqual({
        tooltipOpen: false,
        message: "Date can't be in futur",
        error: true
      });
      wrapper.instance().toggleTooltip(true);
      expect(wrapper.state()).toEqual({
        tooltipOpen: true,
        message: "Date can't be in futur",
        error: true
      });
    });

    it("should not set tooltipOpen if there is no error", () => {
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <DatePickerWrapperPureComponent
            cellVal="2019-05-16"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper.instance().toggleTooltip(true);
      expect(wrapper.state()).toEqual({
        tooltipOpen: false,
        message: "",
        error: false
      });
    });
  });

  describe("componentDidMount should be called", () => {
    it("with valueVerification", () => {
      const spy = jest.spyOn(
        DatePickerWrapperPureComponent.prototype,
        "componentDidMount"
      );
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <DatePickerWrapperPureComponent
            cellVal="2018-05-17"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalled();
    });

    it("without valueVerification", () => {
      const spy = jest.spyOn(
        DatePickerWrapperPureComponent.prototype,
        "componentDidMount"
      );
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <DatePickerWrapperPureComponent
            cellVal="2015-05-17"
            columnId="birthDate"
            rowId={rowId}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper.instance().forceUpdate();
      expect(spy).toHaveBeenCalled();
    });
  });
});
