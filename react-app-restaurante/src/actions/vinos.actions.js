import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveVinos = (vinos) => ({
  type: types.setActiveVinos,
  payload: vinos,
});

export const removeActiveVinos = () => ({
  type: types.removeActiveVinos,
});

export const startLoadingVinos = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/vinos");

    const body = await resp.json();

    if (body.ok) {
      console.log(body);
      //body.bitacora.usuario;
      dispatch(loaded(body.vinos));
    } else {
      console.log("");
    }
  };
};

const loaded = (vinos) => ({
  type: types.vinosLoaded,
  payload: vinos,
});
