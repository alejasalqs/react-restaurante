import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveLimpieza = (limpieza) => ({
  type: types.setActiveLimpieza,
  payload: limpieza,
});

export const removeActiveLimpieza = () => ({
  type: types.removeActiveLimpieza,
});

export const startLoadingLimpieza = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("products/limpieza");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.productos_desechables));
    } else {
      console.log("");
    }
  };
};

const loaded = (limpieza) => ({
  type: types.limpiezaLoaded,
  payload: limpieza,
});
