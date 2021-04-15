import React from "react";
import { mount } from "enzyme";
import { O2xpDatatable } from "../index";
import storyOptionsSample, {
  columnsParams,
  rowsActions
} from "../../stories/Samples/storyOptionsSample";

describe("O2xpDatatable component should", () => {
  it("mount & display", () => {
    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <O2xpDatatable
        rowsData={storyOptionsSample.data.rows}
        columnsData={columnsParams}
        editable={false}
        rowsActions={rowsActions}
      />,
      {
        attachTo: window.domNode
      }
    );

    expect(wrapper.find(O2xpDatatable)).toHaveLength(1);
    expect(wrapper.find(".o2xp-react-datatable").first()).toHaveLength(1);
  });
});
