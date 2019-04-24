import React from "react";
import { Datatable } from "../../src/index";
import {
  storyOptionsSample,
  customTableBodyRowSample
} from "../../data/samples";

const customTableBodyRowStory = () => {
  return (
    <Datatable
      options={storyOptionsSample}
      CustomTableBodyRow={customTableBodyRowSample}
    />
  );
};

export default customTableBodyRowStory;
