import { createMuiTheme } from "@material-ui/core/styles";

export const mainTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiInput: {
      root: {
        fontSize: "0.9rem",
        lineHeight: "0.9rem",
        color: "black"
      }
    },
    MuiPaper: {
      root: {
        "&:before": {
          content: '""',
          display: "block",
          width: "0",
          height: "0",
          position: "absolute",
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: "8px solid #616161",
          left: "calc(50% - 8px)",
          marginTop: "-8px",
          top: "0"
        }
      }
    },
    MuiTooltip: {
      popper: {
        marginTop: "-5px"
      },
      tooltip: {
        "&:before": {
          content: '""',
          display: "block",
          width: "0",
          height: "0",
          position: "absolute",
          borderLeft: "5px solid transparent",
          borderRight: "5px solid transparent",
          borderBottom: "5px solid #616161",
          marginTop: "-0.47em",
          left: "calc(50% - 5px)",
          top: "0"
        }
      }
    }
  }
});

export const customVariant = () => ({
  errorTooltip: {
    backgroundColor: "red",
    color: "white",
    "&:before": {
      borderBottom: "5px solid red"
    }
  },
  disabledButtonPopper: {
    marginTop: "5px"
  },
  enabledButtonPopper: {
    marginTop: "12px"
  },
  defaultIcon: {
    color: "black"
  },
  errorIcon: {
    color: "red"
  },
  validIcon: {
    color: "#4caf50"
  },
  whiteIcon: {
    color: "white"
  }
});
