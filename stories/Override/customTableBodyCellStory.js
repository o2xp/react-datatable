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
      CustomTableBodyCell={customTableBodyCellSample}
    />
  );
};

export default customTableBodyCellStory;
