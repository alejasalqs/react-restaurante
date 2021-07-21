import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

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
