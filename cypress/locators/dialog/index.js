import { ALERT_DIALOG, DIALOG_TITLE, OPEN_PREVIEW } from "./locators";

// component preview locators
export const alertDialogPreview = () => cy.get(ALERT_DIALOG);
export const alertChildren = () =>
  alertDialogPreview().find("div:nth-child(2)").children();
export const dialogTitle = () => cy.get(DIALOG_TITLE);
export const openPreviewButton = () => cy.get(OPEN_PREVIEW);
