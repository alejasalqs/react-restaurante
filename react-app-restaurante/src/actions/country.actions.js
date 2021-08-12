import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

export const setActiveCountry = (country) => ({
  type: types.setActiveCountry,
  payload: country,
});

export const removeActiveCountry = () => ({
  type: types.removeActiveCountry,
});

export const startLoadingCountry = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("countries");

    const body = await resp.json();

    if (body.ok) {
      dispatch(loaded(body.countries));
    } else {
      console.log("");
    }
  };
};

const loaded = (countries) => ({
  type: types.countryLoaded,
  payload: countries,
});

export const startCountryAddNew = ({ pais }) => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("countries", { pais }, "POST");

      const body = await resp.json();

      if (body.ok) {
        dispatch(addNewCountry(body.country));
      } else {
        console.log("");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addNewCountry = (country) => ({
  type: types.addCountry,
  payload: country,
});

export const startDeletingCountry = (codigo) => {
  return async (dispatch) => {
    const resp = await fetchWithToken(`countries/${codigo}`, {}, "DELETE");

    const body = await resp.json();

    if (body.ok) {
      dispatch(deleteCountry(codigo));
    } else {
      console.log("");
    }
  };
};

const deleteCountry = (codigo) => ({
  type: types.deleteCountry,
  payload: { codigo },
});
