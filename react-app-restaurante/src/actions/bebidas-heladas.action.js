import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveBebidaHelada = (bebida_helada) => ({
  type: types.setActiveBebidaHelada,
  payload: bebida_helada,
});

export const removeActiveBebidaHelada = () => ({
  type: types.removeActiveBebidaHelada,
});

export const startLoadingBebidaHelada = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/bebidas-heladas");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.bebida_helada));
    } else {
      console.log("");
    }
  };
};

const loaded = (bebida_helada) => ({
  type: types.bebidaHeladaLoaded,
  payload: bebida_helada,
});
