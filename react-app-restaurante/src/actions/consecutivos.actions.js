import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveConsecutivo = (consecutivo) => ({
  type: types.setActiveConsecutivos,
  payload: consecutivo,
});

export const removeActiveConsecutivo = () => ({
  type: types.removeActiveConsecutivos,
});

export const startLoadingConsecutivos = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("consecutivos");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.consecutivos));
    } else {
      console.log("");
    }
  };
};

const loaded = (consecutivos) => ({
  type: types.consecutivosLoaded,
  payload: consecutivos,
});
