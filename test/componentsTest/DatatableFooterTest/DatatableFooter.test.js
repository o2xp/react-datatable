import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import { chunk, cloneDeep } from "lodash";
import DatatableFooter from "../../../src/components/DatatableFooter/DatatableFooter";
import { storeSample, storeSampleWithPages } from "../../../data/samples";
import * as actions from "../../../src/redux/actions/datatableActions";

const mockStore = configureStore();
const store = mockStore(storeSample);
const storeSamplePage5 = cloneDeep(storeSampleWithPages);
const storePage5 = mockStore(storeSamplePage5);
const storeSamplePage1 = cloneDeep(storeSampleWithPages);
storeSamplePage1.datatableReducer.pagination = {
  ...storeSamplePage1.datatableReducer.pagination,
  pageSelected: 1,
  rowsCurrentPage: chunk(
    storeSamplePage1.datatableReducer.data.rows,
    storeSamplePage1.datatableReducer.pagination.rowsPerPage
  )[0]
};
const storePage1 = mockStore(storeSamplePage1);
const storeSamplePage20 = cloneDeep(storeSampleWithPages);
storeSamplePage20.datatableReducer.pagination = {
  ...storeSamplePage20.datatableReducer.pagination,
  pageSelected: 20,
  rowsCurrentPage: chunk(
    storeSamplePage20.datatableReducer.data.rows,
    storeSamplePage20.datatableReducer.pagination.rowsPerPage
  )[19]
};
const storePage20 = mockStore(storeSamplePage20);

