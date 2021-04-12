import { storiesOf } from "@storybook/react";
import defaultStory from "./Basics/DefaultStory";
import shortSample from "./Basics/ShortSample";

const storiesBasics = storiesOf("React datatable|Basics", module);

storiesBasics.add("default", defaultStory);
storiesBasics.add("shortSample", shortSample);
