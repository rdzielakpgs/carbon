import { eventInAction } from "../../locators";
import {
  linkPreviewText,
  linkPreviewCloseIcon,
  linkPreviewCloseIconIframe,
} from "../../locators/link-preview";
import { keyCode } from "../helper";

When("I hover mouse onto Link Preview component", () => {
  linkPreviewText().realHover();
});

Then("Link Preview text element has correct background-color {string}", () => {
  linkPreviewText().should(
    "have.css",
    "background-color",
    "rgb(204, 214, 219)"
  );
});

When("I focus Link Preview component", () => {
  linkPreviewText().focus();
});

Then(
  "Link Preview has the border outline color {string} and width {string}",
  (color, width) => {
    linkPreviewText()
      .should("have.css", "outline-color", color)
      .and("have.css", "outline-width", width);
  }
);

When("I focus Link Preview close icon", () => {
  linkPreviewCloseIcon().parent().focus();
});

Then(
  "Link Preview close icon has the border outline color {string} and width {string}",
  (color, width) => {
    linkPreviewCloseIcon()
      .parent()
      .should("have.css", "outline-color", color)
      .and("have.css", "outline-width", width);
  }
);

When("I click Link Preview close icon in Iframe", () => {
  linkPreviewCloseIconIframe().click();
});

When("I focus Link Preview close icon in Iframe", () => {
  linkPreviewCloseIconIframe().parent().focus();
});

When("I click onto Link Preview close icon using {string} key", (key) => {
  linkPreviewCloseIconIframe().trigger("keydown", keyCode(key));
});

Then("{string} action is called in Actions Tab for Link Preview", (event) => {
  eventInAction(event);
});
