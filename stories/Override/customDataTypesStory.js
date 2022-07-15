import React from "react";
import { chunk } from "lodash";
import { Datatable } from "../../src/index";
import { storyOptionsSample2, customDataTypesSample } from "../../data/samples";

const refreshRows = () => {
  const { rows } = storyOptionsSample2.data;
  const randomRows = Math.floor(Math.random() * rows.length) + 1;
  const randomTime = Math.floor(Math.random() * 4000) + 1000;
  const randomResolve = Math.floor(Math.random() * 10) + 1;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomResolve > 3) {
        resolve(chunk(rows, randomRows)[0]);
      }
      reject(new Error("err"));
    }, randomTime);
  });
};

const customDataTypesStory = () => {
  return (
    <Datatable
      options={storyOptionsSample2}
      forceRerender
      customDataTypes={customDataTypesSample}
      refreshRows={refreshRows}
    />
  );
};

export default customDataTypesStory;
