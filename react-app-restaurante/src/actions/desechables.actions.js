import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLoadingDesechables = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("products/desechables");

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

const loaded = (desechables) => ({
  type: types.desechablesLoaded,
  payload: desechables,
});
