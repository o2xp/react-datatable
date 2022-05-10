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
      width: "100%",
      height: "70vh"
    }
  },
  keyColumn,
  data: {
    ...data,
    rows
  },
  features: {
    canEdit: true,
    canDelete: true,
    canPrint: true,
    canDownload: true,
    canSearch: true,
    canRefreshRows: true,
    canOrderColumns: true,
    canSelectRow: true,
    canSaveUserConfiguration: true,
    columnsPresetsToDisplay: [
      { presetName:"Show blue columns", columnsToShow:["id","name","age"], isActive:false },
      { presetName:"Show one columns", columnsToShow:["age"],  isActive:false },
      { presetName:"Show something ", columnsToShow:[ "id","name","age","adult","birthDate","eyeColor","iban" ] , isActive:false },
      { presetName:"Show nothing ", columnsToShow:[],  isActive:false }
    ],
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
    },
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
    additionalActions: [
      {
        title: "Action 3",
        icon: <CoffeeIcon color="primary" />,
        onClick: res => alert(res)
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
