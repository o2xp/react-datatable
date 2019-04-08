// import React from "react";
// import renderer from "react-test-renderer";
// import configureStore from "redux-mock-store";
// import { Provider } from "react-redux";
// import DatatableInitializer from "../../src/components/DatatableInitializer";
// import { storeSample, storeNoDataSample } from "../data/samples";
//
// describe("Testing DatatableInitializer component", () => {
//   const mockStore = configureStore();
//   it("should render without errors", () => {
//     const store = mockStore(storeSample);
//     const tree = renderer.create(
//       <Provider store={store}>
//         <DatatableInitializer />
//       </Provider>
//     );
//     expect(tree).toMatchSnapshot();
//   });
//
//   it("should render without errors", () => {
//     const store = mockStore(storeNoDataSample);
//     const tree = renderer.create(
//       <Provider store={store}>
//         <DatatableInitializer />
//       </Provider>
//     );
//     expect(tree).toMatchSnapshot();
//   });
// });
