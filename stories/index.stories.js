import React from "react";
import { storiesOf } from "@storybook/react";
import { DatatableContainer } from "../src/index";

// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";
// import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";
// import { withState } from "@dump247/storybook-state";

const stories = storiesOf("React Datatable", module);

// stories.addDecorator(withKnobs);

stories.add("default", () => <DatatableContainer />);
