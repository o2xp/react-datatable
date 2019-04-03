import React from "react";
import { CallSplit as CallSplitIcon } from "@material-ui/icons";

export const storeSample = {
  datatableReducer: {
    title: "My super datatable",
    dimensions: {
      datatable: {
        width: "90vw"
      },
      header: {
        height: "60px"
      },
      body: {
        height: "300px"
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
        }
      ],
      rows: [
        {
          id: "50cf",
          age: 28,
          name: "Kerr Mayo",
          adult: true,
          birthDate: "1972-09-04T11:09:59"
        },
        {
          id: "209",
          age: 34,
          name: "Freda Bowman",
          adult: true,
          birthDate: "1988-03-14T09:03:19"
        },
        {
          id: "2dd81ef",
          age: 14,
          name: "Becky Lawrence",
          adult: false,
          birthDate: "1969-02-10T04:02:44"
        }
      ]
    },
    features: {
      canEdit: true,
      canPrint: true,
      canDownload: true,
      canSearch: false,
      canRefreshRows: false,
      canFilterColumns: false,
      canSaveUserConfiguration: false,
      userConfiguration: {
        columnsOrder: [],
        copyToClipboard: false
      },
      rowsPerPage: {
        available: [10, 25, 50, 100],
        selected: 50
      },
      selection: {
        rowsSelectable: false,
        selectPageRows: false,
        selectAllRows: false
      },
      additionalIcons: [],
      selectionIcons: [
        {
          tooltip: "Selected Rows",
          icon: <CallSplitIcon />,
          position: 5,
          onClick: rows => rows
        }
      ]
    }
  }
};

export const storeNoDataSample = {
  datatableReducer: {
    title: "My super datatable",
    dimensions: {
      datatable: {
        width: "90vw"
      },
      header: {
        height: "60px"
      },
      body: {
        height: "300px"
      },
      row: {
        height: "60px"
      }
    },
    keyColumn: "id",
    font: "Arial",
    data: {
      columns: [],
      rows: []
    },
    features: {
      canEdit: true,
      canPrint: true,
      canDownload: true,
      canSearch: false,
      canRefreshRows: false,
      canFilterColumns: false,
      canSaveUserConfiguration: false,
      userConfiguration: {
        columnsOrder: [],
        copyToClipboard: false
      },
      rowsPerPage: {
        available: [10, 25, 50, 100],
        selected: 50
      },
      selection: {
        rowsSelectable: false,
        selectPageRows: false,
        selectAllRows: false
      },
      additionalIcons: [],
      selectionIcons: [
        {
          tooltip: "Selected Rows",
          icon: <CallSplitIcon />,
          position: 5,
          onClick: rows => rows
        }
      ]
    }
  }
};

export const simpleOptionsSample = {
  title: "My super datatable",
  dimensions: {
    datatable: {
      width: "90vw"
    },
    header: {
      height: "60px"
    }
  },
  keyColumn: "id",
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
      }
    ],
    rows: [
      {
        id: "50cf",
        age: 28,
        name: "Kerr Mayo",
        adult: true,
        birthDate: "1972-09-04T11:09:59"
      },
      {
        id: "209",
        age: 34,
        name: "Freda Bowman",
        adult: true,
        birthDate: "1988-03-14T09:03:19"
      },
      {
        id: "2dd81ef",
        age: 14,
        name: "Becky Lawrence",
        adult: false,
        birthDate: "1969-02-10T04:02:44"
      }
    ]
  },
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    selectionIcons: [
      {
        tooltip: "Selected Rows",
        icon: <CallSplitIcon />,
        position: 5,
        onClick: rows => rows
      }
    ]
  }
};

export const maximumOptionsSample = {
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
      }
    ],
    rows: [
      {
        id: "50cf",
        age: 28,
        name: "Kerr Mayo",
        adult: true,
        birthDate: "1972-09-04T11:09:59"
      },
      {
        id: "209",
        age: 34,
        name: "Freda Bowman",
        adult: true,
        birthDate: "1988-03-14T09:03:19"
      },
      {
        id: "2dd81ef",
        age: 14,
        name: "Becky Lawrence",
        adult: false,
        birthDate: "1969-02-10T04:02:44"
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
      columnsOrder: ["id", "name", "age"],
      copyToClipboard: true
    },
    rowsPerPage: {
      available: [40],
      selected: 40
    },
    selection: {
      rowsSelectable: true,
      selectPageRows: true,
      selectAllRows: false
    },
    additionalIcons: [
      {
        tooltip: "Coffee",
        icon: <CallSplitIcon />,
        position: 1,
        onClick: () => true
      }
    ],
    selectionIcons: [
      {
        tooltip: "Selected Rows",
        icon: <CallSplitIcon />,
        position: 5,
        onClick: rows => rows
      }
    ]
  }
};

export const minimumOptionsSample = {
  keyColumn: "id",
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
      }
    ],
    rows: [
      {
        id: "50cf",
        age: 28,
        name: "Kerr Mayo",
        adult: true,
        birthDate: "1972-09-04T11:09:59"
      },
      {
        id: "209",
        age: 34,
        name: "Freda Bowman",
        adult: true,
        birthDate: "1988-03-14T09:03:19"
      },
      {
        id: "2dd81ef",
        age: 14,
        name: "Becky Lawrence",
        adult: false,
        birthDate: "1969-02-10T04:02:44"
      }
    ]
  }
};

