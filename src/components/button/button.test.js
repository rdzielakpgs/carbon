import * as React from "react";
import { composeStories } from "@storybook/testing-react";
import { mount } from "@cypress/react";
import * as stories from "./button.stories";

// compile the "Default" story with the library
const { Default } = composeStories(stories);

it("Should not display a cross when empty", () => {
  // and mount the story using @cypress/react library
  mount(<Default />);

  // then run our tests
  cy.get("svg").should("not.be.visible");
});
