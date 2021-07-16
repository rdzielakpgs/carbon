import I18nProvider from "../../src/components/i18n-provider";
import plPL from "./pl-PL";

export default (Story) => (
  <I18nProvider locale={plPL}>
    <Story />
  </I18nProvider>
);
