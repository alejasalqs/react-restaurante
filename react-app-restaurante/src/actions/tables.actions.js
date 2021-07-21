import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLoading = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("tables");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.tables));
    } else {
      console.log("");
    }
  };
};

const loaded = (tables) => ({
  type: types.tableLoaded,
  payload: tables,
});

export const startTablesAddNew = (nombre, numero, cantidad_sillas) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "tables",
        { nombre, numero, cantidad_sillas },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewTable(body.table));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewTable = (table) => ({
  type: types.addTable,
  payload: table,
});

export const startDeletingTable = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`tables/${codigo}`, {}, "DELETE");

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteTable(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteTable = (codigo) => ({
  type: types.deleteTable,
  payload: { codigo },
});

export const setActiveTable = (table) => ({
  type: types.setActiveTable,
  payload: table,
});

export const removeActiveTable = () => ({
  type: types.removeActiveTable,
});
