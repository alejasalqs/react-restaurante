import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveBebidaGaseosa = (bebida_gaseosa) => ({
  type: types.setActiveBebidaGaseosa,
  payload: bebida_gaseosa,
});

export const removeActiveBebidaGaseosa = () => ({
  type: types.removeActiveBebidaGaseosa,
});

export const startLoadingBebidaGaseosa = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/bebidas-gaseosas");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.bebida_gaseosa));
    } else {
      console.log("");
    }
  };
};

const loaded = (bebida_gaseosa) => ({
  type: types.bebidaGaseosaLoaded,
  payload: bebida_gaseosa,
});
