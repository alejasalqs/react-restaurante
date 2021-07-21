import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLoadingUnidadesMedida = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("unidades-medida");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.unidad_medida));
    } else {
      console.log("");
    }
  };
};

const loaded = (unidad_medida) => ({
  type: types.unidadMedidaLoaded,
  payload: unidad_medida,
});
