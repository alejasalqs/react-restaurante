import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveComestible = (comestibles) => ({
  type: types.setActiveComestibles,
  payload: comestibles,
});

export const removeActiveComestible = () => ({
  type: types.removeActiveComestibles,
});

export const startLoadingComestibles = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("products/comestibles");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.comestibles));
    } else {
      console.log("");
    }
  };
};

const loaded = (comestibles) => ({
  type: types.comestiblesLoaded,
  payload: comestibles,
});
