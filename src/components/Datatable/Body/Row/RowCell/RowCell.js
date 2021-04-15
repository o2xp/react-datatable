// @flow
import React, { useRef, useState, useEffect } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

const RowCell = ({
  children,
  type,
  customFormat
}: {
  children: any,
  type?: string,
  customFormat?: any
}) => {
  const [isOverflow, setIsOverflow] = useState(false);
  const textElementRef = useRef();

  const formatData = (data, type) => {
    switch (type) {
      case "text":
        return data;
      case "number":
        return Number(data).toLocaleString("en-GB", { maximumFractionDigits: 2 });
      default:
        return data;
    }
  };

  useEffect(() => {
    if (textElementRef.current) {
      setIsOverflow(
        textElementRef.current.scrollWidth > textElementRef.current.clientWidth
      );
    }
  });
  return (
    <Tooltip
      title={isOverflow ? <div style={{ fontSize: "0,8rem" }}>{children}</div> : ""}
    >
      {customFormat ? (
        <div ref={textElementRef}>{customFormat(children)}</div>
      ) : type ? (
        <Typography variant="body2" className="rowCell" ref={textElementRef}>
          {formatData(children, type)}
        </Typography>
      ) : (
        <div ref={textElementRef}>{children}</div>
      )}
    </Tooltip>
  );
};

export default RowCell;
