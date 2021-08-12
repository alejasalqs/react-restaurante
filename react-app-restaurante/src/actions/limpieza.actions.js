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

export const startLimpiezaAddNew = ({
  nombre,
  descripcion,
  cantidad,
  tipo,
  cantidad_medida,
  unidad_medida,
  marca,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "products/limpieza",
        {
          nombre,
          descripcion,
          cantidad,
          tipo,
          cantidad_medida,
          unidad_medida,
          marca,
        },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewLimpieza(body.desechable));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewLimpieza = (limpieza) => ({
  type: types.addLimpieza,
  payload: limpieza,
});

export const startDeletingLimpieza = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `products/limpieza/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteLimpieza(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteLimpieza = (codigo) => ({
  type: types.deleteLimpieza,
  payload: { codigo },
});
