import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveVinos = (vinos) => ({
  type: types.setActiveVinos,
  payload: vinos,
});

export const removeActiveVinos = () => ({
  type: types.removeActiveVinos,
});

export const startLoadingVinos = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/vinos");

    const body = await resp.json();

    if (body.ok) {
      console.log(body);
      //body.bitacora.usuario;
      dispatch(loaded(body.vinos));
    } else {
      console.log("");
    }
  };
};

const loaded = (vinos) => ({
  type: types.vinosLoaded,
  payload: vinos,
});

export const startVinoAddNew = ({
  nombre,
  cantidad,
  descripcion,
  marca,
  nacionalidad,
  precio_unitario,
  precio_botella,
  anio_cosecha,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "specials/vinos",
        {
          nombre,
          cantidad,
          descripcion,
          marca,
          nacionalidad,
          precio_unitario,
          precio_botella,
          anio_cosecha,
        },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewVino(body.vinos));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewVino = (vino) => ({
  type: types.addVinos,
  payload: vino,
});

export const startDeletingVino = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`specials/vinos/${codigo}`, {}, "DELETE");

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteVino(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteVino = (codigo) => ({
  type: types.deleteVinos,
  payload: { codigo },
});
