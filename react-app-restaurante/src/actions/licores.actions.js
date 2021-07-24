import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveLicores = (licores) => ({
  type: types.setActiveLicores,
  payload: licores,
});

export const removeActiveLicores = () => ({
  type: types.removeActiveLicores,
});

export const startLoadingLicores = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/licores");

    const body = await resp.json();

    if (body.ok) {
      console.log(body);
      //body.bitacora.usuario;
      dispatch(loaded(body.licores));
    } else {
      console.log("");
    }
  };
};

const loaded = (licores) => ({
  type: types.licoresLoaded,
  payload: licores,
});
