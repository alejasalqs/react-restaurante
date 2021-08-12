import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveBebidaGaseosa = (bebida_gaseosa) => ({
  type: types.setActiveBebidaGaseosa,
  payload: bebida_gaseosa,
});

export const removeActiveBebidaGaseosa = () => ({
  type: types.removeActiveBebidaGaseosa,
});

export const startLoadingBebidaGaseosa = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/bebidas-gaseosas");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.bebida_gaseosa));
    } else {
      console.log("");
    }
  };
};

const loaded = (bebida_gaseosa) => ({
  type: types.bebidaGaseosaLoaded,
  payload: bebida_gaseosa,
});

export const startBebidaGaseosaAddNew = ({
  nombre,
  cantidad,
  descripcion,
  marca,
  nacionalidad,
  precio,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "specials/bebidas-gaseosas",
        { nombre, cantidad, descripcion, marca, nacionalidad, precio },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewBebidaGaseosa(body.bebida_gaseosa));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewBebidaGaseosa = (gaseosa) => ({
  type: types.addBebidaGaseosa,
  payload: gaseosa,
});

export const startDeletingBebidaGaseosa = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `specials/bebidas-gaseosas/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteBebidaGaseosa(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteBebidaGaseosa = (codigo) => ({
  type: types.deleteBebidaGaseosa,
  payload: { codigo },
});
