import React from "react";
import { Datatable } from "../../src/index";
import { simpleOptionsNoDataSample } from "../../data/samples";

const noDataStory = () => {
  return <Datatable options={simpleOptionsNoDataSample} forceRerender />;
};

export default noDataStory;
