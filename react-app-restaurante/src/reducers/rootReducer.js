import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { consecutivosReducer } from "./consecutivosReducer";
import { countryReducer } from "./countryReducer";
import { employeesReducer } from "./employeesReducer";
import { jobsReducer } from "./jobsReducer";
import { marcasReducer } from "./marcasReducer";
import { proveedoresReducer } from "./proveedoresReducer";
import { rolReducer } from "./rolReducer";
import { tableReducer } from "./tablesReducer";
import { uiReducer } from "./uiReducer";
import { unidadMedidaReducer } from "./UnidadMedidaReducer";
import { usersReducer } from "./usersReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  employees: employeesReducer,
  jobs: jobsReducer,
  tables: tableReducer,
  brands: marcasReducer,
  suppliers: proveedoresReducer,
  users: usersReducer,
  consecutivos: consecutivosReducer,
  countries: countryReducer,
  rols: rolReducer,
  unidadMedida: unidadMedidaReducer,
});
