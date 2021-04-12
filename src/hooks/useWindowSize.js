// @flow
import { useState, useEffect } from "react";

const useWindowSize = (ref: any): { width: any, height: any } => {
  const getSize = () => {
    return {
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight
    };
  };

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const handleResize = () => {
    setWindowSize(getSize());
  };

  useEffect((): any => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref]);

  return windowSize;
};

export default useWindowSize;
