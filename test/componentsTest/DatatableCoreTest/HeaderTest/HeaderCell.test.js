import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { sortableContainer } from "react-sortable-hoc";
import HeaderCell, {
  HeaderCell as HeaderCellPureComponent
} from "../../../../src/components/DatatableCore/Header/HeaderCell";
import {
  NumberWrapper,
  TextWrapper,
  BooleanWrapper,
  DateWrapper,
  TimeWrapper,
  DateTimeWrapper
} from "../../../../src/components/DatatableCore/CellTypes";
import { storeSample } from "../../../../data/samples";

const mockStore = configureStore();
const store = mockStore({
  ...storeSample,
  datatableReducer: {
    ...storeSample.datatableReducer,
    features: {
      ...storeSample.datatableReducer.features,
      canOrderColumns: true
    }
  }
});
const columnNumber = {
  dataType: "number",
  id: "number",
  label: "number",
  colSize: "70px"
};
const columnText = {
  dataType: "text",
  id: "text",
  label: "text",
  colSize: "250px"
};
const columnBoolean = {
  dataType: "boolean",
  id: "boolean",
  label: "boolean",
  colSize: "100px"
};
const columnDate = {
  dataType: "date",
  id: "date",
  label: "date",
  colSize: "120px"
};
const columnTime = {
  dataType: "time",
  id: "time",
  label: "time",
  colSize: "110px"
};
const columnDateTime = {
  dataType: "dateTime",
  id: "dateTime",
  label: "dateTime",
  colSize: "165px"
};
const columnDefault = {
  dataType: "default",
  id: "default",
  label: "default",
  colSize: "250px"
};

const orderBy = [];
const orderByColumns = jest.fn();
const onSortEnd = jest.fn();
const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

