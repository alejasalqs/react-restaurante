import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveDesechable = (desechables) => ({
  type: types.setActiveDesechables,
  payload: desechables,
});

export const removeActiveDesechable = () => ({
  type: types.removeActiveDesechables,
});

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

export const startDesechablesAddNew = ({ nombre, cantidad, descripcion }) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "products/desechables",
        { nombre, cantidad, descripcion },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewDesechable(body.desechable));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewDesechable = (desechable) => ({
  type: types.addDesechables,
  payload: desechable,
});

export const startDeletingDesechable = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `products/desechables/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteDesechable(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteDesechable = (codigo) => ({
  type: types.deleteDesechables,
  payload: { codigo },
});
