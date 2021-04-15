import React, { useState } from "react";
import { mount } from "enzyme";
import Header from "../../../../../components/Datatable/Header";
import Row from "../../../../../components/Datatable/Body/Row";
import Checkbox from "@material-ui/core/Checkbox";

import storyOptionsSample, {
  columnsParams,
  rowsActions
} from "../../../../../../stories/Samples/storyOptionsSample";

describe("Header component should", () => {
  it("mount & display", () => {
    const updateRows = jest.fn();

    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <Row
        {...{
          style: {},
          index: 0,
          data: {
            rowsData: storyOptionsSample.data.rows,
            columnsData: columnsParams,
            updateRows,
            editable: true,
            totalWidth: 1000,
            rowsActions,
            effectiveWidth: 900
          }
        }}
      />,
      {
        attachTo: window.domNode
      }
    );

    expect(wrapper.find(Row)).toHaveLength(1);
    let box = wrapper.find(Checkbox).first();
    box.props().onChange({ target: { checked: true } });
    wrapper.update();
  });
});
