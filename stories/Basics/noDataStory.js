import React from "react";
import { chunk } from "lodash";
import { Datatable } from "../../src/index";
import {
  simpleOptionsNoDataSample,
  storyOptionsSample
} from "../../data/samples";

const refreshRows = () => {
  const { rows } = storyOptionsSample.data;
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

const noDataStory = () => {
  return (
    <Datatable
      options={{
        ...simpleOptionsNoDataSample,
        features: {
          ...simpleOptionsNoDataSample.features,
          canEdit: true,
          canDelete: true,
          canPrint: true,
          canDownload: true,
          canSearch: true,
          canRefreshRows: true,
          canOrderColumns: true,
          canSelectRow: true,
          canSaveUserConfiguration: true,
          userConfiguration: {
            columnsOrder: [
              "id",
              "name",
              "age",
              "adult",
              "birthDate",
              "eyeColor",
              "iban"
            ],
            copyToClipboard: true
          }
        }
      }}
      refreshRows={refreshRows}
      forceRerender
    />
  );
};

export default noDataStory;
