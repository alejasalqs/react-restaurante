import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const startLoadingBrands = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("brands");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.brands));
    } else {
      console.log("");
    }
  };
};

const loaded = (brands) => ({
  type: types.brandLoaded,
  payload: brands,
});

export const setActiveBrand = (brand) => ({
  type: types.setActiveBrand,
  payload: brand,
});

export const removeActiveBrand = () => ({
  type: types.removeActiveBrand,
});

export const startMarcaAddNew = ({
  nombre,
  descripcion,
  nacionalidad,
  empresa,
  telefono_empresa,
}) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken(
        "brands",
        { nombre, descripcion, nacionalidad, empresa, telefono_empresa },
        "POST"
      );

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewMarca(body.brand));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewMarca = (marca) => ({
  type: types.addBrand,
  payload: marca,
});

export const startDeletingBrand = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`brands/${codigo}`, {}, "DELETE");

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteBrand(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteBrand = (codigo) => ({
  type: types.deleteBrand,
  payload: { codigo },
});
