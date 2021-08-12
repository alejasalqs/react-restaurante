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

export const startUserAddNew = ({
  nombre,
  apellido1,
  apellido2,
  telefono,
  celular,
  login,
  password,
  restaurante,
  tipo_usuario,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "users",
        {
          nombre,
          apellido1,
          apellido2,
          telefono,
          celular,
          login,
          password,
          restaurante,
          tipo_usuario,
        },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewUser(body.user));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewUser = (user) => ({
  type: types.addUser,
  payload: user,
});

export const startDeletingUser = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`users/${codigo}`, {}, "DELETE");

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteUser(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteUser = (codigo) => ({
  type: types.deleteUser,
  payload: { codigo },
});
