import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLoadingTecnologia = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("products/tecnologia");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.productos_tecnologia));
    } else {
      console.log("");
    }
  };
};

const loaded = (tecnologia) => ({
  type: types.tecnologiaLoaded,
  payload: tecnologia,
});
