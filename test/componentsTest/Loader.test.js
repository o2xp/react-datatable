import React, { Fragment } from "react";
import { ScrollSyncPane } from "react-scroll-sync";
import { PulseLoader } from "react-spinners";
import Loader from "../../src/components/Loader";

describe("Loader component should render ", () => {
  it("without errors", () => {
    const LoaderWrapper = Loader({
      height: 500,
      width: 100,
      columnSizeMultiplier: 1,
      totalWidthNumber: 1000
    });
    expect(LoaderWrapper).toEqual(
      <Fragment>
        <div id="loader" style={{ height: 485, width: 85 }}>
          <PulseLoader sizeUnit="px" size={15} color="#3f51b5" loading />
        </div>
        <ScrollSyncPane>
          <div
            style={{
              overflowX: "scroll",
              overflowY: "hidden",
              height: "15px",
              width: 85
            }}
          >
            <div
              style={{
                width: 1000
              }}
            >
              .
            </div>
          </div>
        </ScrollSyncPane>
      </Fragment>
    );
  });

  it("without errors with columnSizeMultiplier", () => {
    const LoaderWrapper = Loader({
      height: 500,
      width: 100,
      columnSizeMultiplier: 1.5,
      totalWidthNumber: 1000
    });
    expect(LoaderWrapper).toEqual(
      <Fragment>
        <div id="loader" style={{ height: 485, width: 85 }}>
          <PulseLoader sizeUnit="px" size={15} color="#3f51b5" loading />
        </div>
        <ScrollSyncPane>
          <div
            style={{
              overflowX: "hidden",
              overflowY: "hidden",
              height: "15px",
              width: 85
            }}
          >
            <div
              style={{
                width: 1000
              }}
            >
              .
            </div>
          </div>
        </ScrollSyncPane>
      </Fragment>
    );
  });
});
