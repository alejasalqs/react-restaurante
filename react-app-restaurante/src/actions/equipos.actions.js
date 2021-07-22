import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLoadingEquipos = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("products/equipos");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.equipos_utencilios));
    } else {
      console.log("");
    }
  };
};

const loaded = (equipos) => ({
  type: types.equiposLoaded,
  payload: equipos,
});
