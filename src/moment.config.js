import moment from "moment";

export const locale =
  window.navigator.userLanguage || window.navigator.language;
moment.locale(locale);
export const localeData = moment.localeData();
export const dateFormatUser = localeData.longDateFormat("L");
export const timeFormatUser = localeData.longDateFormat("LT");
export const dateTimeFormatUser = localeData.longDateFormat("lll");
export { moment };
