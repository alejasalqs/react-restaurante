import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveRol = (rol) => ({
  type: types.setActiveRol,
  payload: rol,
});

export const removeActiveRol = () => ({
  type: types.removeActiveRol,
});

export const startLoadingRols = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("rols");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.rols));
    } else {
      console.log("");
    }
  };
};

const loaded = (rols) => ({
  type: types.rolLoaded,
  payload: rols,
});

export const startRolAddNew = ({ nombre, descripcion }) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "rols",
        {
          nombre,
          descripcion,
        },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewRol(body.rol));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewRol = (rol) => ({
  type: types.addRol,
  payload: rol,
});

export const startDeletingRol = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`rols/${codigo}`, {}, "DELETE");

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteRol(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteRol = (codigo) => ({
  type: types.deleteRol,
  payload: { codigo },
});
