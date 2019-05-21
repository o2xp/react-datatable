import React from "react";
import { Datatable } from "../../src/index";
import {
  storyOptionsNoActionSample,
  customTableBodyRowSample
} from "../../data/samples";

const customTableBodyRowStory = () => {
  return (
    <Datatable
      options={storyOptionsNoActionSample}
      forceRerender
      CustomTableBodyRow={customTableBodyRowSample}
    />
  );
};

export default customTableBodyRowStory;
