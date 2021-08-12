import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveEquipos = (equipos) => ({
  type: types.setActiveEquipos,
  payload: equipos,
});

export const removeActiveEquipos = () => ({
  type: types.removeActiveEquipos,
});

export const startLoadingEquipos = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("products/equipos");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.equipos_utencilios));
    } else {
      console.log("");
    }
  };
};

const loaded = (equipos) => ({
  type: types.equiposLoaded,
  payload: equipos,
});

export const startEquiposAddNew = ({
  codigo,
  nombre,
  cantidad,
  precio,
  marca,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "products/equipos",
        { codigo, nombre, cantidad, precio, marca },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewEquipos(body.equipos_utencilios));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewEquipos = (equipo) => ({
  type: types.addEquipos,
  payload: equipo,
});

export const startDeletingEquipo = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `products/equipos/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteEquipo(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteEquipo = (codigo) => ({
  type: types.deleteEquipos,
  payload: { codigo },
});
