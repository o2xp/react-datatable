import React from "react";
import { storiesOf } from "@storybook/react";
import {
  FreeBreakfast as CoffeeIcon,
  CallSplit as CallSplitIcon
} from "@material-ui/icons";
import { Datatable } from "../src/index";

const options = {
  title: "My super datatable",
  dimensions: {
    datatable: {
      width: "90vw"
    },
    header: {
      height: "60px"
    },
    body: {
      height: "40vh"
    },
    row: {
      height: "60px"
    }
  },
  keyColumn: "id",
  font: "Arial",
  data: {
    columns: [
      {
        id: "id",
        label: "id",
        colSize: 10,
        editable: true,
        required: true,
        dataType: "text",
        valueVerification: val => {
          const error = val === "whatever";
          const message = val === "whatever" ? "Value is not valid" : "";
          return {
            error,
            message
          };
        }
      },
      {
        id: "name",
        label: "name",
        colSize: 20,
        editable: false,
        dataType: "text"
      },
      {
        id: "age",
        label: "age",
        colSize: 3,
        editable: true,
        required: false,
        dataType: "number",
        valueVerification: val => {
          const error = val > 100;
          const message = val > 100 ? "Value is too big" : "";
          return {
            error,
            message
          };
        }
      },
      {
        id: "adult",
        label: "adult",
        colSize: 0,
        editable: false,
        dataType: "boolean",
        inputType: "checkbox"
      },
      {
        id: "birthDate",
        label: "birth date",
        colSize: 10,
        editable: false,
        dataType: "date",
        inputType: "date",
        dateFormat: "YYYY-MM-DDTHH:MM:ss"
      },
      {
        id: "iban",
        label: "iban",
        colSize: 10,
        editable: false,
        dataType: "iban"
      }
    ],
    rows: [
      {
        id: "50cf",
        age: 28,
        name: "Kerr Mayo",
        adult: true,
        birthDate: "1972-09-04T18:09:59",
        iban: "LU650105597859435517"
      },
      {
        id: "209",
        age: 34,
        name: "Freda Bowman",
        adult: true,
        birthDate: "1988-03-14T09:03:19",
        iban: "LU020106768919913391"
      },
      {
        id: "2dd81ef",
        age: 14,
        name: "Becky Lawrence",
        adult: false,
        birthDate: "1969-02-10T04:02:44",
        iban: "LU250107549217378667"
      }
    ]
  },
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    canSearch: true,
    canRefreshRows: true,
    canFilterColumns: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["id", "name", "age", "adult", "birthDate", "iban"],
      copyToClipboard: true
    },
    rowsPerPage: {
      available: [10, 25, 50, 100],
      selected: 50
    },
    selection: {
      rowsSelectable: true,
      selectPageRows: true,
      selectAllRows: false
    },
    additionalIcons: [
      {
        tooltip: "Coffee",
        icon: <CoffeeIcon />,
        position: 1,
        onClick: () => alert("Coffee Time!")
      }
    ],
    selectionIcons: [
      {
        tooltip: "Selected Rows",
        icon: <CallSplitIcon />,
        position: 5,
        onClick: rows => console.log(rows)
      }
    ]
  }
};

// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";
// import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
// import { withState } from "@dump247/storybook-state";

const stories = storiesOf("React Datatable", module);

// stories.addDecorator(withKnobs);

stories.add("default", () => <Datatable options={options} />);
