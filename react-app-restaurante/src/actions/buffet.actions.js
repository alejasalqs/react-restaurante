import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveBuffet = (buffet) => ({
  type: types.setActiveBuffets,
  payload: buffet,
});

export const removeActiveBuffet = () => ({
  type: types.removeActiveBuffets,
});

export const startLoadingBuffet = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("specials/buffet");

    const body = await resp.json();

    if (body.ok) {
      //console.log(body.bitacora);
      //body.bitacora.usuario;
      dispatch(loaded(body.buffets));
    } else {
      console.log("");
    }
  };
};

const loaded = (buffets) => ({
  type: types.buffetsLoaded,
  payload: buffets,
});

export const startBuffetAddNew = ({
  unidad_medida,
  precio,
  nombre,
  tipo_comida,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "specials/buffet",
        { unidad_medida, precio, nombre, tipo_comida },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewBuffet(body.position));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewBuffet = (buffet) => ({
  type: types.addBuffets,
  payload: buffet,
});
