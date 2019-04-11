import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import defaultStory from "./Basics/defaultStory";
import noDataStory from "./Basics/noDataStory";
import customTableHeaderRowStory from "./Override/customTableHeaderRowStory";
import customTableHeaderCellStory from "./Override/customTableHeaderCellStory";
import customTableBodyRowStory from "./Override/customTableBodyRowStory";
import customTableBodyCellStory from "./Override/customTableBodyCellStory";
import customDataTypesStory from "./Override/customDataTypesStory";

// import { action } from "@storybook/addon-actions";
// import { linkTo } from "@storybook/addon-links";
// import { withState } from "@dump247/storybook-state";

const storiesBasics = storiesOf("React Datatable|Basics", module);

storiesBasics.addDecorator(withKnobs);
storiesBasics.add("default", defaultStory);

storiesBasics.add("no data", noDataStory);

const storiesOverride = storiesOf("React Datatable|Override", module);
storiesOverride.addDecorator(withKnobs);
storiesOverride.add("custom table header row", customTableHeaderRowStory);
storiesOverride.add("custom table header cell", customTableHeaderCellStory);
storiesOverride.add("custom table body row", customTableBodyRowStory);
storiesOverride.add("custom table body cell", customTableBodyCellStory);
storiesOverride.add("custom dataTypes", customDataTypesStory);
