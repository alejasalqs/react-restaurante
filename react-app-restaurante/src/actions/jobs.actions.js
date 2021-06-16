import { types } from "../types/types";

export const setActiveJob = (job) => ({
  type: types.setActiveJob,
  payload: job,
});

export const removeActiveJob = () => ({
  type: types.removeActiveJob,
});

export const addJob = (job) => ({
  type: types.addJob,
  payload: job,
});

export const updateJob = (job) => ({
  type: types.editJob,
  payload: job,
});

export const deleteJob = () => ({
  type: types.deleteJob,
});
