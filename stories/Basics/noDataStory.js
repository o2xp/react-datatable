import React from "react";
import { Datatable } from "../../src/index";
import { simpleOptionsNoDataSample } from "../../data/samples";

const noDataStory = () => {
  return <Datatable options={simpleOptionsNoDataSample} />;
};

export default noDataStory;
