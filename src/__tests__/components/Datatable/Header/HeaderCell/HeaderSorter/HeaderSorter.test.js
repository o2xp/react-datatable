import React from "react";
import { mount } from "enzyme";
import HeaderSorter from "../../../../../../components/Datatable/Header/HeaderCell/HeaderSorter";
import IconButton from "@material-ui/core/IconButton";

describe("Header component should", () => {
  it("mount & display", () => {
    const orderBy = jest.fn();

    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <HeaderSorter
        {...{
          sortingInfos: { order: "asc", position: "2" },
          orderBy
        }}
      />,
      {
        attachTo: window.domNode
      }
    );

    expect(wrapper.find(HeaderSorter)).toHaveLength(1);
    wrapper
      .find(IconButton)
      .first()
      .simulate("click");
    expect(orderBy).toHaveBeenCalled();
  });
});
