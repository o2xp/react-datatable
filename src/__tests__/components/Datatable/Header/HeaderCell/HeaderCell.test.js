import React, { useState } from "react";
import { mount } from "enzyme";
import HeaderCell from "../../../../../components/Datatable/Header/HeaderCell";
import {sortRowsByLabel} from "../../../../../components/Datatable/Datatable"
import storyOptionsSample, {
  columnsParams,
  rowsActions
} from "../../../../../../stories/Samples/storyOptionsSample";
import IconButton from "@material-ui/core/IconButton";

describe("Header component should", () => {
  it("mount & display", () => {
    const sortOptions = { columns: [], order: [] };
    const updateColumnsOrder = jest.fn();
    const setSortOptions = jest.fn();

    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <HeaderCell
        {...{
          column: { totalWidthRatio: 0.2, label: "test", colSize: 100 },
          sortFunction: col => sortRowsByLabel(col, sortOptions, setSortOptions),
          sortingOrder: "Asc",
          totalWidth: 100
        }}
      />,
      {
        attachTo: window.domNode
      }
    );

    expect(wrapper.find(HeaderCell)).toHaveLength(1);
    wrapper
      .find(IconButton)
      .first()
      .simulate("click");
    expect(setSortOptions).toHaveBeenCalled();
  });
});
