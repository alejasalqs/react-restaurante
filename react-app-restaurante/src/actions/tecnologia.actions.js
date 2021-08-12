import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveTecnologia = (tecnologia) => ({
  type: types.setActiveTecnologia,
  payload: tecnologia,
});

export const removeActiveTecnologia = () => ({
  type: types.removeActiveTecnologia,
});

export const startLoadingTecnologia = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("products/tecnologia");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.productos_tecnologia));
    } else {
      console.log("");
    }
  };
};

const loaded = (tecnologia) => ({
  type: types.tecnologiaLoaded,
  payload: tecnologia,
});

export const startTecnologiaAddNew = ({
  codigo,
  nombre,
  cantidad,
  descripcion,
  precio,
  marca,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "products/tecnologia",
        { codigo, nombre, cantidad, descripcion, precio, marca },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewTecnologia(body.producto_tecnologia));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewTecnologia = (tecnologia) => ({
  type: types.addTecnologia,
  payload: tecnologia,
});

export const startDeletingTecnologia = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `products/tecnologia/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteTecnologia(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteTecnologia = (codigo) => ({
  type: types.deleteTecnologia,
  payload: { codigo },
});
