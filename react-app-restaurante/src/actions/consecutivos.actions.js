import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveConsecutivo = (consecutivo) => ({
  type: types.setActiveConsecutivos,
  payload: consecutivo,
});

export const removeActiveConsecutivo = () => ({
  type: types.removeActiveConsecutivos,
});

export const startLoadingConsecutivos = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("consecutivos");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.consecutivos));
    } else {
      console.log("");
    }
  };
};

const loaded = (consecutivos) => ({
  type: types.consecutivosLoaded,
  payload: consecutivos,
});

export const startConsecutivosAddNew = ({
  codigo,
  tipo,
  descripcion,
  valor_consecutivo,
  contiene_prefijo,
  prefijo,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "consecutivos",
        {
          codigo,
          tipo,
          descripcion,
          valor_consecutivo,
          contiene_prefijo,
          prefijo,
        },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewConsecutivos(body.consecutivo));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewConsecutivos = (consecutivo) => ({
  type: types.addConsecutivos,
  payload: consecutivo,
});

export const startDeletingConsecutivo = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`consecutivos/${codigo}`, {}, "DELETE");

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteConsecutivo(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteConsecutivo = (codigo) => ({
  type: types.deleteConsecutivos,
  payload: { codigo },
});
