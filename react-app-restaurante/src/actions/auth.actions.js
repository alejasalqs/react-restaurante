import { fetchWithOutToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLogin = (login, password) => {
  return async (dispatch) => {
    // llamamos el custom fetch del helper
    const resp = await fetchWithOutToken(
      "auth/login",
      { login, password },
      "POST"
    );

    const body = await resp.json();

    console.log(body);

    if (body.ok) {
      // Validamos que la respuestas sea correcta y grabamos en el localStorage
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(loginUser(body.user));
    } else {
      //Swal.fire("Error", body.error, "error");
      dispatch(checkingFinish());
    }
  };
};

export const startLogOut = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(logOut());
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const logOut = () => ({
  type: types.logout,
});

const loginUser = (user) => ({
  type: types.login,
  payload: user,
});
