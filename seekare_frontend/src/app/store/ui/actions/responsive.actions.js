import * as ActionTypes from "../types";

export const changeResponsive = (responsiveType) => ({
  type: ActionTypes.MOBILE_RESPONSIVE,
  payload: { responsiveType },
});
