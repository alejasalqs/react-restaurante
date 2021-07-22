import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { bitacoraReducer } from "./bitacoraReducer";
import { comestiblesReducer } from "./comestiblesReducer";
import { consecutivosReducer } from "./consecutivosReducer";
import { countryReducer } from "./countryReducer";
import { desechablesReducer } from "./desechablesReducer";
import { employeesReducer } from "./employeesReducer";
import { equiposReducer } from "./equiposReducer";
import { jobsReducer } from "./jobsReducer";
import { limpiezaReducer } from "./limpiezaReducer";
import { marcasReducer } from "./marcasReducer";
import { proveedoresReducer } from "./proveedoresReducer";
import { rolReducer } from "./rolReducer";
import { tableReducer } from "./tablesReducer";
import { tecnologiaReducer } from "./tecnologiaReducer";
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
  bitacora: bitacoraReducer,
  comestibles: comestiblesReducer,
  desechables: desechablesReducer,
  tecnologia: tecnologiaReducer,
  limpieza: limpiezaReducer,
  equipos: equiposReducer,
});
