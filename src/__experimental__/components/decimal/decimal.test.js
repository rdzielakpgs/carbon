import * as React from "react";
import { composeStory } from "@storybook/testing-react";
import { mount } from "@cypress/react";
import Meta, { Default as DefaultStory } from "./decimal.stories.js";

// compile the "Default" story with the library
const Default = composeStory(DefaultStory, Meta);

describe("Test", () => {
  it("Test", () => {
    // and mount the story using @cypress/react library
    mount(<Default />);

    const decimalComponent = '[data-component="decimal"]';

    // then run our tests
    cy.get(decimalComponent).type(123).find("input").blur({ force: true });
    cy.get(decimalComponent).find("input").should("have.value", "123.00");
  });
});
