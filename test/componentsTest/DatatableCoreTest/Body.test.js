// import React from "react";
// import configureStore from "redux-mock-store";
// import { Provider } from "react-redux";
// import { shallow, mount } from "enzyme";
// import Body from "../../../src/components/DatatableCore/Body";
// import Row from "../../../src/components/DatatableCore/Row";
// import { storeSample } from "../../data/samples";
//
// describe("Body component", () => {
//   const mockStore = configureStore();
//   const store = mockStore(storeSample);
//
//   it("should render without errors", () => {
//     shallow(
//       <Provider store={store}>
//         <table>
//           <Body />
//         </table>
//       </Provider>
//     );
//   });
//
//   it("should have 3 rows", () => {
//     const wrapper = mount(
//       <Provider store={store}>
//         <table>
//           <Body />
//         </table>
//       </Provider>
//     );
//
//     expect(wrapper.find(Row)).toHaveLength(3);
//   });
// });
