import React, { useState } from "react";
import { mount } from "enzyme";
import Header from "../../../../components/Datatable/Header";

import storyOptionsSample, {
  columnsParams,
  rowsActions
} from "../../../../../stories/Samples/storyOptionsSample";

describe("Header component should", () => {
  it("mount & display", () => {
    const sortOptions = { columns: [], order: [] };
    const checkedAll = { oneOrMore: false, all: false };
    const toggleCheckedAll = jest.fn();
    const updateColumnsOrder = jest.fn();
    const setSortOptions = jest.fn();
    const setCheckedAll = jest.fn();

    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <Header
        {...{
          columnsData: columnsParams,
          updateColumnsOrder,
          sortingOptions: sortOptions,
          editable: false,
          width: 500,
          checkedAll,
          toggleCheckedAll,
          rowsActions,
          minWidth: 500
        }}
      />,
      {
        attachTo: window.domNode
      }
    );

    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(".header").first()).toHaveLength(1);
  });
});
