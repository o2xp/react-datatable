import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
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

export default theme;
