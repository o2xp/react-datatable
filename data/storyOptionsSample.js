import React from "react";
import {
  CallSplit as CallSplitIcon,
  Launch as LaunchIcon,
  FreeBreakfast as CoffeeIcon
} from "@material-ui/icons";
import { title, keyColumn, data } from "./optionsObjectSample";
import rows from "./rows";

const storyOptionsSample = {
  title,
  dimensions: {
    datatable: {
      width: "90vw"
    },
    body: {
      height: "50vh"
    }
  },
  keyColumn,
  data: {
    ...data,
    rows
  },
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    canSelectRow: true,
    selectionIcons: [
      {
        title: "Action 1",
        icon: <CallSplitIcon color="secondary" />,
        onClick: res => alert(`You have dispatched ${res.length} rows !`)
      },
      {
        title: "Action 2",
        icon: <LaunchIcon color="secondary" />,
        onClick: res => alert(`You have exported ${res.length} rows !`)
      }
    ],
    additionalIcons: [
      {
        title: "Action 3",
        icon: <CoffeeIcon color="primary" />,
        onClick: () => alert("Coffee Time")
      }
    ]
  }
};

export default storyOptionsSample;
