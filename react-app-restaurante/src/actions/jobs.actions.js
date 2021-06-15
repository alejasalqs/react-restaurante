import { types } from "../types/types";

export const setActiveJob = (job) => ({
  type: types.setActiveJob,
  payload: job,
});

export const removeActiveJob = () => ({
  type: types.removeActiveJob,
});
