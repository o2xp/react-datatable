import React from "react";
import { mount } from "enzyme";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { Tooltip } from "@material-ui/core";
import MomentUtils from "@date-io/moment";
import TimePickerWrapper, {
  TimePickerWrapper as TimePickerWrapperPureComponent
} from "../../../../src/components/DatatableCore/InputTypes/TimePickerWrapper";
import { customVariant } from "../../../../src/components/MuiTheme";
import { moment, locale } from "../../../../src/moment.config";

const setRowEdited = jest.fn();
const valueVerification = val => {
  if (new Date("May 17, 2019 20:00:00").getTime() < new Date(val).getTime()) {
    return {
      error: true,
      message: "Hour can't be after 8pm"
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

  describe("should render a Tootltip and TimePicker", () => {
    it("with value", () => {
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <TimePickerWrapper
            cellVal="2019-05-17T11:25"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
          />
        </MuiPickersUtilsProvider>
      );
      expect(wrapper.find(Tooltip)).toHaveLength(1);
      expect(wrapper.find(TimePicker)).toHaveLength(1);
    });

    it("without value", () => {
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <TimePickerWrapper
            cellVal=""
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
          />
        </MuiPickersUtilsProvider>
      );
      expect(wrapper.find(Tooltip)).toHaveLength(1);
      expect(wrapper.find(TimePicker)).toHaveLength(1);
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
          <TimePickerWrapperPureComponent
            cellVal="2019-05-17T11:22"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper
        .find(TimePicker)
        .props()
        .onChange(moment("2019-05-17T21:22"));
      expect(wrapper.state()).toEqual({
        tooltipOpen: true,
        message: "Hour can't be after 8pm",
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
          <TimePickerWrapperPureComponent
            cellVal="2019-05-17T01:22"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper.instance().onDateChange(moment("2019-05-17T10:27"));
      expect(wrapper.state()).toEqual({
        tooltipOpen: false,
        message: "",
        error: false
      });
      wrapper.instance().onDateChange(moment("2019-05-17T23:42"));
      expect(wrapper.state()).toEqual({
        tooltipOpen: true,
        message: "Hour can't be after 8pm",
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
          <TimePickerWrapperPureComponent
            cellVal="2019-05-17T23:45"
            columnId="birthDate"
            rowId={rowId}
            valueVerification={valueVerification}
            setRowEdited={setRowEdited}
            classes={{ customVariant }}
          />
        </MuiPickersUtilsProvider>
      ).children();
      wrapper
        .find(TimePicker)
        .props()
        .onOpen();
      expect(wrapper.state()).toEqual({
        tooltipOpen: false,
        message: "Hour can't be after 8pm",
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
          <TimePickerWrapperPureComponent
            cellVal="2019-05-17T21:22"
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
        message: "Hour can't be after 8pm",
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
          <TimePickerWrapperPureComponent
            cellVal="2019-05-17T22:22"
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
        message: "Hour can't be after 8pm",
        error: true
      });
      wrapper.instance().toggleTooltip(true);
      expect(wrapper.state()).toEqual({
        tooltipOpen: true,
        message: "Hour can't be after 8pm",
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
          <TimePickerWrapperPureComponent
            cellVal="2019-05-17T11:22"
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
        TimePickerWrapperPureComponent.prototype,
        "componentDidMount"
      );
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <TimePickerWrapperPureComponent
            cellVal="2019-05-17T11:22"
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
        TimePickerWrapperPureComponent.prototype,
        "componentDidMount"
      );
      const wrapper = mount(
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          locale={locale}
          moment={moment}
        >
          <TimePickerWrapperPureComponent
            cellVal="2019-05-17T11:22"
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
