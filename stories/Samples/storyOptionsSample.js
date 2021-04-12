import React from "react";
import Moment from "moment";
import ClearIcon from "@material-ui/icons/Clear";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

import {
  CallSplit as CallSplitIcon,
  Launch as LaunchIcon,
  FreeBreakfast as CoffeeIcon
} from "@material-ui/icons";
import { title, keyColumn, data } from "./optionsObjectSample";
import rows from "./generatedVeryBig.json";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
    userConfiguration: {
      columnsOrder: ["id", "name", "age", "adult", "birthDate", "eyeColor", "iban"],
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

export const columnsParams = {
  columns: {
    id: {
      id: "id",
      label: "Id",
      colSize: 150,
      editable: false,
      required: true,
      dataType: "text",
      valueVerification: val => {
        const error = val === "whatever";
        const message = val === "whatever" ? "Value is not valid" : "";
        return {
          error,
          message
        };
      },
      position: "start"
    },
    index: {
      id: "index",
      label: "Index",
      colSize: 100,
      editable: false,
      required: true,
      dataType: "text",
      position: "center"
    },
    name: {
      id: "name",
      label: "Name",
      colSize: 150,
      editable: true,
      dataType: "text",
      position: "start"
    },
    age: {
      id: "age",
      label: "Age",
      colSize: 100,
      editable: true,
      dataType: "number",
      valueVerification: val => {
        let error;
        let message;
        switch (true) {
          case val > 100:
            error = true;
            message = "Value is too big";
            break;
          case val < 1:
            error = true;
            message = "Value is too low";
            break;
          default:
            error = false;
            message = "";
            break;
        }

        return {
          error,
          message
        };
      },
      position: "center"
    },
    adult: {
      id: "adult",
      label: "Adult",
      colSize: 100,
      editable: true,
      dataType: "boolean",
      component: checked => {
        return <div>{checked ? <ClearIcon /> : <RadioButtonUncheckedIcon />}</div>;
      },
      editComponent: (celData, updateCell, width, options, id) => {
        const [value, setValue] = React.useState(celData);
        React.useEffect(() => {
          setValue(celData);
        }, [celData]);

        const handleChange = newValue => {
          updateCell(options.id, id, newValue);
        };
        return (
          <FormControlLabel
            style={{
              width: width - 8,

              height: 30,
              overflow: "hidden",
              justifyContent: "center",
              margin: 0
            }}
            control={
              <Checkbox
                checked={value}
                onChange={event => {
                  handleChange(event.target.checked);
                  setValue(event.target.checked);
                }}
                color="secondary"
              />
            }
            //   label={`${options.label}*`}
          />
        );
      },
      position: "center"
    },
    birthdate: {
      id: "birthdate",
      label: "Birthdate",
      colSize: 160,
      editable: true,
      dataType: "date",
      component: date => {
        return date !== "" ? <div>{Moment(date).format("DD/MM/yyyy")}</div> : undefined;
      },
      valueVerification: val => {
        if (new Date().getTime() < new Date(val).getTime()) {
          return {
            error: true,
            message: "Date can't be in the futur"
          };
        }
        return {
          error: false,
          message: ""
        };
      },
      position: "center"
    },
    eyecolor: {
      id: "eyecolor",
      label: "Eye Color",
      colSize: 130,
      editable: true,
      inputType: "select",
      values: ["blue", "brown", "green"],
      position: "center"
    },
    iban: {
      id: "iban",
      label: "Iban",
      colSize: 250,
      editable: false,
      dataType: "iban",
      position: "start"
    }
  },
  columnsOrder: ["index", "id", "name", "age", "adult", "birthdate", "eyecolor", "iban"],
  itemsHeight: 36,
  borderedColumns: false,
  borderedRows: false
};

export const rowsActions = [
  {
    name: "delete",
    icon: <DeleteIcon color="secondary" />,
    action: row => {
      const newArr = data.filter(el => el.id !== row.id);
      setData(newArr);
    }
  }
];

export default storyOptionsSample;
