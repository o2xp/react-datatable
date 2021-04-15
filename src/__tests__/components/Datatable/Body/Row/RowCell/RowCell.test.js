import React, { useState } from "react";
import { mount } from "enzyme";
import RowCell from "../../../../../../components/Datatable/Body/Row/RowCell";
import storyOptionsSample, {
  columnsParams
} from "../../../../../../../stories/Samples/storyOptionsSample";

describe("Header component should", () => {
  it("mount & display", () => {
    const updateRows = jest.fn();
    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <RowCell
        type={columnsParams.columns.birthdate.dataType}
        customFormat={columnsParams.columns.birthdate.customFormat}
      >
        {storyOptionsSample.data.rows[0].birthdate}
      </RowCell>,
      {
        attachTo: window.domNode
      }
    );

    expect(wrapper.find(RowCell)).toHaveLength(1);
  });
});
