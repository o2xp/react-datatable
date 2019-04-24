import React from "react";
import { Datatable } from "../../src/index";
import { storyOptionsSample, customDataTypesSample } from "../../data/samples";

const customDataTypesStory = () => {
  return (
    <Datatable
      options={storyOptionsSample}
      customDataTypes={customDataTypesSample}
    />
  );
};

export default customDataTypesStory;
