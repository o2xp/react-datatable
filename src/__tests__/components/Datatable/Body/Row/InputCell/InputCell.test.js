import React, { useState } from "react";
import { mount } from "enzyme";
import InputCell from "../../../../../../components/Datatable/Body/Row/InputCell";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";

import storyOptionsSample, {
  columnsParams,
  rowsActions
} from "../../../../../../../stories/Samples/storyOptionsSample";

describe("Header component should", () => {
  it("mount & display string", () => {
    const updateCell = jest.fn();
    const rowData = storyOptionsSample.data.rows[0];
    const { id } = rowData;
    const { columns } = columnsParams;

    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <InputCell
        {...{
          id,
          keyName: "name",
          totalWidth: 1000,
          rowsActionsNumber: 1,
          itemsHeight: 50,
          dataToDisplay: rowData["name"],
          updateCell,
          column: columns["name"]
        }}
        key="name"
      />,
      {
        attachTo: window.domNode
      }
    );
    wrapper
      .find(TextField)
      .first()
      .props()
      .onChange({ target: { value: "test" } });
    wrapper.update();
    expect(updateCell).toHaveBeenCalled();

    expect(wrapper.find(InputCell)).toHaveLength(1);
  });
  it("mount & display number", () => {
    const updateCell = jest.fn();
    const rowData = storyOptionsSample.data.rows[0];
    const { id } = rowData;
    const { columns } = columnsParams;

    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <InputCell
        {...{
          id,
          keyName: "age",
          totalWidth: 1000,
          rowsActionsNumber: 1,
          itemsHeight: 50,
          dataToDisplay: rowData["age"],
          updateCell,
          column: columns["age"]
        }}
        key="age"
      />,
      {
        attachTo: window.domNode
      }
    );

    wrapper
      .find(TextField)
      .first()
      .props()
      .onChange({ target: { value: 54 } });
    wrapper.update();
    expect(updateCell).toHaveBeenCalled();

    expect(wrapper.find(InputCell)).toHaveLength(1);
  });
  it("mount & display date", () => {
    const updateCell = jest.fn();
    const rowData = storyOptionsSample.data.rows[0];
    const { id } = rowData;
    const { columns } = columnsParams;

    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <InputCell
        {...{
          id,
          keyName: "birthdate",
          totalWidth: 1000,
          rowsActionsNumber: 1,
          itemsHeight: 50,
          dataToDisplay: rowData["birthdate"],
          updateCell,
          column: columns["birthdate"]
        }}
        key="birthdate"
      />,
      {
        attachTo: window.domNode
      }
    );

    wrapper
      .find(TextField)
      .first()
      .props()
      .onChange({ target: { value: "29/12/2019" } });
    wrapper.update();
    expect(updateCell).toHaveBeenCalled();

    expect(wrapper.find(InputCell)).toHaveLength(1);
  });
  it("mount & display boolean", () => {
    const updateCell = jest.fn();
    const rowData = storyOptionsSample.data.rows[0];
    const { id } = rowData;
    const { columns } = columnsParams;
    columns["adult"].editComponent = undefined; // not using custom component

    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <InputCell
        {...{
          id,
          keyName: "adult",
          totalWidth: 1000,
          rowsActionsNumber: 1,
          itemsHeight: 50,
          dataToDisplay: rowData["adult"],
          updateCell,
          column: columns["adult"]
        }}
        key="adult"
      />,
      {
        attachTo: window.domNode
      }
    );
    wrapper
      .find(Checkbox)
      .first()
      .props()
      .onChange({ target: { checked: false } });
    wrapper.update();
    expect(updateCell).toHaveBeenCalled();
    expect(wrapper.find(InputCell)).toHaveLength(1);
  });
  it("mount & display multi select", () => {
    const updateCell = jest.fn();
    const rowData = storyOptionsSample.data.rows[0];
    const { id } = rowData;
    const { columns } = columnsParams;

    const div = document.createElement("div");
    window.domNode = div;
    document.body.appendChild(div);
    const wrapper = mount(
      <InputCell
        {...{
          id,
          keyName: "eyecolor",
          totalWidth: 1000,
          rowsActionsNumber: 1,
          itemsHeight: 50,
          dataToDisplay: rowData["eyecolor"],
          updateCell,
          column: columns["eyecolor"]
        }}
        key="eyecolor"
      />,
      {
        attachTo: window.domNode
      }
    );

    wrapper
      .find(Select)
      .first()
      .props()
      .onChange({ target: { value: "blue" } });
    wrapper.update();
    expect(updateCell).toHaveBeenCalled();
    expect(wrapper.find(InputCell)).toHaveLength(1);
  });
});
