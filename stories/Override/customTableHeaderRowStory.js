import React from "react";
import { Datatable } from "../../src/index";
import {
  storyOptionsSample,
  customTableHeaderRowSample
} from "../../data/samples";

const customTableHeaderRowStory = () => {
  return (
    <Datatable
      options={storyOptionsSample}
      forceRerender
      CustomTableHeaderRow={customTableHeaderRowSample}
    />
  );
};

export default customTableHeaderRowStory;
