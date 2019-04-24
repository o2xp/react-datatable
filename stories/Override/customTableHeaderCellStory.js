import React from "react";
import { Datatable } from "../../src/index";
import {
  storyOptionsSample,
  customTableHeaderCellSample
} from "../../data/samples";

const customTableHeaderCellStory = () => {
  return (
    <Datatable
      options={storyOptionsSample}
      CustomTableHeaderCell={customTableHeaderCellSample}
    />
  );
};

export default customTableHeaderCellStory;
