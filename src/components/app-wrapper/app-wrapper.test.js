import * as React from "react";
import { composeStory } from "@storybook/testing-react";
import { mount } from "@cypress/react";
import Meta, { Default as DefaultStory } from "./app-wrapper.stories.js";

// compile the "Default" story with the library
const Default = composeStory(DefaultStory, Meta);

describe("Test", () => {
  it("Test", () => {
    // and mount the story using @cypress/react library
    mount(<Default />);

    // then run our tests
    cy.get('[data-component="app-wrapper"]').should(
      "have.text",
      "This component will wrap its children within the width constraints of your application."
    );
  });
});