describe("Datatable Footer component", () => {
  it("connected should render without errors", () => {
    const datatableFooterWrapper = shallow(
      <Provider store={store}>
        <DatatableFooter />
      </Provider>
    );
    expect(
      datatableFooterWrapper.find("Connect(DatatableFooter)")
    ).toHaveLength(1);
  });

  describe("connected should render with", () => {
    const datatableFooterWrapper = mount(
      <Provider store={store}>
        <DatatableFooter />
      </Provider>
    );

    it("a footer", () => {
      expect(datatableFooterWrapper.find(".Footer")).toHaveLength(1);
    });

    it("3 elements", () => {
      expect(datatableFooterWrapper.find(".Footer-Element")).toHaveLength(3);
    });
  });

  describe("whith one page click on", () => {
    const datatableFooterWrapper = mount(
      <Provider store={store}>
        <DatatableFooter />
      </Provider>
    );

    it(" select rowsPerPage should be enabled", () => {
      const selectRowsPerPage = datatableFooterWrapper
        .find("Select.select-rowsPerPage")
        .at(0);
      expect(selectRowsPerPage.exists()).toBeTruthy();
      expect(selectRowsPerPage.props().disabled).toBeFalsy();
    });

    it(" select page should be disabled", () => {
      const selectPage = datatableFooterWrapper
        .find("Select.select-page")
        .at(0);
      expect(selectPage.exists()).toBeTruthy();
      expect(selectPage.props().disabled).toBeTruthy();
    });

    it("previous page should be disabled", () => {
      const previousButton = datatableFooterWrapper.find(
        "button.previous-page"
      );
      expect(previousButton.exists()).toBeTruthy();
      expect(previousButton.props().disabled).toBeTruthy();
    });

    it("next page should be disabled", () => {
      const nextButton = datatableFooterWrapper.find("button.next-page");
      expect(nextButton.exists()).toBeTruthy();
      expect(nextButton.props().disabled).toBeTruthy();
    });
  });

  describe("whith 20 pages", () => {
    describe("select rowsPerPage", () => {
      const datatableFooterWrapperPage1 = mount(
        <Provider store={storePage1}>
          <DatatableFooter />
        </Provider>
      );

      const selectRowsPerPage = datatableFooterWrapperPage1
        .find("Select.select-rowsPerPage")
        .at(0);
      it(" select page should be enabled", () => {
        expect(selectRowsPerPage.exists()).toBeTruthy();
        expect(selectRowsPerPage.props().disabled).toBeFalsy();
      });

      it("and selecting 50 should dispath SET_ROWS_PER_PAGE action with payload = 50", () => {
        selectRowsPerPage.props().onChange({ target: { value: 50 } });
        expect(storePage1.getActions()[0]).toEqual(actions.setRowsPerPage(50));
      });
    });

    describe("while being on page 1 click on", () => {
      const datatableFooterWrapperPage1 = mount(
        <Provider store={storePage1}>
          <DatatableFooter />
        </Provider>
      );

      describe("select page", () => {
        const selectPage = datatableFooterWrapperPage1
          .find("Select.select-page")
          .at(0);

        it("should be enabled", () => {
          expect(selectPage.exists()).toBeTruthy();
          expect(selectPage.props().disabled).toBeFalsy();
        });

        it("and selecting 9 should dispath SET_PAGE action with payload = 9", () => {
          selectPage.props().onChange({ target: { value: 9 } });
          expect(storePage1.getActions()[1]).toEqual(actions.setPage(9));
        });
      });

      describe("previous button", () => {
        const previousButton = datatableFooterWrapperPage1.find(
          "button.previous-page"
        );

        it("should be disabled", () => {
          expect(previousButton.exists()).toBeTruthy();
          expect(previousButton.props().disabled).toBeTruthy();
        });
      });

      describe("next button", () => {
        const nextButton = datatableFooterWrapperPage1.find("button.next-page");

        it("should be enabled", () => {
          expect(nextButton.exists()).toBeTruthy();
          expect(nextButton.props().disabled).toBeFalsy();
        });

        it("on click should dispath SET_PAGE action with payload = 2", () => {
          nextButton.simulate("click");
          expect(storePage1.getActions()[2]).toEqual(actions.setPage(2));
        });
      });
    });

    describe("while being on page 5 click on", () => {
      const datatableFooterWrapperPage5 = mount(
        <Provider store={storePage5}>
          <DatatableFooter />
        </Provider>
      );

      describe("previous button", () => {
        const previousButton = datatableFooterWrapperPage5.find(
          "button.previous-page"
        );

        it("button should be enabled", () => {
          expect(previousButton.exists()).toBeTruthy();
          expect(previousButton.props().disabled).toBeFalsy();
        });

        it("on click should dispath SET_PAGE action with payload = 4", () => {
          previousButton.simulate("click");
          expect(storePage5.getActions()[0]).toEqual(actions.setPage(4));
        });
      });

      describe("next button", () => {
        const nextButton = datatableFooterWrapperPage5.find("button.next-page");
        it("should be enabled", () => {
          expect(nextButton.exists()).toBeTruthy();
          expect(nextButton.props().disabled).toBeFalsy();
        });

        it("on click should dispath SET_PAGE action with payload = 6", () => {
          nextButton.simulate("click");
          expect(storePage5.getActions()[1]).toEqual(actions.setPage(6));
        });
      });
    });

    describe("while being on page 20 click on", () => {
      const datatableFooterWrapperPage20 = mount(
        <Provider store={storePage20}>
          <DatatableFooter />
        </Provider>
      );

      describe("previous button", () => {
        const previousButton = datatableFooterWrapperPage20.find(
          "button.previous-page"
        );
        it("button should be enabled", () => {
          expect(previousButton.exists()).toBeTruthy();
          expect(previousButton.props().disabled).toBeFalsy();
        });

        it("on click should dispath SET_PAGE action with payload = 19", () => {
          previousButton.simulate("click");
          expect(storePage20.getActions()[0]).toEqual(actions.setPage(19));
        });
      });

      describe("next button", () => {
        const nextButton = datatableFooterWrapperPage20.find(
          "button.next-page"
        );
        it("should be disabled", () => {
          expect(nextButton.exists()).toBeTruthy();
          expect(nextButton.props().disabled).toBeTruthy();
        });
      });
    });
  });
});
