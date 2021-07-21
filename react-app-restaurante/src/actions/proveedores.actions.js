import { fetchWithToken } from "../helpers/fetch.helper";
import { types } from "../types/types";

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
