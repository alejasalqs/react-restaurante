import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveBuffet = (buffet) => ({
  type: types.setActiveBuffets,
  payload: buffet,
});

export const removeActiveBuffet = () => ({
  type: types.removeActiveBuffets,
});

export const startLoadingBuffet = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/buffet");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.buffets));
    } else {
      console.log("");
    }
  };
};

const loaded = (buffets) => ({
  type: types.buffetsLoaded,
  payload: buffets,
});
