import React, { useState } from "react";
import { mount } from "enzyme";
import Header from "../../../../components/Datatable/Header";
import Body from "../../../../components/Datatable/Body";

import storyOptionsSample, {
  columnsParams,
  rowsActions
} from "../../../../../stories/Samples/storyOptionsSample.js";

describe("Header component should", () => {
  it("mount & display", () => {
    const updateRows = jest.fn();

    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <Body
        {...{
          width: 800,
          height: 500,
          rowsData: storyOptionsSample.data.rows,
          columnsData: columnsParams,
          updateRows,
          editable: false,
          rowsActions,
          minWidth: 400
        }}
      />,
      {
        attachTo: window.domNode
      }
    );

    expect(wrapper.find(Body)).toHaveLength(1);
  });
});
