import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveUnidadMedida = (unidad_medida) => ({
  type: types.setActiveUnidadMedida,
  payload: unidad_medida,
});

export const removeActiveUnidadMedida = () => ({
  type: types.removeActiveUnidadMedida,
});

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

export const startUnidadMedidaAddNew = ({
  unidad,
  detalle,
  escala,
  simbolo,
  simbologia,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "unidades-medida",
        { unidad, detalle, escala, simbolo, simbologia },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewUnidadMedida(body.unidad_medida));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewUnidadMedida = (unidad_medida) => ({
  type: types.addUnidadMedida,
  payload: unidad_medida,
});

export const startDeletingUnidadMedida = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `unidades-medida/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteUnidadMedida(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteUnidadMedida = (codigo) => ({
  type: types.deleteUnidadMedida,
  payload: { codigo },
});
