// @flow
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";

const HeaderSorter = ({
  sortingInfos,
  orderBy
}: {
  sortingInfos: any,
  orderBy: () => void
}) => {
  const { order, position } = sortingInfos;
  const theme = useTheme();

  return (
    <>
      <IconButton
        className="orderButton"
        onClick={e => {
          e.stopPropagation();
          orderBy();
        }}
        style={theme.orderButtonColor && { color: theme.orderButtonColor }}
      >
        {order === "" ? (
          <UnfoldMoreIcon />
        ) : (
          <KeyboardArrowDownIcon
            style={order === "asc" ? { transform: "scaleY(-1)" } : {}}
          />
        )}
      </IconButton>
      <div
        className="sortingOrder"
        style={{
          opacity: order !== "" ? 0.5 : 0
        }}
      >
        <Typography variant="subtitle1">{position}</Typography>
      </div>
    </>
  );
};

export default HeaderSorter;
