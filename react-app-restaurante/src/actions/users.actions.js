import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveUser = (user) => ({
  type: types.setActiveUser,
  payload: user,
});

export const removeActiveUser = () => ({
  type: types.removeActiveUser,
});

export const startLoadingUsers = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("users");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.users));
    } else {
      console.log("");
    }
  };
};

const loaded = (users) => ({
  type: types.userLoaded,
  payload: users,
});
