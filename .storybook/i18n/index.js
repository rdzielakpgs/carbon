import I18nProvider from "../../src/components/i18n-provider";
import frFR from "./fr-FR";

export default (Story) => (
  <I18nProvider locale={frFR}>
    <Story />
  </I18nProvider>
);
