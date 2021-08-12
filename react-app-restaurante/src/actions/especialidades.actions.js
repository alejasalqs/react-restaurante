import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveEspecialidad = (especialidad) => ({
  type: types.setActiveEspecialidad,
  payload: especialidad,
});

export const removeActiveEspecialidad = () => ({
  type: types.removeActiveEspecialidad,
});

export const startLoadingEspecialidad = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/especialidades");

    const body = await resp.json();

    if (body.ok) {
      console.log(body);
      dispatch(loaded(body.especiales));
    } else {
      console.log("");
    }
  };
};

const loaded = (especialidades) => ({
  type: types.especialidadLoaded,
  payload: especialidades,
});

export const startEspecialidadAddNew = ({
  nombre,
  ingredientes,
  detalle,
  precio,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "specials/especialidades",
        { nombre, ingredientes, detalle, precio },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewEspecialidad(body.especiales));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewEspecialidad = (especialidad) => ({
  type: types.addEspecialidad,
  payload: especialidad,
});

export const startDeletingEspecialidad = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `specials/especialidades/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteEspecialidad(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteEspecialidad = (codigo) => ({
  type: types.deleteEspecialidad,
  payload: { codigo },
});
