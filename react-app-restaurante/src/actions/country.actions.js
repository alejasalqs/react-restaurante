import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLoadingCountry = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("countries");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.countries));
    } else {
      console.log("");
    }
  };
};

const loaded = (countries) => ({
  type: types.countryLoaded,
  payload: countries,
});
