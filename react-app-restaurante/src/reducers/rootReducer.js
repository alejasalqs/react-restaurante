import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { employeesReducer } from "./employeesReducer";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  employees: employeesReducer,
});
