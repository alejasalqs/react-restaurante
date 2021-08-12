import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveLicores = (licores) => ({
  type: types.setActiveLicores,
  payload: licores,
});

export const removeActiveLicores = () => ({
  type: types.removeActiveLicores,
});

export const startLoadingLicores = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/licores");

    const body = await resp.json();

    if (body.ok) {
      console.log(body);
      //body.bitacora.usuario;
      dispatch(loaded(body.licores));
    } else {
      console.log("");
    }
  };
};

const loaded = (licores) => ({
  type: types.licoresLoaded,
  payload: licores,
});

export const startLicorAddNew = ({
  nombre,
  cantidad,
  descripcion,
  marca,
  nacionalidad,
  precio_unitario,
  precio_botella,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "specials/licores",
        {
          nombre,
          cantidad,
          descripcion,
          marca,
          nacionalidad,
          precio_unitario,
          precio_botella,
        },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewLicor(body.licores));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewLicor = (licor) => ({
  type: types.addLicores,
  payload: licor,
});

export const startDeletingLicor = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `specials/licores/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteLicor(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteLicor = (codigo) => ({
  type: types.deleteLicores,
  payload: { codigo },
});
