import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveBebidaHelada = (bebida_helada) => ({
  type: types.setActiveBebidaHelada,
  payload: bebida_helada,
});

export const removeActiveBebidaHelada = () => ({
  type: types.removeActiveBebidaHelada,
});

export const startLoadingBebidaHelada = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/bebidas-heladas");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.bebida_helada));
    } else {
      console.log("");
    }
  };
};

const loaded = (bebida_helada) => ({
  type: types.bebidaHeladaLoaded,
  payload: bebida_helada,
});

export const startBebidaHeladaAddNew = ({
  nombre,
  ingredientes,
  descripcion,
  precio,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "specials/bebidas-heladas",
        { nombre, ingredientes, descripcion, precio },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewBebidaHelada(body.bebida_helada));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewBebidaHelada = (helada) => ({
  type: types.addBebidaHelada,
  payload: helada,
});

export const startDeletingBebidaHelada = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `specials/bebidas-heladas/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteBebidaHelada(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteBebidaHelada = (codigo) => ({
  type: types.deleteBebidaHelada,
  payload: { codigo },
});
