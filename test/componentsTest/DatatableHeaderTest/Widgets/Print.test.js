import React from "react";
import { mount } from "enzyme";
import Print from "../../../../src/components/DatatableHeader/Widgets/Print";

describe("Print component", () => {
  afterAll(() => {
    window.print.mockClear();
  });

  it("click on icon should call function to print", () => {
    const wrapper = mount(<Print />);
    window.print = jest.fn();
    const spy = jest.spyOn(wrapper.instance(), "print");
    const button = wrapper.find("button.print-icon");
    button.simulate("click");
    expect(spy).toHaveBeenCalled();
  });
});
