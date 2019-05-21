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
      forceRerender
      CustomTableHeaderCell={customTableHeaderCellSample}
    />
  );
};

export default customTableHeaderCellStory;
