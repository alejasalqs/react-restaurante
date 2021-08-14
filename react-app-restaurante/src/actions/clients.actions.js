import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLoadingClientes = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("clients");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.clients));
    } else {
      console.log("");
    }
  };
};

const loaded = (clientes) => ({
  type: types.clientesLoaded,
  payload: clientes,
});

export const startClienteAddNew = ({
  nombre_completo,
  fecha,
  mesa,
  reservacion,
  monto_pagado,
  barra,
}) => {
  return async (dispatch) => {
    try {
      console.log(
        nombre_completo,
        fecha,
        mesa,
        reservacion,
        monto_pagado,
        barra
      );
      const resp = await fetchWithToken(
        "clients",
        { nombre_completo, fecha, mesa, reservacion, monto_pagado, barra },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewCliente(body.comestible));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewCliente = (cliente) => ({
  type: types.addNewCliente,
  payload: cliente,
});

export const startDeletingComestible = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(
      `products/comestibles/${codigo}`,
      {},
      "DELETE"
    );

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteComestible(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteComestible = (codigo) => ({
  type: types.deleteComestibles,
  payload: { codigo },
});
