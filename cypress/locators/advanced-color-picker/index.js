import {
  ADVANCED_COLOR_PICKER_CELL,
  SIMPLE_COLOR,
  SIMPLE_COLOR_PICKER,
} from "./locators";

export const experimentalSimpleColorPickerInput = (index) =>
  cy.get(SIMPLE_COLOR).find("input").eq(index);
export const simpleColorPicker = (index) =>
  cy.get(SIMPLE_COLOR_PICKER).find(SIMPLE_COLOR).eq(index).find("input");
export const advancedColorPickerCell = () => cy.get(ADVANCED_COLOR_PICKER_CELL);