export const defaultOptionsSample = {
  title: "",
  dimensions: {
    datatable: {
      width: "100vw"
    },
    header: {
      height: "60px"
    },
    body: {
      height: "300px"
    },
    row: {
      height: "60px"
    }
  },
  keyColumn: null,
  font: "Arial",
  data: {
    columns: [],
    rows: []
  },
  features: {
    canEdit: false,
    canPrint: false,
    canDownload: false,
    canSearch: false,
    canRefreshRows: false,
    canFilterColumns: false,
    canSaveUserConfiguration: false,
    userConfiguration: {
      columnsOrder: [],
      copyToClipboard: false
    },
    rowsPerPage: {
      available: [10, 25, 50, 100],
      selected: 50
    },
    selection: {
      rowsSelectable: false,
      selectPageRows: false,
      selectAllRows: false
    },
    additionalIcons: [],
    selectionIcons: []
  }
};

export const mergedSimpleOptionsSample = {
  title: "My super datatable",
  dimensions: {
    datatable: {
      width: "90vw"
    },
    header: {
      height: "60px"
    },
    body: {
      height: "300px"
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
      }
    ],
    rows: [
      {
        id: "50cf",
        age: 28,
        name: "Kerr Mayo",
        adult: true,
        birthDate: "1972-09-04T11:09:59"
      },
      {
        id: "209",
        age: 34,
        name: "Freda Bowman",
        adult: true,
        birthDate: "1988-03-14T09:03:19"
      },
      {
        id: "2dd81ef",
        age: 14,
        name: "Becky Lawrence",
        adult: false,
        birthDate: "1969-02-10T04:02:44"
      }
    ]
  },
  features: {
    canEdit: true,
    canPrint: true,
    canDownload: true,
    canSearch: false,
    canRefreshRows: false,
    canFilterColumns: false,
    canSaveUserConfiguration: false,
    userConfiguration: {
      columnsOrder: [],
      copyToClipboard: false
    },
    rowsPerPage: {
      available: [10, 25, 50, 100],
      selected: 50
    },
    selection: {
      rowsSelectable: false,
      selectPageRows: false,
      selectAllRows: false
    },
    additionalIcons: [],
    selectionIcons: [
      {
        tooltip: "Selected Rows",
        icon: <CallSplitIcon />,
        position: 5,
        onClick: rows => rows
      }
    ]
  }
};

export const mergedMaximumOptionsSample = {
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
      }
    ],
    rows: [
      {
        id: "50cf",
        age: 28,
        name: "Kerr Mayo",
        adult: true,
        birthDate: "1972-09-04T11:09:59"
      },
      {
        id: "209",
        age: 34,
        name: "Freda Bowman",
        adult: true,
        birthDate: "1988-03-14T09:03:19"
      },
      {
        id: "2dd81ef",
        age: 14,
        name: "Becky Lawrence",
        adult: false,
        birthDate: "1969-02-10T04:02:44"
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
      columnsOrder: ["id", "name", "age"],
      copyToClipboard: true
    },
    rowsPerPage: {
      available: [40],
      selected: 40
    },
    selection: {
      rowsSelectable: true,
      selectPageRows: true,
      selectAllRows: false
    },
    additionalIcons: [
      {
        tooltip: "Coffee",
        icon: <CallSplitIcon />,
        position: 1,
        onClick: () => true
      }
    ],
    selectionIcons: [
      {
        tooltip: "Selected Rows",
        icon: <CallSplitIcon />,
        position: 5,
        onClick: rows => rows
      }
    ]
  }
};

export const mergedMinimumOptionsSample = {
  title: "",
  dimensions: {
    datatable: {
      width: "100vw"
    },
    header: {
      height: "60px"
    },
    body: {
      height: "300px"
    },
    row: {
      height: "60px"
    }
  },
  keyColumn: "id",
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
      }
    ],
    rows: [
      {
        id: "50cf",
        age: 28,
        name: "Kerr Mayo",
        adult: true,
        birthDate: "1972-09-04T11:09:59"
      },
      {
        id: "209",
        age: 34,
        name: "Freda Bowman",
        adult: true,
        birthDate: "1988-03-14T09:03:19"
      },
      {
        id: "2dd81ef",
        age: 14,
        name: "Becky Lawrence",
        adult: false,
        birthDate: "1969-02-10T04:02:44"
      }
    ]
  },
  font: "Arial",
  features: {
    canEdit: false,
    canPrint: false,
    canDownload: false,
    canSearch: false,
    canRefreshRows: false,
    canFilterColumns: false,
    canSaveUserConfiguration: false,
    userConfiguration: {
      columnsOrder: [],
      copyToClipboard: false
    },
    rowsPerPage: {
      available: [10, 25, 50, 100],
      selected: 50
    },
    selection: {
      rowsSelectable: false,
      selectPageRows: false,
      selectAllRows: false
    },
    additionalIcons: [],
    selectionIcons: []
  }
};
