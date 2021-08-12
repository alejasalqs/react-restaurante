import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveSupplier = (supplier) => ({
  type: types.setActiveSupplier,
  payload: supplier,
});

export const removeActiveSupplier = () => ({
  type: types.removeActiveSupplier,
});

export const startLoadingSuppliers = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("suppliers");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.suppliers));
    } else {
      console.log("");
    }
  };
};

const loaded = (suppliers) => ({
  type: types.supplierLoaded,
  payload: suppliers,
});

export const startSupplierAddNew = ({
  nombre,
  apellido1,
  apellido2,
  telefono,
  fax,
  restaurante,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "suppliers",
        { nombre, apellido1, apellido2, telefono, fax, restaurante },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewSupplier(body.supplier));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewSupplier = (supplier) => ({
  type: types.addSupplier,
  payload: supplier,
});

export const startDeletingSupplier = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`suppliers/${codigo}`, {}, "DELETE");

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteSupplier(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteSupplier = (codigo) => ({
  type: types.deleteSupplier,
  payload: { codigo },
});
