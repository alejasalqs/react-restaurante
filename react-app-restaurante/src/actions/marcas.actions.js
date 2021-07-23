import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLoadingBrands = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("brands");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.brands));
    } else {
      console.log("");
    }
  };
};

const loaded = (brands) => ({
  type: types.brandLoaded,
  payload: brands,
});

export const setActiveBrand = (brand) => ({
  type: types.setActiveBrand,
  payload: brand,
});

export const removeActiveBrand = () => ({
  type: types.removeActiveBrand,
});
