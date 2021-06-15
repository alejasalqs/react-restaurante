import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { employeesReducer } from "./employeesReducer";
import { jobsReducer } from "./jobsReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  employees: employeesReducer,
  jobs: jobsReducer,
});