describe("BodyCell component should create a cell of type", () => {
  it("should render component connect", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <HeaderCell
          column={columnNumber}
          width={columnNumber.colSize}
          index={0}
        />
      </Provider>
    );

    expect(wrapper.find("Connect(HeaderCell)")).toHaveLength(1);
  });

  it("number", () => {
    const wrapper = shallow(
      <HeaderCellPureComponent
        column={columnNumber}
        width={columnNumber.colSize}
        index={0}
        orderBy={orderBy}
        orderByColumns={orderByColumns}
        canOrderColumns={false}
        orderByText="Order by"
        dragText="Drag"
      />
    );
    const wrapper2 = shallow(
      <NumberWrapper style={{ width: columnNumber.colSize }}>
        {columnNumber.label}
      </NumberWrapper>
    );
    expect(wrapper2.text()).toEqual("<StyledComponent />");
    expect(wrapper.text()).toEqual("<sortableElement />");
    expect(wrapper.instance().buildHeaderCell()).toBeTruthy();
  });

  it("text", () => {
    const wrapper = shallow(
      <HeaderCellPureComponent
        column={columnText}
        width={columnText.colSize}
        index={0}
        orderBy={orderBy}
        orderByColumns={orderByColumns}
        canOrderColumns={false}
        orderByText="Order by"
        dragText="Drag"
      />
    );
    const wrapper2 = shallow(
      <TextWrapper style={{ width: columnText.colSize }}>
        {columnText.label}
      </TextWrapper>
    );

    expect(wrapper2.text()).toEqual("<StyledComponent />");
    expect(wrapper.text()).toEqual("<sortableElement />");
    expect(wrapper.instance().buildHeaderCell()).toBeTruthy();
  });

  it("boolean", () => {
    const wrapper = shallow(
      <HeaderCellPureComponent
        column={columnBoolean}
        width={columnBoolean.colSize}
        index={0}
        orderBy={orderBy}
        orderByColumns={orderByColumns}
        canOrderColumns={false}
        orderByText="Order by"
        dragText="Drag"
      />
    );
    const wrapper2 = shallow(
      <BooleanWrapper style={{ width: columnBoolean.colSize }}>
        {columnBoolean.label}
      </BooleanWrapper>
    );

    expect(wrapper2.text()).toEqual("<StyledComponent />");
    expect(wrapper.text()).toEqual("<sortableElement />");
    expect(wrapper.instance().buildHeaderCell()).toBeTruthy();
  });

  it("date", () => {
    // deep equality not working due to react.Fragment
    const wrapper = shallow(
      <HeaderCellPureComponent
        column={columnDate}
        width={columnDate.colSize}
        index={0}
        orderBy={orderBy}
        orderByColumns={orderByColumns}
        canOrderColumns={false}
        orderByText="Order by"
        dragText="Drag"
      />
    );
    const wrapper2 = shallow(
      <DateWrapper style={{ width: columnDate.colSize }}>
        {columnDate.label}
      </DateWrapper>
    );

    expect(wrapper2.text()).toEqual("<StyledComponent />");
    expect(wrapper.text()).toEqual("<sortableElement />");
    expect(wrapper.instance().buildHeaderCell()).toBeTruthy();
  });

  it("time", () => {
    const wrapper = shallow(
      <HeaderCellPureComponent
        column={columnTime}
        width={columnTime.colSize}
        index={0}
        orderBy={orderBy}
        orderByColumns={orderByColumns}
        canOrderColumns={false}
        orderByText="Order by"
        dragText="Drag"
      />
    );
    const wrapper2 = shallow(
      <TimeWrapper style={{ width: columnTime.colSize }}>
        {columnTime.label}
      </TimeWrapper>
    );

    expect(wrapper2.text()).toEqual("<StyledComponent />");
    expect(wrapper.text()).toEqual("<sortableElement />");
    expect(wrapper.instance().buildHeaderCell()).toBeTruthy();
  });

  it("dateTime", () => {
    const wrapper = shallow(
      <HeaderCellPureComponent
        column={columnDateTime}
        width={columnDateTime.colSize}
        index={0}
        orderBy={orderBy}
        orderByColumns={orderByColumns}
        canOrderColumns={false}
        orderByText="Order by"
        dragText="Drag"
      />
    );
    const wrapper2 = shallow(
      <DateTimeWrapper style={{ width: columnDateTime.colSize }}>
        {columnDateTime.label}
      </DateTimeWrapper>
    );

    expect(wrapper2.text()).toEqual("<StyledComponent />");
    expect(wrapper.text()).toEqual("<sortableElement />");
    expect(wrapper.instance().buildHeaderCell()).toBeTruthy();
  });

  it("default", () => {
    const wrapper = shallow(
      <HeaderCellPureComponent
        column={columnDefault}
        width={columnDefault.colSize}
        index={0}
        orderBy={orderBy}
        orderByColumns={orderByColumns}
        canOrderColumns={false}
        orderByText="Order by"
        dragText="Drag"
      />
    );
    const wrapper2 = shallow(
      <TextWrapper style={{ width: columnDefault.colSize }}>
        {columnDefault.label}
      </TextWrapper>
    );

    expect(wrapper2.text()).toEqual("<StyledComponent />");
    expect(wrapper.text()).toEqual("<sortableElement />");
    expect(wrapper.instance().buildHeaderCell()).toBeTruthy();
  });

  it("create cell-header", () => {
    const wrapper = mount(
      <SortableContainer
        onSortEnd={onSortEnd}
        axis="x"
        lockAxis="x"
        lockToContainerEdges
        helperClass="Table-Header-Cell-Draging-o2xp"
      >
        <HeaderCellPureComponent
          column={columnDefault}
          width={columnDefault.colSize}
          index={0}
          orderBy={orderBy}
          orderByColumns={orderByColumns}
          canOrderColumns
          orderByText="Order by"
          dragText="Drag"
        />
      </SortableContainer>
    );
    expect(wrapper.find(".cell-header").length).toEqual(3);
  });

  it("on mouse over should set state", () => {
    const wrapper = mount(
      <SortableContainer
        onSortEnd={onSortEnd}
        axis="x"
        lockAxis="x"
        lockToContainerEdges
        helperClass="Table-Header-Cell-Draging-o2xp"
      >
        <HeaderCellPureComponent
          column={columnDefault}
          width={columnDefault.colSize}
          index={0}
          orderBy={orderBy}
          orderByColumns={orderByColumns}
          canOrderColumns
          orderByText="Order by"
          dragText="Drag"
        />
      </SortableContainer>
    );
    const button = wrapper.find("button.button-header");
    button.props().onMouseOver();
    expect(
      wrapper.find(HeaderCellPureComponent).state("childButtonHovered")
    ).toBeTruthy();
  });

  it("on mouse leave should set state", () => {
    const wrapper = mount(
      <SortableContainer
        onSortEnd={onSortEnd}
        axis="x"
        lockAxis="x"
        lockToContainerEdges
        helperClass="Table-Header-Cell-Draging-o2xp"
      >
        <HeaderCellPureComponent
          column={columnDefault}
          width={columnDefault.colSize}
          index={0}
          orderBy={[{ id: "default", value: "desc" }]}
          orderByColumns={orderByColumns}
          canOrderColumns
          orderByText="Order by"
          dragText="Drag"
        />
      </SortableContainer>
    );
    const button = wrapper.find("button.button-header");
    button.props().onMouseOver();
    button.props().onMouseLeave();
    expect(
      wrapper.find(HeaderCellPureComponent).state("childButtonHovered")
    ).toBeFalsy();
  });

  it("on focus should return null", () => {
    const wrapper = mount(
      <SortableContainer
        onSortEnd={onSortEnd}
        axis="x"
        lockAxis="x"
        lockToContainerEdges
        helperClass="Table-Header-Cell-Draging-o2xp"
      >
        <HeaderCellPureComponent
          column={columnDefault}
          width={columnDefault.colSize}
          index={0}
          orderBy={[{ id: "default", value: "asc" }]}
          orderByColumns={orderByColumns}
          canOrderColumns
          orderByText="Order by"
          dragText="Drag"
        />
      </SortableContainer>
    );
    const button = wrapper.find("button.button-header");
    expect(button.props().onFocus()).toEqual(null);
  });

  it("connected", () => {
    const wrapper = mount(
      <Provider store={store}>
        <SortableContainer
          onSortEnd={onSortEnd}
          axis="x"
          lockAxis="x"
          lockToContainerEdges
          helperClass="Table-Header-Cell-Draging-o2xp"
        >
          <HeaderCell
            column={columnDefault}
            width={columnDefault.colSize}
            index={0}
          />
        </SortableContainer>
      </Provider>
    );
    const button = wrapper.find("button.button-header");
    button.simulate("click");
    expect(wrapper.find(".cell-header").length).toEqual(3);
  });
});
