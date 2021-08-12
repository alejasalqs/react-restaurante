import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveComestible = (comestibles) => ({
  type: types.setActiveComestibles,
  payload: comestibles,
});

export const removeActiveComestible = () => ({
  type: types.removeActiveComestibles,
});

export const startLoadingComestibles = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("products/comestibles");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.comestibles));
    } else {
      console.log("");
    }
  };
};

const loaded = (comestibles) => ({
  type: types.comestiblesLoaded,
  payload: comestibles,
});

export const startComestibleAddNew = ({ nombre, cantidad }) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "products/comestibles",
        { nombre, cantidad },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewComestible(body.comestible));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewComestible = (comestible) => ({
  type: types.addComestibles,
  payload: comestible,
});

export const startDeletingComestible = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `products/comestibles/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteComestible(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteComestible = (codigo) => ({
  type: types.deleteComestibles,
  payload: { codigo },
});
