import React from "react";
import { chunk } from "lodash";
import { Datatable } from "../../src/index";
import { storyOptionsSample } from "../../data/samples";

const refreshRows = () => {
  const { rows } = storyOptionsSample.data;
  const randomTime = Math.floor(Math.random() * 4000) + 1000;
  const randomResolve = Math.floor(Math.random() * 10) + 1;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (randomResolve > 3) {
        resolve(chunk(rows, rows.length)[0]);
      }
      reject(new Error("err"));
    }, randomTime);
  });
};

const defaultStory = () => {
  return (
    <Datatable
      options={storyOptionsSample}
      refreshRows={refreshRows}
      forceRerender
    />
  );
};

export default defaultStory;
