import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveBebidaCaliente = (bebida_caliente) => ({
  type: types.setActiveBebidaCaliente,
  payload: bebida_caliente,
});

export const removeActiveBebidaCaliente = () => ({
  type: types.removeActiveBebidaCaliente,
});

export const startLoadingBebidaCaliente = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/bebidas-calientes");

    const body = await resp.json();

    if (body.ok) {
      console.log(body);
      //body.bitacora.usuario;
      dispatch(loaded(body.bebida_caliente));
    } else {
      console.log("");
    }
  };
};

const loaded = (bebida_caliente) => ({
  type: types.bebidaCalienteLoaded,
  payload: bebida_caliente,
});
