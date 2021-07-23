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
