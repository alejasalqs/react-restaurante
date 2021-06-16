import { types } from "../types/types";

export const setActiveTable = (table) => ({
  type: types.setActiveTable,
  payload: table,
});

export const removeActiveTable = () => ({
  type: types.removeActiveTable,
});
