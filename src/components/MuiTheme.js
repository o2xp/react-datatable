import { createMuiTheme } from "@material-ui/core/styles";

export const mainTheme = overideTheme =>
  createMuiTheme({
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
      }
    },
    ...overideTheme
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
