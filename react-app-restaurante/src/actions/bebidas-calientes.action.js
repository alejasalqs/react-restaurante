import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveBebidaCaliente = (bebida_caliente) => ({
  type: types.setActiveBebidaCaliente,
  payload: bebida_caliente,
});

export const removeActiveBebidaCaliente = () => ({
  type: types.removeActiveBebidaCaliente,
});

export const startLoadingBebidaCaliente = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/bebidas-calientes");

    const body = await resp.json();

    if (body.ok) {
      console.log(body);
      //body.bitacora.usuario;
      dispatch(loaded(body.bebida_caliente));
    } else {
      console.log("");
    }
  };
};

const loaded = (bebida_caliente) => ({
  type: types.bebidaCalienteLoaded,
  payload: bebida_caliente,
});

export const startBebidaCalienteAddNew = ({
  nombre,
  ingredientes,
  descripcion,
  precio,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "specials/bebidas-calientes",
        { nombre, ingredientes, descripcion, precio },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewBebidaCaliente(body.bebida_caliente));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewBebidaCaliente = (buffet) => ({
  type: types.addBebidaCaliente,
  payload: buffet,
});

export const startDeletingBebidaCaliente = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `specials/bebidas-calientes/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteBebidaCaliente(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteBebidaCaliente = (codigo) => ({
  type: types.deleteBebidaCaliente,
  payload: { codigo },
});
