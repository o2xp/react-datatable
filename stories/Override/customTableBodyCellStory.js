import React from "react";
import { Datatable } from "../../src/index";
import {
  storyOptionsSample,
  customTableBodyCellSample
} from "../../data/samples";

const customTableBodyCellStory = () => {
  return (
    <Datatable
      options={storyOptionsSample}
      forceRerender
      CustomTableBodyCell={customTableBodyCellSample}
    />
  );
};

export default customTableBodyCellStory;
