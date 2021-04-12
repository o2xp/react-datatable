import React from "react";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";
import rowsShort from "./rowsShort.json";

export const columns = [
  {
    id: "id",
    label: "id",
    colSize: 200,
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
    }
  },
  {
    id: "name",
    label: "name",
    colSize: 100,
    editable: true,
    dataType: "text"
  },
  {
    id: "age",
    label: "age",
    colSize: 60,
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
    }
  },
  {
    id: "adult",
    label: "adult",
    colSize: 50,
    editable: true,
    dataType: "boolean"
  },
  {
    id: "birthDate",
    label: "birth date",
    colSize: 180,
    editable: true,
    dataType: "dateTime",
    dateFormatIn: "YYYY-MM-DDTHH:mm",
    dateFormatOut: "YYYY-MM-DDTHH:mm",
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
    }
  },
  {
    id: "eyeColor",
    label: "eyeColor",
    colSize: 120,
    editable: true,
    inputType: "select",
    values: ["blue", "brown", "green"]
  },
  {
    id: "iban",
    label: "iban",
    colSize: 250,
    editable: false,
    dataType: "iban"
  }
];

export const data = {
  columns,
  rows: rowsShort
};
