import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";

import Datatable from "../../../components/Datatable/index";
import storyOptionsSample, {
  columnsParams,
  rowsActions
} from "../../../../stories/Samples/storyOptionsSample";
import Checkbox from "@material-ui/core/Checkbox";

describe("Datatable component should", () => {
  it("mount & display check all", () => {
    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <Datatable
        rowsData={storyOptionsSample.data.rows}
        columnsData={columnsParams}
        editable={false}
        rowsActions={rowsActions}
      />,
      {
        attachTo: window.domNode
      }
    );

    expect(wrapper.find(Datatable)).toHaveLength(1);
    expect(wrapper.find(".datatable").first()).toHaveLength(1);
    let box = wrapper.find(Checkbox).first();
    act(() => {
      box.props().onChange({ target: { checked: true } });
    });
    wrapper.update();
    expect(wrapper.find(Checkbox).get(0).props.checked).toEqual(true);
    expect(wrapper.find(Checkbox).get(1).props.checked).toEqual(true);
    expect(wrapper.find(Checkbox).get(2).props.checked).toEqual(true);

    act(() => {
      box.props().onChange({ target: { checked: false } });
    });
    wrapper.update();
    expect(wrapper.find(Checkbox).get(0).props.checked).toEqual(false);
    expect(wrapper.find(Checkbox).get(1).props.checked).toEqual(false);
    expect(wrapper.find(Checkbox).get(2).props.checked).toEqual(false);

    act(() => {
      wrapper
        .find(Checkbox)
        .get(1)
        .props.onChange({ target: { checked: true } });
    });
    wrapper.update();
    expect(wrapper.find(Checkbox).get(0).props.checked).toEqual(true);
    expect(wrapper.find(Checkbox).get(1).props.checked).toEqual(true);
    expect(wrapper.find(Checkbox).get(2).props.checked).toEqual(false);
  });
});
