import React from "react";
import { shallow } from "enzyme";
import Datatable from "../src/components/Datatable";

describe("Testing component", () => {
  it("render without crashing", () => {
    shallow(<Datatable />);
  });
});
