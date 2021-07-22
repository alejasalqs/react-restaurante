import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLoadingBitacora = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("bitacora");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.bitacora));
    } else {
      console.log("");
    }
  };
};

const loaded = (bitacora) => ({
  type: types.bitacoraLoaded,
  payload: bitacora,
});
